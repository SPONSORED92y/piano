const jwt = require('jsonwebtoken');
const User = require('./models/User');
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'rrharil', (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.status(401).json({ "error": "not logged in" })
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ "error": "not logged in" })
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'rrharil', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null
                next()
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser };