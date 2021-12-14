import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import loadGLTF from '../AsyncLoader.js'

export default class LoadedObjects {
	constructor (modelPath, scene) {
		this.loader = new GLTFLoader()
		this.modelPath = modelPath
		this.scene = scene
	}

	async load () {
		let gltf = await loadGLTF(this.modelPath, this.loader)
		this.object = gltf.scene
		this.animations = gltf.animations
	}
}
