class FrontEndPlayer {
    constructor({ position, speed }) {
        this.position = position
        this.speed = speed
    }

    update() {
        this.applyGravity()
        this.predictPlayerCollisions()
    }

    applyGravity() {

    }

    predictPlayerCollisions() {
        if (this.position.y + 32 > 1080) this.position.y = 1080 - 32
    }
}