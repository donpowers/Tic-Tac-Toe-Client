'use strict'

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
module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  changePasswordFailure,
  changePasswordSuccess
}
