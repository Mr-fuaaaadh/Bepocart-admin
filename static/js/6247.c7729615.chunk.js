"use strict";(self.webpackChunkflexy=self.webpackChunkflexy||[]).push([[6247],{6247:(e,t,a)=>{a.r(t),a.d(t,{default:()=>P});var i=a(2791),r=a(1889),n=a(2903),o=a(7689),s=a(9347),c=a(4070),l=a(7621),d=a(9504),p=a(890),u=a(4721),m=a(8550),h=a(4518),g=a(697),x=a(8096),v=a(4925),Z=a(8406),y=a(3786),b=a(6161),f=a(184);const j=()=>{const{id:e}=(0,o.UO)(),[t,a]=(0,i.useState)({name:"",file:null,slug:"",category:"",discount:"",salePrice:"",price:"",description:"",shortDescription:"",type:""}),[j,P]=(0,i.useState)([]),[C,S]=(0,i.useState)(null),[w,D]=(0,i.useState)("success"),[I,T]=(0,i.useState)(!1),[k,M]=(0,i.useState)({}),[F,O]=(0,i.useState)(null);(0,i.useEffect)((()=>{(async()=>{try{const e=localStorage.getItem("token"),t=await n.Z.get("https://bepocart.in/admin/Bepocart-subcategories/",{headers:{Authorization:"".concat(e)}});P(t.data.data)}catch(e){q("Failed to fetch categories.",e)}})(),e&&(async()=>{try{const t=localStorage.getItem("token"),i=(await n.Z.get("https://bepocart.in/admin/Bepocart-product-update/".concat(e,"/"),{headers:{Authorization:"".concat(t)}})).data.data;a({name:i.name,slug:i.slug,category:i.category,salePrice:i.salePrice,price:i.price,discount:i.discount,description:i.description,shortDescription:i.short_description,type:i.type}),i.image&&O(i.image)}catch(t){console.error("Error fetching product details",t)}})()}),[e]);const N=e=>{const{name:i,value:r,files:n}=e.target;let o={...t,[i]:n?n[0]:r};if("slug"===i){const e=r.toLowerCase();o={...o,slug:e}}if("price"===i||"salePrice"===i){const e=((e,t)=>{const a=parseFloat(e),i=parseFloat(t);if(!isNaN(a)&&!isNaN(i)&&a>0)return((a-i)/a*100).toFixed(2);return""})(o.price,o.salePrice);o={...o,discount:e}}if("shortDescription"===i&&r.length>5e3)W("Short description cannot exceed 5000 characters.");else{if("file"===i&&n){const e=n[0];o={...o,file:e};const t=URL.createObjectURL(e);O(t)}a(o),M({...k,[i]:""})}},q=(e,t)=>{console.error(e,t),S(e),D("error"),T(!0)},L=e=>{S(e),D("success"),T(!0)},W=e=>{S(e),D("warning"),T(!0)},B=()=>{T(!1)};return(0,f.jsxs)("div",{children:[(0,f.jsx)(s.Z,{open:I,autoHideDuration:6e3,onClose:B,children:(0,f.jsx)(c.Z,{onClose:B,severity:w,sx:{width:"100%"},children:C})}),(0,f.jsx)(l.Z,{children:(0,f.jsxs)(d.Z,{children:[(0,f.jsx)(p.Z,{variant:"h5",component:"div",gutterBottom:!0,children:e?"Edit Product":"Add Product"}),(0,f.jsx)(u.Z,{sx:{mb:2}}),(0,f.jsxs)("form",{onSubmit:async i=>{i.preventDefault();const r=(()=>{let e={};return t.name||(e.name="Name is required"),t.slug||(e.slug="Slug is required"),t.category||(e.category="Category is required"),t.price||(e.price="Price is required"),t.salePrice||(e.salePrice="Sale price is required"),t.description||(e.description="Description is required"),t.shortDescription||(e.shortDescription="Short description is required"),t.type||(e.type="Type is required"),e})();if(Object.keys(r).length>0)M(r);else try{const i=new FormData;i.append("name",t.name),t.file&&i.append("image",t.file),i.append("slug",t.slug),i.append("category",t.category),i.append("price",t.price),i.append("salePrice",t.salePrice),i.append("discount",t.discount),i.append("description",t.description),i.append("short_description",t.shortDescription),i.append("type",t.type);const r=localStorage.getItem("token");let o;o=e?await n.Z.put("https://bepocart.in/admin/Bepocart-product-update/".concat(e,"/"),i,{headers:{"Content-Type":"multipart/form-data",Authorization:"".concat(r)}}):await n.Z.post("https://bepocart.in/admin/Bepocart-product/",i,{headers:{"Content-Type":"multipart/form-data",Authorization:"".concat(r)}}),L("Form submitted successfully!"),a({name:"",file:null,slug:"",category:"",discount:"",salePrice:"",price:"",description:"",shortDescription:"",type:""}),M({}),O(null)}catch(o){q("Failed to submit the form.",o)}},children:[(0,f.jsxs)(r.ZP,{container:!0,spacing:2,children:[(0,f.jsx)(r.ZP,{item:!0,xs:12,sm:6,children:(0,f.jsx)(m.Z,{name:"name",label:"Name",variant:"outlined",fullWidth:!0,sx:{mb:2},value:t.name,onChange:N,error:!!k.name,helperText:k.name})}),(0,f.jsxs)(r.ZP,{item:!0,xs:6,children:[(0,f.jsx)("input",{accept:"image/*",style:{display:"none"},id:"contained-button-file",multiple:!0,type:"file",name:"file",onChange:N}),(0,f.jsx)("label",{htmlFor:"contained-button-file",children:(0,f.jsx)(h.Z,{variant:"contained",color:"primary",component:"span",children:"Upload Image"})}),F&&(0,f.jsx)(g.Z,{sx:{mt:2},children:(0,f.jsx)("img",{src:F,alt:"Preview",style:{maxWidth:"20%",height:"auto"}})}),k.file&&(0,f.jsx)(p.Z,{variant:"body2",color:"error",children:k.file})]}),(0,f.jsx)(r.ZP,{item:!0,xs:12,sm:6,children:(0,f.jsx)(m.Z,{name:"slug",label:"Slug",variant:"outlined",fullWidth:!0,sx:{mb:2},value:t.slug,onChange:N,error:!!k.slug,helperText:k.slug})}),(0,f.jsx)(r.ZP,{item:!0,xs:12,sm:6,children:(0,f.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",sx:{mb:2},error:!!k.category,children:[(0,f.jsx)(v.Z,{children:"Category"}),(0,f.jsx)(Z.Z,{name:"category",value:t.category,onChange:N,label:"Category",children:j.map((e=>(0,f.jsx)(y.Z,{value:e.id,children:e.name},e.id)))}),(0,f.jsx)(b.Z,{children:k.category})]})}),(0,f.jsx)(r.ZP,{item:!0,xs:12,sm:6,children:(0,f.jsx)(m.Z,{name:"price",label:"Price",variant:"outlined",fullWidth:!0,sx:{mb:2},value:t.price,onChange:N,error:!!k.price,helperText:k.price})}),(0,f.jsx)(r.ZP,{item:!0,xs:12,sm:6,children:(0,f.jsx)(m.Z,{name:"salePrice",label:"Sale Price",variant:"outlined",fullWidth:!0,sx:{mb:2},value:t.salePrice,onChange:N,error:!!k.salePrice,helperText:k.salePrice})}),(0,f.jsx)(r.ZP,{item:!0,xs:12,sm:6,children:(0,f.jsx)(m.Z,{name:"discount",label:"Discount",variant:"outlined",fullWidth:!0,sx:{mb:2},value:t.discount,onChange:N,error:!!k.discount,helperText:k.discount})}),(0,f.jsx)(r.ZP,{item:!0,xs:12,sm:6,children:(0,f.jsxs)(x.Z,{fullWidth:!0,variant:"outlined",sx:{mb:2},error:!!k.type,children:[(0,f.jsx)(v.Z,{children:"Type"}),(0,f.jsxs)(Z.Z,{name:"type",value:t.type,onChange:N,label:"Type",children:[(0,f.jsx)(y.Z,{value:"single",children:"Single Product"}),(0,f.jsx)(y.Z,{value:"variant",children:"Variant Product"})]}),(0,f.jsx)(b.Z,{children:k.type})]})}),(0,f.jsx)(r.ZP,{item:!0,xs:12,children:(0,f.jsx)(m.Z,{name:"description",label:"Description",variant:"outlined",fullWidth:!0,multiline:!0,rows:4,sx:{mb:2},value:t.description,onChange:N,error:!!k.description,helperText:k.description})}),(0,f.jsx)(r.ZP,{item:!0,xs:12,children:(0,f.jsx)(m.Z,{name:"shortDescription",label:"Short Description",variant:"outlined",fullWidth:!0,multiline:!0,rows:2,sx:{mb:2},value:t.shortDescription,onChange:N,error:!!k.shortDescription,helperText:k.shortDescription})})]}),(0,f.jsx)(h.Z,{type:"submit",color:"primary",variant:"contained",sx:{mt:2},children:"Submit"})]})]})})]})},P=()=>(0,f.jsx)(r.ZP,{container:!0,spacing:0,children:(0,f.jsx)(r.ZP,{item:!0,lg:12,md:12,xs:12,children:(0,f.jsx)(j,{})})})},7621:(e,t,a)=>{a.d(t,{Z:()=>v});var i=a(7462),r=a(3366),n=a(2791),o=a(9278),s=a(4419),c=a(6934),l=a(1020),d=a(5527),p=a(5878),u=a(1217);function m(e){return(0,u.ZP)("MuiCard",e)}(0,p.Z)("MuiCard",["root"]);var h=a(184);const g=["className","raised"],x=(0,c.ZP)(d.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})((()=>({overflow:"hidden"}))),v=n.forwardRef((function(e,t){const a=(0,l.i)({props:e,name:"MuiCard"}),{className:n,raised:c=!1}=a,d=(0,r.Z)(a,g),p=(0,i.Z)({},a,{raised:c}),u=(e=>{const{classes:t}=e;return(0,s.Z)({root:["root"]},m,t)})(p);return(0,h.jsx)(x,(0,i.Z)({className:(0,o.Z)(u.root,n),elevation:c?8:void 0,ref:t,ownerState:p},d))}))},6014:(e,t,a)=>{a.d(t,{Z:()=>o,f:()=>n});var i=a(5878),r=a(1217);function n(e){return(0,r.ZP)("MuiListItemIcon",e)}const o=(0,i.Z)("MuiListItemIcon",["root","alignItemsFlexStart"])},9849:(e,t,a)=>{a.d(t,{L:()=>n,Z:()=>o});var i=a(5878),r=a(1217);function n(e){return(0,r.ZP)("MuiListItemText",e)}const o=(0,i.Z)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"])},3786:(e,t,a)=>{a.d(t,{Z:()=>w});var i=a(3366),r=a(7462),n=a(2791),o=a(9278),s=a(4419),c=a(4131),l=a(6934),d=a(5070),p=a(1020),u=a(6199),m=a(533),h=a(162),g=a(2071),x=a(133),v=a(6014),Z=a(9849),y=a(5878),b=a(1217);function f(e){return(0,b.ZP)("MuiMenuItem",e)}const j=(0,y.Z)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var P=a(184);const C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],S=(0,l.ZP)(m.Z,{shouldForwardProp:e=>(0,d.Z)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((e=>{let{theme:t,ownerState:a}=e;return(0,r.Z)({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:"1px solid ".concat((t.vars||t).palette.divider),backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},["&.".concat(j.selected)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity),["&.".concat(j.focusVisible)]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.focusOpacity,"))"):(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},["&.".concat(j.selected,":hover")]:{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / calc(").concat(t.vars.palette.action.selectedOpacity," + ").concat(t.vars.palette.action.hoverOpacity,"))"):(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?"rgba(".concat(t.vars.palette.primary.mainChannel," / ").concat(t.vars.palette.action.selectedOpacity,")"):(0,c.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)}},["&.".concat(j.focusVisible)]:{backgroundColor:(t.vars||t).palette.action.focus},["&.".concat(j.disabled)]:{opacity:(t.vars||t).palette.action.disabledOpacity},["& + .".concat(x.Z.root)]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},["& + .".concat(x.Z.inset)]:{marginLeft:52},["& .".concat(Z.Z.root)]:{marginTop:0,marginBottom:0},["& .".concat(Z.Z.inset)]:{paddingLeft:36},["& .".concat(v.Z.root)]:{minWidth:36}},!a.dense&&{[t.breakpoints.up("sm")]:{minHeight:"auto"}},a.dense&&(0,r.Z)({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,{["& .".concat(v.Z.root," svg")]:{fontSize:"1.25rem"}}))})),w=n.forwardRef((function(e,t){const a=(0,p.i)({props:e,name:"MuiMenuItem"}),{autoFocus:c=!1,component:l="li",dense:d=!1,divider:m=!1,disableGutters:x=!1,focusVisibleClassName:v,role:Z="menuitem",tabIndex:y,className:b}=a,j=(0,i.Z)(a,C),w=n.useContext(u.Z),D=n.useMemo((()=>({dense:d||w.dense||!1,disableGutters:x})),[w.dense,d,x]),I=n.useRef(null);(0,h.Z)((()=>{c&&I.current&&I.current.focus()}),[c]);const T=(0,r.Z)({},a,{dense:D.dense,divider:m,disableGutters:x}),k=(e=>{const{disabled:t,dense:a,divider:i,disableGutters:n,selected:o,classes:c}=e,l={root:["root",a&&"dense",t&&"disabled",!n&&"gutters",i&&"divider",o&&"selected"]},d=(0,s.Z)(l,f,c);return(0,r.Z)({},c,d)})(a),M=(0,g.Z)(I,t);let F;return a.disabled||(F=void 0!==y?y:-1),(0,P.jsx)(u.Z.Provider,{value:D,children:(0,P.jsx)(S,(0,r.Z)({ref:M,role:Z,tabIndex:F,component:l,focusVisibleClassName:(0,o.Z)(k.focusVisible,v),className:(0,o.Z)(k.root,b)},j,{ownerState:T,classes:k}))})}))}}]);
//# sourceMappingURL=6247.c7729615.chunk.js.map