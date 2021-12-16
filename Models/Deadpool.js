import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class Deadpool extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/object_deadpool.glb', scene)
        this.mixers = []
    }
}
