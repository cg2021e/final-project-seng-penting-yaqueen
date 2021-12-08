import Room from './Models/Room.js'
import MovementControl from './MovementControl.js'

let container = document.getElementById('container')
let camera, scene, renderer

init()
animate()

function init() {
    scene = new THREE.Scene()
    initCamera()
    initRenderer()
    initLight()

    let control = new MovementControl(camera, renderer.domElement)

    new Room(scene)
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
}

function update() {
    renderer.render(scene, camera)
}

function animate() {
    update()
    requestAnimationFrame(animate)
}
