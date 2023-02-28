import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import model from './public/1.glb?url'


const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()
// scene.background = new THREE.Color(0xffffff); // Set the background color to white

const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './draco/' );
loader.setDRACOLoader( dracoLoader );
const col = [0xD3CF2F,0xD3CD2E,0xD1B72C,0xC85F27,0xC34A27,0xC98C33,0x6D532B,0x1F3D74,0x0E2C66,0x035B3E]
const material=[]
for(let i =0;i<10;i++){
    material[i] = new THREE.MeshStandardMaterial({
    color: col[i], // Yellow color
    roughness: 0.5,
});}

const logogroup = new THREE.Group();

loader.load(
	model,
    function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                for (let i = 0; i < 10; i++) {
                    let scaleindex = 1 +i*0.04
                    let positionindex = 1 - i*0.2
                    child.material = material[i];
                    child.castShadow =true
                    child.receiveShadow =true
                    const clone = child.clone();
                    clone.scale.set(scaleindex,scaleindex,scaleindex)
                    clone.position.set(1,1,positionindex)
                    logogroup.add(clone)
                    scene.add(clone);
                }
                for (let i = 0; i < 10; i++) {
                    let scaleindex = 1 +i*0.04
                    let positionindex = 1 + i*.13
                    let positionindexZ = 1 - i*.13
                    child.material = material[i];
                    child.castShadow =true
                    child.receiveShadow =true
                    const clone = child.clone();
                    clone.scale.set(scaleindex,scaleindex,scaleindex)
                    clone.position.set(1,positionindex+.5,positionindexZ)
                    clone.rotation.set(Math.PI / 4,0,0);
                    logogroup.add(clone)
                    scene.add(clone);
                }
                for (let i = 0; i < 10; i++) {
                    let scaleindex = 1 +i*0.04
                    let positionindex = 1 - i*.13
                    let positionindexZ = 1 - i*.13
                    child.material = material[i];
                    child.castShadow =true
                    child.receiveShadow =true
                    const clone = child.clone();
                    clone.scale.set(scaleindex,scaleindex,scaleindex)
                    clone.position.set(1,positionindex-.5,positionindexZ)
                    clone.rotation.set(-Math.PI / 4,0,0);
                    logogroup.add(clone)
                    scene.add(clone);
                }
            }
        });
    }
	);

let sG = new THREE.SphereBufferGeometry(.2)
let s = new THREE.Mesh(sG,material)
s.castShadow = true
// scene.add(s)

let s2G = new THREE.SphereBufferGeometry(-0.4)
let s2 = new THREE.Mesh(s2G,material)
s2.position.set(0,0),1
s2.receiveShadow = true
// scene.add(s2)



const light1 = new THREE.DirectionalLight(0xffffff, .7); // Color, Intensity
const light2 = new THREE.DirectionalLight(0xffffff, .4); // Color, Intensity
const light3 = new THREE.DirectionalLight(0xffffff, .4); // Color, Intensity
light1.position.set(0, 0.1, 2); // x, y, z
light2.position.set(0, 0.5, 1); // x, y, z
light3.position.set(0, -0.5, 1); // x, y, z
light1.castShadow = true; // Enable shadow casting
// light2.castShadow = true; // Enable shadow casting
// light3.castShadow = true; // Enable shadow casting
light1.shadow.mapSize.width = 1024;
light1.shadow.mapSize.height = 1024;
light2.shadow.mapSize.width = 1024;
light2.shadow.mapSize.height = 1024;
light3.shadow.mapSize.width = 1024;
light3.shadow.mapSize.height = 1024;
scene.add(light1);
// scene.add(light2);
// scene.add(light3);
const lighth = new THREE.HemisphereLight( 0xffffff, 0.5 ); 
scene.add(lighth);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 3.1
camera.position.y = -.1
camera.position.z = 3.3
// 3.1,-0.1,3.3
// -0.3,1.5,3.2
// -2.3,0.9,1.8
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// renderer.setClearColor(0x000000, 10);
// renderer.physicallyCorrectLights = true;

const controls = new OrbitControls( camera, renderer.domElement );

const clock = new THREE.Clock()

let cpx = document.getElementById('x')
let cpy = document.getElementById('y')
let cpz = document.getElementById('z')
let camerapos = camera.position

let scroll = document.getElementById('scroll')
const tick = () => {
    const elapsedTime = clock.getElapsedTime()


    // console.log(camerapos)

    // Update controls
    // controls.update()
    // camera.position.x += (mouseX - camera.position.x) * .05;
    // camera.position.y += (-mouseY - camera.position.y) * .05;
    // console.log("tick")
    // camera.lookAt(scene.position);
    // cp.innerHTML=camerapos.x.toString()
   
    // console.log(camerapos.x.toString())
    
    // Render
    renderer.render(scene, camera)


    cpx.innerHTML="x: " + camerapos.x.toString()
    cpy.innerHTML="y: " + camerapos.y.toString()
    cpz.innerHTML="z: " + camerapos.z.toString()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


// const c = document.createElement("span");
// c.setAttribute('id','camerap');




const gridHelper = new THREE.GridHelper( 10, 10 );
// scene.add( gridHelper );
const axesHelper = new THREE.AxesHelper( 5 );
axesHelper.setColors (  0xff0000, 0xffff00, 0x0000ff)
// scene.add( axesHelper );



let scrollPercent = 0;
document.body.onscroll = () => {
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100
    ;
    scroll.innerHTML="scroll progress: " + scrollPercent.toFixed(2)
}

tick()

function lerp(x, y, a) {
    return (1 - a) * x + a * y
}
// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start)
}