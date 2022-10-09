const canvas = document.querySelector("canvas")

const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Player {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {
    this.draw()
    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}

const playerPosX = canvas.width / 2;
const playerPosY = canvas.height / 2;


const player = new Player(playerPosX, playerPosY, 30, 'blue')

const projectiles = []

function animate() {
  window.requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  player.draw()
  projectiles.forEach(projectile => {
    projectile.update()
  })
}

window.addEventListener('click', (event) => {
  console.log(event)
  const angle = Math.atan2(
    event.clientY - playerPosY,
    event.clientX - playerPosX
  )
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle)
  }
  projectiles.push(
    new Projectile(
      playerPosX,
      playerPosY,
      5,
      'red',
      velocity
    )
  )
})

animate()
