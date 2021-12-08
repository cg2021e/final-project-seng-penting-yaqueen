export default class LoadedObjects {
	constructor (modelPath, scene, onLoad) {
		this.loader = new THREE.GLTFLoader()

		this.loader.load(modelPath,
			(loadedGLTF) => {
				this.object = loadedGLTF.scene
				scene.add(this.object)
				onLoad()
			})
	}
}
