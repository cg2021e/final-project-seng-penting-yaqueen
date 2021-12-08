import LoadedObjects from './LoadedObjects.js'

export default class Room extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/gate.glb', scene)
    }
}
