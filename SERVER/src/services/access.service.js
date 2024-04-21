'use strict'
const { BadRequestError, NotFoundError, AuthFailureError } = require('../core/error.response')
const USER_MODEL = require('../models/user.model')
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { createToKenPair } = require('../auth/authUtils');

const { findUserByEmail } = require('../repository/user.repository');
const { createKeyToken } = require('../services/keyStore.service');


const signIn = async ({ email, password }) => {
    // console.log('signIn:::', { email, password })
    const foundUser = await findUserByEmail(email);
    // const foundUsers = await USER_MODEL.aggregate([
    //     {
    //         $match:{
    //             user_email: email
    //         }
    //     },
    //     {
    //         $project:{
    //             userId: '$_id',
    //             email: '$user_email',
    //             slug: '$user_slug',
    //             name: '$user_name',
    //             phone: '$user_phone',
    //             avatarUrl: '$user_avatar',
    //             sex: '$user_sex',
    //             dateOfBirth: '$user_date_of_birth',
    //             _id:0
    //         }
    //     }
    // ]);

    if (!foundUser) throw new NotFoundError(`User not exits!`);


    const match = await bcrypt.compare(password, foundUser.user_password);
    if (!match) throw new AuthFailureError(`Authentication failed!`);
    console.log(`Test::::`);

    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');
    console.log({ privateKey, publicKey });

    const { _id: userId, user_slug: slug, user_name: name, user_phone: phone, user_avatar: avatarUrl, user_date_of_birth: birthday, user_sex: sex } = foundUser;

    const tokens = await createToKenPair({ userId, email, slug, name, phone, avatarUrl, birthday, sex }, publicKey, privateKey);
    const keyStore = await createKeyToken({
        userId,
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken
    });
    const user = { userId, slug, name, phone, avatarUrl, birthday, sex }
    if (!keyStore) throw new BadRequestError(`Error key store failed!`);
    return {
        user,
        tokens
    }
}
const signUp = async ({ name = '', email, password, user_salt = 'unKnow', user_slug = 'unKnow', phone }) => {
    const foundUser = await USER_MODEL.findOne({ user_email: email });
    if (foundUser) throw new BadRequestError('User already registered!', 409);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await USER_MODEL.create({
        user_name: name, user_email: email, user_password: passwordHash, user_phone: phone, user_salt, user_slug
    })
    if (newUser) {
        return newUser
    }
    throw new BadRequestError(`Đăng nhập thất bại`)
}
module.exports = {
    signUp,
    signIn
}