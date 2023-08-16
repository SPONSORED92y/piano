const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is empty'],
        validate: [isEmail, 'please enter a valid email'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'username is empty'],
    },
    password: {
        type: String,
        required: [true, 'password is empty'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    department: {
        type: String,
        required: [true, 'department is empty']
    },
    studentID: {
        type: String,
        required: [true, 'studentID is empty']
    },
    role: {
        type: String,
        required: [true, 'role is empty'],
        enum: ['Admin', 'Member'],
        default: 'Member',
    },
    times: {//times left to reserve piano room
        type: Number,
        required: [true, 'times is empty'],
        default: 7,
    }
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    } else {
        throw Error('incorrect email')
    }
}

module.exports = mongoose.model('User', UserSchema)