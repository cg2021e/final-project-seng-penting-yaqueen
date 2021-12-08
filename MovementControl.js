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
			switch (event.code) {
				case 'KeyW':
					control.moveForward(.125)
					break
				case 'KeyA':
					control.moveRight(-.125)
					break
				case 'KeyS':
					control.moveForward(-.125)
					break
				case 'KeyD':
					control.moveRight(.125)
					break
			}
			if (event.code == 'KeyW'){
				control.moveForward(.125)
			}
		}
		document.addEventListener('keydown', onKeyDown, false)
	}

}
