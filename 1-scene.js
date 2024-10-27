var aspect = window.innerWidth / window.innerHeight;

var grassCanvas = document.getElementById("grass");
var scene = new THREE.Scene(); //Grass scene
var backgroundScene = new THREE.Scene(); //Sky scene
var FOV = 45
var camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 1, 20000);
camera.position.set(0, 30, 0);
camera.lookAt(new THREE.Vector3(0,30,0));
scene.add(camera);
backgroundScene.add(camera);
var renderer = new THREE.WebGLRenderer({antialias: true, canvas: grassCanvas});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;

var modelsCanvas = document.getElementById("models");
var modelsScene = new THREE.Scene();
var modelsCamera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 1, 200);
var modelsRenderer = new THREE.WebGLRenderer({ canvas: modelsCanvas, antialias: true, alpha: true});
modelsRenderer.setPixelRatio(window.devicePixelRatio);
modelsRenderer.setSize( window.innerWidth, window.innerHeight );

var menuCanvas = document.querySelector('#menu');
var fs = 5;
var menuScene = new THREE.Scene();
var menuCamera = new THREE.OrthographicCamera( fs * aspect / - 2, fs * aspect / 2, fs / 2, fs / - 2, 0.1, 100 );
var menuRenderer = new THREE.WebGLRenderer({ canvas: menuCanvas, antialias: true, 	alpha: true});
menuRenderer.setPixelRatio(window.devicePixelRatio);
menuRenderer.setSize( window.innerWidth, window.innerHeight );
menuCamera.position.z = 5;
