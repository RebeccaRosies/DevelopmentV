const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
/* const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
}); 
 */
let latestSafe = true;

let materialSafe = new THREE.MeshBasicMaterial({
    color: 0x00ff00
}); 
let materialUnsafe = new THREE.MeshBasicMaterial({
    color: 0xff0000
}); 
let materialDefault = new THREE.MeshBasicMaterial({
    color: 0x0000ff
}); 
let cube = new THREE.Mesh(geometry, materialDefault);

/* function assignMaterial(latestSafe){ */



scene.add(cube);
/* } */

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

camera.position.z = 5;

/* --------------------------------------------------- */
function getData() {
    console.log("data");
    fetch('http://localhost/dataLog', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            getSpeed(data);
        });
};

getData();

let speedArray = [];
let timesArray = [];
let safeArray = [];
let latestspeed = 0;


function getSpeed(data) {
   // let speed = {};
    
    data.forEach((date, i) => {
        speedArray.push(date.speed);
        timesArray.push(i * 5);
        safeArray.push(date.safe)
    });
    console.log(speedArray);
    console.log(speedArray[(speedArray.length-1)]);
    console.log(timesArray);
    console.log(safeArray);
 
    latestspeed = speedArray[(speedArray.length-1)];
    latestSafe = safeArray[(safeArray.length-1)];
    
}
/* 
const track1  = new NumberKeyframeTrack("track1", timesArray, speedArray, THREE.InterpolateLinear);
const tracks = [track1];
const clip = new AnimationClip("speed", -1, tracks)
const mixer = new THREE.AnimationMixer(cube);
const clips = cube.animations;

function update(){
    mixer.update(1);
}

const animation = new AnimationClip("cubespeed", -1, [track1] ); */


function animate(time) {
    let goSpeed = speedArray[(speedArray.length-1)];
    console.log(latestSafe);
    requestAnimationFrame(animate);
    cube.rotation.x = goSpeed * time / 1000;
    cube.rotation.y = 0; 

    if(latestSafe == NaN){
        cube.material.color.set(0x0000ff); 
    } else if (latestSafe == true) {
        cube.material.color.set(0x00ff00); 
    } else if (latestSafe == false) {
        cube.material.color.set(0xff0000); 
    }
    
    renderer.render(scene, camera);
}
animate();