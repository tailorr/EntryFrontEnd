var express = require('express')
var router = express.Router()
var Note = require('../model/note')


/* GET api listing. */
// 1. 获取所有note get /api/notes req{}
// 2, 添加 post api/notes/add req {note:'',id:1}
// 3，修改 post api/notes/edit req{note:'',id:1}
// 4，删除 post api/notes/delete req{id:1}


router.get('/notes', (req, res, next) => {
    Note.findAll({ raw: true }).then((notes) => {
        res.send({ status: 0, data: notes });
    }).catch(() => {
        res.send({ status: 1, errorMsg: '数据库异常' });
    })
})

router.post('/notes/add', (req, res, next) => {
    Note.create({ text: req.body.note }).then((notes) => {
        res.send({ status: 0, data: notes })
    }).catch(() => {
        res.send({ status: 1, errorMsg: '数据库异常' })
    })
})

router.post('/notes/edit', (req, res, next) => {
    Note.update({ text: req.body.note }, { where: { id: req.body.id } }).then(() => {
        res.send({ status: 0 })
    }).catch(() => {
        res.send({ status: 1, errorMsg: '数据库异常' })
    })
})

router.post('/notes/delete', (req, res, next) => {
    Note.destroy({ where: { id: req.body.id } }).then(() => {
        res.send({ status: 0 })
    }).catch(() => {
        res.send({ status: 1, errorMsg: '数据库异常' });
    })

})

module.exports = router;