import { gameStart, play } from "./game.js";

const $form = document.querySelector(".control");

gameStart();

$form.addEventListener("submit", function (e) {
  e.preventDefault();
  play($form);
});
