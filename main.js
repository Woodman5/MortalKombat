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
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

function createPlayer(player) {
  const $player = createElement("div", "player" + player.player);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $name.innerText = player.name;
  $life.style.width = player.hp + "%";
  $img.src = player.img;

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

function changeHP(player) {
  const $playerLife = document.querySelector(
    ".player" + player.player + " .life"
  );
  player.hp -= randomNumber(20);
  player.hp = player.hp < 0 ? 0 : player.hp;

  $playerLife.style.width = player.hp + "%";

  if (player.hp === 0) {
    $root.appendChild(
      playerWin(player.player === 1 ? player2.name : player1.name)
    );
    $randomButton.disabled = true;
    $randomButton.style.background = "grey";
  }

  return player.hp;
}

function playerWin(name) {
  const $winTitle = createElement("div", "winTitle");
  $winTitle.innerText = name + " win";

  return $winTitle;
}

$randomButton.addEventListener("click", function () {
  const whoFirst = randomNumber(2);
  if (changeHP(whoFirst === 1 ? player1 : player2)) {
    changeHP(whoFirst === 1 ? player2 : player1);
  }
});

$root.appendChild(createPlayer(player1));
$root.appendChild(createPlayer(player2));
