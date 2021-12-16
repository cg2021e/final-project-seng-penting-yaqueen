import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class Enderman extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/enderman.glb', scene)
        this.mixers = []
    }
}
