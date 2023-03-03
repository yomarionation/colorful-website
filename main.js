import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
    DRACOLoader
} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {
    RectAreaLightHelper
} from 'three/addons/helpers/RectAreaLightHelper.js';
import Stats from 'three/addons/libs/stats.module.js';
import model from './public/1.glb?url'


/* -------------------------------------------------------------------------- */
/*                                 Basic Setup                                */
/* -------------------------------------------------------------------------- */
/* Storing user's device details in a variable*/
let details = navigator.userAgent;

/* Creating a regular expression
containing some mobile devices keywords
to search it in details string*/
let regexp = /android|iphone|kindle|ipad/i;

/* Using test() method to search regexp in details
it returns boolean value*/
let isMobileDevice = regexp.test(details);

let p = [25, 50, 60, 85]
let mouseX = 0,
    mouseY = 0;
let mouseOX = 0,
    mouseOY = 0;
let targetX = 0;
let targetY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
const stats = Stats()
// document.body.appendChild(stats.dom)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

scene.fog = new THREE.Fog(0x000000, 8, 18);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)

let a = [2.1, -1.1, 4.3]
let b = [-0.3, 1.5, 3.2]
let c = [-2.3, 0.9, 1.8]
let cpx = document.getElementById('x')
let cpy = document.getElementById('y')
let cpz = document.getElementById('z')
let camerapos = camera.position

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
dracoLoader.setDecoderPath('');
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
    function (gltf) {
        gltf.scene.traverse(function (child) {
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

                const animateChildMesh = function () {

                    speedoffset = map(mouseOX, 1, 0.2, .2, 1)
                    t += speedoffset;
                    sizeoffset = map(mouseOX, 1, 0.2, 0, 1)

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

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enabled = false
// controls.enableZoom = false

const clock = new THREE.Clock()

/* -------------------------------------------------------------------------- */
/*                               scroll function                              */
/* -------------------------------------------------------------------------- */
// let scrollPercent = 0;
// let scroll = document.getElementById('scroll')
// document.body.onscroll = () => {
//         scrollPercent =
//             ((document.documentElement.scrollTop || document.body.scrollTop) /
//                 ((document.documentElement.scrollHeight ||
//                         document.body.scrollHeight) -
//                     document.documentElement.clientHeight)) *
//             100;
//         scroll.innerHTML = "scroll progress: " + scrollPercent.toFixed(2)
//     }

//     /* ------------------------------- scroll down ------------------------------ */
// const animationScripts = [];
// animationScripts.push({
//     start: 0,
//     end: p[0],
//     func: function() {
//         camera.lookAt(0, 0, 0)
//         camera.position.set(a[0], a[1], a[2])

//     }
// });
// animationScripts.push({
//     start: 0,
//     end: 110,
//     func: function() {
//         camera.lookAt(10, 0, 0)
//         camera.position.x += (mouseX / 10000 - camera.position.x) * .05;
//         camera.position.y += (-mouseY / 10000 - camera.position.y) * .05;
//     }
// });

// animationScripts.push({
//     start: p[0],
//     end: p[1],
//     func: function() {
//         camera.lookAt(0, 0, 0)
//         camera.position.x = lerp(camera.position.x, b[0], scalePercent(p[0], p[1]));
//         camera.position.y = lerp(camera.position.y, b[1], scalePercent(p[0], p[1]));
//         camera.position.z = lerp(camera.position.z, b[2], scalePercent(p[0], p[1]));
//     }
// });
// animationScripts.push({
//     start: p[1],
//     end: p[2],
//     func: function() {
//         camera.lookAt(0, 0, 0)
//         camera.position.set(b[0], b[1], b[2])
//     }
// });
// // scalePercent(30, 40)
// animationScripts.push({
//     start: p[2],
//     end: p[3],
//     func: function() {
//         camera.lookAt(0, 0, 0)
//         camera.position.x = lerp(camera.position.x, c[0], scalePercent(p[2], p[3]));
//         camera.position.y = lerp(camera.position.y, c[1], scalePercent(p[2], p[3]));
//         camera.position.z = lerp(camera.position.z, c[2], scalePercent(p[2], p[3]));
//     }
// });
// animationScripts.push({
//     start: p[3],
//     end: 100,
//     func: function() {
//         camera.lookAt(0, 0, 0)
//         camera.position.set(c[0], c[1], c[2])
//     }
// });
// /* -------------------------------- scroll up ------------------------------- */
// const animationScriptsup = [];
// animationScriptsup.push({
//     start: 0,
//     end: 110,
//     func: function() {
//         camera.lookAt(0, 0, 0)
//         camera.position.x += (mouseX / 10000 - camera.position.x) * .05;
//         camera.position.y += (-mouseY / 10000 - camera.position.y) * .05;
//     }
// });
// animationScriptsup.push({
//     start: p[0],
//     end: p[1],
//     func: function() {
//         camera.lookAt(0, 0, 0)
//         camera.position.x = lerp(a[0], camera.position.x, scalePercent(p[0], p[1]));
//         camera.position.y = lerp(a[1], camera.position.y, scalePercent(p[0], p[1]));
//         camera.position.z = lerp(a[2], camera.position.z, scalePercent(p[0], p[1]));
//     }
// });

// animationScriptsup.push({
//     start: 0,
//     end: 110,
//     func: function() {
//         camera.lookAt(0, 0, 0)
//         camera.position.x += (mouseX / 10000 - camera.position.x) * .05;
//         camera.position.y += (-mouseY / 10000 - camera.position.y) * .05;
//     }
// });

// animationScriptsup.push({
//     start: p[2],
//     end: p[3],
//     func: function() {
//         camera.lookAt(0, 0, 0)
//         camera.position.x = lerp(b[0], camera.position.x, scalePercent(p[2], p[3]));
//         camera.position.y = lerp(b[1], camera.position.y, scalePercent(p[2], p[3]));
//         camera.position.z = lerp(b[2], camera.position.z, scalePercent(p[2], p[3]));
//     }
// });

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

    camera.position.set(4.66, .26, 5.88)
    camera.lookAt(-2, 0, 0);
    camera.setFocalLength(35)
    camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 3.5);

} else {
    camera.position.set(4.66, -0.26, 5.88)
    camera.lookAt(-2, 0, 0);
    camera.setFocalLength(25)
    camera.rotateOnAxis(new THREE.Vector3(0, 0, 1), Math.PI / 10);
}

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function (event) {
        //   var alpha = event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;

        cpx.innerHTML = "x: " + beta
        cpy.innerHTML = "y: " + gamma
        //   cpz.innerHTML = "z: " + camerapos.z.toString()
        camera.position.x += (beta - camera.position.x) * .07 + 0.35;
        camera.position.y += (gamma - camera.position.y) * .07 + 0.35;
    }, false);
}
/* -------------------------------------------------------------------------- */
/*                         tick and auxiliary functions                       */
/* -------------------------------------------------------------------------- */
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    stats.update()
    if (!isMobileDevice) {
        camera.position.x += (-mouseX / 8500 - camera.position.x) * .07 + 0.35;
        camera.position.y += (mouseY / 8500 - camera.position.y) * .1;
    }

    // isScrollingDown().then(function(isScrollingDown) {
    //     if (isScrollingDown) {
    //         ScrollDownAnimations()
    //         // console.log("down")
    //     }  else if (isScrollingDown === false) {
    //         // console.log('Scrolling up by at least 50 pixels');
    //         ScrollUpAnimations()
    //         // ScrollDownAnimations()
    //       } else {
    //         // console.log('Not scrolling');
    //         // NoScrollAnimations()
    //         ScrollDownAnimations()
    //       }
    //   });

    renderer.render(scene, camera)

    // cpx.innerHTML = "x: " + camerapos.x.toString()
    // cpy.innerHTML = "y: " + camerapos.y.toString()
    // cpz.innerHTML = "z: " + camerapos.z.toString()

    window.requestAnimationFrame(tick)
}
if (!isMobileDevice) {
    document.addEventListener('mousemove', onDocumentMouseMove);
}
tick()


function ScrollDownAnimations() {
    animationScripts.forEach(function (a) {
        // time = timea
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func();
        }
    });
}

function ScrollUpAnimations() {
    animationScriptsup.forEach(function (a) {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func();
        }
    });
}


const gridHelper = new THREE.GridHelper(10, 10);
// scene.add( gridHelper );
const axesHelper = new THREE.AxesHelper(5);
axesHelper.setColors(0xff0000, 0xffff00, 0x0000ff)
// scene.add( axesHelper );

function lerp(x, y, a) {
    return (1 - a) * x + a * y
}

function scalePercent(start, end) {
    let reTurn = (scrollPercent - start) / (end - start)
    reTurn = clamp(reTurn, 0, 1)
    return reTurn
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



function isScrollingDown() {
    // Get the current scroll position
    var currentScrollY = window.scrollY;

    // Wait for a short period of time to get the next scroll position
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // Get the next scroll position
            var nextScrollY = window.scrollY;

            // Calculate the difference between the current and next scroll positions
            var scrollDiff = nextScrollY - currentScrollY;

            // Determine if we're scrolling down by at least 50 pixels
            if (scrollDiff > 0) {
                // If the scroll difference is greater than 50, we're scrolling down
                resolve(true);
            } else if (scrollDiff < -0.08) {
                // If the scroll difference is less than -50, we're scrolling up
                resolve(false);
            } else {
                // If the scroll difference is within the threshold, we're not scrolling
                resolve(null);
            }
        }, 100);
    });
}


function getValue() {
    let startTime = Date.now(); // get current time in milliseconds
    let endTime = startTime + 1000; // 1 second later
    let a = 0; // initial value of a

    while (Date.now() < endTime) {
        let elapsedTime = Date.now() - startTime; // time elapsed since start
        a = elapsedTime / 1000; // calculate new value of a
    }

    setTimeout(function () {
        return a;
    }, 10);
}

function radiansToPi(radians) {
    return radians / Math.PI;
}

function map(value, min1, max1, min2, max2) {
    const range1 = max1 - min1;
    const range2 = max2 - min2;
    const valueScaled = (value - min1) / range1;
    return min2 + (valueScaled * range2);
}