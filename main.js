import Game from "./game"

const player = {
  name: "Scorpion",
  img: "scorpion.gif",
}

const enemy = {
  name: "Subzero",
  img: "subzero.gif",
}

const game =  new Game(player, enemy)

game.start()
