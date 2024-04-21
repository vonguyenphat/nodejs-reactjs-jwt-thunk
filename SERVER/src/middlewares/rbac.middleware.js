'use strict'
const rbac = require('accesscontrol')

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            const role_name = req.query.role;
            const permission = rbac.can(role_name)[action](resource);
            if (!permission.granted) {
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}
module.exports = { grantAccess };