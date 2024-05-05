import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

import { createTypewriterMessage } from './notice.js';

document.addEventListener('DOMContentLoaded', () => {
    createTypewriterMessage();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10; // Ensure the camera is positioned to view the scene
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Raycaster and Mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // GLTF Loader
    const characterloader = new GLTFLoader();
    let character;

    characterloader.load('./assets/okmodel1.glb', (gltf) => {
        character = gltf.scene;
        character.castShadow = true;
        character.scale.set(2, 2, 2);
        character.position.set(0, 0, -30);
        scene.add(character);
    }, undefined, (error) => {
        console.error(error);
    });

    // Plane for Raycaster
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }
    document.addEventListener('mousemove', onMouseMove, false);

    function animate() {
        requestAnimationFrame(animate);

        if (character) {
            // Update the raycaster
            raycaster.setFromCamera(mouse, camera);
            const target = new THREE.Vector3();
            raycaster.ray.intersectPlane(planeZ, target);

            // Rotate model to face the target
            character.lookAt(target);
        }

        renderer.render(scene, camera);
    }
    animate();
});