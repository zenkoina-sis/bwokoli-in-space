const canvas = document.createElement("CANVAS")
const ctx = canvas.getContext('2d')

document.body.appendChild(canvas)
canvas.width = innerWidth
canvas.height = innerHeight

let mouseX
let mouseY
let stars = []

class Star {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = 1
        this.lifetime = 180
    }

    update() {
        this.lifetime -= 1
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fillStyle = 'white'
        ctx.fill()
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let size = 100
    for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].update()
        stars[i].draw()
        if (stars[i].lifetime <= 0) {
            stars.splice(i, 1)
        }
    }
    if (mouseX != null && mouseY != null) {
        ctx.fillStyle = '#C8F902'
        ctx.fillRect(mouseX - size / 4, mouseY - size / 4, size / 2, size)
        ctx.beginPath()
        ctx.arc(mouseX - size / 4, mouseY - size / 4, size / 2, 0, Math.PI * 2)
        ctx.fillStyle = 'green'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(mouseX + size / 4, mouseY - size / 5, size / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(mouseX, mouseY - size / 2, size / 2, 0, Math.PI * 2)
        ctx.fill()
    }
    for (let i = 0; i < 5; i++) {
        stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height))
    }
}

addEventListener('mousemove', (event) => {
    mouseX = event.clientX
    mouseY = event.clientY
})

animate()