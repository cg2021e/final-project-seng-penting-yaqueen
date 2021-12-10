export default class TripWire {
    constructor(scene, objects, startPoint, endPoint, debug = true) {
        this.scene = scene
        this.objects = objects
        this.startPoint = startPoint
        this.endPoint = endPoint
        this.debug = debug

        this.raycaster = this.createRaycaster()

        if (debug) this.showDebugHelper()
    }

    createRaycaster() {
        return new THREE.Raycaster(this.startPoint, this.calculateDirection())
    }

    calculateDirection() {
        return new THREE.Vector3(
            this.endPoint.x - this.startPoint.x,
            this.endPoint.y - this.startPoint.y,
            this.endPoint.z - this.startPoint.z
        ).normalize()
    }

    showDebugHelper() {
        this.boxHelper()
        this.lineHelper()
    }

    lineHelper() {
        const material = new THREE.LineBasicMaterial({
            color: 0x0000ff,
        })

        const points = []
        points.push(this.startPoint.clone())
        points.push(
            new THREE.Vector3(
                (this.startPoint.x + this.endPoint.x) / 2,
                (this.startPoint.y + this.endPoint.y) / 2,
                (this.startPoint.z + this.endPoint.z) / 2
            )
        )
        points.push(this.endPoint.clone())

        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        const line = new THREE.Line(geometry, material)
        this.scene.add(line)
    }

    boxHelper() {
        let material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

        let startBoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        let startBox = new THREE.Mesh(startBoxGeometry, material)
        startBox.position.set(
            this.startPoint.x,
            this.startPoint.y,
            this.startPoint.z
        )

        this.scene.add(startBox)

        let endBoxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
        let endBox = new THREE.Mesh(endBoxGeometry, material)
        endBox.position.set(this.endPoint.x, this.endPoint.y, this.endPoint.z)

        this.scene.add(endBox)
    }

    isIntersecting(object) {
        const intersects = this.raycaster.intersectObject(object)

        return intersects.length > 0
    }
}
