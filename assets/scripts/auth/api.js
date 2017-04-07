'use strict'

const config = require('../config')
const store = require('../store')

const signUp = (data) => {
  console.log('signUp in api called')
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}
const signIn = (data) => {
  console.log('Api:signIn called')
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}
const signOut = (data) => {
  console.log('Api:sign OUT called')
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token}
  })
}
const createGame = (data) => {
  console.log('Create Game Called')
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token},
    data
  })
}
module.exports = {
  signUp,
  signIn,
  signOut,
  createGame
}
