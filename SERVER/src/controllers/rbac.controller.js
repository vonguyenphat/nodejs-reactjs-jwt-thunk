'use strict'

const { SuccessResponse } = require('../core/success.response');
const { saveResource, listResource, saveRole } = require('../services/rbac.service');

const createResource = async (req, res, next) => {
     new SuccessResponse({
          message: `Create resource successfully`,
          metadata: await saveResource(req.body)
     }).send(res);
}

const createRole = async (req, res, next) => {
     new SuccessResponse({
          message: `Create role successfully`,
          metadata: await saveRole(req.body)
     }).send(res);
}
const getListResource = async (req, res, next) => {
     new SuccessResponse({
          message: `Get list resource successfully`,
          metadata: await listResource(req.query)
     }).send(res);
}

module.exports = {
     createResource,
     createRole,
     getListResource
}