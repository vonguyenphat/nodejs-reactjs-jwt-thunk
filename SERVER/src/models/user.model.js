'use strict'
const { model, Schema, Types } = require('mongoose');
const slugify = require('slugify');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users'

const userSchema = new Schema({
    user_slug: { type: String, required: true },
    user_name: { type: String, required: true },
    user_password: { type: String, required: true },
    user_salt: { type: String, required: true }, // Mật khẩu lưu trữ mã hóa
    user_email: { type: String, required: true },
    user_phone: { type: String, default: '' },
    user_sex: { type: String, default: '' },
    user_avatar: { type: String, default: '' },
    user_date_of_birth: { type: Date, default: null },
    user_role: { type: Schema.Types.ObjectId, ref: 'Role' },
    user_status: { type: String, default: 'pending', enum: ['pending', 'active', 'block'] }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

userSchema.pre('save', function (next) {
    this.user_slug = slugify(this.user_name,{lower:true})
    next();
})
module.exports = model(DOCUMENT_NAME, userSchema);