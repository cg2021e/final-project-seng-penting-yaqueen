import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class Ironmanto extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/object_ironman.glb', scene)
        this.mixers = []
    }
}
