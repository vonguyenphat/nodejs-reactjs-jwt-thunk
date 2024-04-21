'use strict'
const express = require('express');
const router = express();

router.get('/v1/api/test', (req, res) => {
   return res.status(200).json({
      message: 'test'
   })
})

const { apiKey, permission } = require('../auth/checkAuth');
// check apiKey
router.use(apiKey)
// check permission
router.use(permission('0000'))
// api project

router.use('/v1/api/rbac', require('./rbac/index'))
router.use('/v1/api/access', require('./access/index'))
module.exports = router;
