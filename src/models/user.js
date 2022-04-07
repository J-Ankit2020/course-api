const mongoose = require('mongoose');
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    courseEnrolled: {
        type: Array,
        default: []
    }
})
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.courseEnrolled;
    return userObject;
}
const User = mongoose.model('User', userSchema);
module.exports = User;