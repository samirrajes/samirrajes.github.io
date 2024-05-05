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

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    const mouseRaycaster = new THREE.Raycaster();
    const clickRaycaster = new THREE.Raycaster(); // Separate raycaster for clicks
    const mouse = new THREE.Vector2();
    let character;

    document.addEventListener('mousemove', event => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        updateMouseRaycaster();
    }, false);

    const loader = new GLTFLoader();
    loader.load('./assets/models/okmodel1.glb', gltf => {
        character = gltf.scene;
        character.castShadow = true;
        character.scale.set(2, 2, 2);
        character.position.set(0, 0, -20);
        scene.add(character);
    }, undefined, error => console.error(error));

    function updateMouseRaycaster() {
        mouseRaycaster.setFromCamera(mouse, camera);
        const target = new THREE.Vector3();
        mouseRaycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), target);
        if (character) {
            character.lookAt(target);
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    document.addEventListener('click', event => {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        clickRaycaster.setFromCamera({ x, y }, camera);
        const intersects = clickRaycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            console.log('Model clicked');
            // Implement zoom in function here
        }
    });
});
