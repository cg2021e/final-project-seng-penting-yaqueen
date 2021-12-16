import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class Creeper extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/creeper.glb', scene)
        this.mixers = []
    }
}