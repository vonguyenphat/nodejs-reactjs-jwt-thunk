'use strict'

const { SuccessResponse } = require('../core/success.response');
const { signUp, signIn } = require('../services/access.service');


const register = async (req, res, next) => {
   return new SuccessResponse({
      message: `Create account successfully`,
      metadata: await signUp(req.body)
   }).send(res)
}
const login = async (req, res, next) => {
   return new SuccessResponse({
      message: `Create account successfully`,
      metadata: await signIn(req.body)
   }).send(res)
}

const getUserFromAT = async (req, res, next) => {
   return new SuccessResponse({
      message: `get info account successfully`,
      metadata: req.user
   }).send(res)
}

module.exports = {
   register,
   login,
   getUserFromAT
}