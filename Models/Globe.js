import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class Globe extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/globe.glb', scene)
        this.mixers = []
    }


}
