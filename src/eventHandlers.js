import { mouse, clickRaycaster, updateMouseRaycaster } from './raycastSetup.js';

function setupEventHandlers(camera, scene, renderer) {
    document.addEventListener('mousemove', event => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        updateMouseRaycaster(camera, scene);
    }, false);

    document.addEventListener('click', event => {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        clickRaycaster.setFromCamera({ x, y }, camera);
        const intersects = clickRaycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            console.log('Model clicked');
        }
    });
}

export { setupEventHandlers };