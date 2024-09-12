"use strict";(self.webpackChunkflexy=self.webpackChunkflexy||[]).push([[3977],{3977:(e,t,a)=>{a.r(t),a.d(t,{default:()=>Z});var n=a(2791),i=a(1889),s=a(2903),r=a(9347),o=a(4070),c=a(697),l=a(890),d=a(4721),p=a(9504),u=a(8550),m=a(8096),h=a(4925),x=a(8406),g=a(3786),v=a(4518),b=a(184);const f=()=>{const[e,t]=(0,n.useState)({name:"",file:null,slug:"",category:"",type:"single",discount:"",salePrice:"",price:"",description:"",shortDescription:"",offerStartDate:"",offerEndDate:""}),[a,f]=(0,n.useState)([]),[Z,y]=(0,n.useState)(null),[j,C]=(0,n.useState)(null),[P,S]=(0,n.useState)("success"),[w,I]=(0,n.useState)(!1),[D,F]=(0,n.useState)("");(0,n.useEffect)((()=>{(async()=>{try{const e=localStorage.getItem("token"),t=await s.Z.get("https://bepocart.in/admin/Bepocart-subcategories/",{headers:{Authorization:"".concat(e)}});f(t.data.data)}catch(e){S("error"),C("Failed to fetch categories."),I(!0)}})()}),[]);const O=a=>{const{name:n,value:i,files:s}=a.target;if("slug"===n){const a=i.toLowerCase();F(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a)?"":"Invalid slug. Only lowercase letters, numbers, and hyphens are allowed."),t({...e,[n]:a})}else{let a={...e,[n]:s?s[0]:i};if("file"===n&&s.length>0){const e=s[0];y(URL.createObjectURL(e)),a.file=e}if("price"===n||"salePrice"===n){const e=((e,t)=>{const a=parseFloat(e),n=parseFloat(t);if(!isNaN(a)&&!isNaN(n)&&a>0)return((a-n)/a*100).toFixed(2);return""})(a.price,a.salePrice);a={...a,discount:e}}if("shortDescription"===n&&i.length>5e3)return C("Short description cannot exceed 5000 characters."),S("error"),void I(!0);t(a)}},k=()=>{I(!1)};return(0,b.jsxs)("div",{children:[(0,b.jsx)(r.Z,{open:w,autoHideDuration:6e3,onClose:k,children:(0,b.jsx)(o.Z,{onClose:k,severity:P,sx:{width:"100%"},children:j})}),(0,b.jsx)(c.Z,{sx:{padding:"15px 30px"},display:"flex",alignItems:"center",children:(0,b.jsx)(c.Z,{flexGrow:1,children:(0,b.jsx)(l.Z,{sx:{fontSize:"18px",fontWeight:"500"},children:"Offer Product Form"})})}),(0,b.jsx)(d.Z,{}),(0,b.jsx)(p.Z,{sx:{padding:"30px"},children:(0,b.jsxs)("form",{onSubmit:async a=>{if(a.preventDefault(),D)return S("error"),C(D),void I(!0);const n=new FormData;n.append("name",e.name),e.file&&n.append("image",e.file),n.append("slug",e.slug),n.append("category",e.category),n.append("type",e.type),n.append("price",e.price),n.append("salePrice",e.salePrice),n.append("discount",e.discount),n.append("description",e.description),n.append("short_description",e.shortDescription);try{const e=localStorage.getItem("token");await s.Z.post("https://bepocart.in/admin/Bepocart-product/",n,{headers:{"Content-Type":"multipart/form-data",Authorization:"".concat(e)}});C("Form submitted successfully!"),S("success"),I(!0),t({name:"",file:null,slug:"",category:"",type:"single",discount:"",salePrice:"",price:"",description:"",shortDescription:""}),y(null)}catch(i){C("Failed to submit the form."),S("error"),I(!0),console.error("Error",i.response?i.response.data:i.message)}},children:[(0,b.jsxs)(i.ZP,{container:!0,spacing:2,children:[(0,b.jsx)(i.ZP,{item:!0,xs:12,sm:6,children:(0,b.jsx)(u.Z,{name:"name",label:"Name",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.name,onChange:O})}),(0,b.jsxs)(i.ZP,{item:!0,xs:12,sm:6,children:[(0,b.jsx)(u.Z,{name:"file",type:"file",variant:"outlined",fullWidth:!0,sx:{mb:2},onChange:O}),Z&&(0,b.jsxs)(c.Z,{sx:{mt:2},children:[(0,b.jsx)(l.Z,{variant:"body2",children:"Image Preview:"}),(0,b.jsx)("img",{src:Z,alt:"Preview",style:{maxWidth:"100px",maxHeight:"100px",borderRadius:"4px"}})]})]}),(0,b.jsx)(i.ZP,{item:!0,xs:12,sm:6,children:(0,b.jsx)(u.Z,{name:"slug",label:"Slug",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.slug,onChange:O,error:!!D,helperText:D})}),(0,b.jsx)(i.ZP,{item:!0,xs:12,sm:6,children:(0,b.jsxs)(m.Z,{fullWidth:!0,variant:"outlined",sx:{mb:2},children:[(0,b.jsx)(h.Z,{children:"Category"}),(0,b.jsx)(x.Z,{name:"category",value:e.category,onChange:O,label:"Category",children:a.map((e=>(0,b.jsx)(g.Z,{value:e.id,children:e.name},e.id)))})]})}),(0,b.jsx)(i.ZP,{item:!0,xs:12,sm:6,children:(0,b.jsx)(u.Z,{name:"price",label:"Price",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.price,onChange:O})}),(0,b.jsx)(i.ZP,{item:!0,xs:12,sm:6,children:(0,b.jsx)(u.Z,{name:"salePrice",label:"Sale Price",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.salePrice,onChange:O})}),(0,b.jsx)(i.ZP,{item:!0,xs:12,sm:6,children:(0,b.jsx)(u.Z,{name:"discount",label:"Discount",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.discount,onChange:O,disabled:!0})}),(0,b.jsx)(i.ZP,{item:!0,xs:12,sm:6,children:(0,b.jsxs)(m.Z,{fullWidth:!0,variant:"outlined",sx:{mb:2},children:[(0,b.jsx)(h.Z,{children:"Product Type"}),(0,b.jsxs)(x.Z,{name:"type",value:e.type,onChange:O,label:"Product Type",children:[(0,b.jsx)(g.Z,{value:"single",children:"Single"}),(0,b.jsx)(g.Z,{value:"variant",children:"Variant"})]})]})}),(0,b.jsx)(i.ZP,{item:!0,xs:12,children:(0,b.jsx)(u.Z,{name:"description",label:"Description",variant:"outlined",fullWidth:!0,multiline:!0,rows:4,sx:{mb:2},value:e.description,onChange:O})}),(0,b.jsx)(i.ZP,{item:!0,xs:12,children:(0,b.jsx)(u.Z,{name:"shortDescription",label:"Short Description",variant:"outlined",fullWidth:!0,multiline:!0,rows:2,sx:{mb:2},value:e.shortDescription,onChange:O})})]}),(0,b.jsx)(v.Z,{type:"submit",color:"primary",variant:"contained",sx:{mt:2},children:"Submit"})]})})]})},Z=()=>(0,b.jsx)(i.ZP,{container:!0,spacing:0,children:(0,b.jsx)(i.ZP,{item:!0,lg:12,md:12,xs:12,children:(0,b.jsx)(f,{})})})},6014:(e,t,a)=>{a.d(t,{Z:()=>r,f:()=>s});var n=a(5878),i=a(1217);function s(e){return(0,i.ZP)("MuiListItemIcon",e)}const r=(0,n.Z)("MuiListItemIcon",["root","alignItemsFlexStart"])},9849:(e,t,a)=>{a.d(t,{L:()=>s,Z:()=>r});var n=a(5878),i=a(1217);function s(e){return(0,i.ZP)("MuiListItemText",e)}const r=(0,n.Z)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"])},3786:(e,t,a)=>{a.d(t,{Z:()=>w});var n=a(3366),i=a(7462),s=a(2791),r=a(9278),o=a(4419),c=a(4131),l=a(6934),d=a(5070),p=a(1020),u=a(6199),m=a(533),h=a(162),x=a(2071),g=a(133),v=a(6014),b=a(9849),f=a(5878),Z=a(1217);function y(e){return(0,Z.ZP)("MuiMenuItem",e)}const j=(0,f.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var C=a(184);const P=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],S=(0,l.ZP)(m.Z,{shouldForwardProp:e=>(0,d.Z)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((e=>{let{theme:t,ownerState:a}=e;return(0,i.Z)({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:"1px solid ".concat((t.vars||t).palette.divider),backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},["&.".concat(j.selected)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity),["&.".concat(j.focusVisible)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.focusOpacity,"))"):(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},["&.".concat(j.selected,":hover")]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.hoverOpacity,"))"):(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)}},["&.".concat(j.focusVisible)]:{backgroundColor:(t.vars||t).palette.action.focus},["&.".concat(j.disabled)]:{opacity:(t.vars||t).palette.action.disabledOpacity},["& + .".concat(g.Z.root)]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},["& + .".concat(g.Z.inset)]:{marginLeft:52},["& .".concat(b.Z.root)]:{marginTop:0,marginBottom:0},["& .".concat(b.Z.inset)]:{paddingLeft:36},["& .".concat(v.Z.root)]:{minWidth:36}},!a.dense&&{[t.breakpoints.up("sm")]:{minHeight:"auto"}},a.dense&&(0,i.Z)({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,{["& .".concat(v.Z.root," svg")]:{fontSize:"1.25rem"}}))})),w=s.forwardRef((function(e,t){const a=(0,p.i)({props:e,name:"MuiMenuItem"}),{autoFocus:c=!1,component:l="li",dense:d=!1,divider:m=!1,disableGutters:g=!1,focusVisibleClassName:v,role:b="menuitem",tabIndex:f,className:Z}=a,j=(0,n.Z)(a,P),w=s.useContext(u.Z),I=s.useMemo((()=>({dense:d||w.dense||!1,disableGutters:g})),[w.dense,d,g]),D=s.useRef(null);(0,h.Z)((()=>{c&&D.current&&D.current.focus()}),[c]);const F=(0,i.Z)({},a,{dense:I.dense,divider:m,disableGutters:g}),O=(e=>{const{disabled:t,dense:a,divider:n,disableGutters:s,selected:r,classes:c}=e,l={root:["root",a&&"dense",t&&"disabled",!s&&"gutters",n&&"divider",r&&"selected"]},d=(0,o.Z)(l,y,c);return(0,i.Z)({},c,d)})(a),k=(0,x.Z)(D,t);let M;return a.disabled||(M=void 0!==f?f:-1),(0,C.jsx)(u.Z.Provider,{value:I,children:(0,C.jsx)(S,(0,i.Z)({ref:k,role:b,tabIndex:M,component:l,focusVisibleClassName:(0,r.Z)(O.focusVisible,v),className:(0,r.Z)(O.root,Z)},j,{ownerState:F,classes:O}))})}))}}]);
//# sourceMappingURL=3977.1151befb.chunk.js.map