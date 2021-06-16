import { makeLog } from "./logs.js";
import { randomNumber, createElement } from "./utils.js";
// import { playerMove, createPlayers } from "./player.js";
import Player from "./player/index.js";
import { HIT, ATTACK } from "./constants.js";

const $root = document.querySelector(".arenas");
const $fightButton = document.querySelector(".button");

const player1 = new Player({
  name: "Scorpion",
  img: "scorpion.gif",
});

const player2 = new Player({
  name: "Subzero",
  img: "subzero.gif",
});

console.log(player1);
console.log(player2);

export function gameStart() {
  [player1, player2] = createPlayers($root);
  makeLog.call(player1, "start", player2.name);
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

export function play(form) {
  const enemy = enemyAttack(); //player2
  const attack = {}; //player1

  for (let item of form) {
    if (item.checked && item.name === "hit") {
      attack.value = randomNumber(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  if (attack.hit !== enemy.defence) {
    playerMove(player2, attack.value);
    makeLog.call(player2, "hit", player1.name, attack.value);
  } else {
    makeLog.call(player2, "defence", player1.name);
  }

  if (attack.defence !== enemy.hit) {
    playerMove(player1, enemy.value);
    makeLog.call(player1, "hit", player2.name, enemy.value);
  } else {
    makeLog.call(player1, "defence", player2.name);
  }

  if (!player1.hp || !player2.hp) gameOver();
}

function gameOver() {
  const whoWin = !player1.hp ? (!player2.hp ? false : [player2, player1]) : [player1, player2];

  playerWins(whoWin[0]);

  if (whoWin[0]) {
    makeLog.call(whoWin[0], "end", whoWin[1].name);
  } else {
    makeLog("draw");
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
