'use strict'
const JWT = require('jsonwebtoken');

const createToKenPair = async (payload, publicKey, privateKey) => {
    try {
        // access token
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: '7 days'
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: '20 days'
        });
        return { accessToken, refreshToken }
    } catch (error) {
        return error;
    }
}

const verifyJWT = async (token, keySecret) => {
    return  JWT.verify(token, keySecret);
}

module.exports = {
    createToKenPair,
    verifyJWT
}
