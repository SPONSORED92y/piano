const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const cookieParser = require('cookie-parser')
const { requireAuth, checkUser } = require('./authMiddleware')

const controller = require("./controllers/controller");

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
    .then((result) => app.listen(8000, () => console.log("server start on 8000")))
    .catch((err) => console.log(err))


var router = express.Router();
app.use('/', router);
router.get('/list', requireAuth, checkUser, controller.listGet);
// router.get('/books', controller.booksGet);
router.post('/login', checkUser, controller.loginPost);
router.post('/signup', controller.signupPost);
router.post('/create', controller.createPost);
router.post('/logout', controller.logoutPost);
router.delete('/book', controller.bookDelete);
router.patch('/book', controller.bookPatch);
