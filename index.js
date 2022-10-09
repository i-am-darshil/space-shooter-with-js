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

const playerPosX = canvas.width / 2;
const playerPosY = canvas.height / 2;


const player = new Player(playerPosX, playerPosY, 30, 'blue')
player.draw()
