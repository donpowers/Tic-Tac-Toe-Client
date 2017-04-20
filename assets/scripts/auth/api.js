'use strict'

const config = require('../config')
const store = require('../store')

const signUp = (data) => {
  // console.log('signUp in api called')
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}
const signIn = (data) => {
  // console.log('Api:signIn called')
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}
const changePassword = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/change-password/' + store.user.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const signOut = (data) => {
  // console.log('Api:sign OUT called')
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token}
  })
}
const createGame = (data) => {
  // console.log('Create Game Called data:', data)
  // console.log('Store: ', store)
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token},
    data
  })
}
const updateGameState = (data) => {
  // console.log('updateGameState Called showing store', store)
  // console.log('updateGameState Called showing data', data)
  const id = store.game.id
  return $.ajax({
    url: config.apiOrigin + '/games/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token},
    data
  })
}
const getUserGames = (data) => {
  // console.log('getUserGames Called')
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token}
  })
}
module.exports = {
  signUp,
  signIn,
  signOut,
  createGame,
  updateGameState,
  getUserGames,
  changePassword
}
