import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

import { createTypewriterMessage } from './notice.js';

document.addEventListener('DOMContentLoaded', () => {
    createTypewriterMessage();
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    // Resize event handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    // Raycaster setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    document.addEventListener('mousemove', event => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }, false);

    // Model loading
    const loader = new GLTFLoader();
    let character;
    loader.load('./assets/okmodel1.glb', gltf => {
        character = gltf.scene;
        character.castShadow = true;
        character.scale.set(2, 2, 2);
        character.position.set(0, 0, -20);
        scene.add(character);
    }, undefined, error => console.error(error));

    // Plane for raycaster
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (character) {
            raycaster.setFromCamera(mouse, camera);
            const target = new THREE.Vector3();
            raycaster.ray.intersectPlane(planeZ, target);
            character.lookAt(target);
        }
        renderer.render(scene, camera);
    }
    animate();
});