"use strict";(self.webpackChunkflexy=self.webpackChunkflexy||[]).push([[740],{3814:(e,r,t)=>{t.r(r),t.d(r,{default:()=>b});var n=t(2791),a=t(1087),o=t(697),s=t(7621),i=t(9504),l=t(890),c=t(4518),d=t(2903),h=t(7689),u=t(3239),Z=t(9836),x=t(6890),v=t(5855),m=t(3994),p=t(3382),f=t(5289),j=t(5661),g=t(9157),k=t(7123),y=t(7247),C=t(1286),S=t(184);const w=()=>{const[e,r]=(0,n.useState)([]),[t,a]=(0,n.useState)(null),[s,i]=(0,n.useState)(!1),[w,b]=(0,n.useState)(!0),[M,P]=(0,n.useState)(null),N=(0,h.s0)();(0,n.useEffect)((()=>{R()}),[]);const R=async()=>{b(!0),P(null);try{const e=localStorage.getItem("token"),t=await d.Z.get("https://bepocart.in/admin/Bepocart-Blogs/",{headers:{Authorization:"".concat(e)}});Array.isArray(t.data.data)?r(t.data.data):P("Invalid data format received")}catch(M){!M.response||401!==M.response.status&&403!==M.response.status?P("Error fetching banners"):N("/login")}finally{b(!1)}},D=()=>{a(null),i(!1)},[I,z]=(0,n.useState)([]);return(0,S.jsxs)(S.Fragment,{children:[w?(0,S.jsx)(o.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center",height:"200px"},children:(0,S.jsx)(u.Z,{})}):M?(0,S.jsx)(l.Z,{variant:"body1",color:"error",children:M}):(0,S.jsxs)(Z.Z,{"aria-label":"simple table",sx:{mt:3,whiteSpace:"nowrap"},children:[(0,S.jsx)(x.Z,{children:(0,S.jsxs)(v.Z,{children:[(0,S.jsx)(m.Z,{children:"Id"}),(0,S.jsx)(m.Z,{children:"Name"}),(0,S.jsx)(m.Z,{children:"Image"}),(0,S.jsx)(m.Z,{children:"Content"}),(0,S.jsx)(m.Z,{children:"Delete"}),(0,S.jsx)(m.Z,{children:"Update"})]})}),(0,S.jsx)(p.Z,{children:e.map((e=>{return(0,S.jsxs)(v.Z,{children:[(0,S.jsx)(m.Z,{children:e.id}),(0,S.jsx)(m.Z,{children:(0,S.jsx)(o.Z,{children:(0,S.jsx)(l.Z,{variant:"h6",children:e.title})})}),(0,S.jsx)(m.Z,{children:(0,S.jsx)("img",{src:"".concat(e.image),alt:e.name,style:{maxWidth:"70px",maxHeight:"70px"}})}),(0,S.jsx)(m.Z,{children:(0,S.jsxs)(o.Z,{children:[I.includes(e.id)?(0,S.jsx)(l.Z,{variant:"body1",children:e.content}):(0,S.jsx)(l.Z,{variant:"body1",children:(r=e.content,t=100,r.length>t?"".concat(r.substring(0,t),"..."):r)}),e.content.length>100&&(0,S.jsx)(c.Z,{color:"primary",size:"small",onClick:()=>{return r=e.id,void(I.includes(r)?z(I.filter((e=>e!==r))):z([...I,r]));var r},children:I.includes(e.id)?"Read Less":"Read More"})]})}),(0,S.jsx)(m.Z,{children:(0,S.jsxs)(c.Z,{variant:"contained",color:"error",onClick:()=>{return r=e.id,a(r),void i(!0);var r},children:[(0,S.jsx)(y.Z,{})," Delete"]})}),(0,S.jsx)(m.Z,{children:(0,S.jsx)(c.Z,{variant:"contained",onClick:()=>{return r=e.id,void N("/blog-update/".concat(r,"/"));var r},startIcon:(0,S.jsx)(C.Z,{}),children:"Update"})})]},e.id);var r,t}))})]}),(0,S.jsxs)(f.Z,{open:s,onClose:D,children:[(0,S.jsx)(j.Z,{children:"Confirm Delete"}),(0,S.jsx)(g.Z,{children:(0,S.jsx)(l.Z,{variant:"body1",children:"Are you sure you want to delete this product?"})}),(0,S.jsxs)(k.Z,{children:[(0,S.jsx)(c.Z,{onClick:D,children:"Cancel"}),(0,S.jsx)(c.Z,{onClick:async()=>{try{const n=localStorage.getItem("token");await d.Z.delete("https://bepocart.in/admin/Bepocart-Blog-delete/".concat(t,"/"),{headers:{Authorization:"".concat(n)}}),r(e.filter((e=>e.id!==t))),i(!1)}catch(M){P("Error deleting product")}},variant:"contained",color:"error",children:"Confirm"})]})]})]})},b=()=>(0,S.jsxs)(o.Z,{position:"relative",children:[(0,S.jsx)(s.Z,{variant:"outlined",children:(0,S.jsxs)(i.Z,{children:[(0,S.jsx)(l.Z,{variant:"h3",children:"Blog Table"}),(0,S.jsx)(o.Z,{sx:{overflowX:"auto",overflowY:"hidden",whiteSpace:"nowrap",maxWidth:"100%"},children:(0,S.jsx)(w,{})})]})}),(0,S.jsx)(c.Z,{component:a.rU,to:"/blog-form/",variant:"contained",color:"success",sx:{position:"absolute",top:0,left:0,mt:2,ml:125},children:"Add Blog"})]})},1286:(e,r,t)=>{var n=t(4836);r.Z=void 0;var a=n(t(5649)),o=t(184),s=(0,a.default)((0,o.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");r.Z=s},9504:(e,r,t)=>{t.d(r,{Z:()=>m});var n=t(7462),a=t(3366),o=t(2791),s=t(9278),i=t(4419),l=t(6934),c=t(1020),d=t(5878),h=t(1217);function u(e){return(0,h.ZP)("MuiCardContent",e)}(0,d.Z)("MuiCardContent",["root"]);var Z=t(184);const x=["className","component"],v=(0,l.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,r)=>r.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),m=o.forwardRef((function(e,r){const t=(0,c.i)({props:e,name:"MuiCardContent"}),{className:o,component:l="div"}=t,d=(0,a.Z)(t,x),h=(0,n.Z)({},t,{component:l}),m=(e=>{const{classes:r}=e;return(0,i.Z)({root:["root"]},u,r)})(h);return(0,Z.jsx)(v,(0,n.Z)({as:l,className:(0,s.Z)(m.root,o),ownerState:h,ref:r},d))}))},7621:(e,r,t)=>{t.d(r,{Z:()=>p});var n=t(7462),a=t(3366),o=t(2791),s=t(9278),i=t(4419),l=t(6934),c=t(1020),d=t(5527),h=t(5878),u=t(1217);function Z(e){return(0,u.ZP)("MuiCard",e)}(0,h.Z)("MuiCard",["root"]);var x=t(184);const v=["className","raised"],m=(0,l.ZP)(d.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,r)=>r.root})((()=>({overflow:"hidden"}))),p=o.forwardRef((function(e,r){const t=(0,c.i)({props:e,name:"MuiCard"}),{className:o,raised:l=!1}=t,d=(0,a.Z)(t,v),h=(0,n.Z)({},t,{raised:l}),u=(e=>{const{classes:r}=e;return(0,i.Z)({root:["root"]},Z,r)})(h);return(0,x.jsx)(m,(0,n.Z)({className:(0,s.Z)(u.root,o),elevation:l?8:void 0,ref:r,ownerState:h},d))}))},3239:(e,r,t)=>{t.d(r,{Z:()=>I});var n=t(168),a=t(3366),o=t(7462),s=t(2791),i=t(9278),l=t(4419),c=t(2554),d=t(4036),h=t(1020),u=t(6934),Z=t(5878),x=t(1217);function v(e){return(0,x.ZP)("MuiCircularProgress",e)}(0,Z.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m,p,f,j,g=t(184);const k=["className","color","disableShrink","size","style","thickness","value","variant"];let y,C,S,w;const b=44,M=(0,c.F4)(y||(y=m||(m=(0,n.Z)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),P=(0,c.F4)(C||(C=p||(p=(0,n.Z)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),N=(0,u.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[t.variant],r["color".concat((0,d.Z)(t.color))]]}})((e=>{let{ownerState:r,theme:t}=e;return(0,o.Z)({display:"inline-block"},"determinate"===r.variant&&{transition:t.transitions.create("transform")},"inherit"!==r.color&&{color:(t.vars||t).palette[r.color].main})}),(e=>{let{ownerState:r}=e;return"indeterminate"===r.variant&&(0,c.iv)(S||(S=f||(f=(0,n.Z)(["\n      animation: "," 1.4s linear infinite;\n    "]))),M)})),R=(0,u.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),D=(0,u.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.circle,r["circle".concat((0,d.Z)(t.variant))],t.disableShrink&&r.circleDisableShrink]}})((e=>{let{ownerState:r,theme:t}=e;return(0,o.Z)({stroke:"currentColor"},"determinate"===r.variant&&{transition:t.transitions.create("stroke-dashoffset")},"indeterminate"===r.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(e=>{let{ownerState:r}=e;return"indeterminate"===r.variant&&!r.disableShrink&&(0,c.iv)(w||(w=j||(j=(0,n.Z)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),P)})),I=s.forwardRef((function(e,r){const t=(0,h.i)({props:e,name:"MuiCircularProgress"}),{className:n,color:s="primary",disableShrink:c=!1,size:u=40,style:Z,thickness:x=3.6,value:m=0,variant:p="indeterminate"}=t,f=(0,a.Z)(t,k),j=(0,o.Z)({},t,{color:s,disableShrink:c,size:u,thickness:x,value:m,variant:p}),y=(e=>{const{classes:r,variant:t,color:n,disableShrink:a}=e,o={root:["root",t,"color".concat((0,d.Z)(n))],svg:["svg"],circle:["circle","circle".concat((0,d.Z)(t)),a&&"circleDisableShrink"]};return(0,l.Z)(o,v,r)})(j),C={},S={},w={};if("determinate"===p){const e=2*Math.PI*((b-x)/2);C.strokeDasharray=e.toFixed(3),w["aria-valuenow"]=Math.round(m),C.strokeDashoffset="".concat(((100-m)/100*e).toFixed(3),"px"),S.transform="rotate(-90deg)"}return(0,g.jsx)(N,(0,o.Z)({className:(0,i.Z)(y.root,n),style:(0,o.Z)({width:u,height:u},S,Z),ownerState:j,ref:r,role:"progressbar"},w,f,{children:(0,g.jsx)(R,{className:y.svg,ownerState:j,viewBox:"".concat(22," ").concat(22," ").concat(b," ").concat(b),children:(0,g.jsx)(D,{className:y.circle,style:C,ownerState:j,cx:b,cy:b,r:(b-x)/2,fill:"none",strokeWidth:x})})}))}))},6966:(e,r,t)=>{t.d(r,{Z:()=>a});var n=t(2791);const a=function(e,r){var t,a;return n.isValidElement(e)&&-1!==r.indexOf(null!=(t=e.type.muiName)?t:null==(a=e.type)||null==(a=a._payload)||null==(a=a.value)?void 0:a.muiName)}}}]);
//# sourceMappingURL=740.7831494c.chunk.js.map