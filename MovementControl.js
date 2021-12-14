export default class MovementControl {
    constructor(camera, domElement) {
        let movementLocked = true
        const startButton = document.getElementById('startButton')
        let menu = document.getElementById('menuPanel')
        let control = new THREE.PointerLockControls(camera, domElement)
        startButton.addEventListener(
            'click',
            function () {
                control.lock()
            },
            false
        )
        // menu.style.display = 'none'

        control.addEventListener('lock', function () {
            movementLocked = false;
            menu.style.display = 'none'
        })

        control.addEventListener('unlock', function () {
            movementLocked = true;
            menu.style.display = 'block'
        })

        const onKeyDown = function (event) {
            if (!movementLocked) {
                if (event.code == 'KeyW') {
                    control.moveForward(.125)
                }
                if (event.code == 'KeyA') {
                    control.moveRight(-.125)
                }
                if (event.code == 'KeyS') {
                    control.moveForward(-.125)
                }
                if (event.code == 'KeyD') {
                    control.moveRight(.125)
                }
            }
        }

        document.addEventListener('keydown', onKeyDown, false)
    }

}
