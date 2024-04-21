'use strict'
const express = require('express');
const router = express();
const { asyncHandler } = require('../../helpers/asyncHandler');
const { register, login ,getUserFromAT } = require('../../controllers/access.controller');
const { authentication } = require('../../auth/checkAuth');

router.post('/signup', asyncHandler(register));
router.post('/login', asyncHandler(login));

router.use(authentication)
router.get('/get_user_from_at',asyncHandler(getUserFromAT))

module.exports = router;