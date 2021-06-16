import { randomNumber } from "./utils.js";
import { LOGS } from "./constants.js";

const $chat = document.querySelector(".chat");

function getCurrentTime() {
  const numString = (num) => (num < 10 ? "0" + num : num);
  const date = new Date();
  return `<span class="time">${numString(date.getHours())}:${numString(date.getMinutes())}</span>`;
}

export function makeLog(messageType, name, value) {
  let text = LOGS[messageType][randomNumber(LOGS[messageType].length) - 1];

  switch (messageType) {
    case "start":
      text = `<p>${LOGS["start"]
        .replace("[time]", getCurrentTime())
        .replace("[player1]", "<span class='players' >" + this.name + "</span>")
        .replace("[player2]", "<span class='players' >" + name + "</span>")}</p>`;
      break;
    case "draw":
      text = `<p>${getCurrentTime()} &ndash; ${LOGS["draw"]}</p>`;
      break;
    case "end":
      text = `<p>${getCurrentTime()} &ndash; ${text
        .replace("[playerWins]", "<span class='win' >" + this.name + "</span>")
        .replace("[playerLose]", "<span class='lose' >" + name + "</span>")}</p>`;
      break;
    case "hit":
      text = `${text} -${value}HP [${this.hp}/100]`;
    default:
      text = `<p>${getCurrentTime()} &ndash; ${text
        .replace("[playerDefence]", "<span class='defence'>" + this.name + "</span>")
        .replace("[playerKick]", "<span class='attack'>" + name + "</span>")}</p>`;
  }
  $chat.insertAdjacentHTML("afterbegin", text);
}
