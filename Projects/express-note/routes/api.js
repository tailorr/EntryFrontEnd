const express = require('express')
const router = express.Router()
const Note = require('../model/note')

/* GET api listing. */
// 1. 获取所有note get /api/notes req {}
// 2, 添加 post api/notes/add req {note:'',id:1}
// 3，修改 post api/notes/edit req {note:'',id:1}
// 4，删除 post api/notes/delete req {id:1}
// 5, 清空 post api/notes/empty req {uid:someone}
router.get('/notes', (req, res, next) => {
    let opts = { raw: true }
    if (req.session && req.session.user) {
        opts.where = { uid: req.session.user.id }
        var username = req.session.user.username
    }

    successMsg = username ? `Welcome back, ${username}` : `Welcome to visit`
    Note.findAll(opts).then((notes) => {
        res.send({ status: 0, data: notes, successMsg: successMsg });
    }).catch(() => {
        res.send({ status: 1, errorMsg: `You haven't created a note yet ` })
    })

})
router.post('/notes/add', (req, res, next) => {
    if (!req.session || !req.session.user) {
        res.send({ status: 1, errorMsg: 'Please login first' })
    }
    if (!req.body.note) {
        res.send({ status: 2, errorMsg: 'Please enter your note' });
    }

    let note = req.body.note
    let title = req.body.title
    let uid = req.session.user.id
    let author = req.session.user.username

    Note.create({
        title: title,
        text: note,
        uid: uid,
        author: author
    }).then(() => {
        res.send({ status: 0, successMsg: 'Add success' })
    }).catch(function() {
        res.send({ status: 1, errorMsg: 'Database exception or you have no permissions' });
    })
})

router.post('/notes/edit', (req, res, next) => {
    if (!req.session || !req.session.user) {
        res.send({ status: 1, errorMsg: 'Please login first' })
    }

    let noteId = req.body.id;
    let note = req.body.note;
    let title = req.body.title;
    let uid = req.session.user.id;

    Note.update({ title: title, text: note }, { where: { id: noteId, uid: uid } }).then(() => {
        res.send({ status: 0, successMsg: 'Update success' })
    }).catch(() => {
        res.send({ status: 1, errorMsg: 'Database exception or you have no permissions' })
    })
})

router.post('/notes/delete', (req, res, next) => {
    if (!req.session || !req.session.user) {
        res.send({ status: 1, errorMsg: 'Please login first' })
    }

    let noteId = req.body.id
    let uid = req.session.user.id;

    Note.destroy({ where: { id: noteId, uid: uid } }).then(() => {
        res.send({ status: 0, successMsg: 'Delete success' })
    }).catch(() => {
        res.send({ status: 1, errorMsg: 'Database exception or you have no permissions' });
    })

})

router.post('/notes/empty', (req, res, next) => {
    if (!req.session || !req.session.user) {
        res.send({ status: 1, errorMsg: 'Please login first' })
    }

    let uid = req.session.user.id

    Note.destroy({ where: { uid: uid } }).then(() => {
        res.send({ status: 0, successMsg: 'Empty success' })
    }).catch(() => {
        res.send({ status: 1, errorMsg: 'Database exception or you have no permissions' });
    })
})

module.exports = router;