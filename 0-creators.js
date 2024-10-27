// t = type, p = parameters, g = geometry, m = material

function createPoint (p) {
  let point = new THREE.Vector3( p.x || 0, p.y || 0, p.z || 0 );
  return point;
};

function createMaterial (t, p) {

  let material;

  if (t === "basic"){ material = new THREE.MeshBasicMaterial(p)};
  if (t === "depth"){ material = new THREE.MeshDepthMaterial(p)};
  if (t === "lambert"){ material = new THREE.MeshLambertMaterial(p)};
  if (t === "matcap"){ material = new THREE.MeshMatcapMaterial(p)};
  if (t === "normal"){ material = new THREE.MeshNormalMaterial(p)};
  if (t === "phong"){ material = new THREE.MeshPhongMaterial(p)};
  if (t === "physical"){ material = new THREE.MeshPhysicalMaterial(p)};
  if (t === "standard"){ material = new THREE.MeshStandardMaterial(p)};
  if (t === "toon"){ material = new THREE.MeshToonMaterial(p)};

  return material;

};

function createGeometry (t, p) {

  let geometry;

  if (t === "box"){geometry = new THREE.BoxGeometry(p.width, p.height, p.depth, p.widthSegments, p.heightSegments, p.depthSegments)};
  if (t === "capsule"){geometry = new THREE.CapsuleGeometry(p.radius, p.length, p.capSubdivisions, p.radialSegments)};
  if (t === "circle"){geometry = new THREE.CircleGeometry(p.radius, p.segments, p.thetaStart, p.thetaLength)};
  if (t === "cone"){geometry = new THREE.ConeGeometry(p.radius, p.height, p.radialSegments, p.heightSegments, p.openEnded, p.thetaStart, p.thetaLength)};
  if (t === "cylinder"){geometry = new THREE.CylinderGeometry(p.radiusTop, p.radiusBottom, p.height, p.radialSegments, p.heightSegments, p.openEnded, p.thetaStart, p.thetaLength)};
  if (t === "dodecahedron"){geometry = new THREE.DodecahedronGeometry(p.radius, p.detail)};
  if (t === "edges"){geometry = new THREE.EdgesGeometry(p.geometry, p.thresholdAngle)};
  if (t === "extrude"){geometry = new THREE.ExtrudeGeometry(p.shapes, p.options)};
  if (t === "icosahedron"){geometry = new THREE.IcosahedronGeometry(p.radius, p.detail)};
  if (t === "lathe"){geometry = new THREE.LatheGeometry(p.points, p.segments, p.phiStart, p.phiLength)};
  if (t === "octahedron"){geometry = new THREE.OctahedronGeometry(p.radius, p.detail)};
  if (t === "plane"){geometry = new THREE.PlaneGeometry(p.width, p.height, p.widthSegments, p.heightSegments)};
  if (t === "polyhedron"){geometry = new THREE.PolyhedronGeometry(p.vertices, p.indices, p.radius, p.detail)};
  if (t === "ring"){geometry = new THREE.RingGeometry(p.innerRadius, p.outerRadius, p.thetaSegments, p.phiSegments, p.thetaStart, p.thetaLength)};
  if (t === "shape"){geometry = new THREE.ShapeGeometry(p.shapes, p.curveSegments)};
  if (t === "sphere"){geometry = new THREE.SphereGeometry(p.radius, p.widthSegments, p.heightSegments, p.phiStart, p.phiLength, p.thetaStart, p.thetaLength )};
  if (t === "tetrahedron"){geometry = new THREE.TetrahedronGeometry(p.radius, p.detail)};
  if (t === "torus"){geometry = new THREE.TorusGeometry(p.radius, p.tube, p.radialSegments, p.tubularSegments, p.arc)};
  if (t === "torusknot"){geometry = new THREE.TorusKnotGeometry(p.radius, p.tube, p.tubularSegments, p.radialSegments, p.p, p.q)};
  if (t === "tube"){geometry = new THREE.TubeGeometry(p.path, p.tubularSegments, p.radius, p.radialSegments, p.closed)};
  if (t === "wireframe"){geometry = new THREE.WireframeGeometry(p.geometry)};

  return geometry;

};

function createMesh (g, m, p) {

  let mesh = new THREE.Mesh(g, m);
  mesh.position.set( p.x, p.y, p.z );
  return mesh;

};

function createValence (ringNumber, electronCount) {

  const baseRadius = 2;
  const ringRadius = 1 + (baseRadius / 20) * ringNumber;

  var ring = createMesh(

    createGeometry( "torus", {
      radius: ringRadius,
      tube: baseRadius / 200,
      radialSegments: 20,
      tubularSegments: 100,
      arc: Math.PI * 2
    }),

    createMaterial( "phong", {
      color: 0xF5986E
    }),

    createPoint({ x: 0, y: 0, z: 0})

  );

  var electrons = [];
  var angleIncrement = (Math.PI * 2) / electronCount;
  var angle = 0;
  for (var i = 0; i < electronCount; i++) {

    angle += angleIncrement;
    var electron = createMesh(

      createGeometry( "sphere", { radius: 0.05 }),

      createMaterial( "phong", { color: 0xF5986E }),

      createPoint({
        x: ringRadius * Math.cos(angle),
        y: ringRadius * Math.sin(angle),
        z: 0
      })

    );
    electrons.push(electron);

  };

  var valance = new THREE.Group();
  valance.add(ring);
  electrons.forEach(function(electron){
    valance.add(electron);
  });

  return valance;

};

const fontLoader = new THREE.FontLoader();
const openSans = './openSans.json'
const point = (x, y, z) => { return { x: x, y: y, z: z }; };

var beep = new Audio('https://www.soundjay.com/buttons/sounds/beep-21.mp3');
var beepbeep = new Audio('https://www.soundjay.com/buttons/sounds/beep-027.mp3');
var audiotoggle = true;
function playSound () { if (audiotoggle) {beepbeep.play()} };
function openUrl (URL) { window.open(URL, '_blank') };
function refresh () { location.reload() };
function lockControls () { modelsControls.lock() };
function remap(v, l1, h1, l2, h2) { return l2 + (h2 - l2) * (v - l1) / (h1 - l1); };

var leftMenu = [];
var rightMenu = [];
var buttons = [];

const button = (font, string, size, point, textColor, buttonColor, clickFunction, position, s, url) => {

	fontLoader.load(font, function(font) {
		const textSetting = { font: font, size: size, height: 0, curveSegments: 12};

		const geometry = new THREE.TextGeometry( string, textSetting );
		const material = new THREE.MeshBasicMaterial( { color: textColor } );
		const text = new THREE.Mesh( geometry,material );

		geometry.computeBoundingBox();
		const offset = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
		text.position.set( offset , size / -2 , 0 );

		const capsuleGeometry = new THREE.CapsuleGeometry( size, - offset * 2 , 10 , 20 );
		const capsuleMaterial = new THREE.MeshBasicMaterial( { color: buttonColor, transparent: true, opacity: 0.3 } );
		const capsule = new THREE.Mesh( capsuleGeometry, capsuleMaterial );
		capsule.rotation.z = Math.PI / 2;

		capsule.on("mouseover", (event) => {
			capsule.material = new THREE.MeshBasicMaterial({ color: "blue", transparent: true, opacity: 0.3});
		});
		capsule.on("mouseout", (event) => { capsule.material = capsuleMaterial; });

    buttons.push( capsule );

		if (position == "left"){ leftMenu.push( capsule ); };

		if (position == "right"){ rightMenu.push( capsule ); };

		const group = new THREE.Group();

		group.add( text );
		group.add( capsule );

    group.on("click", (event) => {
      clickFunction();
      if (url){ openUrl(url) };
      // transformControls.attach( group );
      // modelsScene.add( transformControls );
    });


		group.position.x = point.x;
		group.position.y = point.y;
		group.position.z = point.z;

    s.add(group);

	});
};
