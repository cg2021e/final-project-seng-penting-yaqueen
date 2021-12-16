import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class Batman extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/object_batman.glb', scene)
        this.mixers = []
    }
}
