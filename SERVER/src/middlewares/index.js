'use strict'
const express = require('express');
const router = express();

const { apiKey, permission } = require('../auth/authUtils');
router.use(apiKey);
router.use(permission('0000'))

module.exports = router;
