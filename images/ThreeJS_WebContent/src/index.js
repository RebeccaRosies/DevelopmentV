const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

let setColor = true;

function setMaterial(setColor) {
    console.log(setColor)
    if (setColor == true) {
        material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
    } else if (setColor == false) {
        material = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });
    }

}
setMaterial(setColor)
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

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
            //console.log(data);
            getSpeed(data);
        });
};

getData();

let speedArray = [];
let timesArray = [];
let latestspeed = 0


function getSpeed(data) {
    let speed = {};
    i = 0;
    data.forEach((date) => {
        speed = (date.speed);
        speedArray[i] = speed;

        timesArray[i] = (i * 5);


        i += 1;
        if (i == (data.lenght + 1)) {
            i = 0
            latestspeed = speed
        };
    });
   
    if (data[0].safe == true) {
        setColor = true

    } else if (data[0].safe == false) {
        setColor = false
    }
 
    latestspeed = speedArray[1];
    animate(latestspeed);
    setMaterial(setColor);

}
console.log(latestspeed);
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
    let goSpeed = speedArray[0];
    requestAnimationFrame(animate);
    cube.rotation.x = goSpeed * time / 1000;
    cube.rotation.y = 0; 

    renderer.render(scene, camera);
}
animate();