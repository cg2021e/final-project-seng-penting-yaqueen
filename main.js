import Room from './Models/Room.js'
import Gate from './Models/Gate.js'
import MovementControl from './MovementControl.js'
import TripWire from './TripWire.js'
import Monobloc from './Models/Monobloc.js'
import ReceptionTable from './Models/ReceptionTable.js'

(async () => {
	let container = document.getElementById('container')
	let camera, scene, renderer

	let gateTrigger
	let innerTrigger

//objects
	let room
	let gate
	let monobloc

	await init()
	animate()

	async function init () {
		scene = new THREE.Scene()
		initCamera()
		initRenderer()
		initLight()

		let control = new MovementControl(camera, renderer.domElement)

		//LoadObjects
		room = new Room(scene)
		await room.load()
		scene.add(room.object)
		room.object.position.y = -2

		gate = new Gate(scene)
		await gate.load()
		scene.add(gate.object)
		gate.object.position.y = -2
		gate.setOpenClosePosition()

		gateTrigger = new TripWire(
			scene,
			gate.object,
			new THREE.Vector3(0, 0, -15),
			new THREE.Vector3(0, 0, -10),
			false
		)

		monobloc = new Monobloc(scene)
		await monobloc.load()
		scene.add(monobloc.object)
		monobloc.object.position.y = -0.85
		monobloc.object.rotation.y += Math.PI

		let receptionTable = new ReceptionTable(scene)
		await receptionTable.load()
		receptionTable.object.scale.set(.3, .3, .3)
		receptionTable.object.position.set(0, -1, -8)
		scene.add(receptionTable.object)

		let receptionLeftLight = new THREE.PointLight(0x404040)
		receptionLeftLight.position.set(-1, 0, -9)
		scene.add(receptionLeftLight)
		let receptionRightLight = new THREE.PointLight(0x404040)
		receptionRightLight.position.set(1, 0, -9)
		scene.add(receptionRightLight)

		let mjolnirLight = new THREE.PointLight(0x404040)
		mjolnirLight.position.set(-1.3, 0, -14)
		scene.add(mjolnirLight)
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
			0.1,
			1100
		)
		camera.position.set(0, 0, -10)
		camera.rotation.y += Math.PI

		//camera body
		let material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
		let box = new THREE.BoxGeometry()

		let boxMesh = new THREE.Mesh(box, material)
		camera.add(boxMesh)
	}

	function update () {
		renderer.render(scene, camera)

		gate.update()
		gate.targetIsOpen = gateTrigger.isIntersecting(camera.children[0])
	}

	function animate () {
		update()
		requestAnimationFrame(animate)
	}
})()
