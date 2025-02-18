/*
Copyright 2018 The Kubernetes Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Modified from the original source (available at
// https://github.com/kubernetes-sigs/controller-runtime/tree/v0.14.1/pkg/cache)

package dynamiccache

import (
	"fmt"
	"reflect"
	"time"

	"github.com/open-policy-agent/gatekeeper/v3/third_party/sigs.k8s.io/controller-runtime/pkg/dynamiccache/internal"
	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/apimachinery/pkg/fields"
	"k8s.io/apimachinery/pkg/labels"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
	toolscache "k8s.io/client-go/tools/cache"

	"sigs.k8s.io/controller-runtime/pkg/cache"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/client/apiutil"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
)

var log = logf.Log.WithName("object-cache")

var defaultResyncTime = 10 * time.Hour

// New initializes and returns a new Cache.
func New(config *rest.Config, opts cache.Options) (cache.Cache, error) {
	opts, err := defaultOpts(config, opts)
	if err != nil {
		return nil, err
	}
	selectorsByGVK, err := convertToByGVK(opts.SelectorsByObject, opts.DefaultSelector, opts.Scheme)
	if err != nil {
		return nil, err
	}
	disableDeepCopyByGVK, err := convertToDisableDeepCopyByGVK(opts.UnsafeDisableDeepCopyByObject, opts.Scheme)
	if err != nil {
		return nil, err
	}
	transformByGVK, err := convertToByGVK(opts.TransformByObject, opts.DefaultTransform, opts.Scheme)
	if err != nil {
		return nil, err
	}
	transformByObj := internal.TransformFuncByObjectFromMap(transformByGVK)

	internalSelectorsByGVK := internal.SelectorsByGVK{}
	for gvk, selector := range selectorsByGVK {
		internalSelectorsByGVK[gvk] = internal.Selector(selector)
	}

	im := internal.NewInformersMap(config, opts.Scheme, opts.Mapper, *opts.Resync, opts.Namespace, internalSelectorsByGVK, disableDeepCopyByGVK, transformByObj)
	return &dynamicInformerCache{InformersMap: im}, nil
}

// BuilderWithOptions returns a Cache constructor that will build a cache
// honoring the options argument, this is useful to specify options like
// SelectorsByObject
// WARNING: If SelectorsByObject is specified, filtered out resources are not
// returned.
// WARNING: If UnsafeDisableDeepCopy is enabled, you must DeepCopy any object
// returned from cache get/list before mutating it.
func BuilderWithOptions(options cache.Options) NewCacheFunc {
	return func(config *rest.Config, inherited cache.Options) (cache.Cache, error) {
		var err error
		inherited, err = defaultOpts(config, inherited)
		if err != nil {
			return nil, err
		}
		options, err = defaultOpts(config, options)
		if err != nil {
			return nil, err
		}
		combined, err := inheritFrom(options, inherited)
		if err != nil {
			return nil, err
		}
		return New(config, *combined)
	}
}

func inheritFrom(options cache.Options, inherited cache.Options) (*cache.Options, error) {
	var (
		combined cache.Options
		err      error
	)
	combined.Scheme = combineScheme(inherited.Scheme, options.Scheme)
	combined.Mapper = selectMapper(inherited.Mapper, options.Mapper)
	combined.Resync = selectResync(inherited.Resync, options.Resync)
	combined.Namespace = selectNamespace(inherited.Namespace, options.Namespace)
	combined.SelectorsByObject, combined.DefaultSelector, err = combineSelectors(inherited, options, combined.Scheme)
	if err != nil {
		return nil, err
	}
	combined.UnsafeDisableDeepCopyByObject, err = combineUnsafeDeepCopy(inherited, options, combined.Scheme)
	if err != nil {
		return nil, err
	}
	combined.TransformByObject, combined.DefaultTransform, err = combineTransforms(inherited, options, combined.Scheme)
	if err != nil {
		return nil, err
	}
	return &combined, nil
}

func combineScheme(schemes ...*runtime.Scheme) *runtime.Scheme {
	var out *runtime.Scheme
	for _, sch := range schemes {
		if sch == nil {
			continue
		}
		for gvk, t := range sch.AllKnownTypes() {
			if out == nil {
				out = runtime.NewScheme()
			}
			out.AddKnownTypeWithName(gvk, reflect.New(t).Interface().(runtime.Object))
		}
	}
	return out
}

func selectMapper(def, override meta.RESTMapper) meta.RESTMapper {
	if override != nil {
		return override
	}
	return def
}

func selectResync(def, override *time.Duration) *time.Duration {
	if override != nil {
		return override
	}
	return def
}

func selectNamespace(def, override string) string {
	if override != "" {
		return override
	}
	return def
}

func combineSelectors(inherited, options cache.Options, scheme *runtime.Scheme) (cache.SelectorsByObject, cache.ObjectSelector, error) {
	// Selectors are combined via logical AND.
	//  - Combined label selector is a union of the selectors requirements from both sets of options.
	//  - Combined field selector uses fields.AndSelectors with the combined list of non-nil field selectors
	//    defined in both sets of options.
	//
	// There is a bunch of complexity here because we need to convert to SelectorsByGVK
	// to be able to match keys between options and inherited and then convert back to SelectorsByObject
	optionsSelectorsByGVK, err := convertToByGVK(options.SelectorsByObject, options.DefaultSelector, scheme)
	if err != nil {
		return nil, cache.ObjectSelector{}, err
	}
	inheritedSelectorsByGVK, err := convertToByGVK(inherited.SelectorsByObject, inherited.DefaultSelector, inherited.Scheme)
	if err != nil {
		return nil, cache.ObjectSelector{}, err
	}

	for gvk, inheritedSelector := range inheritedSelectorsByGVK {
		optionsSelectorsByGVK[gvk] = combineSelector(inheritedSelector, optionsSelectorsByGVK[gvk])
	}
	return convertToByObject(optionsSelectorsByGVK, scheme)
}

func combineSelector(selectors ...cache.ObjectSelector) cache.ObjectSelector {
	ls := make([]labels.Selector, 0, len(selectors))
	fs := make([]fields.Selector, 0, len(selectors))
	for _, s := range selectors {
		ls = append(ls, s.Label)
		fs = append(fs, s.Field)
	}
	return cache.ObjectSelector{
		Label: combineLabelSelectors(ls...),
		Field: combineFieldSelectors(fs...),
	}
}

func combineLabelSelectors(ls ...labels.Selector) labels.Selector {
	var combined labels.Selector
	for _, l := range ls {
		if l == nil {
			continue
		}
		if combined == nil {
			combined = labels.NewSelector()
		}
		reqs, _ := l.Requirements()
		combined = combined.Add(reqs...)
	}
	return combined
}

func combineFieldSelectors(fs ...fields.Selector) fields.Selector {
	nonNil := fs[:0]
	for _, f := range fs {
		if f == nil {
			continue
		}
		nonNil = append(nonNil, f)
	}
	if len(nonNil) == 0 {
		return nil
	}
	if len(nonNil) == 1 {
		return nonNil[0]
	}
	return fields.AndSelectors(nonNil...)
}

func combineUnsafeDeepCopy(inherited, options cache.Options, scheme *runtime.Scheme) (cache.DisableDeepCopyByObject, error) {
	// UnsafeDisableDeepCopyByObject is combined via precedence. Only if a value for a particular GVK is unset
	// in options will a value from inherited be used.
	optionsDisableDeepCopyByGVK, err := convertToDisableDeepCopyByGVK(options.UnsafeDisableDeepCopyByObject, options.Scheme)
	if err != nil {
		return nil, err
	}
	inheritedDisableDeepCopyByGVK, err := convertToDisableDeepCopyByGVK(inherited.UnsafeDisableDeepCopyByObject, inherited.Scheme)
	if err != nil {
		return nil, err
	}

	for gvk, inheritedDeepCopy := range inheritedDisableDeepCopyByGVK {
		if _, ok := optionsDisableDeepCopyByGVK[gvk]; !ok {
			if optionsDisableDeepCopyByGVK == nil {
				optionsDisableDeepCopyByGVK = map[schema.GroupVersionKind]bool{}
			}
			optionsDisableDeepCopyByGVK[gvk] = inheritedDeepCopy
		}
	}
	return convertToDisableDeepCopyByObject(optionsDisableDeepCopyByGVK, scheme)
}

func combineTransforms(inherited, options cache.Options, scheme *runtime.Scheme) (cache.TransformByObject, toolscache.TransformFunc, error) {
	// Transform functions are combined via chaining. If both inherited and options define a transform
	// function, the transform function from inherited will be called first, and the transform function from
	// options will be called second.
	optionsTransformByGVK, err := convertToByGVK(options.TransformByObject, options.DefaultTransform, options.Scheme)
	if err != nil {
		return nil, nil, err
	}
	inheritedTransformByGVK, err := convertToByGVK(inherited.TransformByObject, inherited.DefaultTransform, inherited.Scheme)
	if err != nil {
		return nil, nil, err
	}

	for gvk, inheritedTransform := range inheritedTransformByGVK {
		if optionsTransformByGVK == nil {
			optionsTransformByGVK = map[schema.GroupVersionKind]toolscache.TransformFunc{}
		}
		optionsTransformByGVK[gvk] = combineTransform(inheritedTransform, optionsTransformByGVK[gvk])
	}
	return convertToByObject(optionsTransformByGVK, scheme)
}

func combineTransform(inherited, current toolscache.TransformFunc) toolscache.TransformFunc {
	if inherited == nil {
		return current
	}
	if current == nil {
		return inherited
	}
	return func(in interface{}) (interface{}, error) {
		mid, err := inherited(in)
		if err != nil {
			return nil, err
		}
		return current(mid)
	}
}

func defaultOpts(config *rest.Config, opts cache.Options) (cache.Options, error) {
	// Use the default Kubernetes Scheme if unset
	if opts.Scheme == nil {
		opts.Scheme = scheme.Scheme
	}

	// Construct a new Mapper if unset
	if opts.Mapper == nil {
		var err error
		opts.Mapper, err = apiutil.NewDynamicRESTMapper(config)
		if err != nil {
			log.WithName("setup").Error(err, "Failed to get API Group-Resources")
			return opts, fmt.Errorf("could not create RESTMapper from config")
		}
	}

	// Default the resync period to 10 hours if unset
	if opts.Resync == nil {
		opts.Resync = &defaultResyncTime
	}
	return opts, nil
}

func convertToByGVK[T any](byObject map[client.Object]T, def T, scheme *runtime.Scheme) (map[schema.GroupVersionKind]T, error) {
	byGVK := map[schema.GroupVersionKind]T{}
	for object, value := range byObject {
		gvk, err := apiutil.GVKForObject(object, scheme)
		if err != nil {
			return nil, err
		}
		byGVK[gvk] = value
	}
	byGVK[schema.GroupVersionKind{}] = def
	return byGVK, nil
}

func convertToByObject[T any](byGVK map[schema.GroupVersionKind]T, scheme *runtime.Scheme) (map[client.Object]T, T, error) {
	var byObject map[client.Object]T
	def := byGVK[schema.GroupVersionKind{}]
	for gvk, value := range byGVK {
		if gvk == (schema.GroupVersionKind{}) {
			continue
		}
		obj, err := scheme.New(gvk)
		if err != nil {
			return nil, def, err
		}
		cObj, ok := obj.(client.Object)
		if !ok {
			return nil, def, fmt.Errorf("object %T for GVK %q does not implement client.Object", obj, gvk)
		}
		if byObject == nil {
			byObject = map[client.Object]T{}
		}
		byObject[cObj] = value
	}
	return byObject, def, nil
}

var _ client.Object = &ObjectAll{}

// ObjectAll is the argument to represent all objects' types.
type ObjectAll struct {
	client.Object
}

func convertToDisableDeepCopyByGVK(disableDeepCopyByObject cache.DisableDeepCopyByObject, scheme *runtime.Scheme) (internal.DisableDeepCopyByGVK, error) {
	disableDeepCopyByGVK := internal.DisableDeepCopyByGVK{}
	for obj, disable := range disableDeepCopyByObject {
		switch obj.(type) {
		case ObjectAll, *ObjectAll:
			disableDeepCopyByGVK[internal.GroupVersionKindAll] = disable
		default:
			gvk, err := apiutil.GVKForObject(obj, scheme)
			if err != nil {
				return nil, err
			}
			disableDeepCopyByGVK[gvk] = disable
		}
	}
	return disableDeepCopyByGVK, nil
}

func convertToDisableDeepCopyByObject(byGVK internal.DisableDeepCopyByGVK, scheme *runtime.Scheme) (cache.DisableDeepCopyByObject, error) {
	var byObject cache.DisableDeepCopyByObject
	for gvk, value := range byGVK {
		if byObject == nil {
			byObject = cache.DisableDeepCopyByObject{}
		}
		if gvk == (schema.GroupVersionKind{}) {
			byObject[ObjectAll{}] = value
			continue
		}
		obj, err := scheme.New(gvk)
		if err != nil {
			return nil, err
		}
		cObj, ok := obj.(client.Object)
		if !ok {
			return nil, fmt.Errorf("object %T for GVK %q does not implement client.Object", obj, gvk)
		}

		byObject[cObj] = value
	}
	return byObject, nil
}
