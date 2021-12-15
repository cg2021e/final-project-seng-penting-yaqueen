import LoadedObjects from './LoadedObjects'

export default class Doge extends LoadedObjects {
	constructor (scene) {
		super('./GLTF/doge.glb', scene)
	}
}
