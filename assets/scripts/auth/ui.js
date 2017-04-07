'use strict'

const api = require('./api')
const store = require('../store')

const signUpSuccess = (data) => {
  console.log(data)
}

const signUpFailure = (error) => {
  console.error(error)
}
const signInSuccess = (data) => {
  console.log('Sign-in success: ', data)
  store.user = data.user
  const createData = {}
  api.createGame(createData)
    .then(createGameSuccess)
    .catch(createGameFailure)
}

const signInFailure = (error) => {
  console.log('Sign In Failure')
  console.error(error)
}
const signOutSuccess = () => {
  console.log('Sign Out success: ')
  // clean up the stored value
  store.user = null
}
const signOutFailure = (error) => {
  console.log('Sign Out Failure')
  console.error(error)
}
const changePasswordSuccess = () => {
  console.log('Change Password success')
  // clean up the stored value
  store.user = null
}
const changePasswordFailure = (error) => {
  console.log('Change Password Out Failure')
  console.error(error)
}
const createGameSuccess = (data) => {
  store.game = data.game
  console.log('createGameSuccess called', store)
}
const createGameFailure = (data) => {
  console.log('createGameFailure called')
}
const updateGameStateSuccess = (data) => {
  console.log('updateGameStateSuccess success: ', data)
}
const updateGameStateFailure = (data) => {
  console.log('updateGameStateFailure called', data)
}
const getUserGamesSuccess = (data) => {
  console.log('getUserGamesSuccess success: ', data)
  store.gameStats = data.games
}
const getUserGamesFailure = (data) => {
  console.log('getUserGamesFailure called', data)
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
  getUserGamesSuccess,
  getUserGamesFailure
}
