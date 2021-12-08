import LoadedObjects from './LoadedObjects.js'

export default class Room extends LoadedObjects {
	constructor (scene) {
		super('./GLTF/models.glb', scene, () => {
			this.object.position.y -= 2
		})
	}
}
