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

const flipMark = function () {
  console.log('flipMark Called', this)
  console.log('gameBoardImages[0].markImage: ' + gameBoardImages[1].markImage)
  this.setAttribute('src', gameBoardImages[1].markImage)
  // disable click
}

// Adds the cards to the DOM.
const setUpGameBoard = function () {
  console.log('setUpGameBoard')
  for (let i = 0; i < gameCellIDs.length; i++) {
    const element = document.getElementById(gameCellIDs[i] + '-img')
    element.addEventListener('click', flipMark)
    // const newImgElement = document.createElement('img')
    // newImgElement.setAttribute('src', gameBoardImages[0].image)
    // newImgElement.setAttribute('img_id', i)
    // element.appendChild(newImgElement)
  }
}

const replayButtonClick = function () {
  console.log('replayButtonClick')
// Clear cards in play

// reset images...since cardsInPlay are node elements could just reset those.
// get a list of all the img nodes and update the image displayed.
// var newListItem = document.getElementsByTagName('img');
// for( var i=0; i < newListItem.length; i++ ) {
// newListItem[i].setAttribute('src','images/back.png');
// }
}
// Why didn't this work?
// const addReplayButtonListner = function() {
// document.getElementById('replayBtn').addEventListner('click', replayButtonClick);
// }

const checkForMatch = function () {
  const result = 0
  return result
}
module.exports = {
  checkForMatch,
  replayButtonClick,
  setUpGameBoard
}
