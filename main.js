import {makeLog} from './logs.js'
import {randomNumber} from './utils.js'

const $root = document.querySelector(".arenas");
const $form = document.querySelector(".control");
const $fightButton = document.querySelector(".button");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Fist, Leg, Sword"],
  attack: function (name) {
    console.log(name + " Fight...");
  },
  changeHP,
  renderHP,
  elHP,
  createPlayer,
};

const player2 = {
  player: 2,
  name: "Subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Arm, Leg, Axe"],
  attack: function (name) {
    console.log(name + " Fight...");
  },
  changeHP,
  renderHP,
  elHP,
  createPlayer,
};
//
//
//
//
// -------- Players creation -----------
//
function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

function createPlayer() {
  const $player = createElement("div", "player" + this.player);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $name.innerText = this.name;
  $life.style.width = this.hp + "%";
  $img.src = this.img;

  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);

  return $player;
}

$root.appendChild(player1.createPlayer());
$root.appendChild(player2.createPlayer());

makeLog.call(player1, "start", player2.name)

//
//
//
//
// -------- Main control -----------
//
$form.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack(); //player2
  const attack = {}; //player1

  for (let item of $form) {
    if (item.checked && item.name === "hit") {
      attack.value = randomNumber(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  gameMove(enemy, attack);
});
//
//
//
//
// -------- Player manipulations -----------
//
function elHP() {
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP(lifeBar) {
  lifeBar.style.width = this.hp + "%";
}

function changeHP(hp) {
  this.hp = this.hp - hp < 0 ? 0 : this.hp - hp;
}

function playerMove(player, hp) {
  player.changeHP(hp);
  player.renderHP(player.elHP());
}
//
//
//
//
// -------- Game moves functions -----------
//
function gameMove(enemy, attack) {
  if (attack.hit !== enemy.defence) {
    playerMove(player2, attack.value);
    makeLog.call(player2, "hit", player1.name, attack.value)
    // makeChatString.call(player2, "hit", player1.name, attack.value);
  } else {
    makeLog.call(player2, "defence", player1.name)
    // makeChatString.call(player2, "defence", player1.name);
  }

  if (attack.defence !== enemy.hit) {
    playerMove(player1, enemy.value);
    makeLog.call(player1, "hit", player2.name, enemy.value);
    // makeChatString.call(player1, "hit", player2.name, enemy.value);
  } else {
    makeLog.call(player1, "defence", player2.name);
    // makeChatString.call(player1, "defence", player2.name);
  }

  if (!player1.hp || !player2.hp) {
    gameOver();
  }
}

function enemyAttack() {
  const hit = ATTACK[randomNumber(3) - 1];
  const defence = ATTACK[randomNumber(3) - 1];

  return {
    value: randomNumber(HIT[hit]),
    hit,
    defence,
  };
}

//
//
//
//
// -------- GameOver functions -----------
//
function gameOver() {
  const whoWin = !player1.hp
    ? !player2.hp
      ? false
      : [player2, player1]
    : [player1, player2];

  playerWins(whoWin[0]);

  if (whoWin[0]) {
    makeLog.call(whoWin[0], "end", whoWin[1].name);
    // makeChatString.call(whoWin[0], "end", whoWin[1].name);
  } else {
    makeLog("draw");
    // makeChatString("draw");
  }

  disableButton();
  createReloadButton();
}

function playerWins(player) {
  const $winTitle = createElement("div", "winTitle");

  $winTitle.innerText = "Draw";

  if (player) {
    $winTitle.innerText = player.name + " wins";
  }

  $root.appendChild($winTitle);
}

function createReloadButton() {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");

  $reloadButton.innerText = "Restart";

  $reloadWrap.appendChild($reloadButton);
  $root.appendChild($reloadWrap);

  $reloadButton.addEventListener("click", function () {
    window.location.reload();
  });
}

function disableButton() {
  $fightButton.disabled = true;
}
