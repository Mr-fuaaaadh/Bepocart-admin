"use strict";(self.webpackChunkflexy=self.webpackChunkflexy||[]).push([[8477],{3641:(e,n,o)=>{o.r(n),o.d(n,{default:()=>w});var t=o(2791),r=o(697),i=o(7621),l=o(9504),c=o(890),a=o(4518),s=o(2903),d=o(7689),u=o(1087),h=o(9836),x=o(6890),p=o(5855),Z=o(3994),m=o(3382),v=o(1918),f=o(7),j=o(2058),S=o(1137),g=o(184);const y=()=>{const[e,n]=(0,t.useState)([]),[o,i]=(0,t.useState)(!0),[l,y]=(0,t.useState)(null),w=(0,d.s0)();(0,t.useEffect)((()=>{b()}),[]);const b=async()=>{try{i(!0);const e=localStorage.getItem("token"),o=await s.Z.get("https://bepocart.in/admin/Bepocart-promotion-coupen-views/",{headers:{Authorization:"".concat(e)}});n(o.data)}catch(l){console.error("Error fetching products:",l),!l.response||401!==l.response.status&&403!==l.response.status?y("Error fetching products"):w("/login")}finally{i(!1)}};return o?(0,g.jsx)("div",{children:"Loading..."}):l?(0,g.jsx)("div",{children:l}):(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(h.Z,{"aria-label":"simple table",sx:{mt:3,whiteSpace:"nowrap"},children:[(0,g.jsx)(x.Z,{children:(0,g.jsxs)(p.Z,{children:[(0,g.jsx)(Z.Z,{children:"ID"}),(0,g.jsx)(Z.Z,{children:"COUPEN"}),(0,g.jsx)(Z.Z,{children:"TYPE"}),(0,g.jsx)(Z.Z,{children:"DISCOUNT"}),(0,g.jsx)(Z.Z,{children:"START DATE"}),(0,g.jsx)(Z.Z,{children:"END DATE"}),(0,g.jsx)(Z.Z,{children:"STATUS"}),(0,g.jsx)(Z.Z,{children:"PRODUCTS"}),(0,g.jsx)(Z.Z,{children:"CATEGORY"}),(0,g.jsx)(Z.Z,{children:"ACTIONS"})]})}),(0,g.jsx)(m.Z,{children:e.map((e=>(0,g.jsxs)(p.Z,{children:[(0,g.jsx)(Z.Z,{children:e.id}),(0,g.jsx)(Z.Z,{children:(0,g.jsx)(r.Z,{sx:{maxWidth:"150px"},children:(0,g.jsx)(u.rU,{to:"/product-image-form/".concat(e.id,"/"),style:{textDecoration:"none",color:"inherit"},children:(0,g.jsx)(c.Z,{variant:"body1",noWrap:!0,children:e.code})})})}),(0,g.jsx)(Z.Z,{children:(0,g.jsx)(r.Z,{sx:{maxWidth:"150px"},children:(0,g.jsx)(c.Z,{variant:"body1",noWrap:!0,children:e.coupon_type})})}),(0,g.jsx)(Z.Z,{children:(0,g.jsx)(r.Z,{sx:{maxWidth:"150px"},children:(0,g.jsx)(c.Z,{variant:"body1",noWrap:!0,children:e.discount})})}),(0,g.jsx)(Z.Z,{children:(0,g.jsx)(r.Z,{sx:{maxWidth:"150px"},children:(0,g.jsx)(c.Z,{variant:"body1",noWrap:!0,children:e.start_date})})}),(0,g.jsx)(Z.Z,{children:(0,g.jsx)(r.Z,{sx:{maxWidth:"150px"},children:(0,g.jsx)(c.Z,{variant:"body1",noWrap:!0,children:e.end_date})})}),(0,g.jsx)(Z.Z,{children:(0,g.jsx)(v.Z,{sx:{pl:"4px",pr:"4px",backgroundColor:"In Active"===e.status?"red":"Active"===e.status?f.Z[500]:e.pbg,color:"#fff"},size:"small",label:e.status})}),(0,g.jsx)(Z.Z,{children:(0,g.jsx)(r.Z,{sx:{maxWidth:"150px"},children:(0,g.jsx)(c.Z,{variant:"body1",noWrap:!0,children:e.discount_product?e.discount_product:"No products"})})}),(0,g.jsx)(Z.Z,{children:(0,g.jsx)(r.Z,{sx:{maxWidth:"150px"},children:(0,g.jsx)(c.Z,{variant:"body1",noWrap:!0,children:e.discount_category})})}),(0,g.jsxs)(Z.Z,{children:[(0,g.jsx)(a.Z,{variant:"contained",color:"primary",component:u.rU,to:"/update-coupon/".concat(e.id,"/"),sx:{mr:1},startIcon:(0,g.jsx)(j.Z,{}),children:"Update"}),(0,g.jsx)(a.Z,{variant:"contained",color:"error",onClick:()=>(async e=>{try{const n=localStorage.getItem("token");await s.Z.delete("https://bepocart.in/admin/Bepocart-promotion-coupen-delete/".concat(e,"/"),{headers:{Authorization:"".concat(n)}}),b()}catch(l){console.error("Error deleting coupon:",l),y("Error deleting coupon")}})(e.id),startIcon:(0,g.jsx)(S.Z,{}),children:"Delete"})]})]},e.id)))})]})})},w=()=>(0,g.jsxs)(r.Z,{position:"relative",children:[(0,g.jsx)(i.Z,{variant:"outlined",children:(0,g.jsxs)(l.Z,{children:[(0,g.jsx)(c.Z,{variant:"h3",children:"Coupens Table"}),(0,g.jsx)(r.Z,{sx:{overflowX:"auto",overflowY:"auto",whiteSpace:"nowrap",maxWidth:"100%",maxHeight:"800px"},children:(0,g.jsx)(y,{})})]})}),(0,g.jsx)(a.Z,{component:u.rU,to:"/coupen-form/",variant:"contained",color:"success",sx:{position:"absolute",top:0,left:0,mt:2,ml:125},children:"Add coupon"})]})},9504:(e,n,o)=>{o.d(n,{Z:()=>m});var t=o(7462),r=o(3366),i=o(2791),l=o(9278),c=o(4419),a=o(6934),s=o(1020),d=o(5878),u=o(1217);function h(e){return(0,u.ZP)("MuiCardContent",e)}(0,d.Z)("MuiCardContent",["root"]);var x=o(184);const p=["className","component"],Z=(0,a.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,n)=>n.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),m=i.forwardRef((function(e,n){const o=(0,s.i)({props:e,name:"MuiCardContent"}),{className:i,component:a="div"}=o,d=(0,r.Z)(o,p),u=(0,t.Z)({},o,{component:a}),m=(e=>{const{classes:n}=e;return(0,c.Z)({root:["root"]},h,n)})(u);return(0,x.jsx)(Z,(0,t.Z)({as:a,className:(0,l.Z)(m.root,i),ownerState:u,ref:n},d))}))},6189:(e,n,o)=>{o.d(n,{Z:()=>j});var t=o(7462),r=o(2791),i=o(3366),l=o(9278),c=o(4419),a=o(4036),s=o(1020),d=o(6934),u=o(5878),h=o(1217);function x(e){return(0,h.ZP)("MuiSvgIcon",e)}(0,u.Z)("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);var p=o(184);const Z=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],m=(0,d.ZP)("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:o}=e;return[n.root,"inherit"!==o.color&&n["color".concat((0,a.Z)(o.color))],n["fontSize".concat((0,a.Z)(o.fontSize))]]}})((e=>{let{theme:n,ownerState:o}=e;var t,r,i,l,c,a,s,d,u,h,x,p,Z;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:o.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:null==(t=n.transitions)||null==(r=t.create)?void 0:r.call(t,"fill",{duration:null==(i=n.transitions)||null==(i=i.duration)?void 0:i.shorter}),fontSize:{inherit:"inherit",small:(null==(l=n.typography)||null==(c=l.pxToRem)?void 0:c.call(l,20))||"1.25rem",medium:(null==(a=n.typography)||null==(s=a.pxToRem)?void 0:s.call(a,24))||"1.5rem",large:(null==(d=n.typography)||null==(u=d.pxToRem)?void 0:u.call(d,35))||"2.1875rem"}[o.fontSize],color:null!=(h=null==(x=(n.vars||n).palette)||null==(x=x[o.color])?void 0:x.main)?h:{action:null==(p=(n.vars||n).palette)||null==(p=p.action)?void 0:p.active,disabled:null==(Z=(n.vars||n).palette)||null==(Z=Z.action)?void 0:Z.disabled,inherit:void 0}[o.color]}})),v=r.forwardRef((function(e,n){const o=(0,s.i)({props:e,name:"MuiSvgIcon"}),{children:d,className:u,color:h="inherit",component:v="svg",fontSize:f="medium",htmlColor:j,inheritViewBox:S=!1,titleAccess:g,viewBox:y="0 0 24 24"}=o,w=(0,i.Z)(o,Z),b=r.isValidElement(d)&&"svg"===d.type,C=(0,t.Z)({},o,{color:h,component:v,fontSize:f,instanceFontSize:e.fontSize,inheritViewBox:S,viewBox:y,hasSvgAsChild:b}),A={};S||(A.viewBox=y);const z=(e=>{const{color:n,fontSize:o,classes:t}=e,r={root:["root","inherit"!==n&&"color".concat((0,a.Z)(n)),"fontSize".concat((0,a.Z)(o))]};return(0,c.Z)(r,x,t)})(C);return(0,p.jsxs)(m,(0,t.Z)({as:v,className:(0,l.Z)(z.root,u),focusable:"false",color:j,"aria-hidden":!g||void 0,role:g?"img":void 0,ref:n},A,w,b&&d.props,{ownerState:C,children:[b?d.props.children:d,g?(0,p.jsx)("title",{children:g}):null]}))}));v.muiName="SvgIcon";const f=v;function j(e,n){function o(o,r){return(0,p.jsx)(f,(0,t.Z)({"data-testid":"".concat(n,"Icon"),ref:r},o,{children:e}))}return o.muiName=f.muiName,r.memo(r.forwardRef(o))}},3199:(e,n,o)=>{o.d(n,{Z:()=>t});const t=o(2254).Z},6966:(e,n,o)=>{o.d(n,{Z:()=>r});var t=o(2791);const r=function(e,n){var o,r;return t.isValidElement(e)&&-1!==n.indexOf(null!=(o=e.type.muiName)?o:null==(r=e.type)||null==(r=r._payload)||null==(r=r.value)?void 0:r.muiName)}},8301:(e,n,o)=>{o.d(n,{Z:()=>t});const t=o(4913).Z},7602:(e,n,o)=>{o.d(n,{Z:()=>t});const t=o(5202).Z},4556:(e,n,o)=>{o.d(n,{Z:()=>t});const t=o(8637).Z},162:(e,n,o)=>{o.d(n,{Z:()=>t});const t=o(2876).Z},7384:(e,n,o)=>{o.d(n,{Z:()=>t});const t=o(8252).Z},7874:(e,n,o)=>{function t(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return n.reduce(((e,n)=>null==n?e:function(){for(var o=arguments.length,t=new Array(o),r=0;r<o;r++)t[r]=arguments[r];e.apply(this,t),n.apply(this,t)}),(()=>{}))}o.d(n,{Z:()=>t})},2254:(e,n,o)=>{function t(e){let n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:166;function t(){for(var t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i];clearTimeout(n),n=setTimeout((()=>{e.apply(this,r)}),o)}return t.clear=()=>{clearTimeout(n)},t}o.d(n,{Z:()=>t})},4913:(e,n,o)=>{function t(e){return e&&e.ownerDocument||document}o.d(n,{Z:()=>t})},5202:(e,n,o)=>{o.d(n,{Z:()=>r});var t=o(4913);function r(e){return(0,t.Z)(e).defaultView||window}},8637:(e,n,o)=>{o.d(n,{Z:()=>r});var t=o(2791);function r(e){let{controlled:n,default:o,name:r,state:i="value"}=e;const{current:l}=t.useRef(void 0!==n),[c,a]=t.useState(o);return[l?n:c,t.useCallback((e=>{l||a(e)}),[])]}},8252:(e,n,o)=>{var t;o.d(n,{Z:()=>c});var r=o(2791);let i=0;const l=(t||(t=o.t(r,2)))["useId".toString()];function c(e){if(void 0!==l){const n=l();return null!=e?e:n}return function(e){const[n,o]=r.useState(e),t=e||n;return r.useEffect((()=>{null==n&&(i+=1,o("mui-".concat(i)))}),[n]),t}(e)}}}]);
//# sourceMappingURL=8477.8fe2e4e0.chunk.js.map