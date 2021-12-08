export default class LoadedObjects {
	constructor (modelPath, scene) {
		this.loader = new THREE.GLTFLoader()

		this.loader.load('./GLTF/models.glb',
			(loadedGLTF) => {
				scene.add(loadedGLTF.scene)
			})
	}
}