

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);

/* 
//Shader Material //
//The material code is based on the code from https://www.youtube.com/watch?v=EntBBM6nqQA //
*/
const cubeMaterialSafe = new THREE.ShaderMaterial({
    wireframe:true,
    vertexShader: `
    void main()	{
      // projectionMatrix, modelViewMatrix, position -> passed in from Three.js

      vec4 result;
      result = vec4(position.x, sin(position.z/3.0)+position.y, position.z, 1.0);

      gl_Position = projectionMatrix
        * modelViewMatrix
        * result;
    }
    `,
    fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
    `,
});

const cubeMaterialUnsafe = new THREE.ShaderMaterial({
    wireframe:true,
    vertexShader: `
    void main()	{
      // projectionMatrix, modelViewMatrix, position -> passed in from Three.js

      vec4 result;
      result = vec4(position.x, sin(position.z/4.0)+position.y, position.z, 1.0);

      gl_Position = projectionMatrix
        * modelViewMatrix
        * result;
    }
    `,
    fragmentShader: `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `,
});

const cubeMaterialDefault = new THREE.ShaderMaterial({
    wireframe:true,
    vertexShader: `
    void main()	{
      // projectionMatrix, modelViewMatrix, position -> passed in from Three.js

      vec4 result;
      result = vec4(position.x, sin(position.z/5.0)+position.y, position.z, 1.0);

      gl_Position = projectionMatrix
        * modelViewMatrix
        * result;
    }
    `,
    fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
    `,
});


let latestSafe = true;

//Basic materials (no shaders)
/* let materialSafe = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe:true
}); 
let materialUnsafe = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe:true
}); 
let materialDefault = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe:true
});  */

let cube = new THREE.Mesh(geometry, cubeMaterialSafe);


scene.add(cube);

const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

camera.position.z = 5;

/* --------------------------------------------------- */

/** 
* @returns an Array with objects containing: 
*           speed = (Number) = Ex: 2.1 = How fast was a person going at a certain time and place 
*           safe = (Boolean) = EX: true = Did the person feel safe
 */
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
     // update the speed of the cube whenever the latest data comes through
    let goSpeed = speedArray[(speedArray.length-1)];
    console.log(latestSafe);
    requestAnimationFrame(animate);
    cube.rotation.x = goSpeed * time / 1000;
    cube.rotation.y = 0; 

    // update the color of the cube whenever the latest data comes through
    if(latestSafe == NaN){
        cube.material = cubeMaterialDefault; 
    } else if (latestSafe == true) {
         cube.material = cubeMaterialUnsafe;
    } else if (latestSafe == false) {
         cube.material = cubeMaterialUnsafe; 
    }
    
    //render the scene
    renderer.render(scene, camera);
}
animate();