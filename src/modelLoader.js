// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';
import { setCharacter } from './raycastSetup.js';

async function loadModel(scene) {
    const loader = new GLTFLoader();
    try {
        const gltf = await loader.loadAsync('./assets/models/okmodel1.glb');
        const character = gltf.scene;
        character.name = "Character";  // setting name for easy reference
        character.castShadow = true;
        character.scale.set(2, 2, 2);
        character.position.set(0, 0, -20);
        scene.add(character);
        setCharacter(character);  // set character for raycasting updates
    } catch (error) {
        console.error(error);
    }
}

export { loadModel };
