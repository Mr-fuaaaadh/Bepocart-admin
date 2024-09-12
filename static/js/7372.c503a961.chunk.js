"use strict";(self.webpackChunkflexy=self.webpackChunkflexy||[]).push([[7372],{7372:(e,t,r)=>{r.r(t),r.d(t,{default:()=>v});var n=r(2791),o=r(697),s=r(7621),a=r(9504),i=r(890),l=r(2903),d=r(7689),c=r(9164),u=r(9836),h=r(6890),p=r(5855),m=r(3994),x=r(3382),f=r(184);const Z=()=>{const[e,t]=(0,n.useState)([]),[r,s]=(0,n.useState)({}),[a,Z]=(0,n.useState)(!0),[v,y]=(0,n.useState)(null),{id:j}=(0,d.UO)();(0,n.useEffect)((()=>{const e=parseInt(j);b(e)}),[j]);const b=async e=>{try{const r=localStorage.getItem("token"),n=await l.Z.get("https://bepocart.in/admin/Bepocart-Order-Item/".concat(e,"/"),{headers:{Authorization:"".concat(r)}});Array.isArray(n.data.data)?(t(n.data.data),s(n.data.order)):(console.error("Invalid data format:",n.data),y("Invalid data format received"))}catch(v){console.error("Error fetching products:",v),y("Error fetching orders")}finally{Z(!1)}},g=()=>e.reduce(((e,t)=>e+t.price*t.quantity),0).toFixed(2),w=parseFloat(r.total_amount)<500?60:0;return a?(0,f.jsx)(i.Z,{children:"Loading..."}):v?(0,f.jsxs)(i.Z,{children:["Error: ",v]}):(0,f.jsxs)(c.Z,{children:[(0,f.jsxs)(u.Z,{"aria-label":"simple table",children:[(0,f.jsx)(h.Z,{children:(0,f.jsxs)(p.Z,{children:[(0,f.jsx)(m.Z,{children:"ID"}),(0,f.jsx)(m.Z,{children:"PRODUCT"}),(0,f.jsx)(m.Z,{children:"SIZE"}),(0,f.jsx)(m.Z,{children:"PRICE"}),(0,f.jsx)(m.Z,{children:"TOTAL QUANTITY"}),(0,f.jsx)(m.Z,{children:"AMOUNT"})]})}),(0,f.jsx)(x.Z,{children:e.map(((e,t)=>{return(0,f.jsxs)(p.Z,{children:[(0,f.jsxs)(m.Z,{children:["#",t+1]}),(0,f.jsx)(m.Z,{children:(0,f.jsxs)(o.Z,{display:"flex",alignItems:"center",children:[(0,f.jsx)("img",{src:"".concat(e.productImage),style:{maxWidth:"50px",maxHeight:"50px",marginRight:"10px"}}),(0,f.jsxs)(i.Z,{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"150px",display:"flex",flexDirection:"column"},children:[(r=e.productName,n=20,r.length>n?r.substring(0,n)+"...":r),"none"!==e.offer_type&&(0,f.jsx)("span",{style:{marginTop:"4px",fontSize:"0.875rem",color:"green"},children:e.offer_type})]})]})}),(0,f.jsx)(m.Z,{children:e.size&&e.color?"".concat(e.size,", ").concat(e.color):e.size||e.color||"N/A"}),(0,f.jsxs)(m.Z,{children:["\u20b9",e.price," /-"]}),(0,f.jsx)(m.Z,{children:e.quantity}),(0,f.jsxs)(m.Z,{children:["\u20b9",e.quantity*e.price," /-"]})]},e.id);var r,n}))})]}),e.some((e=>"none"!==e.offer_type))&&(0,f.jsx)(o.Z,{mt:2,p:2,border:"1px dotted green",borderRadius:"4px",bgcolor:"#e8f5e9",display:"flex",justifyContent:"flex-start",children:(0,f.jsxs)(i.Z,{variant:"subtitle1",children:["Total Free Quantity : ",r.free_quantity]})}),(0,f.jsxs)(o.Z,{mt:7,display:"flex",justifyContent:"flex-end",children:[(0,f.jsxs)(o.Z,{mr:4,children:[(0,f.jsx)(i.Z,{variant:"subtitle1",children:"Subtotal :"}),(0,f.jsx)(i.Z,{variant:"subtitle1",children:"Discount :"}),(0,f.jsx)(i.Z,{variant:"subtitle1",children:"Shipping :"}),(0,f.jsx)(i.Z,{variant:"subtitle1",fontWeight:"bold",children:"Total :"}),(0,f.jsx)(i.Z,{variant:"subtitle1",children:"Status :"})]}),(0,f.jsxs)(o.Z,{children:[(0,f.jsxs)(i.Z,{variant:"subtitle1",children:["\u20b9",g()," /-"]}),(0,f.jsxs)(i.Z,{variant:"subtitle1",children:["\u20b9",g()-e.reduce(((e,t)=>e+t.salePrice*t.quantity),0).toFixed(2)," /-"]}),(0,f.jsxs)(i.Z,{variant:"subtitle1",children:["\u20b9",w.toFixed(2),"/-"]}),(0,f.jsxs)(i.Z,{variant:"subtitle1",fontWeight:"bold",children:["\u20b9",r.total_amount," /-"]}),(0,f.jsx)(i.Z,{variant:"subtitle1",color:"secondary",children:r.status})]})]})]})},v=()=>(0,f.jsx)(o.Z,{position:"relative",children:(0,f.jsx)(s.Z,{variant:"outlined",children:(0,f.jsxs)(a.Z,{children:[(0,f.jsx)(i.Z,{variant:"h3",children:"Order Products"}),(0,f.jsx)(o.Z,{sx:{overflowX:"auto",overflowY:"hidden",whiteSpace:"nowrap",maxWidth:"100%"},children:(0,f.jsx)(Z,{})})]})})})},9504:(e,t,r)=>{r.d(t,{Z:()=>f});var n=r(7462),o=r(3366),s=r(2791),a=r(9278),i=r(4419),l=r(6934),d=r(1020),c=r(5878),u=r(1217);function h(e){return(0,u.ZP)("MuiCardContent",e)}(0,c.Z)("MuiCardContent",["root"]);var p=r(184);const m=["className","component"],x=(0,l.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),f=s.forwardRef((function(e,t){const r=(0,d.i)({props:e,name:"MuiCardContent"}),{className:s,component:l="div"}=r,c=(0,o.Z)(r,m),u=(0,n.Z)({},r,{component:l}),f=(e=>{const{classes:t}=e;return(0,i.Z)({root:["root"]},h,t)})(u);return(0,p.jsx)(x,(0,n.Z)({as:l,className:(0,a.Z)(f.root,s),ownerState:u,ref:t},c))}))},7621:(e,t,r)=>{r.d(t,{Z:()=>Z});var n=r(7462),o=r(3366),s=r(2791),a=r(9278),i=r(4419),l=r(6934),d=r(1020),c=r(5527),u=r(5878),h=r(1217);function p(e){return(0,h.ZP)("MuiCard",e)}(0,u.Z)("MuiCard",["root"]);var m=r(184);const x=["className","raised"],f=(0,l.ZP)(c.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"}))),Z=s.forwardRef((function(e,t){const r=(0,d.i)({props:e,name:"MuiCard"}),{className:s,raised:l=!1}=r,c=(0,o.Z)(r,x),u=(0,n.Z)({},r,{raised:l}),h=(e=>{const{classes:t}=e;return(0,i.Z)({root:["root"]},p,t)})(u);return(0,m.jsx)(f,(0,n.Z)({className:(0,a.Z)(h.root,s),elevation:l?8:void 0,ref:t,ownerState:u},c))}))},9164:(e,t,r)=>{r.d(t,{Z:()=>g});var n=r(3366),o=r(7462),s=r(2791),a=r(831),i=r(1217),l=r(4419),d=r(1122),c=r(6083),u=r(1203),h=r(8809),p=r(184);const m=["className","component","disableGutters","fixed","maxWidth","classes"],x=(0,h.Z)(),f=(0,u.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t["maxWidth".concat((0,d.Z)(String(r.maxWidth)))],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),Z=e=>(0,c.Z)({props:e,name:"MuiContainer",defaultTheme:x});var v=r(4036),y=r(6934),j=r(1020);const b=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{createStyledComponent:t=f,useThemeProps:r=Z,componentName:c="MuiContainer"}=e,u=t((e=>{let{theme:t,ownerState:r}=e;return(0,o.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!r.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}})}),(e=>{let{theme:t,ownerState:r}=e;return r.fixed&&Object.keys(t.breakpoints.values).reduce(((e,r)=>{const n=r,o=t.breakpoints.values[n];return 0!==o&&(e[t.breakpoints.up(n)]={maxWidth:"".concat(o).concat(t.breakpoints.unit)}),e}),{})}),(e=>{let{theme:t,ownerState:r}=e;return(0,o.Z)({},"xs"===r.maxWidth&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},r.maxWidth&&"xs"!==r.maxWidth&&{[t.breakpoints.up(r.maxWidth)]:{maxWidth:"".concat(t.breakpoints.values[r.maxWidth]).concat(t.breakpoints.unit)}})})),h=s.forwardRef((function(e,t){const s=r(e),{className:h,component:x="div",disableGutters:f=!1,fixed:Z=!1,maxWidth:v="lg"}=s,y=(0,n.Z)(s,m),j=(0,o.Z)({},s,{component:x,disableGutters:f,fixed:Z,maxWidth:v}),b=((e,t)=>{const{classes:r,fixed:n,disableGutters:o,maxWidth:s}=e,a={root:["root",s&&"maxWidth".concat((0,d.Z)(String(s))),n&&"fixed",o&&"disableGutters"]};return(0,l.Z)(a,(e=>(0,i.ZP)(t,e)),r)})(j,c);return(0,p.jsx)(u,(0,o.Z)({as:x,ownerState:j,className:(0,a.Z)(b.root,h),ref:t},y))}));return h}({createStyledComponent:(0,y.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t["maxWidth".concat((0,v.Z)(String(r.maxWidth)))],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,j.i)({props:e,name:"MuiContainer"})}),g=b},1203:(e,t,r)=>{r.d(t,{Z:()=>v});var n=r(7462),o=r(3366),s=r(6649),a=r(7093),i=r(8809),l=r(104);const d=["ownerState"],c=["variants"],u=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function h(e){return"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e}const p=(0,i.Z)(),m=e=>e?e.charAt(0).toLowerCase()+e.slice(1):e;function x(e){let{defaultTheme:t,theme:r,themeId:n}=e;return o=r,0===Object.keys(o).length?t:r[n]||r;var o}function f(e){return e?(t,r)=>r[e]:null}function Z(e,t){let{ownerState:r}=t,s=(0,o.Z)(t,d);const a="function"===typeof e?e((0,n.Z)({ownerState:r},s)):e;if(Array.isArray(a))return a.flatMap((e=>Z(e,(0,n.Z)({ownerState:r},s))));if(a&&"object"===typeof a&&Array.isArray(a.variants)){const{variants:e=[]}=a;let t=(0,o.Z)(a,c);return e.forEach((e=>{let o=!0;"function"===typeof e.props?o=e.props((0,n.Z)({ownerState:r},s,r)):Object.keys(e.props).forEach((t=>{(null==r?void 0:r[t])!==e.props[t]&&s[t]!==e.props[t]&&(o=!1)})),o&&(Array.isArray(t)||(t=[t]),t.push("function"===typeof e.style?e.style((0,n.Z)({ownerState:r},s,r)):e.style))})),t}return a}const v=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{themeId:t,defaultTheme:r=p,rootShouldForwardProp:i=h,slotShouldForwardProp:d=h}=e,c=e=>(0,l.Z)((0,n.Z)({},e,{theme:x((0,n.Z)({},e,{defaultTheme:r,themeId:t}))}));return c.__mui_systemSx=!0,function(e){let l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,s.internal_processStyles)(e,(e=>e.filter((e=>!(null!=e&&e.__mui_systemSx)))));const{name:p,slot:v,skipVariantsResolver:y,skipSx:j,overridesResolver:b=f(m(v))}=l,g=(0,o.Z)(l,u),w=void 0!==y?y:v&&"Root"!==v&&"root"!==v||!1,S=j||!1;let C=h;"Root"===v||"root"===v?C=i:v?C=d:function(e){return"string"===typeof e&&e.charCodeAt(0)>96}(e)&&(C=void 0);const R=(0,s.default)(e,(0,n.Z)({shouldForwardProp:C,label:undefined},g)),k=e=>"function"===typeof e&&e.__emotion_real!==e||(0,a.P)(e)?o=>Z(e,(0,n.Z)({},o,{theme:x({theme:o.theme,defaultTheme:r,themeId:t})})):e,W=function(o){let s=k(o);for(var a=arguments.length,i=new Array(a>1?a-1:0),l=1;l<a;l++)i[l-1]=arguments[l];const d=i?i.map(k):[];p&&b&&d.push((e=>{const o=x((0,n.Z)({},e,{defaultTheme:r,themeId:t}));if(!o.components||!o.components[p]||!o.components[p].styleOverrides)return null;const s=o.components[p].styleOverrides,a={};return Object.entries(s).forEach((t=>{let[r,s]=t;a[r]=Z(s,(0,n.Z)({},e,{theme:o}))})),b(e,a)})),p&&!w&&d.push((e=>{var o;const s=x((0,n.Z)({},e,{defaultTheme:r,themeId:t}));return Z({variants:null==s||null==(o=s.components)||null==(o=o[p])?void 0:o.variants},(0,n.Z)({},e,{theme:s}))})),S||d.push(c);const u=d.length-i.length;if(Array.isArray(o)&&u>0){const e=new Array(u).fill("");s=[...o,...e],s.raw=[...o.raw,...e]}const h=R(s,...d);return e.muiName&&(h.muiName=e.muiName),h};return R.withConfig&&(W.withConfig=R.withConfig),W}}()},3073:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(8748);function o(e){const{theme:t,name:r,props:o}=e;return t&&t.components&&t.components[r]&&t.components[r].defaultProps?(0,n.Z)(t.components[r].defaultProps,o):o}},6083:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(3073),o=r(418);function s(e){let{props:t,name:r,defaultTheme:s,themeId:a}=e,i=(0,o.Z)(s);a&&(i=i[a]||i);return(0,n.Z)({theme:i,name:r,props:t})}}}]);
//# sourceMappingURL=7372.c503a961.chunk.js.map