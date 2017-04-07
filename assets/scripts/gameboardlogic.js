'use strict'

const api = require('./auth/api')
const ui = require('./auth/ui')
const store = require('./store')

const gameBoardImages = [
  {
    mark: 'X',
    markImage: '../assets/images/X.png'
  },
  {
    mark: 'O',
    markImage: '../assets/images/O.png'
  },
  {
    mark: 'blank',
    markImage: '../assets/images/blank.jpg'
  }
]
const gameCellIDs = [
  'cell-0-img',
  'cell-1-img',
  'cell-2-img',
  'cell-3-img',
  'cell-4-img',
  'cell-5-img',
  'cell-6-img',
  'cell-7-img',
  'cell-8-img'
]
const currentGame = {
  'game': {
    'id': 1,
    'cells': ['', '', '', '', '', '', '', '', ''],
    'over': true,
    'player_x': {
      'id': 1,
      'email': 'and@and.com'
    },
    'player_o': {
      'id': 3,
      'email': 'dna@dna.com'
    }
  }
}
const winningCombinations = [
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
  ['0', '3', '6'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['6', '4', '2'],
  ['0', '4', '8']
]

const gameMoveUpdate = {
  'game': {
    'cell': {
      'index': 0,
      'value': 'x'
    },
    'over': false
  }
}
const flipMark = function () {
  console.log('flipMark Called', this)
  console.log('gameBoardImages[0].markImage: ' + gameBoardImages[1].markImage)
  // update move
  const cellToUpdate = parseInt(transformLocation(this.id))
  console.log('flipMark updating cell: ' + cellToUpdate)
  if (isXplaying()) {
    currentGame.game.cells[cellToUpdate] = 'x'
    gameMoveUpdate.game.cell.index = cellToUpdate
    gameMoveUpdate.game.cell.value = 'x'
  } else {
    gameMoveUpdate.game.cell.index = cellToUpdate
    gameMoveUpdate.game.cell.value = 'o'
  }
  console.log('currentGame: ', currentGame)
  if (isXplaying()) {
    this.setAttribute('src', gameBoardImages[0].markImage)
  } else {
    this.setAttribute('src', gameBoardImages[1].markImage)
  }
  // check for a winner
  if (checkForWinner()) {
    alert('We have a winner')
    gameMoveUpdate['game'].over = true
  } else if (anyMovesLeft()) {
    updatePlayerButton()
    gameMoveUpdate['game'].over = false
  } else {
    alert('Cats Meow, Try Again')
    gameMoveUpdate.game.over = true
  }
  console.log('flipMark gameMoveUpdate: ', gameMoveUpdate)
  api.updateGameState(gameMoveUpdate)
    .then(ui.updateGameStateSuccess)
    .catch(ui.updateGameStateFailure)
  getCurrentGameStats()
}

// Adds the cards to the DOM.
const setUpGameBoardHandlers = function (firstTime) {
  console.log('setUpGameBoard')
  $('#cell-0-img').one('click', flipMark)
  $('#cell-1-img').one('click', flipMark)
  $('#cell-2-img').one('click', flipMark)
  $('#cell-3-img').one('click', flipMark)
  $('#cell-4-img').one('click', flipMark)
  $('#cell-5-img').one('click', flipMark)
  $('#cell-6-img').one('click', flipMark)
  $('#cell-7-img').one('click', flipMark)
  $('#cell-8-img').one('click', flipMark)
  if (firstTime) {
    $('#replay-button').on('click', replayButtonClick)
  }
}
const updatePlayerButton = function () {
  const element = document.getElementById('game-button')
  console.log('updatePlayer called')
  if (isXplaying()) {
    element.value = 'It\'s O\'s Turn!'
  } else {
    element.value = 'It\'s X\'s Turn!'
  }
}
const isXplaying = function () {
  const element = document.getElementById('game-button')
  console.log('updatePlayer called')
  let result = true
  if (!(element.value === 'It\'s X\'s Turn!')) {
    console.log('isXplay no: ' + element.value)
    result = false
  }
  console.log('isXplaying returning', result)
  return result
}

const transformLocation = function (imgID) {
  const data = imgID.split('-')
  console.log('transformLocation returning:' + data[1])
  return data[1]
}

const replayButtonClick = function () {
  console.log('replayButtonClick')
  clearBoard()
  setUpGameBoardHandlers(false)
}

const checkForWinner = function () {
  console.log('checkForWinner called')
  let result
  for (let i = 0; i < winningCombinations.length; i++) {
    const value1 = currentGame.game.cells[winningCombinations[i][0]]
    const value2 = currentGame.game.cells[winningCombinations[i][1]]
    const value3 = currentGame.game.cells[winningCombinations[i][2]]
    // console.log('game moves: ' + currentGame.game.cells)
    // console.log(winningCombinations[i][0] + winningCombinations[i][1] + winningCombinations[i][2])
    // console.log('value1: ' + value1 + ' value2: ' + value2 + ' value3: ' + value3)
    if (value1 === '' || value2 === '' || value3 === '') {
      continue
    }
    if (value1 === value2 && value1 === value3) {
      result = value1
      break
    }
  }
  console.log('checkForWinner returning: ' + result)
  return result
}
const anyMovesLeft = function () {
  let result = false
  for (let i = 0; i < winningCombinations.length; i++) {
    if (currentGame.game.cells[i].length > 0) {
      continue
    } else {
      result = true
      break
    }
  }
  console.log('anyMovesLeft: ' + result)
  return result
}
const clearBoard = function () {
  // reset to blank images
  for (let i = 0; i < gameCellIDs.length; i++) {
    const element = document.getElementById(gameCellIDs[i])
    element.setAttribute('src', gameBoardImages[2].markImage)
  }
}
const getCurrentGameStats = function () {
  api.getUserGames()
    .then(ui.getUserGamesSuccess)
    .catch(ui.getUserGamesFailure)
}
module.exports = {
  setUpGameBoardHandlers
}
