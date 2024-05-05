import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const mouseRaycaster = new THREE.Raycaster();
const clickRaycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Ensure `character` is accessible globally within this module or passed correctly
let character = null;

function setCharacter(model) {
    character = model;  // This sets the global character model reference.
}

function updateMouseRaycaster(camera, scene) {
    mouseRaycaster.setFromCamera(mouse, camera);
    const target = new THREE.Vector3();
    mouseRaycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), target);
    if (character) {
        character.lookAt(target);
    }
}

export { mouseRaycaster, clickRaycaster, mouse, updateMouseRaycaster, setCharacter };
