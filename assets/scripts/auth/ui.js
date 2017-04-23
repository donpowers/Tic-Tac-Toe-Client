'use strict'

const api = require('./api')
const store = require('../store')
const gameboardlogic = require('../gameboardlogic')
const calculateWins = require('../calculateWins')

const signUpSuccess = (data) => {
  // console.log('signUpSuccess calledd: ', data)
  // Clear the form data entered
  $('#sign-up').trigger('reset')
}

const signUpFailure = (error) => {
  $('#sign-up').trigger('reset')
  console.error(error)
}

const signInSuccess = (data) => {
  // console.log('Sign-in success: ', data)
  // Clear the form data entered
  $('#sign-in').trigger('reset')
  store.user = data.user
  const createData = {}
  api.createGame(createData)
    .then(createGameSuccess)
    .catch(createGameFailure)
  gameboardlogic.setUpGameBoardHandlers(true)
  calculateWins.getStatsForPlayer()
}

const signInFailure = (error) => {
  // console.log('Sign In Failure')
  $('#sign-in').trigger('reset')
  console.error(error)
}
const signOutSuccess = () => {
  // console.log('Sign Out success: ')
  // clean up the stored value
  store.user = null
  gameboardlogic.cleanUpAfterPlayerSignOff()
  gameboardlogic.disableReplayButton()
  gameboardlogic.resetWinsSinceLoggedIN()
}
const signOutFailure = (error) => {
  // console.log('Sign Out Failure')
  console.error(error)
}
const changePasswordSuccess = () => {
  // Clear the form data entered
  $('#change-password').trigger('reset')
  // console.log('Change Password success')
}
const changePasswordFailure = (error) => {
  // console.log('Change Password Out Failure')
  $('#change-password').trigger('reset')
  console.error(error)
}
const createGameSuccess = (data) => {
  store.game = data.game
  // console.log('createGameSuccess called', store)
}
const createGameFailure = (data) => {
  // console.log('createGameFailure called')
}
const updateGameStateSuccess = (data) => {
  // console.log('updateGameStateSuccess success data: ', data)
}
const updateGameStateFailure = (data) => {
  // console.log('updateGameStateFailure called', data)
}
const replayCreateGameSuccess = (data) => {
  // console.log('Replay Game success: ', data)
  store.game = data.game
  // console.log('createGameSuccess called', store)
  gameboardlogic.replayButtonClick()
}
const replayCreateGameFailure = (data) => {
  // console.log('replayCreateGameFailure called', data)
}
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  changePasswordFailure,
  changePasswordSuccess,
  updateGameStateSuccess,
  updateGameStateFailure,
  replayCreateGameSuccess,
  replayCreateGameFailure
}
