'use strict'

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
// Pass a game object
const checkForWinner = function (game) {
  // console.log('checkForWinner called')
  let result
  const cells = game.cells
  for (let i = 0; i < winningCombinations.length; i++) {
    const value1 = cells[winningCombinations[i][0]]
    const value2 = cells[winningCombinations[i][1]]
    const value3 = cells[winningCombinations[i][2]]
    // console.log('game moves: ' + currentGame.game.cells)
    // console.log(winningCombinations[i][0] + winningCombinations[i][1] + winningCombinations[i][2])
    // console.log('value1: ' + value1 + ' value2: ' + value2 + ' value3: ' + value3)
    if (value1 === '' || value2 === '' || value3 === '') {
      continue
    }
    if (value1 === value2 && value1 === value3) {
      result = value1
      break
    } else {
      // console.log('Gave Over but no winner: ', cells)
    }
  }
  // console.log('checkForWinnerII returning: ' + result)
  return result
}
module.exports = {
  checkForWinner
}
