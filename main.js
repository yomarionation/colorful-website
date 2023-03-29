import * as THREE from 'three'
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
    DRACOLoader
} from 'three/examples/jsm/loaders/DRACOLoader.js'

import model from './public/1.glb?url'
import isMobile from 'ismobilejs';

/* -------------------------------------------------------------------------- */
/*                                 Basic Setup                                */
/* -------------------------------------------------------------------------- */

let isMobileDevice = isMobile(window.navigator).any;
let mouseX = 0,
    mouseY = 0;
let mouseOX = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)

scene.add(camera)


window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./draco/');
loader.setDRACOLoader(dracoLoader);


/* -------------------------------------------------------------------------- */
/*                                 light setup                                */
/* -------------------------------------------------------------------------- */
const light2 = new THREE.DirectionalLight(0xffffff, .95); // Color, Intensity
const light3 = new THREE.DirectionalLight(0xffffff, .4); // Color, Intensity

light2.position.set(0, 0, 2); // pointlight
light3.position.set(-3, 0, 2); // pointlight
const targetPosition2 = new THREE.Vector3(0.5, 0, 0);
light2.target.position.copy(targetPosition2);
const targetPosition3 = new THREE.Vector3(-2, 3, 0);
light3.target.position.copy(targetPosition3);
light2.castShadow = true; // Enable shadow casting
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
scene.add(light2);
scene.add(light3);

const lighth = new THREE.HemisphereLight(0x7c7c7c, 0.5);
scene.add(lighth);


/* -------------------------------------------------------------------------- */
/*                              type refine here                              */
/* -------------------------------------------------------------------------- */

/* ------------------------------ type material ----------------------------- */
const col = [0xf5ed4a, 0xfea406, 0xd9544b, 0x587bd5, 0x004497, 0x007e4e, 0x1fc42a, 0x44bd54, 0x83ac9e, 0xcc75dd, 0xd400d3, 0xc700cd, 0x9c01bd, 0x5400ae, 0x3700a8, 0x3300a1, 0x3400a5, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac, 0x3600ac]
const material = []
let indexnumber = 30
for (let i = 0; i < indexnumber; i++) {
    material[i] = new THREE.MeshStandardMaterial({
        color: col[i],
        roughness: 0.5,
        fog: true
    });
}

/* ------------------------------ type position ----------------------------- */

let t = 0; // Initialize the time variable to keep track of the time elapsed in frames
let lgroup1 = []
let lgroup2 = []
let lgroup3 = []
loader.load(
    model,
    function(gltf) {
        gltf.scene.traverse(function(child) {
            if (child.isMesh) {
                let x2 = 0.92;
                let y2 = 0;
                let x3 = 1.08;
                let y3 = 0;
                for (let i = 0; i < indexnumber; i++) {
                    let scaleindex = 1 + i * 0.04
                    let positionindex = 1 - i * 0.2
                    child.material = material[i];
                    child.castShadow = true
                    child.receiveShadow = true
                    const clone1 = child.clone();
                    clone1.scale.set(scaleindex, scaleindex, scaleindex)
                    clone1.position.set(0, 0, positionindex)
                    lgroup1[i] = clone1
                    scene.add(clone1);
                }

                for (let i = 0; i < indexnumber; i++) {
                    let scaleindex = 1 + i * 0.04
                    let positionindex = 1 + i * .18
                    let positionindexZ = 1 - i * .093
                    child.material = material[i];
                    child.castShadow = true
                    child.receiveShadow = true
                    const clone2 = child.clone();
                    clone2.scale.set(scaleindex, scaleindex, scaleindex)
                    clone2.position.set(0, positionindex - x2, positionindexZ + y2)
                    clone2.rotation.set(Math.PI * 0.3833, 0, 0);
                    lgroup2[i] = clone2
                    scene.add(clone2);
                }

                for (let i = 0; i < indexnumber; i++) {
                    let scaleindex = (1 + i * 0.04)
                    let positionindex = 1 - i * .18
                    let positionindexZ = 1 - i * .093
                    child.material = material[i];
                    child.castShadow = true
                    child.receiveShadow = true
                    const clone3 = child.clone();
                    clone3.scale.set(scaleindex, scaleindex, scaleindex)
                    clone3.position.set(0, positionindex - x3, positionindexZ + y3)
                    clone3.rotation.set(-Math.PI * 0.3833, 0, 0);
                    lgroup3[i] = clone3
                    scene.add(clone3);
                }

                let speedoffset = 0;
                let sizeoffset = 0;
                let sizemax = 1.5

                const animateChildMesh = function() {

                    speedoffset = map(mouseOX, 1, 0.2, .5, 1)
                    t += speedoffset;
                    sizeoffset = map(mouseOX, 1, 0.2, 0.2, 1.15)

                    for (let i = 0; i < indexnumber; i++) {
                        let positionindex3 = -i * .18
                        let positionindexZ3 = 1 - i * .093

                        let positionindex2 = i * .18
                        let positionindexZ2 = 1 - i * .093
                        let logosize = 3.05 + Math.sin((i / 700 + t / 4600) * 1 * 140);

                        logosize = map(logosize, 2, 4.02, 1, sizemax)
                        sizemax = lerp(1.2, 1.6, sizeoffset)

                        lgroup1[i].scale.set(logosize, logosize, 1);
                        lgroup2[i].scale.set(logosize, logosize, 1);
                        lgroup3[i].scale.set(logosize, logosize, 1);

                        x2 = map(logosize, 1, 1.5, 0, 0.4)
                        y2 = map(logosize, 1, 1.5, 0, .25)
                        x3 = map(logosize, 1, 1.5, 0, 0.4)
                        y3 = map(logosize, 1, 1.5, 0, .25)

                        lgroup2[i].position.set(0, positionindex2 + x2, positionindexZ2 + y2)
                        lgroup3[i].position.set(0, positionindex3 - x3, positionindexZ3 + y3)

                    }

                    requestAnimationFrame(animateChildMesh);
                };
                animateChildMesh();
            }
        });
    }
);


/* -------------------------------------------------------------------------- */
/*                           render & control setup                           */
/* -------------------------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

if (isMobileDevice) {
    document.getElementById("cb").style.top = '2vh'
    document.getElementById("cb").style.left = '66vw'

    document.getElementById("titles").style.top = '5vh'
    document.getElementById("titles").style.width = '50vw'

    document.getElementById("mw").style.fontSize = '7vh'
    document.getElementById("mw").style.lineHeight = '6vh'
    document.getElementById("ed").style.fontSize = '2.8vh'
    document.getElementById("ed").style.lineHeight = '3vh'
    document.getElementById("may12").style.fontSize = '7vh'
    document.getElementById("may12").style.lineHeight = '6.5vh'
    document.getElementById("th").style.fontSize = '3vh'
    document.getElementById("th").style.top = '-3vh'

    document.getElementById("b").style.zIndex = '-5'
    document.getElementById("b1").style.zIndex = '5'
    document.getElementById("b2").style.zIndex = '5'

    camera.position.set(6.86, .26, 5.88)
    camera.lookAt(-2, 0, 0);
    camera.setFocalLength(35)
    camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 3.5);

} else {
    camera.position.set(4.66, -0.26, 5.88)
    camera.lookAt(-2, 0, 0);
    camera.setFocalLength(25)
    camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 10);
}

let beta = 0,
    gamma = 0;
let orientationbtn = document.getElementById("phonedirectionbtn")
orientationbtn.classList.add('btnoff');
orientationbtn.style.display = "none";

orientationinit()
clickrequest()

function clickrequest() {
    orientationbtn.addEventListener("click", function() {
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission().then(permissionState => {
                if (permissionState === "granted") {
                    console.log("3")
                    orientationmove()
                } else {
                    orientationbtn.style.display = "none";
                    console.log("no3")
                    document.getElementById("restartindication").style.display = "block"
                }
            }).catch(console.error);
        }
    });
}

function orientationinit() {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        orientationbtn.style.display = "block";
        DeviceMotionEvent.requestPermission().then(permissionState => {
            if (permissionState === "granted") {
                console.log("2")
                orientationmove()
            } else {
                orientationbtn.style.display = "none";
                document.getElementById("restartindication").style.display = "block"
                console.log("no2")
            }
        }).catch(console.error);
    }
}

function orientationmove() {
    // document.getElementById("i").style.display = "block"
    // orientationbtn.style.display = "none";
    window.addEventListener('deviceorientation', function(event) {
        beta = event.beta / 10 - 3;
        gamma = event.gamma / 10;
        camera.position.x += (beta - camera.position.x) * .008 + 0.042;
        camera.position.y += (gamma - camera.position.y) * .008 + 0.002;
    }, true);
}

/* -------------------------------------------------------------------------- */
/*                         tick and auxiliary functions                       */
/* -------------------------------------------------------------------------- */
const tick = () => {
    if (!isMobileDevice) {
        camera.position.x += (-mouseX / 8500 - camera.position.x) * .07 + 0.35;
        camera.position.y += (mouseY / 8500 - camera.position.y) * .1;
    }

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}
if (!isMobileDevice) {
    document.addEventListener('mousemove', onDocumentMouseMove);
}

tick()

function lerp(x, y, a) {
    return (1 - a) * x + a * y
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 4;
    mouseY = (event.clientY - windowHalfY) * 4;

    mouseOX = 0

    mouseOX = Math.abs(mouseX / 4) / windowHalfX;
    mouseOX = clamp(mouseOX, 0, 1)
}

function map(value, min1, max1, min2, max2) {
    const range1 = max1 - min1;
    const range2 = max2 - min2;
    const valueScaled = (value - min1) / range1;
    return min2 + (valueScaled * range2);
}
