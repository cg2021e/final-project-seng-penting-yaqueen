import * as THREE from 'three'
import ThreeMeshUI from 'three-mesh-ui'
import Room from './Models/Room.js'
import Gate from './Models/Gate.js'
import MovementControl from './MovementControl.js'
import TripWire from './TripWire.js'
import Monobloc from './Models/Monobloc.js'
import NagaIndosiar from './Models/NagaIndosiar'
import Enderman from './Models/Enderman.js'
import Doge from './Models/Doge'
import Cheems from './Models/Cheems'
import Sendal from './Models/Sendal.js'
import Globe from './Models/Globe.js'
import Gudetama from './Models/Gudetama.js'
import Batman from './Models/Batman.js'
import Deadpool from './Models/Deadpool.js'
import Creeper from './Models/Creeper.js'
import Ironmanto from './Models/Ironmanto.js'


(async () => {
	let container = document.getElementById('container')
	let camera, scene, renderer
	let clock = new THREE.Clock()

	let gateTrigger

//objects
	let room
	let gate
	let monobloc
	let nagaIndosiar
	let enderman
	let sendal
	let globe
	let gudetama
	let deadpool
	let batman
	let creeper
	let ironmanto

	await init()
	animate()

	function initMovementControl() {
		new MovementControl(camera, renderer.domElement)
	}

	async function init () {
		scene = new THREE.Scene()
		initCamera()
		initRenderer()
		initLight()
		initMovementControl();

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

		await initMonobloc()

		await initMagic()

		await initNagaIndosiar()

		await initDogeAndCheems()

		await initGlobe()

		await initSendal()

		await initGudetama()

		await initBatman()

		await initDeadpool()

		await initEnderman()

		await initCreeper()

		await initIronmanto()


		const mjolnirText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		mjolnirText.position.set(-2, .5, -12.75)
		mjolnirText.rotation.y = 180 * Math.PI / 180
		scene.add(mjolnirText)

		//

		mjolnirText.add(new ThreeMeshUI.Text({
			content: 'Thorjiman Was Here !!',
			fontSize: 0.1
		}),)
	}

	function initLight () {
		let directionalLightTop = new THREE.DirectionalLight(0xffffff, 0.4)
		scene.add(directionalLightTop)
		let directionalLightDown = new THREE.DirectionalLight(0xffffff, 0.4)
		directionalLightDown.position.set(0,-1,0);
		scene.add(directionalLightDown)
		let directionalLightBack = new THREE.DirectionalLight(0xffffff, 0.4)
		directionalLightBack.position.set(0,0,1);
		scene.add(directionalLightBack)
		let directionalLightFront = new THREE.DirectionalLight(0xffffff, 0.4)
		directionalLightFront.position.set(0,0,-1);
		scene.add(directionalLightFront)
		let directionalLightLeft = new THREE.DirectionalLight(0xffffff, 0.4)
		directionalLightLeft.position.set(-1,0,);
		scene.add(directionalLightLeft)
		let directionalLightRight = new THREE.DirectionalLight(0xffffff, 0.4)
		directionalLightRight.position.set(1,0,);
		scene.add(directionalLightRight)

		let spawnLight = new THREE.PointLight(0x6a6a6a)
		spawnLight.position.set(0, 0, -25)
		scene.add(spawnLight)

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
		// camera.positioon.set(0, 0, -10)
		camera.position.set(0, 0, -25)
		camera.rotation.y += Math.PI

		//camera body
		let material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
		let box = new THREE.BoxGeometry()

		let boxMesh = new THREE.Mesh(box, material)
		camera.add(boxMesh)
	}

	function update () {
		renderer.render(scene, camera)

		nagaIndosiar.mixers.forEach(mixer => mixer.update(clock.getDelta()))
		gate.update()
		ThreeMeshUI.update()
		gate.targetIsOpen = gateTrigger.isIntersecting(camera.children[0])
	}

	function animate () {
		update()
		requestAnimationFrame(animate)
	}

	async function initMonobloc () {
		monobloc = new Monobloc(scene)
		await monobloc.load()
		scene.add(monobloc.object)
		monobloc.object.position.y = -0.85
		monobloc.object.rotation.y += Math.PI

		const monoblocText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		monoblocText.position.set(0, -.35, -.70)
		monoblocText.rotation.y = 180 * Math.PI / 180
		monoblocText.rotation.x = 15 * Math.PI / 180
		scene.add(monoblocText)

		monoblocText.add(new ThreeMeshUI.Text({
			content: 'https://intip.in/monobloc',
			fontSize: 0.1
		}),)
	}

	async function initMagic () {
		const magicText = new ThreeMeshUI.Block({
			width: 20,
			height: 1,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		magicText.position.set(0, 0, 30)
		magicText.rotation.y = 180 * Math.PI / 180
		scene.add(magicText)

		magicText.add(new ThreeMeshUI.Text({
			content: 'https://intip.in/sengpentingyaqueen',
			fontSize: 0.75
		}),)

		const anotherMagicText = new ThreeMeshUI.Block({
			width: 2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		anotherMagicText.position.set(0, 0, -20)
		anotherMagicText.rotation.y = 180 * Math.PI / 180
		scene.add(anotherMagicText)

		anotherMagicText.add(new ThreeMeshUI.Text({
			content: 'Greatness Lies Beyond The Limit',
			fontSize: 0.1
		}),)
	}

	async function initNagaIndosiar () {
		nagaIndosiar = new NagaIndosiar(scene)
		await nagaIndosiar.load()

		const nagaIndosiarText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		nagaIndosiarText.position.set(0, -.85, -8)
		nagaIndosiarText.rotation.y = 180 * Math.PI / 180
		nagaIndosiarText.rotation.x = 15 * Math.PI / 180
		scene.add(nagaIndosiarText)

		nagaIndosiarText.add(new ThreeMeshUI.Text({
			content: 'Naga Indosiar But Slightly Better!!!',
			fontSize: 0.1
		}),)
	}

	async function initSendal(){
		sendal = new Sendal(scene)
		await sendal.load()
		scene.add(sendal.object)
		sendal.object.position.set (11, -1, -5)
		sendal.object.rotation.y += (90*Math.PI)/180
		sendal.object.scale.set (.6,.6,.6)

		const sendalText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		sendalText.position.set(9, -.6, -5)
		sendalText.rotation.y -= 90 * Math.PI / 180
		sendalText.rotation.x = 15 * Math.PI / 180
		sendalText.rotation.z = 15 * Math.PI / 180
		scene.add(sendalText)

		sendalText.add(new ThreeMeshUI.Text({
			content: 'This is not a weapon',
			fontSize: 0.1
		}),)
	}

	async function initGlobe(){
		globe = new Globe(scene)
		await globe.load()
		scene.add(globe.object)
		globe.object.position.set(10, -1, -1)
		globe.object.position.y = -0.85
		globe.object.rotation.y += Math.PI

		const globeText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		globeText.position.set(9, -.6, -1)
		globeText.rotation.y -= 90 * Math.PI / 180
		globeText.rotation.x = 15 * Math.PI / 180
		globeText.rotation.z = 15 * Math.PI / 180
		scene.add(globeText)

		globeText.add(new ThreeMeshUI.Text({
			content: 'This is not flat earth',
			fontSize: 0.1
		}),)
	}

	async function initBatman(){
		batman = new Batman(scene)
		await batman.load()
		scene.add(batman.object)
		batman.object.position.set (5, -1, 3)
		batman.object.rotation.y += (180*Math.PI)/180
		batman.object.scale.set (.6,.6,.6)

		const batmanText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		batmanText.position.set(5, -0.6, 2)
		batmanText.rotation.y = 180 * Math.PI / 180
		batmanText.rotation.x = 15 * Math.PI / 180
		scene.add(batmanText)

		batmanText.add(new ThreeMeshUI.Text({
			content: 'What if i told you that im batmanto',
			fontSize: 0.1
		}),)

	}

	async function initDeadpool(){
		deadpool = new Deadpool(scene)
		await deadpool.load()
		scene.add(deadpool.object)
		deadpool.object.position.set (-5, -1, 3)
		deadpool.object.rotation.y += (90*Math.PI)/180
		deadpool.object.scale.set (.6,.6,.6)

		const deadpoolText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		deadpoolText.position.set(-5, -0.6, 2)
		deadpoolText.rotation.y = 180 * Math.PI / 180
		deadpoolText.rotation.x = 15 * Math.PI / 180
		scene.add(deadpoolText)

		deadpoolText.add(new ThreeMeshUI.Text({
			content: 'I am udinpool and i approve this meme war',
			fontSize: 0.1
		}),)
	}

	async function initIronmanto(){
		ironmanto = new Ironmanto(scene)
		await ironmanto.load()
		scene.add(ironmanto.object)
		ironmanto.object.position.set (0, -1, 6)
		ironmanto.object.rotation.y += (180*Math.PI)/180
		ironmanto.object.scale.set (.6,.6,.6)

		const ironmantoText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		ironmantoText.position.set(0, -0.6, 5)
		ironmantoText.rotation.y = 180 * Math.PI / 180
		ironmantoText.rotation.x = 15 * Math.PI / 180
		scene.add(ironmantoText)

		ironmantoText.add(new ThreeMeshUI.Text({
			content: 'Odading Mang Oleh',
			fontSize: 0.1
		}),)
	}

	async function initDogeAndCheems () {
		let doge = new Doge(scene)
		await doge.load()
		scene.add(doge.object)
		doge.object.position.set(10, -1, -10)
		doge.object.rotation.y -= 130 * Math.PI / 180
		doge.object.scale.set(.7, .7, .7)

		const DogeText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.3,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		DogeText.position.set(9, -.5, -10)
		DogeText.rotation.y -= 90 * Math.PI / 180
		DogeText.rotation.x = 15 * Math.PI / 180
		DogeText.rotation.z = 15 * Math.PI / 180
		scene.add(DogeText)

		DogeText.add(new ThreeMeshUI.Text({
			content: 'Coding 3D in WEBGL \n Coding Level : 100',
			fontSize: 0.1
		}),)

		let cheems = new Cheems(scene)
		await cheems.load()
		scene.add(cheems.object)
		cheems.object.position.set(10, -1, -8)
		cheems.object.rotation.y -= 110 * Math.PI / 180
		cheems.object.scale.set(.7, .7, .7)

		const CheemsText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.3,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		CheemsText.position.set(9, -.5, -8)
		CheemsText.rotation.y -= 90 * Math.PI / 180
		CheemsText.rotation.x = 15 * Math.PI / 180
		CheemsText.rotation.z = 15 * Math.PI / 180
		scene.add(CheemsText)

		CheemsText.add(new ThreeMeshUI.Text({
			content: 'Coding 3D in THREE JS with GLTF Loader \n Coding Level : -100',
			fontSize: 0.1
		}),)
	}

	async function initEnderman(){
		enderman = new Enderman(scene)
		await enderman.load()
		scene.add(enderman.object)
		enderman.object.position.set (8, -1, 9)
		enderman.object.rotation.y += (90*Math.PI)/180
		enderman.object.scale.set (.6,.6,.6)

		const endermanText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		endermanText.position.set(8, -0.6, 8)
		endermanText.rotation.y = 180 * Math.PI / 180
		endermanText.rotation.x = 15 * Math.PI / 180
		scene.add(endermanText)

		endermanText.add(new ThreeMeshUI.Text({
			content: 'Wanna have a staring contest?',
			fontSize: 0.1
		}),)
	}

	async function initGudetama(){
		gudetama = new Gudetama(scene)
		await gudetama.load()
		scene.add(gudetama.object)
		gudetama.object.position.set(-10, -1, -6)
		gudetama.object.position.y = -0.85
		gudetama.object.rotation.y += Math.PI
		gudetama.object.scale.set(.6, .6, .6)

		const gudetamaText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		gudetamaText.position.set(-10, .6, -6)
		gudetamaText.rotation.y -= 270 * Math.PI / 180
		gudetamaText.rotation.x = 195 * Math.PI / 180
		gudetamaText.rotation.z = 165 * Math.PI / 180
		scene.add(gudetamaText)

		gudetamaText.add(new ThreeMeshUI.Text({
			content: 'Me, Every Morning.\nHate Monday.',
			fontSize: 0.1
		}),)
	}

	async function initCreeper(){
		creeper = new Creeper(scene)
		await creeper.load()
		scene.add(creeper.object)
		creeper.object.position.set(-8, -1, 9)
		creeper.object.rotation.y += Math.PI
		creeper.object.scale.set(.6, .6, .6)

		const creeperText = new ThreeMeshUI.Block({
			width: 1.2,
			height: 0.2,
			padding: 0.05,
			justifyContent: 'center',
			alignContent: 'center',
			fontFamily: './fonts/Roboto-msdf.json',
			fontTexture: './fonts/Roboto-msdf.png',
		})

		creeperText.position.set(-8, -0.6, 8)
		creeperText.rotation.y = 180 * Math.PI / 180
		creeperText.rotation.x = 15 * Math.PI / 180
		scene.add(creeperText)

		creeperText.add(new ThreeMeshUI.Text({
			content: 'AW MAN',
			fontSize: 0.1
		}),)
	}
})()
