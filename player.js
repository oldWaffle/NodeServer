class Player {
    constructor() {
        this.position = {
            x: 500 * Math.random(),
            y: 300 * Math.random(),
        }
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.input = {
            w: false,
            a: false,
            s: false,
            d: false,
        }

        this.speed = 2
        this.gravity = 2
        this.maxFallVelocity = 10
        this.jumping = false
        this.sequenceNumber = 0
    }

    update() {
        this.applyGravity()
        this.handleInput()
        this.checkForCollisions()
    }

    handleInput() {
        if (this.input.w) {
            this.position.y -= 10
            this.jumping = true
        } else this.jumping = false
        if (this.input.a) {
            this.position.x -= this.speed
        }
        if (this.input.s) {
            this.position.y += this.speed
        }
        if (this.input.d) {
            this.position.x += this.speed
        }
    }

    applyGravity() {
        if (this.jumping) return
        if (this.maxFallVelocity > this.velocity.y) this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    checkForCollisions() {
        if (this.position.y + 32 > 1080) {
            this.position.y = 1080 - 32
            this.velocity.y = 0
        }
    }
}

module.exports = {
    Player,
}