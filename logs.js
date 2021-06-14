import {randomNumber} from './utils.js'

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

function getCurrentTime() {
    const numString = (num) => num < 10 ? "0" + num : num
    const date = new Date();
    return `<span class="time">${numString(date.getHours())}:${numString(date.getMinutes())}</span>`;
}

export function makeLog(messageType, name, value) {
    let text = logs[messageType][randomNumber(logs[messageType].length) - 1];

    switch (messageType) {
        case "start":
            text = `<p>${logs["start"]
                .replace("[time]", getCurrentTime())
                .replace("[player1]", "<span class='players' >" + this.name + "</span>")
                .replace("[player2]", "<span class='players' >" + name + "</span>")}</p>`;
            break;
        case "draw":
            text = `<p>${getCurrentTime()} &ndash; ${logs["draw"]}</p>`;
            break;
        case "end":
            text = `<p>${getCurrentTime()} &ndash; ${text
                .replace("[playerWins]", "<span class='win' >" + this.name + "</span>")
                .replace("[playerLose]", "<span class='lose' >" + name + "</span>")}</p>`;
            break;
        case "hit":
            text = `${text} -${value}HP [${this.hp}/100]`;
        // Ответ на вопрос из ПР5. Тут break специально пропущен чтобы выполнился default.
        default:
            text = `<p>${getCurrentTime()} &ndash; ${text
                .replace("[playerDefence]", "<span class='defence'>" + this.name + "</span>")
                .replace("[playerKick]", "<span class='attack'>" + name + "</span>")}</p>`;
        // Ответ на вопрос из ПР5. Никогда тут break не ставил, зачем он тут нужен?
    }
    $chat.insertAdjacentHTML('afterbegin', text)
    // return text
}
