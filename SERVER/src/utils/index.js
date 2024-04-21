'use strict'
const _ = require('lodash');

const pickLodash = ({ fields = [], object = {} }) => {
    return _.pick(object, fields)
}

module.exports ={
    pickLodash
}
