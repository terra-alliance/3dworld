var time = 0;
var lastFrame = Date.now();
var thisFrame;
var dT = 0;
var menu = document.getElementById("menu");

function animate(){
	stats.begin();

	//Update time
	thisFrame = Date.now();
	dT = (thisFrame - lastFrame)/200.0;
	time += dT;

	lastFrame = thisFrame;

  grassMaterial.uniforms.time.value = time / 2;

	renderer.clear();
	// renderer.render(backgroundScene, camera);
	renderer.render(scene, camera);

	var baseRotation = 0.01;
	valences.forEach(function(v, i){
		v.rotation.y += baseRotation - (i * 0.001);
		v.rotation.x += baseRotation - (i * 0.001);
		v.rotation.z += baseRotation - (i * 0.001);
	});


	const t = performance.now();
  if ( modelsControls.isLocked === true ) {
		move(dT);
    raycaster.ray.origin.copy( modelsControls.getObject().position );
    raycaster.ray.origin.y -= 10;
    const intersections = raycaster.intersectObjects( objects, false );
    const onObject = intersections.length > 0;
    const delta = ( t - pt ) / 1000;
    velocity.x -= velocity.x * 20 * delta;
    velocity.z -= velocity.z * 20 * delta;
    velocity.y -= 9.8 * 100 * delta; // 100.0 = mass
    direction.z = Number( forward ) - Number( backward );
    direction.x = Number( right ) - Number( left );
    direction.normalize(); // this ensures consistent movements in all directions
    if ( forward || backward ) velocity.z -= direction.z * 500 * delta;
    if ( left || right ) velocity.x -= direction.x * 500 * delta;
    if ( onObject === true ) {
      velocity.y = Math.max( 0, velocity.y );
      canJump = true;
    };
    modelsControls.moveRight( - velocity.x * delta );
    modelsControls.moveForward( - velocity.z * delta );
    // modelsControls.getObject().position.y += ( velocity.y * delta ); // new behavior
    // if ( modelsControls.getObject().position.y < 10 ) {
    //   velocity.y = 0;
    //   modelsControls.getObject().position.y = 10;
    //   canJump = true;
    // };
  };
  pt = t;

	if ( modelsControls.isLocked !== true ) { menu.style.display = "block" } else { menu.style.display = "none" };
	if ( modelsControls.isLocked !== true ) { divTarget.style.display = "none" } else { divTarget.style.display = "block" };

	menuRenderer.render(menuScene, menuCamera);
	modelsRenderer.render(modelsScene, modelsCamera);

  stats.end();
  requestAnimationFrame(animate);
}

animate();
