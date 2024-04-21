'use strict'

const USER = require('../models/user.model')


const findUserByEmail = async (email)=>{
     return await USER.findOne({user_email: email}).lean();
}

module.exports = {
     findUserByEmail
}