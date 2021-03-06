'use strict'

const api = require('./auth/api')
const ui = require('./auth/ui')
// const events = require('./auth/events')
const calulateWins = require('./calculateWins')

const gameBoardImages = [
  {
    mark: 'X',
    markImage: 'http://i.imgur.com/Wr7ayeZ.png',
    text: 'PLAYER X IS PLAYING'
  },
  {
    mark: 'O',
    markImage: 'http://i.imgur.com/t3RKokr.png',
    text: 'PLAYER O IS PLAYING'
  },
  {
    mark: 'blank',
    markImage: 'http://i.imgur.com/yNtTbJw.jpg'
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
let isPlayerX = true
let winsSinceLoggedIN = 0

const flipMark = function () {
  // console.log('flipMark Called', this)
  // update move
  $('#' + this.id).off()
  const cellToUpdate = parseInt(transformLocation(this.id))
  // console.log('flipMark updating cell: ' + cellToUpdate)
  gameMoveUpdate.game.cell.index = cellToUpdate
  if (isXplaying()) {
    currentGame.game.cells[cellToUpdate] = 'x'
    gameMoveUpdate.game.cell.value = 'x'
    // Update the cell image for this turn
    this.setAttribute('src', gameBoardImages[0].markImage)
  } else {
    currentGame.game.cells[cellToUpdate] = 'o'
    gameMoveUpdate.game.cell.value = 'o'
    // Update the cell image for this turn
    this.setAttribute('src', gameBoardImages[1].markImage)
  }

  // check for a winner
  const winner = checkForWinner()
  if (winner) {
    gameMoveUpdate['game'].over = true
    removeAllGameBoardEventListerners()
    const wins = calulateWins.getTotalWinsLoses()
    if (winner === 'x') {
      // we are only keeping track of X's wins
      winsSinceLoggedIN++
      updateInfoArea('X Is The Winner! Total wins for X: ' + (wins + winsSinceLoggedIN))
      // we are only keeping track of X's wins
    } else {
      updateInfoArea('O Is The Winner!')
    }
  } else if (anyMovesLeft()) {
    // update who is playing
    isPlayerX = !isPlayerX
    updateWhoIsPlayingMessage()
    gameMoveUpdate['game'].over = false
  } else {
    gameMoveUpdate.game.over = true
    updateInfoArea('Cats Meow, Try Again!')
  }
  updateBackEndWithMove()
}

// Adds the cards to the DOM.
const setUpGameBoardHandlers = function (firstTime) {
  // console.log('setUpGameBoardHandlers')
  let i
  for (i in gameCellIDs) {
    const id = gameCellIDs[i]
    $('#' + id).on('click', flipMark)
  }
  $('#replay-button').show()
}

const removeAllGameBoardEventListerners = function () {
  let i
  for (i in gameCellIDs) {
    const id = gameCellIDs[i]
    $('#' + id).off()
  }
}

const updateWhoIsPlayingMessage = function () {
  let label = gameBoardImages[0].text
  if (isXplaying()) {
    label = gameBoardImages[1].text
  }
  updateInfoArea(label)
}
const isXplaying = function () {
  let result = false
  if (isPlayerX) {
    result = true
  }
  // console.log('isXplaying :' + result)
  return result
}
const transformLocation = function (imgID) {
  const data = imgID.split('-')
  // console.log('transformLocation returning:' + data[1])
  return data[1]
}
const replayButtonClick = function () {
  // console.log('replayButtonClick')
  clearBoard()
  clearGameState()
  resetInfoToX()
  // We don't know those that are on/off set all off then on again
  removeAllGameBoardEventListerners()
  setUpGameBoardHandlers(true)
  isPlayerX = true
  // console.log('replayButtonClick:currentGame data: ', currentGame)
}
const cleanUpAfterPlayerSignOff = function () {
  clearBoard()
  clearGameState()
  resetInfoToX()
  isPlayerX = true
  removeAllGameBoardEventListerners()
}
const disableReplayButton = function () {
  // console.log('disableReplayButton called')
  $('#replay-button').hide()
}
const checkForWinner = function () {
  // console.log('checkForWinner called')
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
  // console.log('checkForWinner returning: ' + result)
  return result
}
const anyMovesLeft = function () {
  let result = false
  // console.log('anyMovesLeft currentGame: ', currentGame)
  for (let i = 0; i < currentGame.game.cells.length; i++) {
    // console.log('anyMovesLeft: ' + currentGame.game.cells[i])
    if (currentGame.game.cells[i].length > 0) {
      continue
    } else {
      result = true
      break
    }
  }
  // console.log('anyMovesLeft returning: ' + result)
  return result
}
const clearBoard = function () {
  // reset to blank images
  let i
  for (i in gameCellIDs) {
    const id = gameCellIDs[i]
    $('#' + id).attr('src', gameBoardImages[2].markImage)
  }
}
const clearGameState = function () {
  // console.log('clearGameState called')
  let i
  for (i in currentGame.game.cells) {
    currentGame.game.cells[i] = ''
  }
}
const updateInfoArea = function (updateText) {
  // console.log('updateInfoArea to: ' + updateText)
  $('#currentPlayer').text(updateText)
}
const resetInfoToX = function () {
  const label = gameBoardImages[0].text
  updateInfoArea(label)
}
const updateBackEndWithMove = function () {
  // console.log('updateBackEndWithMove')
  api.updateGameState(gameMoveUpdate)
   .then(ui.updateGameStateSuccess)
   .catch(ui.updateGameStateFailure)
}
const resetWinsSinceLoggedIN = function () {
  winsSinceLoggedIN = 0
}
module.exports = {
  setUpGameBoardHandlers,
  cleanUpAfterPlayerSignOff,
  disableReplayButton,
  replayButtonClick,
  resetWinsSinceLoggedIN
}
