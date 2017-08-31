require('scss/note.scss')

let Waterfall = require('mod/Waterfall')
let Event = require('mod/Event')
let Toast = require('mod/Toast')
let Mask = require('mod/Mask')

let Note = (() => {
    class _Note {
        constructor(opts) {
            this.defaultOpts = {
                id: '',
                uid: '',
                $ct: $('#content').length > 0 ? $('#content') : $('body'),
                createTime: new Date().toISOString().match(/^\d{4}-\d{1,2}-\d{1,2}/),
                initContext: 'Input your note here',
                title: 'Input Your Title...'
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
        }
        _createNote() {
            let tpl = `<div class="note">
                            <div class="note-header" contenteditable="true">${this.opts.title}</div>
                            <div class="note-content" contenteditable="true">${this.opts.initContext}</div>
                            <div class="note-footer">
                                <span class="time">${this.opts.createTime} Noted by tail</span>
                                <button class="save">Save</button>
                            </div>
                            <i class="delete">&#xe70c;</i>
                       </div>`
            this.$note = $(tpl)
            $('#content').append(this.$note)

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
            let $title = this.$note.find('.note-header')
            let $note = this.$note.find('.note-content')
            let $delete = this.$note.find('.delete')
            let $save = this.$note.find('.save')

            //删除
            $delete.on('click', () => {
                this._delete()
                this.$mask && this.$mask.remove()
                this.$mask = null
                this._fulfilLayout()
            })

            // 保存
            $save.on('click', () => {
                if ($note.text() === 'Input your note here' || $note.text() === '') {
                    Toast.init("Please Enter Your Note")
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
                if ($note.text() === 'Input your note here') $note.html('')
                $note.data('before', $note.html())
                this.$mask = this.$mask ? this.$mask : Mask.init()
                this._initLayout()
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

            $title.on('focus', () => {
                if ($title.text() === 'Input Your Title...') $title.html('')
                $title.data('before', $title.html())
                this.$mask = this.$mask ? this.$mask : Mask.init()
                this._initLayout()
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
                        this._add($title.html(), $title.html())
                    }
                }
            });
        }


        /* ---------------------------以下是数据库的相关操作----------------------------- */
        //存储到数据库
        _add(title, msg) {
            $.post('/api/notes/add', { title: title, note: msg }).then(res => {
                console.log(res)
                if (res.status === 0) {
                    Toast.init('Add Success')
                } else {
                    this.$note.remove()
                    Event.fire('waterfall')
                    Toast.init(res.errorMsg)
                }
            })
        }

        //从数据库删除
        _delete() {
            $.post('/api/notes/delete', { id: this.id }).then(res => {
                if (res.status === 0) {
                    this.$note.remove()
                    Toast.init('Delete Success')
                    Event.fire('waterfall')
                } else {
                    Toast.init(res.errorMsg);
                }
            }).catch(() => {
                console.log('xxxxxxxxxxx')
            });

        }

        // _empty() {
        //     $.post('/api/notes/empty', { uid: this.uid }).then(res => {
        //         console.log(this.uid)
        //         if (res.status === 0) {
        //             // this.$note.remove()
        //             Toast.init('Empty Success')
        //         } else {
        //             Toast.init(res.errorMsg);
        //         }
        //     }).catch(() => {
        //         console.log('xxxxxxxxxxx')
        //     });

        // }

        // 修改数据库内容
        _edit(title, msg) {
            $.post('/api/notes/edit', {
                id: this.id,
                title: title,
                note: msg
            }).then(res => {
                if (res.status === 0) {
                    Toast.init('Update Success');
                } else {
                    Toast.init(res.errorMsg);
                }
            })
        }
    }

    return {
        init: (opts) => {
            new _Note(opts)
        }
    }
})()
window.Note = Note
module.exports = Note