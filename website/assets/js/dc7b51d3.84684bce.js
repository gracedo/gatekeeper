"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9708],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return d}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,h=u["".concat(l,".").concat(d)]||u[d]||c[d]||s;return n?a.createElement(h,i(i({ref:t},m),{},{components:n})):a.createElement(h,i({ref:t},m))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,i=new Array(s);i[0]=u;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<s;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4045:function(e,t,n){n.r(t),n.d(t,{assets:function(){return m},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return c}});var a=n(7462),r=n(3366),s=(n(7294),n(3905)),i=["components"],o={id:"constrainttemplates",title:"Constraint Templates"},l=void 0,p={unversionedId:"constrainttemplates",id:"version-v3.9.x/constrainttemplates",title:"Constraint Templates",description:"ConstraintTemplates define a way to validate some set of Kubernetes objects in Gatekeeper's Kubernetes admission controller.  They are made of two main elements:",source:"@site/versioned_docs/version-v3.9.x/constrainttemplates.md",sourceDirName:".",slug:"/constrainttemplates",permalink:"/gatekeeper/website/docs/v3.9.x/constrainttemplates",draft:!1,editUrl:"https://github.com/open-policy-agent/gatekeeper/edit/master/website/versioned_docs/version-v3.9.x/constrainttemplates.md",tags:[],version:"v3.9.x",frontMatter:{id:"constrainttemplates",title:"Constraint Templates"},sidebar:"docs",previous:{title:"Mutation",permalink:"/gatekeeper/website/docs/v3.9.x/mutation"},next:{title:"External Data",permalink:"/gatekeeper/website/docs/v3.9.x/externaldata"}},m={},c=[{value:"<code>v1</code> Constraint Template",id:"v1-constraint-template",level:2},{value:"Why implement this change?",id:"why-implement-this-change",level:2}],u={toc:c};function d(e){var t=e.components,n=(0,r.Z)(e,i);return(0,s.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"ConstraintTemplates define a way to validate some set of Kubernetes objects in Gatekeeper's Kubernetes ",(0,s.kt)("a",{parentName:"p",href:"https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/"},"admission controller"),".  They are made of two main elements:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("a",{parentName:"li",href:"https://www.openpolicyagent.org/docs/latest/#rego"},"Rego")," code that defines a policy violation"),(0,s.kt)("li",{parentName:"ol"},"The schema of the accompanying ",(0,s.kt)("inlineCode",{parentName:"li"},"Constraint")," object, which represents an instantiation of a ",(0,s.kt)("inlineCode",{parentName:"li"},"ConstraintTemplate"))),(0,s.kt)("h2",{id:"v1-constraint-template"},(0,s.kt)("inlineCode",{parentName:"h2"},"v1")," Constraint Template"),(0,s.kt)("p",null,"In release version 3.6.0, Gatekeeper included the ",(0,s.kt)("inlineCode",{parentName:"p"},"v1")," version of ",(0,s.kt)("inlineCode",{parentName:"p"},"ConstraintTemplate"),".  Unlike past versions of ",(0,s.kt)("inlineCode",{parentName:"p"},"ConstraintTemplate"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"v1")," requires the Constraint schema section to be ",(0,s.kt)("a",{parentName:"p",href:"https://kubernetes.io/blog/2019/06/20/crd-structural-schema/"},"structural"),"."),(0,s.kt)("p",null,"Structural schemas have a variety of ",(0,s.kt)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#specifying-a-structural-schema"},"requirements"),".  One such requirement is that the ",(0,s.kt)("inlineCode",{parentName:"p"},"type")," field be defined for each level of the schema."),(0,s.kt)("p",null,"For example, users of Gatekeeper may recognize the ",(0,s.kt)("inlineCode",{parentName:"p"},"k8srequiredlabels")," ConstraintTemplate, defined here in version ",(0,s.kt)("inlineCode",{parentName:"p"},"v1beta1"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: templates.gatekeeper.sh/v1beta1\nkind: ConstraintTemplate\nmetadata:\n  name: k8srequiredlabels\nspec:\n  crd:\n    spec:\n      names:\n        kind: K8sRequiredLabels\n      validation:\n        # Schema for the `parameters` field\n        openAPIV3Schema:\n          properties:\n            labels:\n              type: array\n              items:\n                type: string\n  targets:\n    - target: admission.k8s.gatekeeper.sh\n      rego: |\n        package k8srequiredlabels\n\n        violation[{"msg": msg, "details": {"missing_labels": missing}}] {\n          provided := {label | input.review.object.metadata.labels[label]}\n          required := {label | label := input.parameters.labels[_]}\n          missing := required - provided\n          count(missing) > 0\n          msg := sprintf("you must provide labels: %v", [missing])\n        }\n')),(0,s.kt)("p",null,"The ",(0,s.kt)("inlineCode",{parentName:"p"},"parameters")," field schema (",(0,s.kt)("inlineCode",{parentName:"p"},"spec.crd.spec.validation.openAPIV3Schema"),") is ",(0,s.kt)("em",{parentName:"p"},"not")," structural.  Notably, it is missing the ",(0,s.kt)("inlineCode",{parentName:"p"},"type:")," declaration:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"openAPIV3Schema:\n  # missing type\n  properties:\n    labels:\n      type: array\n      items:\n        type: string\n")),(0,s.kt)("p",null,"This schema is ",(0,s.kt)("em",{parentName:"p"},"invalid")," by default in a ",(0,s.kt)("inlineCode",{parentName:"p"},"v1")," ConstraintTemplate.  Adding the ",(0,s.kt)("inlineCode",{parentName:"p"},"type")," information makes the schema valid:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},"openAPIV3Schema:\n  type: object\n  properties:\n    labels:\n      type: array\n      items:\n        type: string\n")),(0,s.kt)("p",null,"For more information on valid types in JSONSchemas, see the ",(0,s.kt)("a",{parentName:"p",href:"https://json-schema.org/understanding-json-schema/reference/type.html"},"JSONSchema documentation"),"."),(0,s.kt)("h2",{id:"why-implement-this-change"},"Why implement this change?"),(0,s.kt)("p",null,"Structural schemas are required in version ",(0,s.kt)("inlineCode",{parentName:"p"},"v1")," of ",(0,s.kt)("inlineCode",{parentName:"p"},"CustomResourceDefinition")," resources, which underlie ConstraintTemplates.  Requiring the same in ConstraintTemplates puts Gatekeeper in line with the overall direction of Kubernetes."),(0,s.kt)("p",null,"Beyond this alignment, structural schemas yield significant usability improvements. The schema of a ConstraintTemplate's associated Constraint is both more visible and type validated."),(0,s.kt)("p",null,"As the data types of Constraint fields are defined in the ConstraintTemplate, the API server will reject a Constraint with an incorrect ",(0,s.kt)("inlineCode",{parentName:"p"},"parameters")," field. Previously, the API server would ingest it and simply not pass those ",(0,s.kt)("inlineCode",{parentName:"p"},"parameters")," to Gatekeeper.  This experience was confusing for users, and is noticeably improved by structural schemas."),(0,s.kt)("p",null,"For example, see this incorrectly defined ",(0,s.kt)("inlineCode",{parentName:"p"},"k8srequiredlabels")," Constraint:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sRequiredLabels\nmetadata:\n  name: ns-must-have-gk\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Namespace"]\n  parameters:\n    # Note that "labels" is now contained in an array item, rather than an object key under "parameters"\n    - labels: ["gatekeeper"]\n')),(0,s.kt)("p",null,"In a ",(0,s.kt)("inlineCode",{parentName:"p"},"v1beta1")," ConstraintTemplate, this Constraint would be ingested successfully.  However, it would not work.  The creation of a new namespace, ",(0,s.kt)("inlineCode",{parentName:"p"},"foobar"),", would succeed, even in the absence of the ",(0,s.kt)("inlineCode",{parentName:"p"},"gatekeeper")," label:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"$ kubectl create ns foobar\nnamespace/foobar created\n")),(0,s.kt)("p",null,"This is incorrect.  We'd expect this to fail:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl create ns foobar\nError from server ([ns-must-have-gk] you must provide labels: {"gatekeeper"}): admission webhook "validation.gatekeeper.sh" denied the request: [ns-must-have-gk] you must provide labels: {"gatekeeper"}\n')),(0,s.kt)("p",null,"The structural schema requirement ",(0,s.kt)("em",{parentName:"p"},"prevents this mistake"),".  The aforementioned ",(0,s.kt)("inlineCode",{parentName:"p"},"type: object")," declaration would prevent the API server from accepting the incorrect ",(0,s.kt)("inlineCode",{parentName:"p"},"k8srequiredlabels")," Constraint."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},'# Apply the Constraint with incorrect parameters schema\n$ cat << EOF | kubectl apply -f -\napiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sRequiredLabels\nmetadata:\n  name: ns-must-have-gk\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Namespace"]\n  parameters:\n    # Note that "labels" is now an array item, rather than an object\n    - labels: ["gatekeeper"]\nEOF\nThe K8sRequiredLabels "ns-must-have-gk" is invalid: spec.parameters: Invalid value: "array": spec.parameters in body must be of type object: "array"\n')),(0,s.kt)("p",null,"Fixing the incorrect ",(0,s.kt)("inlineCode",{parentName:"p"},"parameters")," section would then yield a successful ingestion and a working Constraint."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},'$ cat << EOF | kubectl apply -f -\napiVersion: constraints.gatekeeper.sh/v1beta1\nkind: K8sRequiredLabels\nmetadata:\n  name: ns-must-have-gk\nspec:\n  match:\n    kinds:\n      - apiGroups: [""]\n        kinds: ["Namespace"]\n  parameters:\n    labels: ["gatekeeper"]\nEOF\nk8srequiredlabels.constraints.gatekeeper.sh/ns-must-have-gk created\n')),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},'$ kubectl create ns foobar\nError from server ([ns-must-have-gk] you must provide labels: {"gatekeeper"}): admission webhook "validation.gatekeeper.sh" denied the request: [ns-must-have-gk] you must provide labels: {"gatekeeper"}\n')))}d.isMDXComponent=!0}}]);