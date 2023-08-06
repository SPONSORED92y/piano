const User = require('../models/User')
const Book = require('../models/Book')
const Box = require('../models/Box')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { signupErrors, loginErrors, createErrors, profileErrors, changePasswordErrors } = require('./handleErrors')
const createToken = (id) => {
    return jwt.sign({ id }, 'rrharil', {
        expiresIn: 5 * 60 * 1000
    })
}
exports.listGet = async (req, res) => {
    let books = []
    try {
        if (res.locals.user.role === 'Admin') {
            books = await Book.find().sort({ "title": 1 })
        } else {
            books = await Book.find({}, { borrower: 0 }).sort({ "title": 1 })
        }
        res.status(200).json(books)
    } catch (err) {
        console.log(err)
    }
}
exports.createPost = async (req, res) => {
    const { title, status, borrower } = req.body
    try {
        const book = await Book.create({ title, status, borrower })
        res.status(201).json({ "book": book._id })
    } catch (err) {
        const errors = createErrors(err)
        res.status(400).json({ errors })
    }
}

exports.bookDelete = async (req, res) => {
    try {
        const deleteResult = await Book.deleteOne({ _id: req.body.id })
        res.status(200).json(deleteResult)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.bookPatch = async (req, res) => {
    try {
        const { id, title, status, borrower } = req.body
        const updateResult = await Book.updateOne({ _id: id }, { $set: { "title": title, "status": status, "borrower": borrower } }, { runValidators: true })
        res.status(200).json(updateResult)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.loginPost = async (req, res) => {
    if (res.locals.user) {
        res.status(400).json({ error: "duplicate login" })
    } else {
        const { email, password } = req.body;
        try {
            const user = await User.login(email, password)
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: 5 * 60 * 1000, sameSite: 'none', secure: true })
            res.cookie('currentUser', user.role, { maxAge: 5 * 60 * 1000, sameSite: 'none', secure: true, domain: 'sponsored92y.github.io' })
            res.status(200).json({ user: user._id })
        } catch (err) {
            const errors = loginErrors(err)
            res.status(400).json({ errors })
        }
    }
}

exports.signupPost = async (req, res) => {
    const { username, password, email, department, studentID, role, adminKey } = req.body
    try {
        if (role === 'Admin' && adminKey != 'SPONSORED') {
            throw Error('Invalid AdminKey')
        }
        const user = await User.create({ username, password, email, department, studentID, role })
        // const token = createToken(user._id)
        // res.cookie('jwt', token, { httpOnly: true, maxAge: 5 * 60 * 1000 })
        res.status(201).json({ "user": user._id })
    } catch (err) {
        const errors = signupErrors(err)
        res.status(400).json({ errors })
    }
}

exports.logoutPost = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1, sameSite: 'none', secure: true })
    res.cookie('currentUser', false, { maxAge: 1, sameSite: 'none', secure: true })
    res.status(200).json({})
}

exports.boxGet = async (req, res) => {
    let boxes = []
    try {
        boxes = await Box.find({ "week": req.body.week, "room": req.body.room }).sort({ "period": 1 })
        res.status(200).json(boxes)
    } catch (err) {
        console.log(err)
    }
}
exports.boxPost = async (req, res) => {
    try {
        const box = await Box.findOne({ _id: req.body.id })
        if (box.status !== 'Available') {
            throw Error('cant reserve if its not Available')
        }
        if (box.week === 1) {
            throw Error('you can only reserve next week')
        }
        if (res.locals.user.times <= 0) {
            throw Error('exceed reserve number limit')
        }
        const updateResultBox = await Box.updateOne({ _id: req.body.id }, { $set: { "user": res.locals.user.username, "status": "Occupied" } })
        const updateResultUser = await User.updateOne({ _id: res.locals.user._id }, { $set: { "times": res.locals.user.times - 1 } })
        res.status(200).json({ updateResultBox, updateResultUser })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
exports.boxDelete = async (req, res) => {
    try {
        const box = await Box.findOne({ _id: req.body.id })
        if (box.status !== 'Occupied') {
            throw Error('its not Occupied')
        }
        if (box.user !== res.locals.user.username) {
            throw Error('can not delete others reserve')
        }
        const updateResultBox = await Box.updateOne({ _id: req.body.id }, { $set: { "user": "", "status": "Available" } })
        let updateResultUser
        if (box.week === 2 && res.locals.user.times <= 6) {
            updateResultUser = await User.updateOne({ _id: res.locals.user._id }, { $set: { "times": res.locals.user.times + 1 } })
        }
        res.status(200).json({ updateResultBox, updateResultUser })
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
exports.boxPatch = async (req, res) => {
    //warning: Admin can modify status and user at will. This means that Admin can reserve unlimited times using the update method
    const { id, newStatus, newUser } = req.body
    try {
        if (res.locals.user.role !== 'Admin') {
            throw Error('Only Admin can do this action')
        }
        if (newStatus !== 'Occupied') {
            if (newUser !== '') {
                throw Error(`there cant be a user wihile status is${newStatus}`)
            }
        } else {
            if (newUser === '') {
                throw Error('there must be a user wihile status is Occupied')
            }
        }

        const box = await Box.findOne({ _id: id })
        const updateResult = await Box.updateOne({ _id: id }, { $set: { "user": newUser, "status": newStatus } })
        res.status(200).json(updateResult)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.populatePost = async (req, res) => {
    const statusList = ["Available", "Not Available", "Occupied"]
    const userList = ["Jason", "Jenny", "Frost", "Vivi", "TT"]
    let count = 0;
    try {
        for (let week = 1; week <= 2; week++) {
            for (let room = 1; room <= 3; room++) {
                for (let period = 1; period <= 112; period++) {
                    count++;
                    const status = statusList[Math.floor(Math.random() * 3)]
                    let user = ""
                    if (status === "Occupied") {
                        user = userList[Math.floor(Math.random() * 5)]
                    }
                    const box = await Box.create({ period, week, room, status, user })
                }
            }
        }
        res.status(200).send(`populated: ${count} boxes`)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.populateDelete = (req, res) => {
    Box.collection.drop()
        .then(result => res.status(200).send("deleted"))
        .catch(err => { res.status(400).json(err) })
}

exports.userGet = (req, res) => {
    try {
        res.status(200).json(res.locals.user)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.profilePatch = async (req, res) => {
    const { username, email, department, studentID, role, adminKey } = req.body
    try {
        if (res.locals.user.role !== 'Admin' && role === 'Admin' && adminKey != 'SPONSORED') {
            throw Error('Invalid AdminKey')
        }
        const updateResult = await User.updateOne({ _id: res.locals.user._id }, { $set: { 'username': username, 'email': email, 'department': department, 'studentID': studentID, 'role': role } }, { runValidators: true })
        res.status(200).send()
    } catch (err) {
        const errors = profileErrors(err)
        res.status(400).json({ errors })
    }
}

exports.changePasswordPatch = async (req, res) => {
    const { passwordCurrent, password } = req.body
    try {
        const user = await User.login(res.locals.user.email, passwordCurrent)
        const salt = await bcrypt.genSalt()
        const EncryptedPassword = await bcrypt.hash(password, salt)
        const updateResult = await User.updateOne({ _id: res.locals.user._id }, { $set: { 'password': EncryptedPassword } }, { runValidators: true })
        res.status(200).send()
    } catch (err) {
        const errors = changePasswordErrors(err)
        res.status(400).json({ errors })
    }
}