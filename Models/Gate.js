import LoadedObjects from './LoadedObjects.js'

export default class Gate extends LoadedObjects {
    constructor(scene) {
        super('./GLTF/gate.glb', scene)
        this.isMoving = false
        this.targetIsOpen = false //otherwise close
    }

    setOpenClosePosition() {
        this.closePosition = this.object.position.clone()
        this.openPosition = this.object.position.clone()
        this.openPosition.y += 2.34945
    }

    openGate() {
        this.object.position.lerp(this.openPosition, 0.01)
    }

    closeGate() {
        this.object.position.lerp(this.closePosition, 0.01)
    }

    update() {
        if (this.targetIsOpen)
            this.openGate()
        else
            this.closeGate()
    }
}
