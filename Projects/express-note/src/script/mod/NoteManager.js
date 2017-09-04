const Toast = require('./Toast')
const Note = require('./Note')
const Event = require('./Event')

let NoteManager = (() => {
    function load() {
        var timeRegex = /^\d{4}-\d{1,2}-\d{1,2}/
        $.get('/api/notes').then(res => {
                if (res.status === 0) {
                    $.each(res.data, (index, note) => {
                        let time = note.createdAt.match(timeRegex)
                        Note.init({
                            id: note.id,
                            title: note.title,
                            initContext: note.text,
                            createTime: time,
                            author: note.author
                        });
                    });
                    Event.fire('waterfall')
                    Toast.init(res.successMsg)
                } else {
                    Toast.init(res.errorMsg)
                }
            })
            .catch(() => {
                Toast.init('Network Anomaly')
            });
    }

    function empty() {
        $.post('/api/notes/empty').then(res => {
            if (res.status === 0) {
                // this.$note.remove()
                Toast.init(res.successMsg)
            } else {
                Toast.init(res.errorMsg)
            }
        }).catch(() => {
            Toast.init('Network Anomaly')
        });

    }

    function add() {
        $.get('/login').then(res => {
            if (res.status === 0) {
                Note.init({
                    author: res.userInfo.username
                })
            } else {
                // Note.init()
                Toast.init(res.errorMsg)
            }
        })
    }

    return {
        load: load,
        add: add,
        empty: empty
    }

})();

module.exports = NoteManager