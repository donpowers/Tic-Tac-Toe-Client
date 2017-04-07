'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const store = require('../store')
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
const onSignOut = (data) => {
  if (store.user == null) {
    console.log('No One to Sign Out')
    alert('No User Signed In')
    return
  }
  console.log('Api:sign OUT called')
  api.signOut()
  .then(ui.signOutSuccess)
  .catch(ui.signOutFailure)
}
const onChangePassword = function (event) {
  console.log('onChangePassword called')
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('onChangePassword called', data)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
}
module.exports = {
  addHandlers
}
