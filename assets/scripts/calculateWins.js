'use strict'

const store = require('./store')
const api = require('./auth/api')
const findGameWinner = require('./findGameWinner')

const getStatsForPlayer = function () {
  getCurrentGameStatsApi()
}
const getCurrentGameStatsApi = function () {
  api.getUserGames()
    .then(getUserGamesSuccess)
    .catch(getUserGamesFailure)
}
const getUserGamesSuccess = (data) => {
  // console.log('getUserGamesSuccess Data: ', data)
  store.gameStats = data.games
  // console.log('getUserGamesSuccess Store: ', store)
  console.log('getUserGamesSuccess:WINS: ' + getTotalWinsLoses())
}
const getUserGamesFailure = (data) => {
  console.log('getUserGamesFailure called', data)
}
const getTotalWinsLoses = function () {
  let wins = 0
  let incompleteGames = 0
  // console.log('Store gamestats: ', store.gameStats)
  for (let i = 0; i < store.gameStats.length; i++) {
    const game = store.gameStats[i]
    // console.log('game over: ' + game.over)
    if (game.over) {
      // console.log('Found game over at location: ' + i)
      const result = findGameWinner.checkForWinner(game)
      if (result !== undefined && result === 'x') {
        wins++
      }
    } else {
      incompleteGames++
    }
  }
  console.log('getTotalWinsLoses wins: ' + wins)
  console.log('getTotalWinsLoses incompleteGames: ' + incompleteGames)
  return wins
}

module.exports = {
  getStatsForPlayer,
  getTotalWinsLoses
}
