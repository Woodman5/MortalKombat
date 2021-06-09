const $root = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Fist, Leg, Sword"],
  attack: function (name) {
    console.log(name + " Fight...");
  },
  changeHP: changeHP,
  renderHP: renderHP,
  elHP:elHP,
  create: createPlayer
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
  changeHP: changeHP,
  renderHP: renderHP,
  elHP:elHP,
  create: createPlayer
};

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

function randomNumber(range) {
  return Math.ceil(Math.random() * range);
}

function elHP() {
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP(lifeBar) {
  lifeBar.style.width = this.hp + "%";
}

function changeHP(hp) {
  this.hp = this.hp - hp < 0 ? 0 : this.hp - hp
}

function playerWins(name) {
  const $winTitle = createElement("div", "winTitle");
  $winTitle.innerText = name + " wins";
  return $winTitle;
}

function finishHim(num) {
  $root.appendChild(
      playerWins(num === 1 ? player2.name : player1.name)
  );
}

function createReloadButton() {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");

  $reloadButton.innerText = "Restart";

  $reloadWrap.appendChild($reloadButton);
  $root.appendChild($reloadWrap);

  $reloadButton.addEventListener("click", function () {
    window.location.reload()
  })
}

function disableButton() {
  $randomButton.disabled = true;
  $randomButton.style.background = "grey";
}

function makeTurn(player) {
  player.changeHP(randomNumber(20))
  player.renderHP(player.elHP())
  if (player.hp === 0) {
    finishHim(player.player)
    disableButton()
    createReloadButton()
  }
  return player.hp
}

$randomButton.addEventListener("click", function () {
  const whoFirst = randomNumber(2);
  if (makeTurn(whoFirst === 1 ? player1 : player2)) {
    makeTurn(whoFirst === 1 ? player2 : player1);
  }
});

$root.appendChild(player1.create());
$root.appendChild(player2.create());
