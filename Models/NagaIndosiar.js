import * as THREE from 'three'
import LoadedObjects from './LoadedObjects.js'

export default class NagaIndosiar extends LoadedObjects {
	constructor (scene) {
		super('./GLTF/dragon.glb', scene)
		this.mixers = []
	}

	load () {
		super.load().then(() => {
			this.scene.add(this.object)

			this.animations.forEach((clip) => {
				let mixer = new THREE.AnimationMixer(this.object)
				this.mixers.push(mixer)
				mixer.clipAction(clip).play()
			})

			this.object.scale.set(.4, .4, .4)
			this.object.rotation.y += Math.PI
			this.object.position.set(0, -1, -6)
		})
	}
}
