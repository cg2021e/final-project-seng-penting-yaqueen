export default class MovementControl {
	constructor (camera, domElement) {
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

		control.addEventListener('lock', function () {
			menu.style.display = 'none'
		})

		control.addEventListener('unlock', function () {
			menu.style.display = 'block'
		})

		const onKeyDown = function (event) {
			if (event.code == 'KeyW'){
				control.moveForward(.125)
			}
			else if (event.code == 'KeyA'){
				control.moveRight(-.125)
			}
			else if (event.code == 'KeyS'){
				control.moveForward(-.125)
			}
			else if (event.code == 'KeyD'){
				control.moveRight(.125)
			}
		}
		document.addEventListener('keydown', onKeyDown, false)
	}

}
