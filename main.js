let container = document.getElementById('container')
let camera, scene, renderer

//object
let cube
let point

init()
animate()

function init () {
	scene = new THREE.Scene()
	initCamera()
	initRenderer()
	initCube()

	let light = new THREE.PointLight(0xffffff)
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

function initCube () {
	let geometry = new THREE.BoxGeometry(1, 1, 1)
	let material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
	cube = new THREE.Mesh(geometry, material)
	scene.add(cube)
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
	cube.rotation.y += 0.05

	renderer.render(scene, camera)
}

function animate () {
	update()
	requestAnimationFrame(animate)
}
