const Toast = require('./Toast')
const Note = require('./Note')
const Event = require('./Event')

let NoteManager = (() => {
    function load() {
        var timeRegex = /^\d{4}-\d{1,2}-\d{1,2}/
        $.get('/api/notes').then(res => {
                if (res.status === 0) {
                    $.each(res.data, (index, note) => {
                        var time = note.createdAt.match(timeRegex)
                        Note.init({
                            id: note.id,
                            initContext: note.text,
                            createTime: time
                        });
                    });
                    Event.fire('waterfall')
                    Toast.init('Welcome To Visit')
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
            console.log(res)
            if (res.status === 0) {
                this.$note.remove()
                Toast.init('Empty Success')
            } else {
                Toast.init(res.errorMsg);
            }
        }).catch(() => {
            console.log('Network Anomaly')
        });

    }

    function add() {
        Note.init()
    }

    return {
        load: load,
        add: add,
        empty: empty
    }

})();

module.exports = NoteManager