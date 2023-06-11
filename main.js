import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const panoramas = ["./1.png", "./2.png", "./3.png"];

for (let i = 0; i < panoramas.length; i++) {
  const container = document.getElementById(`panorama${i + 1}`);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 0.01;

  const controls = new OrbitControls(camera, renderer.domElement);

  const scene = new THREE.Scene();

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(panoramas[i], function (texture) {
    const sphereGeometry = new THREE.SphereGeometry(500, 60, 40);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide,
    });

    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphereMesh);

    animate();
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
}
