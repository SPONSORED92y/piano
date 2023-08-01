const User = require('../models/User')
const Book = require('../models/Book')
const Box = require('../models/Box')
const jwt = require('jsonwebtoken')
const { signupErrors, loginErrors, createErrors } = require('./handleErrors')
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
        const updateResult = await Book.updateOne({ _id: id }, { $set: { "title": title, "status": status, "borrower": borrower } })
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
        const { username, password } = req.body;
        try {
            const user = await User.login(username, password)
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: 5 * 60 * 1000 })
            res.cookie('currentUser', user.role, { maxAge: 5 * 60 * 1000 })
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
    res.cookie('jwt', '', { maxAge: 1 })
    res.cookie('currentUser', false, { maxAge: 1 })
    res.status(200).json({})
}

exports.boxGet=async(req,res)=>{
    let boxes = []
    try {
        boxes = await Box.find().sort({ "period": 1 })
        res.status(200).json(boxes)
    } catch (err) {
        console.log(err)
    }
}
exports.boxPost=async(req,res)=>{
    try {
        const box=await Box.findOne({ _id: req.body.id })
        if(box.status!=='Available'){
            throw Error('unavailable period')
        }
        const updateResult = await Box.updateOne({ _id: req.body.id }, { $set: { "user": res.locals.user.username,"status":"Occupied" } })
        res.status(200).json(updateResult)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
exports.boxDelete=async(req,res)=>{
    try {
        const box=await Box.findOne({ _id: req.body.id })
        if(box.status!=='Not Available'){
            throw Error('unavailable period')
        }
        if(box.user!==Reserve.locals.user.username){
            throw Error('can not delete others reserve')
        }
        const updateResult = await Box.updateOne({ _id: req.body.id }, { $set: { "user": "","status":"Available" } })
        res.status(200).json(updateResult)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}
exports.boxPatch=async(req,res)=>{
    const {id,status,user}=req.body
    try {
        if(res.locals.user!=='Admin'){
            throw Error('Only Admin can do this action')
        }
        const box=await Box.findOne({ _id: id })
        const updateResult = await Box.updateOne({ _id: id }, { $set: { "user": user,"status":status } })
        res.status(200).json(updateResult)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}