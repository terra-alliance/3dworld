let raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
var interaction = new THREE.Interaction(modelsRenderer, modelsScene, modelsCamera);
var interaction = new THREE.Interaction(modelsRenderer, menuScene, menuCamera);

// var controls = new THREE.PointerLockControls( camera, document.body );
// var modelsControls = new THREE.PointerLockControls( modelsCamera, modelsCanvas );
var controls = new THREE.PointerLockControls( camera, modelsCanvas );
var modelsControls = new THREE.PointerLockControls( modelsCamera, modelsCanvas );

var transformControls = new THREE.TransformControls( modelsCamera, modelsRenderer.domElement );

// transformControls.addEventListener( 'change', render );

var forward = false;
var backward = false;
var left = false;
var right = false;
var canJump = false;

let divTarget = document.createElement("div");
divTarget.style.width = "5px";
divTarget.style.height = "5px";
divTarget.style.background = "red";
divTarget.style.position = "absolute";
divTarget.style.top = "0";
divTarget.style.left = "0";
divTarget.style.right = "0";
divTarget.style.bottom = "0";
divTarget.style.margin = "auto";
divTarget.style.zIndex = "99";
divTarget.style.borderRadius = "50%";
divTarget.style.display = "none";
document.body.appendChild(divTarget);

const objects = [];
let pt = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();

const onKeyDown = ( event ) => {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      forward = true;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      left = true;
      break;

    case 'ArrowDown':
    case 'KeyS':
      backward = true;
      break;

    case 'ArrowRight':
    case 'KeyD':
      right = true;
      break;

    case 'Space':
      if ( canJump === true ) velocity.y += 200;
      canJump = false;
      if (type < 9) {type += 1} else {type = 0};
      break;

    };
};

const onKeyUp = ( event ) => {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      forward = false;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      left = false;
      break;

    case 'ArrowDown':
    case 'KeyS':
      backward = false;
      break;

    case 'ArrowRight':
    case 'KeyD':
      right = false;
      break;
    };
};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );
