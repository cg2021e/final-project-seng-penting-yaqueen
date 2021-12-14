import LoadedObjects from './LoadedObjects.js'

export default class Monobloc extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/Monobloc_Chair_Exhibit.glb', scene)
    }
}
