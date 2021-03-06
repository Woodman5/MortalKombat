import { createElement } from "../utils/index.js"

class Player {
  static player = 0

  constructor(props) {
    this.name = props.name
    this.hp = props.hp ? props.hp : 100
    this.img = props.img
    this.selector = `player${++Player.player}`
    this.rootSelector = props.rootSelector ? props.rootSelector : "arenas"
  }

  elHP = () => {
    return document.querySelector(`.${this.selector} .life`)
  };

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`
  };

  changeHP = (hp) => {
    this.hp = this.hp - hp < 0 ? 0 : this.hp - hp
  };

  createPlayer = () => {
    const $player = createElement("div", this.selector)
    const $progressbar = createElement("div", "progressbar")
    const $character = createElement("div", "character")
    const $life = createElement("div", "life")
    const $name = createElement("div", "name")
    const $img = createElement("img");

    $name.innerText = this.name;
    $life.style.width = `${this.hp}%`
    $img.src = this.img;

    $player.appendChild($progressbar)
    $player.appendChild($character)
    $progressbar.appendChild($life)
    $progressbar.appendChild($name)
    $character.appendChild($img)

    const $root = document.querySelector(`.${this.rootSelector}`)
    $root.appendChild($player)
  };
}

export default Player
