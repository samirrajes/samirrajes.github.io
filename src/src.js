// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
// import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';
import { createTypewriterMessage } from './notice.js';

import { scene, camera, renderer, setupLights } from './sceneSetup.js';
import { loadModel } from './modelLoader.js';
import { setupEventHandlers } from './eventHandlers.js';

document.addEventListener('DOMContentLoaded', async () => {
    setupLights();
    createTypewriterMessage();
    await loadModel(scene);  // load model before setting up handlers
    setupEventHandlers(camera, scene, renderer);  // pass the scene to the event handlers
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
});

