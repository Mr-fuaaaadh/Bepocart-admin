"use strict";(self.webpackChunkflexy=self.webpackChunkflexy||[]).push([[4129],{4129:(e,s,a)=>{a.r(s),a.d(s,{default:()=>Z});var r=a(2791),t=a(1889),n=a(2903),i=a(9347),o=a(4070),l=a(7621),d=a(697),m=a(890),u=a(4721),c=a(9504),x=a(8550),f=a(4518),p=a(184);const h=()=>{const[e,s]=(0,r.useState)({username:"",email:"",firstName:"",lastName:"",password:"",confirmPassword:""}),[a,t]=(0,r.useState)(!1),[h,Z]=(0,r.useState)("success"),[v,w]=(0,r.useState)(""),j=(e,s)=>{"clickaway"!==s&&t(!1)},b=a=>{s({...e,[a.target.name]:a.target.value})};return(0,p.jsxs)("div",{children:[(0,p.jsx)(i.Z,{open:a,autoHideDuration:6e3,onClose:j,children:(0,p.jsx)(o.Z,{onClose:j,severity:h,sx:{width:"100%"},children:v})}),(0,p.jsxs)(l.Z,{variant:"outlined",sx:{p:0},children:[(0,p.jsx)(d.Z,{sx:{padding:"15px 30px"},display:"flex",alignItems:"center",children:(0,p.jsx)(d.Z,{flexGrow:1,children:(0,p.jsx)(m.Z,{sx:{fontSize:"18px",fontWeight:"500"},children:"Admin Form"})})}),(0,p.jsx)(u.Z,{}),(0,p.jsx)(c.Z,{sx:{padding:"30px"},children:(0,p.jsxs)("form",{onSubmit:a=>{if(a.preventDefault(),e.password!==e.confirmPassword)return Z("error"),w("Passwords do not match"),void t(!0);n.Z.post("https://bepocart.in/admin/register/",{username:e.username,email:e.email,first_name:e.firstName,last_name:e.lastName,password:e.password,password_confirm:e.confirmPassword}).then((e=>{Z("success"),w("Form submitted successfully"),t(!0),s({username:"",email:"",firstName:"",lastName:"",password:"",confirmPassword:""})})).catch((e=>{Z("error"),w("Error submitting form"),t(!0)}))},children:[(0,p.jsx)(x.Z,{name:"username",label:"Username",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.username,onChange:b}),(0,p.jsx)(x.Z,{name:"email",label:"Email",type:"email",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.email,onChange:b}),(0,p.jsx)(x.Z,{name:"firstName",label:"First Name",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.firstName,onChange:b}),(0,p.jsx)(x.Z,{name:"lastName",label:"Last Name",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.lastName,onChange:b}),(0,p.jsx)(x.Z,{name:"password",label:"Password",type:"password",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.password,onChange:b}),(0,p.jsx)(x.Z,{name:"confirmPassword",label:"Retype Password",type:"password",variant:"outlined",fullWidth:!0,sx:{mb:2},value:e.confirmPassword,onChange:b}),(0,p.jsx)(f.Z,{type:"submit",color:"primary",variant:"contained",children:"Submit"})]})})]})]})},Z=()=>(0,p.jsx)(t.ZP,{container:!0,spacing:0,children:(0,p.jsx)(t.ZP,{item:!0,lg:12,md:12,xs:12,children:(0,p.jsx)(h,{})})})},7621:(e,s,a)=>{a.d(s,{Z:()=>Z});var r=a(7462),t=a(3366),n=a(2791),i=a(9278),o=a(4419),l=a(6934),d=a(1020),m=a(5527),u=a(5878),c=a(1217);function x(e){return(0,c.ZP)("MuiCard",e)}(0,u.Z)("MuiCard",["root"]);var f=a(184);const p=["className","raised"],h=(0,l.ZP)(m.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,s)=>s.root})((()=>({overflow:"hidden"}))),Z=n.forwardRef((function(e,s){const a=(0,d.i)({props:e,name:"MuiCard"}),{className:n,raised:l=!1}=a,m=(0,t.Z)(a,p),u=(0,r.Z)({},a,{raised:l}),c=(e=>{const{classes:s}=e;return(0,o.Z)({root:["root"]},x,s)})(u);return(0,f.jsx)(h,(0,r.Z)({className:(0,i.Z)(c.root,n),elevation:l?8:void 0,ref:s,ownerState:u},m))}))}}]);
//# sourceMappingURL=4129.51024141.chunk.js.map