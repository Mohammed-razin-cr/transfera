import{r as n}from"./vendor-react-B21H5sj2.js";var f={exports:{}},u={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c=n,_=Symbol.for("react.element"),d=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,m=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,y={key:!0,ref:!0,__self:!0,__source:!0};function p(e,r,t){var o,s={},i=null,a=null;t!==void 0&&(i=""+t),r.key!==void 0&&(i=""+r.key),r.ref!==void 0&&(a=r.ref);for(o in r)x.call(r,o)&&!y.hasOwnProperty(o)&&(s[o]=r[o]);if(e&&e.defaultProps)for(o in r=e.defaultProps,r)s[o]===void 0&&(s[o]=r[o]);return{$$typeof:_,type:e,key:i,ref:a,props:s,_owner:m.current}}u.Fragment=d;u.jsx=p;u.jsxs=p;f.exports=u;var v=f.exports;function P(e){const r=n.useRef(null);return r.current===null&&(r.current=e()),r.current}const l=n.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});try{require("@emotion/is-prop-valid").default}catch{}function O({children:e,isValidProp:r,...t}){t={...n.useContext(l),...t},t.isStatic=P(()=>t.isStatic);const o=n.useMemo(()=>t,[JSON.stringify(t.transition),t.transformPagePoint,t.reducedMotion]);return v.jsx(l.Provider,{value:o,children:e})}export{O as M,v as j};
