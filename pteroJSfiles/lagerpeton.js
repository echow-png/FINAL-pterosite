import * as THREE from 'three';

// import './style.css';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(25 ,window.innerWidth/window.innerHeight, 1, 1000 );

const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.querySelector('#lager'), alpha: true });
// Source - https://stackoverflow.com/a/20496296
// Posted by WestLangley, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-30, License - CC BY-SA 3.0

renderer.setClearColor( 0x000000, 0 ); // the default

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth/5, window.innerHeight/5);
camera.position.set(0,6,30);

renderer.render( scene, camera );


const loader = new OBJLoader();
const pteroTexture = new THREE.TextureLoader().load('pteroUV/lagerpetonSkin.png');
const ptero = await loader.loadAsync('ptero3D/lagerpeton.obj');
pteroTexture.colorSpace = THREE.SRGBColorSpace; // This is the crucial line

// Create a basic material with the texture
const texturedMaterial = new THREE.MeshStandardMaterial({ map: pteroTexture });

// Traverse the group and apply the material to each mesh
ptero.traverse((child) => {
  if (child instanceof THREE.Mesh) {
    child.material = texturedMaterial;
  }
});

ptero.position.set (0,0,3);
ptero.rotation.set (0,0,0);

// ptero.scale.set (5);

scene.add(ptero);


// Array(1).fill().forEach(addStar); //addSTar is a function

//pointlight (color, strength, distance where 0 is infinte)
const pointLight = new THREE.PointLight(0xFFF5B3, 950, 0);
pointLight.position.set(1,2,23);
//helpers
const pLightHelper = new THREE.PointLightHelper(pointLight);

// //reflective light
// const pointLight2 = new THREE.PointLight(0xA9C6F5, 180, 0);
// pointLight2.position.set(-12,-25,6);

const ambLight = new THREE.AmbientLight(0xE082B9, 6);

scene.add(pointLight, ambLight); //, pLightHelper

// const controls = new OrbitControls(camera, renderer.domElement);

//move on scroll
function moveCamera () {
  const t = document.body.getBoundingClientRect().top;

  // sphere.rotation.y += 0.0005*t;

  camera.rotation.x = t * 0.0001;
  // console.log(t);
}

document.body.onscroll = moveCamera;


var scrollPosY = 0;
window.addEventListener ("scroll", () => {
  scrollPosY = (window.scrollY / document.body.clientHeight);
  // console.log(scrollPosY);

})


var mouseX = 0;
var mouseY = 0;
 window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;   // -1 to 1
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;  // -1 to 1
  });

let targetRotX = 0, targetRotY = 0;


 function animate () {
  requestAnimationFrame (animate);
  renderer.render( scene, camera );

 targetRotY = mouseX * Math.PI * 0.2 - 0.5;  // left-right
  targetRotX = mouseY * Math.PI * 0.2 - 1.2;  // up-down
  // console.log('scroll' + scrollPosY);

  // Smooth easing
  ptero.rotation.y += (targetRotY - ptero.rotation.y) * 0.3;
//   ptero.rotation.z += 0.1;
ptero.rotation.x += (targetRotX - ptero.rotation.x) * 0.3+ scrollPosY;
  
}

animate();
