'use strict'

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
  'cell-0',
  'cell-1',
  'cell-2',
  'cell-3',
  'cell-4',
  'cell-5',
  'cell-6',
  'cell-7',
  'cell-8'
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
const flipMark = function () {
  console.log('flipMark Called', this)
  console.log('gameBoardImages[0].markImage: ' + gameBoardImages[1].markImage)
  // update move
  if (isXplaying()) {
    currentGame.game.cells[parseInt(transformLocation(this.id))] = 'x'
  } else {
    currentGame.game.cells[parseInt(transformLocation(this.id))] = 'o'
  }
  console.log('currentGame: ', currentGame)
  if (isXplaying()) {
    this.setAttribute('src', gameBoardImages[0].markImage)
  } else {
    this.setAttribute('src', gameBoardImages[1].markImage)
  }
  // disable click
  console.log('ID: ' + this.id)
  $(this.id).off('click')
  // check for a winner
  if (checkForWinner()) {
    alert('We have a winner')
    // update who is the next player
    updatePlayerButton()
  } else if (anyMovesLeft()) {
    updatePlayerButton()
  } else {
    alert('Cats Meow, Try Again')
  }
}

// Adds the cards to the DOM.
const setUpGameBoard = function () {
  console.log('setUpGameBoard')
  for (let i = 0; i < gameCellIDs.length; i++) {
    const elementID = gameCellIDs[i] + '-img'
    console.log('elementID: ' + elementID)
    console.log($('elementID'))
    $('elementID').one('click', flipMark)
    // c onst element = document.getElementById(elementID)
    // element.addEventListener('click', flipMark)
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
}

const checkForWinner = function () {
  let result
  for (let i = 0; i < winningCombinations.length; i++) {
    const value1 = currentGame.game.cells[winningCombinations[i][0]]
    const value2 = currentGame.game.cells[winningCombinations[i][1]]
    const value3 = currentGame.game.cells[winningCombinations[i][2]]
    console.log('game moves: ' + currentGame.game.cells)
    console.log(winningCombinations[i][0] + winningCombinations[i][1] + winningCombinations[i][2])
    console.log('value1: ' + value1 + ' value2: ' + value2 + ' value3: ' + value3)
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

module.exports = {
  setUpGameBoard
}
