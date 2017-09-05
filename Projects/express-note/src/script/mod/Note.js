require('scss/note.scss')

const Waterfall = require('mod/Waterfall')
const Event = require('mod/Event')
const Toast = require('mod/Toast')
const Mask = require('mod/Mask')
const Drag = require('mod/Drag')

let Note = (() => {
    class _Note {
        constructor(opts) {
            this.defaultOpts = {
                id: '',
                uid: '',
                author: 'Admin',
                $ct: $('#content').length > 0 ? $('#content') : $('body'),
                createTime: new Date().toISOString().match(/^\d{4}-\d{1,2}-\d{1,2}/),
                initContext: 'Input your note here',
                title: 'Input your title...'
            }
            this._initOpts(opts)
            this._createNote()
            this._bindEvent()
        }
        _initOpts(opts) {
            this.opts = $.extend({}, this.defaultOpts, opts || {})
                // Object.assign()
            this.id = this.opts.id ? this.opts.id : ''
            this.uid = this.opts.uid ? this.opts.uid : ''
            this.title = this.opts.title ? this.opts.title : 'Input your title...'
            this.$ct = this.opts.$ct ? this.opts.$ct : $('#content').length > 0 ? $('#content') : $('body')
            this.initContext = this.opts.initContext ? this.opts.initContext : 'Input your note here'
            this.author = this.opts.author ? this.opts.author : 'Admin'
            this.createTime = this.opts.createTime ? this.opts.createTime : new Date().toISOString().match(/^\d{4}-\d{1,2}-\d{1,2}/)
        }
        _createNote() {
            let tpl = `<div class="note">
                            <div class="note-header">
                                <div class="title" contenteditable="true">${this.title}</div>
                                <div class="drag"></div>
                            </div>
                            <div class="note-content" contenteditable="true">${this.initContext}</div>
                            <div class="note-info">
                                <div class="author">${this.author}</div>
                                <div class="time">${this.createTime}</div>
                            </div>
                            <div class="note-footer">                       
                                <button class="save">Save</button>
                            </div>
                            <i class="delete">&#xe70c;</i>
                       </div>`
            this.$note = $(tpl)
            this.$note.find('.note-content').data('before', this.initContext)
            this.$note.find('.note-header').data('before', this.title)
            this.$ct.append(this.$note)
            this._initLayout()

            if (!this.id) {
                this.$mask = Mask.init()
                Toast.init('Create Sucess')
            }
        }
        _initLayout() {
            this.$note.css({
                "position": "absolute",
                "top": "50%",
                "left": "50%",
                "transform": "translate(calc(-50% - 20px), calc(-50% - 70px))",
                "z-index": "1000"
            })
        }
        _fulfilLayout() {
            Event.fire('waterfall');
        }
        _bindEvent() {
            let $title = this.$note.find('.title')
            let $drag = this.$note.find('.drag')
            let $note = this.$note.find('.note-content')
            let $delete = this.$note.find('.delete')
            let $save = this.$note.find('.save')

            //删除
            $delete.on('click', () => {
                this._delete()
                if (!this.id) this.$note.remove()
                this.$mask && this.$mask.remove()
                this.$mask = null
                this._fulfilLayout()
            })

            // 保存
            $save.on('click', () => {
                if ($note.text() === 'Input your note here' || $note.text() === '') {
                    Toast.init("Please enter your note")
                    return
                }
                if ($title.text() === 'Input your title...' || $title.text() === '') {
                    Toast.init("Please enter your title")
                    return
                }
                this.$mask && this.$mask.remove()
                this.$mask = null
                this._fulfilLayout()

                if (this.id) {
                    this._edit($title.html(), $note.html())
                } else {
                    this._add($title.html(), $note.html())
                }
            })

            //增加、修改
            $note.on('focus', () => {
                $.get('/login').then(res => {
                    if (res.status === 0) {
                        if ($note.text() === 'Input your note here') $note.html('')
                        $note.data('before', $note.html())
                        this.$mask = this.$mask ? this.$mask : Mask.init()
                        this._initLayout()
                    } else {
                        Toast.init(res.errorMsg)
                        return
                    }
                })
            }).on('blur paste', () => {
                if (!this.id) return
                if ($note.data('before') != $note.html()) {
                    $note.data('before', $note.html())
                    this._fulfilLayout()
                    this.$mask && this.$mask.remove()
                    this.$mask = null
                    if (this.id) {
                        this._edit($title.html(), $note.html())
                    } else {
                        this._add($title.html(), $note.html())
                    }
                }
            })

            $title.on('focus', e => {
                // e.stopPropagation()
                $.get('/login').then(res => {
                    if (res.status === 0) {
                        if ($title.text() === 'Input your title...') $title.html('')
                        $title.data('before', $title.html())
                        this.$mask = this.$mask ? this.$mask : Mask.init()
                        this._initLayout()
                    } else {
                        Toast.init(res.errorMsg)
                        return
                    }
                })

            }).on('blur paste', () => {
                if (!this.id) return
                if ($title.data('before') != $title.html()) {
                    $title.data('before', $title.html())
                    this._fulfilLayout()
                    this.$mask && this.$mask.remove()
                    this.$mask = null
                    if (this.id) {
                        this._edit($title.html(), $note.html())
                    } else {
                        this._add($title.html(), $note.html())
                    }
                }
            })

            $drag.on('mousedown', () => {
                this.$note.css({
                    'transition': 'none'
                })
                Drag.init(this.$note)
                console.log(Drag.init(this.$note))
            }).on('mouseup', () => {
                this.$note.css({
                    'transition': 'all 1s'
                })
            })
        }

        /* ---------------------------  以下是数据库的相关操作  ----------------------------- */
        //存储到数据库
        _add(title, note) {
            $.post('/api/notes/add', { title: title, note: note }).then(res => {
                if (res.status === 0) {
                    Toast.init(res.successMsg)
                } else {
                    this.$note.remove()
                    Event.fire('waterfall')
                    Toast.init(res.errorMsg)
                }
            })
        }

        // 修改数据库内容
        _edit(title, msg) {
            $.post('/api/notes/edit', {
                id: this.id,
                title: title,
                note: msg
            }).then(res => {
                if (res.status === 0) {
                    Toast.init(res.successMsg);
                } else {
                    Toast.init(res.errorMsg);
                }
            })
        }

        //从数据库删除
        _delete() {
            $.post('/api/notes/delete', { id: this.id }).then(res => {
                if (res.status === 0) {
                    this.$note.remove()
                    Toast.init(res.successMsg)
                    Event.fire('waterfall')
                } else {
                    Toast.init(res.errorMsg);
                }
            })
        }
    }

    return {
        init: (opts) => {
            new _Note(opts)
        },
        empty: () => {
            let $ct = $('#content').length > 0 ? $('#content') : $('body')
            $ct.empty()
        }
    }
})()
window.Note = Note
module.exports = Note