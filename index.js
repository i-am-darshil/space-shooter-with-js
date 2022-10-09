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

class Enemy {
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
const enemies = []


function spawnEnemies() {
  setInterval(() => {

    const radius = 10 + Math.random() * 25
    let x, y;
    if (Math.random < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
      y = Math.random() * canvas.height
    } else {
      x = Math.random() * canvas.width
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    }

    const color = 'green'
    const angle = Math.atan2(
      playerPosY - y,
      playerPosX - x
    )
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }
    enemies.push(
      new Enemy(x, y, radius, color, velocity)
    )
  }, 1500)
}

let animationId;
function animate() {
  animationId = window.requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  player.draw()
  projectiles.forEach((projectile, projectileIndex) => {
    projectile.update()

    if (
      projectile.x - projectile.radius < 0 || 
      projectile.x - projectile.radius > canvas.width || 
      projectile.y - projectile.radius < 0 || 
      projectile.y - projectile.radius > canvas.height
      ) {
        projectiles.splice(projectileIndex, 1)
        console.log("Removing projectile")
    }

  })

  enemies.forEach((enemy, enemyIndex) => {
    enemy.update()

    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)
    if (dist - enemy.radius - player.radius < 1) {
      console.log("End Game")
      window.cancelAnimationFrame(animationId)
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
      if (dist - enemy.radius - projectile.radius < 1) {
        console.log("Remove from screen")
        enemies.splice(enemyIndex, 1)
        projectiles.splice(projectileIndex, 1)
      }
    })
  })
}

window.addEventListener('click', (event) => {
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
spawnEnemies()
