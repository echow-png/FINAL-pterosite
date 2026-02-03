import * as THREE from 'three';

// import './style.css';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(48 ,window.innerWidth/window.innerHeight, 1, 1000 );

const renderer = new THREE.WebGLRenderer(
  {
    canvas: document.querySelector('#anuro'), alpha: true
  });

renderer.setClearColor( 0x000000, 0 ); // the default

var pteroSize = 4;

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth/pteroSize, window.innerHeight/pteroSize);
camera.position.set(0,3,30);

renderer.render( scene, camera );


const loader = new OBJLoader();
const pteroTexture = new THREE.TextureLoader().load('pteroUV/anurognathusSkin.png');
const ptero = await loader.loadAsync('ptero3D/anurognathus.obj');
pteroTexture.colorSpace = THREE.SRGBColorSpace;

// Create a basic material with the texture
const texturedMaterial = new THREE.MeshToonMaterial({ map: pteroTexture });

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

//pointlight (color, strength, distance where 0 is infinte)
const pointLight = new THREE.PointLight(0xD3EDE2, 850, 0);
pointLight.position.set(1,2,23);

const ambLight = new THREE.AmbientLight(0xED66BC, 3);

scene.add(pointLight, ambLight); //, pLightHelper


//move on scroll
function moveCamera () {
  const t = document.body.getBoundingClientRect().top;

  camera.rotation.x = t * 0.00008;
//   console.log(t);
}


var scrollPosY = 0;
window.addEventListener ("scroll", () => {
  scrollPosY = (window.scrollY / document.body.clientHeight);
//   console.log(scrollPosY);

})


var mouseX = 0;
var mouseY = 0;
 window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;   // -1 to 1
    mouseY = (event.clientY / document.body.clientHeight) * 2 - 1;  // -1 to 1
  });

//   instead of inner width/height try client height?/? divide event by document.body.clientHeight

let targetRotX = 0, targetRotY = 0;


 function animate () {
  requestAnimationFrame (animate);
  renderer.render( scene, camera );

 targetRotY = mouseX * Math.PI * 0.2 - 1.6;  // left-right
  targetRotX = mouseY * Math.PI * 0.3;  // up-down

  // Smooth easing
  ptero.rotation.y += (targetRotY - ptero.rotation.y) * pteroSize/10;
//   ptero.rotation.z += 0.1;
ptero.rotation.x += (targetRotX - ptero.rotation.x) * pteroSize/10 + scrollPosY/1.5;
  //movespeed scales with ptero size??
}

animate();
