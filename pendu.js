const chalk = require('chalk')
const redlineSync = require('readline-sync')
const { randomInt } = require('crypto')
const { readFileSync } = require('fs')

let dictionary = readFileSync('dict.txt', 'utf-8').split('\n')
let answer = dictionary[randomInt(0, dictionary.length)]
let finded = Array(answer.length).fill('_')
let history = []
let lignRender = 7
let nbtry = readFileSync('render.txt', 'utf-8').split('\n').length / lignRender


console.log('\nBienvenue dans le jeu du pendu !\n\n')
while (true) {
  let Visual = readFileSync('render.txt', 'utf-8').split('\n').slice(7 * nbtry - lignRender, lignRender * nbtry).join('\n')
  console.log(chalk.yellow(`Il vous reste ${nbtry} essaies\n`) + Visual)
  let letter = redlineSync.question('Trouver ce mot : ' + finded.join(' ') + ' > ').toLowerCase()
  if (letter.length !== 1) { console.log('Choisi seulement une lettre !'); continue }
  if (history.includes(letter)) { console.log('Choisi une lettre pas encore demandé !'); continue }
  history.push(letter)

  if (answer.includes(letter)) {
    console.log(chalk.green('Vous avez trouver une lettre !!!'))
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === letter) {
        finded[i] = letter
      }
    }
  }
  else {
    console.log(chalk.red('Vous avez rien trouver cette fois, essayez encore.'))
    nbtry--
  }

  if (!nbtry) {
    console.log(chalk.magenta('Malheuresement, le garçon a été pendu, vous avez perdu.'))
    process.exit(0)
  }
  if (!finded.includes('_')) {
    console.log(chalk.cyan('Bravo le garçon est toujours en vie, vous remporter la partie !'))
    process.exit(0)
  }
}

