import LoadedObjects from './LoadedObjects'

export default class Cheems extends LoadedObjects {
	constructor (scene) {
		super('./GLTF/cheems.glb', scene)
	}
}