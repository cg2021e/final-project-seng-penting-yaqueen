import * as THREE from 'three'
import ThreeMeshUI from 'three-mesh-ui'
import Room from './Models/Room.js'
import Gate from './Models/Gate.js'
import MovementControl from './MovementControl.js'
import TripWire from './TripWire.js'
import Monobloc from './Models/Monobloc.js'
import NagaIndosiar from './Models/NagaIndosiar'
import Enderman from './Models/Enderman.js'


(async () => {
    let container = document.getElementById('container')
    let camera, scene, renderer
    let clock = new THREE.Clock()

    let gateTrigger
    let innerTrigger

//objects
    let room
    let gate
    let monobloc
    let nagaIndosiar
    let enderman

    await init()
    animate()

    async function init() {
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

        await initMonobloc();

        await initMagic();

        enderman = new Enderman(scene)
        await enderman.load()

        let endermLight = new THREE.PointLight(0x404040)
        endermLight.position.set(0, 4, 6)
        scene.add(endermLight)

        nagaIndosiar = new NagaIndosiar(scene)
        await nagaIndosiar.load()

        let nagaLight = new THREE.PointLight(0x404040)
        nagaLight.position.set(0, -.5, -6)
        scene.add(nagaLight)

        let mjolnirLight = new THREE.PointLight(0x404040)
        mjolnirLight.position.set(-1.3, 0, -14)
        scene.add(mjolnirLight)

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
            content: 'Thor Was Here !!',
            fontSize: 0.1
        }),)
    }

    function initLight() {
        let light = new THREE.PointLight(0x404040)
        light.position.set(5, 5, 5)
        scene.add(light)

        let ambient = new THREE.AmbientLight(0x404040)
        scene.add(ambient)
    }

    function initRenderer() {
        renderer = new THREE.WebGLRenderer()
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)
        container.appendChild(renderer.domElement)
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1100
        )
        camera.position.set(0, 0, -10)
        camera.rotation.y += Math.PI

        //camera body
        let material = new THREE.MeshBasicMaterial({color: 0xff0000})
        let box = new THREE.BoxGeometry()

        let boxMesh = new THREE.Mesh(box, material)
        camera.add(boxMesh)
    }

    function update() {
        renderer.render(scene, camera)

        nagaIndosiar.mixers.forEach(mixer => mixer.update(clock.getDelta()))
        gate.update()
        ThreeMeshUI.update()
        gate.targetIsOpen = gateTrigger.isIntersecting(camera.children[0])
    }

    function animate() {
        update()
        requestAnimationFrame(animate)
    }

    async function initMonobloc() {
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

    async function initMagic() {
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
        magicText.rotation.x = 15 * Math.PI / 180
        scene.add(magicText)

        magicText.add(new ThreeMeshUI.Text({
            content: 'https://intip.in/sengpentingyaqueen',
            fontSize: 0.75
        }),)
    }
})()
