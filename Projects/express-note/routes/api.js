var express = require('express')
var router = express.Router()
var Note = require('../model/note')


/* GET api listing. */
// 1. 获取所有note get /api/notes req{}
// 2, 添加 post api/notes/add req {note:'',id:1}
// 3，修改 post api/notes/edit req{note:'',id:1}
// 4，删除 post api/notes/delete req{id:1}


router.get('/notes', (req, res, next) => {
    var opts = { raw: true }
    if (req.session && req.session.user) {
        opts.where = { uid: req.session.user.id }
    }
    var user = req.session.user
    Note.findAll(opts).then((notes) => {
        res.send({ status: 0, data: notes, uerInfo: user });
    }).catch(() => {
        res.send({ status: 1, errorMsg: 'Database Exception Or Uou Have No Permissions' });
    })
})

router.post('/notes/add', (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.send({ status: 1, errorMsg: 'Please Login First' })
    }
    if (!req.body.note) {
        return res.send({ status: 2, errorMsg: 'Please Enter Your Note' });
    }

    var note = req.body.note;
    var uid = req.session.user.id;
    // var noteId = req.body.id;
    var user = req.session.user

    Note.create({ text: note, uid: uid }).then(() => {
        res.send({ status: 0, uerInfo: user })
    }).catch(function() {
        res.send({ status: 1, errorMsg: 'Database Exception Or Uou Have No Permissions' });
    })
})

router.post('/notes/edit', (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.send({ status: 1, errorMsg: 'Please Login First' })
    }

    var noteId = req.body.id;
    var note = req.body.note;
    var uid = req.session.user.id;

    Note.update({ text: note }, { where: { id: noteId, uid: uid } }).then(() => {
        res.send({ status: 0 })
    }).catch(() => {
        res.send({ status: 1, errorMsg: 'Database Exception Or Uou Have No Permissions' })
    })
})

router.post('/notes/delete', (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.send({ status: 1, errorMsg: 'Please Login First' })
    }

    var noteId = req.body.id
    var uid = req.session.user.id;

    Note.destroy({ where: { id: noteId, uid: uid } }).then(() => {
        res.send({ status: 0 })
    }).catch(() => {
        res.send({ status: 1, errorMsg: 'Database Exception Or Uou Have No Permissions' });
    })

})
router.post('/notes/empty', (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.send({ status: 1, errorMsg: 'Please Login First' })
    }

    var uid = req.session.user.id;

    Note.sync({ force: true }, { where: { uid: uid } }).then(() => {
        res.send({ status: 0 })
    }).catch(() => {
        res.send({ status: 1, errorMsg: 'Database Exception Or Uou Have No Permissions' });
    })

})


module.exports = router;