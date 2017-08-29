const Toast = require('./Toast');
const Note = require('./Note');
const Event = require('./Event');

let NoteManager = (() => {
    function load() {
        $.get('/api/notes')
            .then(res => {
                if (res.status === 0) {
                    $.each(res.data, (idx, note) => {
                        Note.init({
                            id: note.id,
                            initContext: note.text
                        });
                    });
                    Event.fire('waterfall');
                } else {
                    Toast.init(ret.errorMsg);
                }
            })
            .catch(() => {
                Toast.init('网络异常');
            });
    }

    function add() {
        Note.init();
    }

    return {
        load: load,
        add: add
    }

})();

module.exports = NoteManager