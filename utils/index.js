export {HIT, ATTACK, LOGS} from './constants.js'

export const randomNumber = (range) => Math.ceil(Math.random() * range)

export const createElement = (tag, className) => {
  const $tag = document.createElement(tag)
  if (className) {
    $tag.classList.add(className)
  }

  return $tag
}

