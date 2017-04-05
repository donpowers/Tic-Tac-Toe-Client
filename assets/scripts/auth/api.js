'use strict'

const config = require('../config')
// const store = require('../store')

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
module.exports = {
  signUp,
  signIn
}
