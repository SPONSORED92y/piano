const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./authMiddleware')
const helmet = require("helmet")


const controller = require("./controllers/controller")
const schedule = require("./schedule")

const app = express()

app.use(express.json())
app.use(cookieParser())

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 300,
});
// Apply rate limiter to all requests
app.use(limiter);


// const cors = require('cors')
// var corsOptions = {
//     origin: 'http://localhost:11587',
//     // credentials: true
//     credentials: true
// }
// app.use(cors(corsOptions))
app.use(helmet())

const dbURI = process.env.MONGODB_URI || 'mongodb+srv://jasonsu92y:jason789523@cluster0.yb5h0bu.mongodb.net/jwt-auth?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(process.env.PORT || 9000, () => console.log(`server start on ${process.env.PORT || 9000}`)))
    .catch((err) => console.log(err))

var router = express.Router()
app.use('/', router)
router.get('/server', (req, res) => {
    res.status(200).send('I am Groot\n')
})
router.get('/server/list', requireAuth, checkUser, controller.listGet)
router.post('/server/login', checkUser, controller.loginPost)
router.post('/server/signup', controller.signupPost)
router.post('/server/create', requireAuth, checkUser, controller.createPost)
router.post('/server/logout', controller.logoutPost)
router.delete('/server/book', requireAuth, checkUser, controller.bookDelete)
router.patch('/server/book', requireAuth, checkUser, controller.bookPatch)
router.post('/server/reservePage', schedule.checkEnabled, requireAuth, controller.boxGet)
router.post('/server/reserve', schedule.checkEnabled, requireAuth, checkUser, controller.boxPost)
router.delete('/server/reserve', schedule.checkEnabled, requireAuth, checkUser, controller.boxDelete)
router.patch('/server/reserve', schedule.checkEnabled, requireAuth, checkUser, controller.boxPatch)
router.post('/server/populate', controller.populatePost)
router.delete('/server/populate', controller.populateDelete)
router.get('/server/user', checkUser, controller.userGet)
router.patch('/server/profile', requireAuth, checkUser, controller.profilePatch)
router.patch('/server/changePassword', requireAuth, checkUser, controller.changePasswordPatch)
// router.get('/server/forgotPassword', controller.forgotPasswordGet)
router.get('/server/Userlist', requireAuth, checkUser, controller.userListGet)
router.patch('/server/profileEditUser', requireAuth, checkUser, controller.profileEditUserPatch)
router.patch('/server/changePasswordEditUser', requireAuth, checkUser, controller.changePasswordEditUserPatch)
router.delete('/server/editUser', requireAuth, checkUser, controller.editUserDelete)
router.get('/server/posts', controller.postsGet)
router.post('/server/createPost', requireAuth, checkUser, controller.createPostsPost)
router.get('/server/post/:id', controller.postGet)
router.post('/server/editPost', requireAuth, checkUser, controller.editPostPost)
router.delete('/server/deletePost', requireAuth, checkUser, controller.deletePostDelete)
// router.get('/server/message', requireAuth, checkUser, controller.messageGet)
// router.post('/server/messageSend', requireAuth, checkUser, controller.messageSendPost)
// router.delete('/server/message', requireAuth, checkUser, controller.messageDelete)
// router.delete('/server/editUser', requireAuth, checkUser, controller.editUserDelete)

schedule.weeklyReserveUpdate()