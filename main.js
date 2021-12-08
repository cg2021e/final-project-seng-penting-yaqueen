import Room from './Models/Room.js'

let container = document.getElementById('container')
let camera, scene, renderer, control

//object
let cube
let point

init()
animate()

function init () {
	scene = new THREE.Scene()
	initCamera()
	initRenderer()
	initLight()

	control = new THREE.OrbitControls(camera, renderer.domElement)
	control.enableZoom = false

	new Room('./GLTF/models.glb', scene)

}

function initLight () {
	let light = new THREE.PointLight(0x404040)
	light.position.set(5, 5, 5)
	scene.add(light)

	let ambient = new THREE.AmbientLight(0x404040)
	scene.add(ambient)

}

function initRenderer () {
	renderer = new THREE.WebGLRenderer()
	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)
	container.appendChild(renderer.domElement)
}

function initCamera () {
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		1,
		1100,
	)
	camera.position.set(0, 0, 5)
}

function update () {

	control.update()
	renderer.render(scene, camera)
}

function animate () {
	update()
	requestAnimationFrame(animate)
}
