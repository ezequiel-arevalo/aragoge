import{f as x,u as d,o as f,j as t,c as b,a as h,m as g,r as p}from"./index-lEbmf-oQ.js";import{F as j,a as y,u as v,b as C,I as l}from"./index.esm-DGnoUCTv.js";import{u as F,F as N}from"./chunk-56K2BSAJ-C1F0EJp_.js";import{B as m}from"./chunk-PULVB27S-nomYcOrH.js";import"./chunk-UVUR7MCU-CxvTbftA.js";function S(a,e=[]){const s=Object.assign({},a);for(const o of e)o in s&&delete s[o];return s}var T=["h","minH","height","minHeight"],u=x((a,e)=>{const s=d("Textarea",a),{className:o,rows:n,...r}=f(a),i=F(r),c=n?S(s,T):s;return t.jsx(b.textarea,{ref:e,rows:n,...i,className:h("chakra-textarea",o),__css:c})});u.displayName="Textarea";const w=({register:a,name:e,errors:s,label:o,textareaProps:n={},disabled:r=!1})=>t.jsxs(N,{isInvalid:!!s[e],className:"mb-4",children:[o&&t.jsx(j,{htmlFor:e,children:o}),t.jsx(u,{disabled:r,id:e,...a(e,{required:`El ${o} es obligatorio!`}),...n,className:"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md max-h-[300px]"}),s[e]&&t.jsx(y,{children:s[e].message})]}),E=g.create(m),I=()=>{const a=v(),[e,s]=p.useState(!1),{register:o,handleSubmit:n,formState:{errors:r},reset:i}=C(),c=k=>{s(!0),setTimeout(()=>{s(!1),i(),a({title:"Formulario enviado.",description:"Tu mensaje ha sido enviado correctamente.",status:"success",duration:5e3,isClosable:!0,position:"bottom-right"})},1500)};return t.jsx(E,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.5},display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",children:t.jsxs(m,{as:"form",onSubmit:n(c),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",className:"space-y-4 w-full max-w-3xl p-10",children:[t.jsx(l,{type:"email",name:"email",label:"Correo Electrónico",register:o,errors:r}),t.jsx(l,{type:"text",name:"subject",label:"Asunto",register:o,errors:r}),t.jsx(w,{name:"message",label:"Mensaje",register:o,errors:r}),t.jsx("button",{type:"submit",disabled:e,className:"w-full mt-4 bg-button-hover-bg text-button-default-text hover:bg-button-hover-bg hover:text-button-hover-text active:bg-button-active-bg active:text-button-active-text py-2 px-4 rounded",children:e?"Enviando...":"Enviar"})]})})},L=()=>t.jsxs("section",{className:"mx-auto text-center p-4",children:[t.jsx("h2",{className:"text-h2 font-semibold font-title py-4",children:"Contact Page"}),t.jsx(I,{})]});export{L as default};