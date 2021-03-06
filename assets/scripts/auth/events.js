'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  // console.log('Data is:', data)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('onSignIn data: ', data)
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.signInFailure)
}
const onSignOut = (data) => {
  event.preventDefault()
  if (store.user == null) {
    // console.log('No One to Sign Out')
    return
  }
  // console.log('Api:sign OUT called')
  api.signOut()
  .then(ui.signOutSuccess)
  .catch(ui.signOutFailure)
}
const onChangePassword = function (event) {
  // console.log('onChangePassword called')
  event.preventDefault()
  const data = getFormFields(event.target)
  // console.log('onChangePassword called', data)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
const onPlayerMoveUpate = function (data) {
  api.updateGameState(data)
    .then(ui.updateGameStateSuccess)
    .catch(ui.updateGameStateFailure)
}
// const onReplayCreateGame = function () {
//   const createData = {}
//   api.createGame(createData)
//     .then(ui.replayCreateGameSuccess)
//     .catch(ui.replayCreateGameFailure)
// }
const onReplayCreateGame = function (event) {
  // console.log('onReplayCreateGame called')
  event.preventDefault()
  api.createGame()
    .then(ui.replayCreateGameSuccess)
    .catch(ui.replayCreateGameFailure)
}
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#replay-button').hide()
  $('#replay-button').on('click', onReplayCreateGame)
}
module.exports = {
  addHandlers,
  onPlayerMoveUpate,
  onReplayCreateGame
}
