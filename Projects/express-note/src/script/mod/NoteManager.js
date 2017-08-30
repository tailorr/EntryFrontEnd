const Toast = require('./Toast')
const Note = require('./Note')
const Event = require('./Event')

let NoteManager = (() => {
    function load() {
        $.get('/api/notes').then(res => {
                if (res.status === 0) {
                    $.each(res.data, (idx, note) => {
                        Note.init({
                            id: note.id,
                            initContext: note.text
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
            if (res.status === 0) {
                $('#content').empty()
                Toast.init('Empty Success')
            } else {
                Toast.init(res.errorMsg)
            }
        }).catch(() => {
            Toast.init('Network Anomaly')
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