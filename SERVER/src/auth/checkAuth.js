'use strict'
const { findByKey } = require('../repository/apiKey.repository')
const { asyncHandler } = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findKeyByUserId } = require('../services/keyStore.service')
const { verifyJWT } = require('./authUtils')
const HEADER = {
    API_KEY: process.env.API_KEY,
    AUTHORIZATION: process.env.AUTHORIZATION,
    CLIENT_ID: process.env.CLIENT_ID,
    REFRESH_TOKEN_URL: process.env.REFRESH_TOKEN_URL,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden error'
            })
        }
        const foundKey = await findByKey(key);
        if (!foundKey) {
            return res.status(403).json({
                message: 'Forbidden error'
            })
        }
        req.apiKey = foundKey;
        next();
    } catch (error) {
        next(error);
    }
}

const permission = (permission) => {
    return async (req, res, next) => {
        if (!req.apiKey.permissions) {
            return res.status(403).json({
                message: 'Permissions dined'
            })
        }
        const checkPermission = req.apiKey.permissions.includes(permission)
        if (!checkPermission) {
            return res.status(403).json({
                message: 'Permissions dined'
            })
        }
        return next();
    }
}

const authentication = asyncHandler(
    async (req, res, next) => {
        const userId = req.headers[HEADER.CLIENT_ID];
        if (!userId) throw new AuthFailureError('Invalid request');

        const keyStore = await findKeyByUserId(userId)
        if (!keyStore) throw new NotFoundError('Not found keystore');

        // if (req.originalUrl === HEADER.REFRESH_TOKEN_URL) {
        //     const refreshToken = req.headers[HEADER.REFRESH_TOKEN];
        //     if (refreshToken) {
        //         try {
        //             const decodeUserByRT = await verifyJWT(refreshToken, keyStore.privateKey);
        //             if (userId !== decodeUserByRT.userId) throw new AuthFailureError('Invalid User');
        //             req.keyStore = keyStore;
        //             req.user = decodeUserByRT;
        //             req.refreshToken = refreshToken;
        //             return next();
        //         } catch (error) {
        //             throw new AuthFailureError(error);
        //         }
        //     }
        // }

        const accessToken = req.headers[HEADER.AUTHORIZATION];
        if (!accessToken) throw new NotFoundError('Invalid Request');
        try {
            const decodeUser = await verifyJWT(accessToken, keyStore.publicKey);
            if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid User');
            req.keyStore = keyStore;
            req.user = decodeUser;
            return next();
        } catch (error) {
            throw new AuthFailureError(error);
        }
    }
)

module.exports = {
    apiKey,
    permission,
    authentication
}