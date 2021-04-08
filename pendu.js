const chalk = require('chalk')
const readlineSync = require('readline-sync')
const { randomInt } = require('crypto')
const { readFileSync, writeFileSync } = require('fs')

let lignRender = 7


// Début du jeu
do {
  let dictionary = readFileSync('dict.txt', 'utf-8').split('\n')
  let answer = dictionary[randomInt(0, dictionary.length)]
  let finded = Array(answer.length).fill('_')
  let history = []
  let nbtry = readFileSync('render.txt', 'utf-8').split('\n').length / lignRender
  let scorestab = JSON.parse(readFileSync('scores.json', 'utf-8')).scores
  console.log('\nBienvenue dans le jeu du pendu !\n\n')
  let name = readlineSync.question('Entrer votre nom : ')
  // Début d'un essai
  while (true) {
    let visual = readFileSync('render.txt', 'utf-8').split('\n').slice(lignRender * nbtry - lignRender, lignRender * nbtry).join('\n')
    console.log(chalk.yellow(`Il vous reste ${nbtry} essaies\n`) + visual)
    let letter = readlineSync.question('Trouver ce mot : ' + finded.join(' ') + ' > ').toLowerCase()
    console.clear()
    if (letter.length !== 1) { console.log('Choisi seulement une lettre !'); continue }
    if (history.includes(letter)) { console.log('Choisi une lettre pas encore demandé !'); continue }
    history.push(letter)

    // Lettre inclu dans la réponse
    if (answer.includes(letter)) {
      console.log(chalk.green('Vous avez trouver une lettre !!!'))
      for (let i = 0; i < answer.length; i++) {
        // Lettre similaire à une lettre de la réponse 
        if (answer[i] === letter) { finded[i] = letter }
      }
    }
    else {
      console.log(chalk.red('Vous avez rien trouver cette fois, essayez encore.'))
      nbtry--
    }

    // Nombre d'essai égal à 0
    if (!nbtry) {
      console.log(chalk.magenta('Malheuresement, le garçon a été pendu, vous avez perdu.'))
      console.log('Scores : \n')
      for (let i = 0; i < scorestab.length; i++) {
        console.log(`name: ${scorestab[i].name}   score: ${scorestab[i].score}`)
      }
      break
    }
    // Mot à trouvé ne continent plus d'underscore
    if (!finded.includes('_')) {
      console.log(chalk.cyan('Bravo le garçon est toujours en vie, vous remporter la partie !'))
      scorestab.push({ name: name, score: nbtry, word: answer })
      writeFileSync('scores.json', JSON.stringify({ scores: scorestab }))
      console.log('Scores : \n')
      for (let i = 0; i < scorestab.length; i++) {
        console.log(`nom: ${scorestab[i].name}   score: ${scorestab[i].score}  mot: ${scorestab[i].word}`)
      }
      break
    }
  }
} while (readlineSync.keyInYN('Voulez vous rejouez ?'))