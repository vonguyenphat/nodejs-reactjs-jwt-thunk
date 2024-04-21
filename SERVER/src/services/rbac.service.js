'use strict'
const RESOURCE = require('../models/resource.model');
const ROLE = require('../models/role.model');
const { BadRequestError } = require('../core/error.response');

const saveResource = async ({ name, slug, description }) => {
     const foundResource = await RESOURCE.findOne({ src_name: name, src_slug: slug });
     if (foundResource) throw new BadRequestError('Resource enough exits');
     const newResource = await RESOURCE.create({ src_name: name, src_slug: slug, src_description: description });
     return newResource;
}

const listResource = async ({
     userId = '', // ADMIN
     limit = 30,
     offset = 0,
     search = [] }) => {
     // 1. Check middleware role ADMIN
     // 2. Get list of resources
     const resources = await RESOURCE.aggregate([
          {
               $project: {
                    _id: 0,
                    name: '$src_name',
                    slug: '$src_slug',
                    description: '$src_description',
                    resourceId: '$_id',
                    createdAt: 1
               }
          }
     ]);
     return resources;
}
const saveRole = async ({
     name = 'shop',
     slug = '0001',
     description = 'extend from shop or user',
     grants = [] // Cho phép đi vào trang nào quyền gì trong trang đó 
}) => {
     const foundRole = await ROLE.findOne({ role_slug: slug });
     if (foundRole) throw new BadRequestError(`Role already exits`);
     const newRole = await ROLE.create({
          role_name: name,
          role_slug: slug,
          role_description: description,
          grant: grants
     });
     return newRole;
}
const listRole = async () => {
     try {

     } catch (error) {

     }
}
module.exports = {
     saveResource,
     listResource,
     saveRole,
     listRole
}