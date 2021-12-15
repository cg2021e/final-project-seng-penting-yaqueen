import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class Gudetama extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/lazy_gudetama.glb', scene)
        this.mixers = []
    }
}
