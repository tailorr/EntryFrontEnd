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
                $ct: $('#content').length > 0 ? $('#content') : $('body'),
                initContext: 'Input your note here'
            }
            this._initOpts(opts)
            this._createNote()
            this._bindEvent()
        }

        _initOpts(opts) {
            this.opts = $.extend({}, this.defaultOpts, opts || {})
                // Object.assign()
            this.id = this.opts.id ? this.opts.id : ''
        }
        _createNote() {
            let tpl = `<div class="note">
                            <div class="note-header">
                                <i class="delete">&#xe70c;</i>
                            </div>
                            <div class="note-content" contenteditable="true">${this.opts.initContext}</div>
                            <div class="note-footer">
                                <button class="save">Save</button>
                            </div>
                            
                       </div>`
            this.$note = $(tpl)
            $('#content').append(this.$note)

            this._initLayout()
            if (!this.id) {
                this.$mask = Mask.init()
                Toast.init('Create Sucess')
            }
            if (this.id) Toast.init('Welcome Back')
        }
        _initLayout() {
            this.$note.css({
                "position": "absolute",
                "top": "50%",
                "left": "50%",
                "transform": "translate(-50%, -50%)",
                "z-index": "999"
            })

        }
        _fulfilLayout() {
            Event.fire('waterfall');
        }
        _bindEvent() {
                let $note = this.$note.find('.note-content')
                let $delete = this.$note.find('.delete')
                let $save = this.$note.find('.save')
                let $cancel = this.$note.find('.cancel')

                //删除
                $delete.on('click', () => {
                    this._delete()
                    this.$mask && this.$mask.remove()
                    this._fulfilLayout()
                })
                $cancel.on('click', () => {
                    this._delete()
                    this.$mask && this.$mask.remove()
                    this._fulfilLayout()
                })
                $save.on('click', () => {
                    this.$mask && this.$mask.remove()
                    if ($note.text() === 'Input your note here' || $note.text() === '') {
                        this.$note.remove()
                        Toast.init("Please Enter Your Note")
                    }
                    this._fulfilLayout()
                    if (this.id) {
                        this._edit($note.html())
                    } else {
                        this._add($note.html())
                    }
                })

                //增加、修改
                $note.on('focus', () => {
                    if ($note.text() === 'Input your note here') $note.html('')
                    $note.data('before', $note.html())
                }).on('blur paste', () => {
                    if (!this.id) return
                    if ($note.data('before') != $note.html()) {
                        $note.data('before', $note.html())
                        this._fulfilLayout()
                        if (this.id) {
                            this._edit($note.html())
                        } else {
                            this._add($note.html())
                        }
                    }
                });
            }
            //存储到数据库
        _add(msg) {
            $.post('/api/notes/add', { note: msg }).then(res => {
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
            // 修改数据库内容
        _edit(msg) {
            $.post('/api/notes/edit', {
                id: this.id,
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