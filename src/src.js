import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

import { createTypewriterMessage } from './notice.js';

document.addEventListener('DOMContentLoaded', () => {
    createTypewriterMessage();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10; // setup camera to view the scene
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);

    // Function to handle window resize
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();  // Important to update the camera's projection matrix
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Listen for window resize events
    window.addEventListener('resize', onWindowResize, false);

    // setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    // init raycaster & mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // GLTF loader, load in blender model
    const characterloader = new GLTFLoader();
    let character;

    characterloader.load('./assets/okmodel1.glb', (gltf) => {
        character = gltf.scene;
        character.castShadow = true;
        character.scale.set(2, 2, 2);
        character.position.set(0, 0, -20);
        scene.add(character);
    }, undefined, (error) => {
        console.error(error);
    });

    // plane for raycaster
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }
    document.addEventListener('mousemove', onMouseMove, false);

    function animate() {
        requestAnimationFrame(animate);

        if (character) {
            // update raycaster
            raycaster.setFromCamera(mouse, camera);
            const target = new THREE.Vector3();
            raycaster.ray.intersectPlane(planeZ, target);

            // rotate model to face target
            character.lookAt(target);
        }

        renderer.render(scene, camera);
    }
    animate();
});