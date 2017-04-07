'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  console.log('Data is:', data)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('onSignIn data: ', data)
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.signInFailure)
}
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
//  $('#sign-in').on('submit', onSignIn)
//  $('#sign-out').on('submit', onSignOut)
//  $('#change-password').on('submit', onChangePassword)
}
module.exports = {
  addHandlers
}
