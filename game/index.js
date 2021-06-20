import {makeLog} from "../logs/index.js"
import {randomNumber, createElement, HIT, ATTACK} from "../utils/index.js"
import Player from "../player/index.js"


class Game {
  constructor(props) {
    this.player = new Player(props.player)
    this.enemy = new Player(props.enemy)
    this.form = document.querySelector(".control")
    this.root = document.querySelector(".arenas")
    this.fightButton = document.querySelector(".button")
  }

  start = () => {
    this.player.createPlayer()
    this.enemy.createPlayer()
    makeLog.call(this.player, "start", this.enemy.name);
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.play();
    });
  }

  play = async () => {
    const attack = {}

    for (let item of this.form) {
      if (item.checked && item.name === "hit") {
        attack.hit = item.value;
      }
      if (item.checked && item.name === "defence") {
        attack.defence = item.value;
      }
      item.checked = false;
    }

    const attackData = await this.fetchAttack(attack)

    attack.value = attackData['player1']['value']
    const {value:enemyValue, hit:enemyHit, defence:enemyDef} = attackData['player2']

    if (attack.hit !== enemyDef) {
      this.playerMove(this.enemy, attack.value);
      makeLog.call(this.enemy, "hit", this.player.name, attack.value)
    } else {
      makeLog.call(this.enemy, "defence", this.player.name)
    }

    if (attack.defence !== enemyHit) {
      this.playerMove(this.player, enemyValue);
      makeLog.call(this.player, "hit", this.enemy.name, enemyValue)
    } else {
      makeLog.call(this.player, "defence", this.enemy.name)
    }

    if (!this.player.hp || !this.enemy.hp) this.gameOver()
  }

  fetchAttack = async (attack) => {
    return await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
      method: 'POST',
      body: JSON.stringify(attack)
    }).then(res => res.json())
  }

  playerMove = (player, hp) => {
    player.changeHP(hp)
    player.renderHP()
  }

  gameOver = () => {
    const whoWin = !this.player.hp ? (!this.enemy.hp ? false : [this.enemy, this.player]) : [this.player, this.enemy]

    this.playerWins(whoWin[0])

    if (whoWin[0]) {
      makeLog.call(whoWin[0], "end", whoWin[1].name)
    } else {
      makeLog("draw")
    }

    this.fightButton.disabled = true
    this.createReloadButton()
  }

  playerWins = (player) => {
    const $winTitle = createElement("div", "winTitle")

    $winTitle.innerText = "Draw"

    if (player) {
      $winTitle.innerText = player.name + " wins"
    }

    this.root.appendChild($winTitle)
  }

  createReloadButton = () => {
    const $reloadWrap = createElement("div", "reloadWrap")
    const $reloadButton = createElement("button", "button")

    $reloadButton.innerText = "Restart"

    $reloadWrap.appendChild($reloadButton)
    this.root.appendChild($reloadWrap)

    $reloadButton.addEventListener("click", function () {
      window.location.pathname = 'index.html'
    });
  }

}


export default Game
