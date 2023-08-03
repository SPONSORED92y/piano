const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./authMiddleware')

const controller = require("./controllers/controller");
const schedule = require("./schedule");

var cors = require('cors')

const app = express();

app.use(express.json());
app.use(cookieParser());

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions));

const dbURI = 'mongodb+srv://jasonsu92y:jason789523@cluster0.yb5h0bu.mongodb.net/jwt-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(9000, () => console.log("server start on 9000")))
    .catch((err) => console.log(err))


var router = express.Router();
app.use('/', router);
router.get('/list', requireAuth, checkUser, controller.listGet);
router.post('/login', checkUser, controller.loginPost);
router.post('/signup', controller.signupPost);
router.post('/create', requireAuth, checkUser, controller.createPost);
router.post('/logout', controller.logoutPost);
router.delete('/book', requireAuth, checkUser, controller.bookDelete);
router.patch('/book', requireAuth, checkUser, controller.bookPatch);
router.post('/reservePage', requireAuth, controller.boxGet);
router.post('/reserve', requireAuth, checkUser, controller.boxPost);
router.delete('/reserve', requireAuth, checkUser, controller.boxDelete);
router.patch('/reserve', requireAuth, checkUser, controller.boxPatch);
router.post('/populate', controller.populatePost)
router.delete('/populate', controller.populateDelete)
router.get('/user', checkUser, controller.userGet)
router.get('/hi', controller.hi)

schedule.weeklyReserveUpdate()
// schedule.test()