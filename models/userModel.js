const { default: mongoose } = require('mongoose')
const mongodb = require('mongoose')

const userSchema = new mongodb.Schema({
    username: {
        type: String,
        required: [true, 'user must have username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'user must have password'],
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User