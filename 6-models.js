const roseGold = createMaterial( "phong", { color: 0xF5986E });

var vector = new THREE.Vector3();
var size = 1
document.body.addEventListener('mousewheel', (event) => { size = Math.max(0.1, size + Math.sign(event.deltaY) * -0.1); } );

var interval;
var distance = 9;
var type = 0;
var typeArray = ["box", "capsule", "cone", "cylinder", "icosahedron", "octahedron", "sphere", "tetrahedron", "torus", "torusknot"];
var qualityArray = ["phong", "standard", "basic"];
var quality = 0;
var autoclick = true;

function createObject () {

	modelsScene.add( createMesh(
		createGeometry( typeArray[type], { radius: size / 2, width: size, height: size, depth: size, length: size / 2, radiusTop: size / 2, radiusBottom: size / 2, tube: 0.1, tubularSegments: 100, radialSegments:20 }),
		createMaterial( qualityArray[quality], { color: Math.random() * 0xffffff }),
		createPoint({
			x: modelsCamera.position.x + camera.getWorldDirection( vector ).x * distance,
			y: modelsCamera.position.y + camera.getWorldDirection( vector ).y * distance,
			z: modelsCamera.position.z + camera.getWorldDirection( vector ).z * distance
		})
	))

};

document.body.onmousedown = function() {
	if ( modelsControls.isLocked === true && autoclick ) { interval = setInterval(function(){ createObject() }, 5) };
	if ( modelsControls.isLocked === true && !autoclick ) { createObject() };
	if ( modelsControls.isLocked === true) { if (audiotoggle) {beep.play()} };
};

document.body.onmouseup = function() {
	if ( modelsControls.isLocked === true && autoclick ) { clearInterval(interval); if (audiotoggle) {beep.play()} };
};

var lights = [];

lights[0] = new THREE.PointLight(0xffffff, 0.5, 0);
lights[0].position.set(200, 0, 0);
lights[1] = new THREE.PointLight(0xffffff, 0.5, 0);
lights[1].position.set(0, 200, 0);
lights[2] = new THREE.PointLight(0xffffff, 0.5, 0);
lights[2].position.set(0, 100, 100);
lights[3] = new THREE.AmbientLight(0xffffff, 0.6);

lights.forEach(function(light){
	modelsScene.add(light);
})

const light = new THREE.AmbientLight( 0x404040 );
modelsScene.add( light );

var nucleus = createMesh( createGeometry( "sphere", { radius: 0.4 }), roseGold, createPoint({ x: 0, y: 8, z: -30  }) );
modelsScene.add(nucleus);

var shellCounts = [2, 6, 10, 14, 18];
var valenceCount = 6;
var valences = [];

for (var i = 1; i <= valenceCount; i++) {
	var shellCountIndex = (i - 1) % shellCounts.length;
	var v = createValence(i, shellCounts[shellCountIndex]);
	v.position.y = 8;
	v.position.z = -30;
	valences.push(v);
	modelsScene.add(v);
};

button(openSans, "Welcome to the Metaverse", 1 , point(0,4.5,-30) , 0xf25346, 0xF5986E, playSound, "none", modelsScene );
button(openSans, "Welcome Guide", 0.5 , point(0,2.5,-30) , 0xf25346, 0xF5986E, playSound, "none", modelsScene );
