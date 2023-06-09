"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5938],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(n),m=a,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7213:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return u}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],c={id:"sync",title:"Replicating Data"},s=void 0,l={unversionedId:"sync",id:"version-v3.12.x/sync",title:"Replicating Data",description:'The "Config" resource must be named config for it to be reconciled by Gatekeeper. Gatekeeper will ignore the resource if you do not name it config.',source:"@site/versioned_docs/version-v3.12.x/sync.md",sourceDirName:".",slug:"/sync",permalink:"/gatekeeper/website/docs/sync",draft:!1,editUrl:"https://github.com/open-policy-agent/gatekeeper/edit/master/website/versioned_docs/version-v3.12.x/sync.md",tags:[],version:"v3.12.x",frontMatter:{id:"sync",title:"Replicating Data"},sidebar:"docs",previous:{title:"Handling Constraint Violations",permalink:"/gatekeeper/website/docs/violations"},next:{title:"Exempting Namespaces",permalink:"/gatekeeper/website/docs/exempt-namespaces"}},p={},u=[],d={toc:u};function m(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},'The "Config" resource must be named ',(0,o.kt)("inlineCode",{parentName:"p"},"config")," for it to be reconciled by Gatekeeper. Gatekeeper will ignore the resource if you do not name it ",(0,o.kt)("inlineCode",{parentName:"p"},"config"),".")),(0,o.kt)("p",null,"Some constraints are impossible to write without access to more state than just the object under test. For example, it is impossible to know if an ingress's hostname is unique among all ingresses unless a rule has access to all other ingresses. To make such rules possible, we enable syncing of data into OPA."),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"/gatekeeper/website/docs/audit"},"audit")," feature does not require replication by default. However, when the ",(0,o.kt)("inlineCode",{parentName:"p"},"audit-from-cache")," flag is set to true, the audit informer cache will be used as the source-of-truth for audit queries; thus, an object must first be cached before it can be audited for constraint violations."),(0,o.kt)("p",null,"Kubernetes data can be replicated into the audit cache via the sync config resource. Currently resources defined in ",(0,o.kt)("inlineCode",{parentName:"p"},"syncOnly")," will be synced into OPA. Updating ",(0,o.kt)("inlineCode",{parentName:"p"},"syncOnly")," should dynamically update what objects are synced. Below is an example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yaml"},'apiVersion: config.gatekeeper.sh/v1alpha1\nkind: Config\nmetadata:\n  name: config\n  namespace: "gatekeeper-system"\nspec:\n  sync:\n    syncOnly:\n      - group: ""\n        version: "v1"\n        kind: "Namespace"\n      - group: ""\n        version: "v1"\n        kind: "Pod"\n')),(0,o.kt)("p",null,"You can install this config with the following command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/master/demo/basic/sync.yaml\n")),(0,o.kt)("p",null,"Once data is synced into OPA, rules can access the cached data under the ",(0,o.kt)("inlineCode",{parentName:"p"},"data.inventory")," document."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"data.inventory")," document has the following format:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"For cluster-scoped objects: ",(0,o.kt)("inlineCode",{parentName:"li"},"data.inventory.cluster[<groupVersion>][<kind>][<name>]"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Example referencing the Gatekeeper namespace: ",(0,o.kt)("inlineCode",{parentName:"li"},'data.inventory.cluster["v1"].Namespace["gatekeeper"]')))),(0,o.kt)("li",{parentName:"ul"},"For namespace-scoped objects: ",(0,o.kt)("inlineCode",{parentName:"li"},"data.inventory.namespace[<namespace>][groupVersion][<kind>][<name>]"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Example referencing the Gatekeeper pod: ",(0,o.kt)("inlineCode",{parentName:"li"},'data.inventory.namespace["gatekeeper"]["v1"]["Pod"]["gatekeeper-controller-manager-d4c98b788-j7d92"]'))))))}m.isMDXComponent=!0}}]);