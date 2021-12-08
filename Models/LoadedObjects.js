export default class LoadedObjects {
	constructor (modelPath, scene, onLoad) {
		this.loader = new THREE.GLTFLoader()

		this.loader.load('./GLTF/models.glb',
			(loadedGLTF) => {
				this.object = loadedGLTF.scene
				scene.add(this.object)
				onLoad()
			})
	}
}