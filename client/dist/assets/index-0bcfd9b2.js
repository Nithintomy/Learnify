import{_ as a}from"./index-1752692e.js";async function n(t,o=!0){await t.addInteractor("particlesCollisions",async i=>{const{Collider:r}=await a(()=>import("./Collider-63037dbb.js"),["assets/Collider-63037dbb.js","assets/index-1752692e.js","assets/index-9f4e675e.css","assets/ParticlesInteractorBase-7b2895e9.js"]);return new r(i)},o)}export{n as loadParticlesCollisionsInteraction};