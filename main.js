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
// -------- Player creation -----------
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
  if (attack.hit != enemy.defence) {
    playerMove(player2, attack.value);
  }

  if (attack.defence != enemy.hit) {
    playerMove(player1, enemy.value);
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

function randomNumber(range) {
  return Math.ceil(Math.random() * range);
}
//
//
//
//
// -------- GameOver functions -----------
//
function gameOver() {
  playerWins(!player1.hp ? (!player2.hp ? "" : player2.name) : player1.name);
  disableButton();
  createReloadButton();
}

function playerWins(name) {
  const $winTitle = createElement("div", "winTitle");

  $winTitle.innerText = "Draw";

  if (name) {
    $winTitle.innerText = name + " wins";
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
