import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Stats from 'three/addons/libs/stats.module.js';
import model from './public/1.glb?url'
// import draco from 'draco3d';
// import {setLoaderOptions} from '@loaders.gl/core';
// setLoaderOptions({
//   modules: {
//     'draco_wasm_wrapper.js': require('@loaders.gl/draco/libs/draco_wasm_wrapper.js'),
//     'draco_decoder.wasm': require('@loaders.gl/draco/libs/draco_decoder.wasm') // NOTE: importing `wasm` requires bundler config
//   }
// });
// import * as dracoloader from 'draco3d/draco_decoder.wasm'
// import  "./public/draco/draco_decoder.wasm?raw"
// import  "./public/draco/draco_wasm_wrapper.js?raw"
// import * as f from "./public/draco/draco_decoder.wasm?raw"
// import * as a from "./public/draco/draco_wasm_wrapper.js?raw"

/* -------------------------------------------------------------------------- */
/*                                 Basic Setup                                */
/* -------------------------------------------------------------------------- */
let p = [25,50,60,85]
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
const stats = Stats()
document.body.appendChild(stats.dom)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(3.1,-0.1,3.3)
let a=[3.1,-0.1,3.3]
let b=[-0.3,1.5,3.2]
let c=[-2.3,0.9,1.8]
let cpx = document.getElementById('x')
let cpy = document.getElementById('y')
let cpz = document.getElementById('z')
let camerapos = camera.position
scene.add(camera)


window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './draco/' );
loader.setDRACOLoader( dracoLoader );



/* -------------------------------------------------------------------------- */
/*                              type refine here                              */
/* -------------------------------------------------------------------------- */

/* ------------------------------ type material ----------------------------- */
const col = [0xD3CF2F,0xD3CD2E,0xD1B72C,0xC85F27,0xC34A27,0xC98C33,0x6D532B,0x1F3D74,0x0E2C66,0x035B3E]
const material=[]
for(let i =0;i<10;i++){
    material[i] = new THREE.MeshStandardMaterial({
    color: col[i],
    roughness: 0.5,
});}

/* ------------------------------ type position ----------------------------- */
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
                    scene.add(clone);
                }
            }
        });
    }
	);


/* -------------------------------------------------------------------------- */
/*                                 light setup                                */
/* -------------------------------------------------------------------------- */
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


/* -------------------------------------------------------------------------- */
/*                           render & control setup                           */
/* -------------------------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls( camera, renderer.domElement );
controls.enabled = false
controls.enableZoom = false

const clock = new THREE.Clock()


/* -------------------------------------------------------------------------- */
/*                               scroll function                              */
/* -------------------------------------------------------------------------- */
let scrollPercent = 0;
let scroll = document.getElementById('scroll')
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

// let time = 0
/* ------------------------------- scroll down ------------------------------ */
const animationScripts = [];
animationScripts.push({
    start: 0,
    end: p[0],
    func: function() {
      camera.lookAt(0,0,0)
      camera.position.set(a[0],a[1],a[2])
    }
  });
  animationScripts.push({
    start: 0,
    end: 110,
    func: function() {
        camera.lookAt(0,0,0)
    camera.position.x += ( mouseX/10000 - camera.position.x ) * .05;
    camera.position.y += ( - mouseY/10000 - camera.position.y ) * .05;
    }
  });

animationScripts.push({
  start: p[0],
  end: p[1],
  func: function() {
    camera.lookAt(0,0,0)
    camera.position.x = lerp(camera.position.x, b[0], scalePercent(p[0], p[1]));
        camera.position.y = lerp(camera.position.y, b[1], scalePercent(p[0], p[1]));
        camera.position.z = lerp(camera.position.z, b[2], scalePercent(p[0], p[1]));
  }
});
animationScripts.push({
    start: p[1],
    end: p[2],
    func: function() {
      camera.lookAt(0,0,0)
      camera.position.set(b[0],b[1],b[2])
    }
  });
// scalePercent(30, 40)
animationScripts.push({
  start: p[2],
  end: p[3],
  func: function() {
    camera.lookAt(0,0,0)
    camera.position.x = lerp(camera.position.x,c[0], scalePercent( p[2],  p[3]));
    camera.position.y = lerp( camera.position.y,c[1], scalePercent(p[2],  p[3]));
    camera.position.z = lerp(camera.position.z,c[2],scalePercent(p[2],  p[3]));
  }
});
animationScripts.push({
    start: p[3],
    end: 100,
    func: function() {
      camera.lookAt(0,0,0)
      camera.position.set(c[0],c[1],c[2])
    }
  });
/* -------------------------------- scroll up ------------------------------- */
const animationScriptsup = [];
animationScriptsup.push({
    start: 0,
    end: 110,
    func: function() {
        camera.lookAt(0,0,0)
        camera.position.x += ( mouseX/10000 - camera.position.x ) * .05;
        camera.position.y += ( - mouseY/10000 - camera.position.y ) * .05;
    }
  });
  animationScriptsup.push({
  start: p[0],
  end: p[1],
  func: function() {
    camera.lookAt(0,0,0)
    camera.position.x = lerp(a[0],  camera.position.x, scalePercent(p[0], p[1]));
        camera.position.y = lerp(a[1], camera.position.y, scalePercent(p[0], p[1]));
        camera.position.z = lerp(a[2], camera.position.z, scalePercent(p[0], p[1]));
  }
});

animationScriptsup.push({
    start: 0,
    end: 110,
    func: function() {
        camera.lookAt(0,0,0)
        camera.position.x += ( mouseX/10000 - camera.position.x ) * .05;
        camera.position.y += ( - mouseY/10000 - camera.position.y ) * .05;
    }
  });

animationScriptsup.push({
  start: p[2],
  end: p[3],
  func: function() {
    camera.lookAt(0,0,0)
    camera.position.x = lerp(b[0],camera.position.x, scalePercent(p[2], p[3]));
    camera.position.y = lerp(b[1], camera.position.y, scalePercent(p[2], p[3]));
    camera.position.z = lerp(b[2], camera.position.z,scalePercent(p[2], p[3]));
  }
});

document.addEventListener( 'mousemove', onDocumentMouseMove );
/* -------------------------------------------------------------------------- */
/*                         tick and auxiliary functions                       */
/* -------------------------------------------------------------------------- */
const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    stats.update()
    // console.log(elapsedTime)



				camera.lookAt( 0,0,0 );

       
    isScrollingDown().then(function(isScrollingDown) {
        if (isScrollingDown) {
            ScrollDownAnimations()
            console.log("down")
        }  else if (isScrollingDown === false) {
            console.log('Scrolling up by at least 50 pixels');
            ScrollUpAnimations()
            // ScrollDownAnimations()
          } else {
            console.log('Not scrolling');
            // NoScrollAnimations()
            ScrollDownAnimations()
          }
      });
  
    renderer.render(scene, camera)

    cpx.innerHTML="x: " + camerapos.x.toString()
    cpy.innerHTML="y: " + camerapos.y.toString()
    cpz.innerHTML="z: " + camerapos.z.toString()

    window.requestAnimationFrame(tick)
}

tick()


function ScrollDownAnimations() {
    animationScripts.forEach(function(a) { 
        // time = timea
      if (scrollPercent >= a.start && scrollPercent < a.end) {
        a.func();
      }
    });
  }

  function ScrollUpAnimations() {
    animationScriptsup.forEach(function(a) { 
      if (scrollPercent >= a.start && scrollPercent < a.end) {
        a.func();
      }
    });
  }
//   function ScrollUpAnimations() {
//     animationScriptsup.forEach(function(a) { 
//       if (scrollPercent >= a.start && scrollPercent < a.end) {
//         a.func();
//       }
//     });
//   }


const gridHelper = new THREE.GridHelper( 10, 10 );
// scene.add( gridHelper );
const axesHelper = new THREE.AxesHelper( 5 );
axesHelper.setColors (  0xff0000, 0xffff00, 0x0000ff)
// scene.add( axesHelper );

function lerp(x, y, a) {
    return (1 - a) * x + a * y
}

function scalePercent(start, end) {
    let reTurn = (scrollPercent - start) / (end - start)
    reTurn = clamp(reTurn,0,1)
    return reTurn
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) * 4;
    // mouseX = event.clientX
    mouseY = ( event.clientY - windowHalfY ) * 4;
    // mouseY = event.clientY
}

//   var prevScrollY = window.scrollY;
//   var prevDirection = true;
  
  function isScrollingDown() {
    // Get the current scroll position
    var currentScrollY = window.scrollY;
  
    // Wait for a short period of time to get the next scroll position
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
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
  let startTime = Date.now();  // get current time in milliseconds
  let endTime = startTime + 1000;  // 1 second later
  let a = 0;  // initial value of a
  
  // loop until 1 second has elapsed
  while (Date.now() < endTime) {
    let elapsedTime = Date.now() - startTime;  // time elapsed since start
    a = elapsedTime / 1000;  // calculate new value of a
  }
  
  // wait 10 milliseconds
  setTimeout(function() {
    return a;
  }, 10);
}