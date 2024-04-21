'use strict'

const API_KEY_MODEL = require("../models/apikey.model")

const findByKey = async(key)=>{
    return await API_KEY_MODEL.findOne({
        key,
        status:true
    }).lean();
}
module.exports = {
    findByKey
}