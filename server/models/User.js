const {default: mongoose} = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    picture: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/jaewon/image/upload/v1699939638/ag9cfisfekfvzijxosza.png'
    }
})

userSchema.methods.invalidatedPassword = async function(userSentPassword) {
    return await bcrypt.compare(userSentPassword, this.password);
}

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this_id}, process.env.JWT_SECRET, {
        expriresIn: process.env.JWT_EXPIRY
    })
}

const User = mongoose.model('User', userSchema)
module.export = User;