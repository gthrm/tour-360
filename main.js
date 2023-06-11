import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function addIcon(container) {
  const icon = document.createElement("i");
  icon.className = "fas fa-arrows-alt panorama-icon"; // Added your CSS class
  container.appendChild(icon);
}

function addZoomButtons(container, camera) {
  const zoomInButton = document.createElement("i");
  zoomInButton.className = "fas fa-plus zoom-button";
  container.appendChild(zoomInButton);

  const zoomOutButton = document.createElement("i");
  zoomOutButton.className = "fas fa-minus zoom-button";
  container.appendChild(zoomOutButton);

  let zoomLevel = 0;

  zoomInButton.addEventListener("click", function (event) {
    event.stopPropagation();
    if (zoomLevel < 3) {
      zoomLevel++;
      camera.zoom += 0.5;
      camera.updateProjectionMatrix();
    }
  });

  zoomOutButton.addEventListener("click", function (event) {
    event.stopPropagation();
    if (zoomLevel > -1) {
      zoomLevel--;
      camera.zoom -= 0.5;
      camera.updateProjectionMatrix();
    }
  });
}

const panoramas = ["./1.png", "./2.png", "./3.png"];
const body = document.querySelector("body");
for (let i = 0; i < panoramas.length; i++) {
  const container = document.createElement("div");
  container.className = "panorama";
  addIcon(container);
  body.appendChild(container);
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
  addZoomButtons(container, camera);
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
