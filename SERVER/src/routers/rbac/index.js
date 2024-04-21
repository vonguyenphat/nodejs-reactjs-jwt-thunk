'use strict'
const express = require('express');
const router = express();
const { asyncHandler } = require('../../helpers/asyncHandler')

const { createResource, createRole, getListResource } = require('../../controllers/rbac.controller')

router.post('/resource', asyncHandler(createResource));
router.get('/resources', asyncHandler(getListResource));
router.post('/role', asyncHandler(createRole));
// router.get('/roles',asyncHandler(getListR));



module.exports = router;