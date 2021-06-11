const $root = document.querySelector(".arenas");
const $form = document.querySelector(".control");
const $fightButton = document.querySelector(".button");
const $chat = document.querySelector(".chat");

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение",
  ],
  draw: "Ничья - это тоже победа!",
};

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

makeChatString.call(player1, "start", player2.name);

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

function getCurrentTime() {
  const date = new Date();
  const h = date.getHours();
  const m = date.getMinutes();
  return `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}`;
}
//
//
//
//
// -------- Chat -----------
//
function makeChatString(messageType, name, value) {
  let text = logs[messageType][randomNumber(logs[messageType].length) - 1];

  switch (messageType) {
    case "start":
      text = `<p>${logs["start"]
        .replace("[time]", getCurrentTime())
        .replace("[player1]", this.name)
        .replace("[player2]", name)}</p>`;
      break;
    case "draw":
      text = `<p>${getCurrentTime()} ${logs["draw"]}</p>`;
      break;
    case "end":
      text = `<p>${getCurrentTime()} ${text
        .replace("[playerWins]", this.name)
        .replace("[playerLose]", name)}</p>`;
      break;
    case "hit":
      text = `${text} -${value} ${this.hp}/100`;
    default:
      text = `<p>${getCurrentTime()} ${text
        .replace("[playerDefence]", this.name)
        .replace("[playerKick]", name)}</p>`;
  }

  $chat.insertAdjacentHTML("afterbegin", text);
}
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
    makeChatString.call(player2, "hit", player1.name, attack.value);
  } else {
    makeChatString.call(player2, "defence", player1.name);
  }

  if (attack.defence != enemy.hit) {
    playerMove(player1, enemy.value);
    makeChatString.call(player1, "hit", player2.name, enemy.value);
  } else {
    makeChatString.call(player1, "defence", player2.name);
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
  const whoWin = !player1.hp
    ? !player2.hp
      ? false
      : [player2, player1]
    : [player1, player2];

  playerWins(whoWin[0]);

  if (whoWin[0]) {
    makeChatString.call(whoWin[0], "end", whoWin[1].name);
  } else {
    makeChatString("draw");
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
