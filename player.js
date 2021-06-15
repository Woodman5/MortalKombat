import { createElement } from "./utils.js";

const player1 = {
  player: 1,
  name: "Scorpion",
  pic: "scorpion.gif",
  hp: 100,
  changeHP,
  renderHP,
  elHP,
};

player1.img = function () {
  return `http://reactmarathon-api.herokuapp.com/assets/${this.pic}`;
};

const player2 = Object.create(player1);
[player2.player, player2.name, player2.pic] = [2, "Subzero", "subzero.gif"];

function createPlayer() {
  const $player = createElement("div", "player" + this.player);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $name.innerText = this.name;
  $life.style.width = this.hp + "%";
  $img.src = this.img();

  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);

  return $player;
}

function elHP() {
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP(lifeBar) {
  lifeBar.style.width = this.hp + "%";
}

function changeHP(hp) {
  this.hp = this.hp - hp < 0 ? 0 : this.hp - hp;
}

export function playerMove(player, hp) {
  player.changeHP(hp);
  player.renderHP(player.elHP());
}

export function createPlayers(root) {
  root.appendChild(createPlayer.call(player1));
  root.appendChild(createPlayer.call(player2));
  return [player1, player2];
}
