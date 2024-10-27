window.addEventListener('resize', onWindowResize, false);
function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
	renderer.setSize( window.innerWidth, window.innerHeight );
	backgroundMaterial.uniforms.resolution.value = new THREE.Vector2(grassCanvas.width, grassCanvas.height);
	camera.fov = FOV;
	camera.updateProjectionMatrix();
	backgroundMaterial.uniforms.fov.value = FOV;

  modelsCamera.aspect = window.innerWidth / window.innerHeight;
  modelsCamera.updateProjectionMatrix();
  modelsRenderer.setSize( window.innerWidth, window.innerHeight );

  aspect = window.innerWidth / window.innerHeight;

  menuCamera.left = fs * aspect / - 2;
  menuCamera.right = fs * aspect / 2;
  menuCamera.top = fs / 2;
  menuCamera.bottom = - fs / 2;

  menuCamera.updateProjectionMatrix();
  menuRenderer.setSize( window.innerWidth, window.innerHeight );

}
