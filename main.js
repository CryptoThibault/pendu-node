const chalk = require('chalk')
const redlineSync = require('readline-sync')
const { randomInt } = require('crypto')
const { readFileSync } = require('fs')

let dictionary = readFileSync('dict.txt', 'utf-8').split('\n')
let answer = dictionary[randomInt(0, dictionary.length)]
let finded = '_ '.repeat(answer.length)
let nbtry = 12

while (true) {
  let letter = redlineSync.question(finded + '> ').toUpperCase()
  if (answer.includes(letter)) {
    console.log(chalk.green('You have find a new letter !!!'))
    finded = finded.replace('_', letter)
  }
  else {
    console.log(chalk.red('You find nothing this time, try again.'))
    nbtry--
  }
  if (!nbtry) {
    console.log(chalk.magenta('The boy was been hanged, you lost the game!'))
    process.exit(0)
  }
  if (finded === answer) {
    console.log(chalk.cyan('Congrats, the boy still alive, you won the game!'))
    process.exit(0)
  }
}
