import{_ as n}from"./index-2742dddc.js";async function e(a,o=!0){const{PolygonDrawer:t}=await n(()=>import("./PolygonDrawer-0fec4b5d.js"),["assets/PolygonDrawer-0fec4b5d.js","assets/PolygonDrawerBase-c9fdbe51.js","assets/index-2742dddc.js","assets/index-cad292fc.css"]);await a.addShape("polygon",new t,o)}async function i(a,o=!0){const{TriangleDrawer:t}=await n(()=>import("./TriangleDrawer-0bc8034a.js"),["assets/TriangleDrawer-0bc8034a.js","assets/PolygonDrawerBase-c9fdbe51.js","assets/index-2742dddc.js","assets/index-cad292fc.css"]);await a.addShape("triangle",new t,o)}async function _(a,o=!0){await e(a,o),await i(a,o)}export{e as loadGenericPolygonShape,_ as loadPolygonShape,i as loadTriangleShape};