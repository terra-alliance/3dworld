sky = new THREE.Sky();
sky.scale.setScalar( 450000 );
scene.add( sky );

sun = new THREE.Vector3();

/// GUI

const effectController = {
	turbidity: 10,
	rayleigh: 0.3,
	mieCoefficient: 0.005,
	mieDirectionalG: 0.7,
	elevation: 90,
	azimuth: 180,
	exposure: renderer.toneMappingExposure
};

function guiChanged() {

	const uniforms = sky.material.uniforms;
	uniforms[ 'turbidity' ].value = effectController.turbidity;
	uniforms[ 'rayleigh' ].value = effectController.rayleigh;
	uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
	uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;

	const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
	const theta = THREE.MathUtils.degToRad( effectController.azimuth );

	sun.setFromSphericalCoords( 1, phi, theta );

	uniforms[ 'sunPosition' ].value.copy( sun );

	renderer.toneMappingExposure = effectController.exposure;
	renderer.render( scene, camera );

}

const gui = new dat.GUI();

gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
gui.add( effectController, 'elevation', -90, 90, 0.1 ).onChange( guiChanged );
gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );
guiChanged();
gui.close();
