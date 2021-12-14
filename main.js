import Room from './Models/Room.js'
import Gate from './Models/Gate.js'
import MovementControl from './MovementControl.js'
import TripWire from './TripWire.js'

let container = document.getElementById('container')
let camera, scene, renderer

let gateTrigger
let innerTrigger

//objects
let gate

await init()
animate()

async function init() {
    scene = new THREE.Scene()
    initCamera()
    initRenderer()
    initLight()

    let control = new MovementControl(camera, renderer.domElement)

    //LoadObjects
    let room = new Room(scene)
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
    camera.position.set(0, 0, -25)
    camera.rotation.y += Math.PI

    //camera body
    let material = new THREE.MeshBasicMaterial({color: 0xff0000})
    let box = new THREE.BoxGeometry()

    let boxMesh = new THREE.Mesh(box, material)
    camera.add(boxMesh)
}

function update() {
    renderer.render(scene, camera)

    gate.update()
    gate.targetIsOpen = gateTrigger.isIntersecting(camera.children[0]);
}

function animate() {
    update()
    requestAnimationFrame(animate)
}
