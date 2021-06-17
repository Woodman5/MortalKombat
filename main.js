import Game from "./game/index.js"

const player = {
  name: "Scorpion",
  img: "scorpion.gif",
}

const enemy = {
  name: "Subzero",
  img: "subzero.gif",
}

const game =  new Game({player, enemy})

game.start()
