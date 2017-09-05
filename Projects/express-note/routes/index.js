const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    var data
    if (req.session.user) {
        data = {
            isLogin: true,
            user: req.session.user
        }
    } else {
        data = {
            isLogin: false
        }
    }
    res.render('index', data)
})


router.get('/login', (req, res, next) => {
    if (req.session.user) {
        res.send({ status: 0, userInfo: req.session.user })
    } else {
        res.send({ status: 1, errorMsg: 'Please login first' })
    }
})

module.exports = router