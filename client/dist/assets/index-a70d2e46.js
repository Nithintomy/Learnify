import{_ as e}from"./index-bfb5f8df.js";class a{constructor(){this.factor=3,this.radius=200}load(r){r&&(r.factor!==void 0&&(this.factor=r.factor),r.radius!==void 0&&(this.radius=r.radius))}}async function s(t,r=!0){await t.addInteractor("externalSlow",async o=>{const{Slower:i}=await e(()=>import("./Slower-deb11fe6.js"),["assets/Slower-deb11fe6.js","assets/ExternalInteractorBase-029fb1b6.js","assets/index-bfb5f8df.js","assets/index-9f4e675e.css"]);return new i(o)},r)}export{a as Slow,s as loadExternalSlowInteraction};