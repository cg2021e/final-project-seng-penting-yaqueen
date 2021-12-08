import loadGLTF from '../AsyncLoader.js'

export default class LoadedObjects {
    constructor(modelPath, scene) {
        this.loader = new THREE.GLTFLoader()
        this.modelPath = modelPath
        this.scene = scene
    }

    async load() {
        let gltf = await loadGLTF(this.modelPath, this.loader)
        this.object = gltf.scene
    }
}
