import{s as o,_ as r}from"./index-bfb5f8df.js";class s{constructor(){this.quantity=2}load(t){if(!t)return;const e=t.quantity;e!==void 0&&(this.quantity=o(e))}}async function u(n,t=!0){await n.addInteractor("externalRemove",async e=>{const{Remover:a}=await r(()=>import("./Remover-c2119db3.js"),["assets/Remover-c2119db3.js","assets/ExternalInteractorBase-029fb1b6.js","assets/index-bfb5f8df.js","assets/index-9f4e675e.css"]);return new a(e)},t)}export{s as Remove,u as loadExternalRemoveInteraction};