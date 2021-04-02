const chalk = require('chalk')
const redlineSync = require('readline-sync')
const { randomInt } = require('crypto')
const { readFileSync } = require('fs')

let dictionary = readFileSync('dict.txt', 'utf-8').split('\n')
let answer = dictionary[randomInt(0, dictionary.length)]
let finded = Array(answer.length).fill('_')
let nbtry = 10
let history = []

while (true) {
  let letter = redlineSync.question('Decypher this word : ' + finded.join(' ') + ' > ').toLowerCase()
  if (letter.length !== 1) { console.log('Pick only one letter !'); continue }
  history.push(letter)
  if (history.includes(letter)) { console.log('You already try this letter !'); continue }

  if (answer.includes(letter)) {
    console.log(chalk.green('You have find a new letter !!!'))
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === letter) {
        finded[i] = letter
      }
    }
  }
  else {
    console.log(chalk.red('You find nothing this time, try again.'))
    nbtry--
  }

  if (!nbtry) {
    console.log(chalk.magenta('The boy was been hanged, you lost the game!'))
    process.exit(0)
  }
  if (!finded.includes('_')) {
    console.log(chalk.cyan('Congrats, the boy still alive, you won the game!'))
    process.exit(0)
  }
}
