import Game from "./game/index.js"
import { randomNumber} from "./utils/index.js"

const {id, name, img} = JSON.parse(localStorage.getItem('player1'))

const player = {
  name,
  img,
}
const enemy = {}

const players = JSON.parse(localStorage.getItem('players'))

while (true) {
  const randomEnemy = players[randomNumber(players.length) - 1]

  if (id !== randomEnemy.id) {
    enemy.name = randomEnemy.name
    enemy.img = randomEnemy.img
    break
  }
}

const game =  new Game({player, enemy})

game.start()
