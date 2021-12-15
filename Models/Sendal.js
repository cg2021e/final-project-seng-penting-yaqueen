import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class Sendal extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/sendal.glb', scene)
        this.mixers = []
    }

}
