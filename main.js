const player1 = {
  name: "Scorpion",
  hp: 74,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["Fist, Leg, Sword"],
  attack: function () {
    console.log("Scorpion" + " Fight...");
  },
};

const player2 = {
  name: "Subzero",
  hp: 34,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Arm, Leg, Axe"],
  attack: function () {
    console.log("Subzero" + " Fight...");
  },
};

function createPlayer(className, player) {
  const $root = document.querySelector(".arenas");
  const $player = document.createElement("div");
  const $progressbar = document.createElement("div");
  const $character = document.createElement("div");
  const $life = document.createElement("div");
  const $name = document.createElement("div");
  const $img = document.createElement("img");

  $player.classList.add(className);
  $progressbar.classList.add("progressbar");
  $character.classList.add("character");
  $life.classList.add("life");
  $name.classList.add("name");
  $name.innerText = player.name.toUpperCase();
  $life.style.width = player.hp + "%";
  $img.src = player.img;

  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);

  $root.appendChild($player);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
