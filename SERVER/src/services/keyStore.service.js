'use strict'
const {Types} = require('mongoose')
const KEY_TOKEN = require("../models/keyToken.model")

const createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
   const
      filter = { userId },
      update = { publicKey, privateKey, refreshTokensUsed: [], refreshToken },
      option = { upsert: true, new: true }
   const keyTokens = await KEY_TOKEN.findOneAndUpdate(filter, update, option);
   return keyTokens ? keyTokens.publicKey : null;
}

const findKeyByUserId = async (userId) => {
   return await KEY_TOKEN.findOne({userId: new Types.ObjectId(userId)});
}
module.exports = {
   createKeyToken,
   findKeyByUserId
}