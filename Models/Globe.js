import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class Globe extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/globe.glb', scene)
        this.mixers = []
    }

    load() {
        super.load().then(() => {
            this.scene.add(this.object)

            this.animations.forEach((clip) => {
                let mixer = new THREE.AnimationMixer(this.object)
                this.mixers.push(mixer)
                mixer.clipAction(clip).play()
            })

            this.object.scale.set(.4, .4, .4)
            this.object.rotation.y += 1 / 2 * Math.PI
            this.object.position.set(-3, -1, 6)
        })
    }
}
