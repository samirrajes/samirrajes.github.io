import*as i from"https://unpkg.com/three/build/three.module.js";import{GLTFLoader as u}from"https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();function p(){const e=document.createElement("link");e.href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap",e.rel="stylesheet",document.head.appendChild(e)}function w(){p();const e=document.createElement("div");e.className="typewriter",e.style.fontFamily='"Courier Prime", monospace',e.style.color="black",e.style.fontSize="14px",e.style.textAlign="center",e.style.width="100%",e.style.position="absolute",e.style.top="150px",e.style.left="0",e.style.padding="20px 0";const o=document.createElement("h1");o.textContent="</portfolio under construction...>",e.appendChild(o),document.body.appendChild(e)}document.addEventListener("DOMContentLoaded",()=>{w();const e=new i.Scene,o=new i.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3);o.position.z=10;const s=new i.WebGLRenderer({antialias:!0});s.setSize(window.innerWidth,window.innerHeight),s.setClearColor(16777215),document.body.appendChild(s.domElement);const a=new i.AmbientLight(16777215);e.add(a);const t=new i.DirectionalLight(16777215,1);t.position.set(0,10,5),e.add(t),window.addEventListener("resize",()=>{o.aspect=window.innerWidth/window.innerHeight,o.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight)},!1);const n=new i.Raycaster,c=new i.Vector2;document.addEventListener("mousemove",r=>{c.x=r.clientX/window.innerWidth*2-1,c.y=-(r.clientY/window.innerHeight)*2+1},!1);const f=new u;let d;f.load("./assets/okmodel1.glb",r=>{d=r.scene,d.castShadow=!0,d.scale.set(2,2,2),d.position.set(0,0,-20),e.add(d)},void 0,r=>console.error(r));const m=new i.Plane(new i.Vector3(0,0,1),0);function l(){if(requestAnimationFrame(l),d){n.setFromCamera(c,o);const r=new i.Vector3;n.ray.intersectPlane(m,r),d.lookAt(r)}s.render(e,o)}l()});