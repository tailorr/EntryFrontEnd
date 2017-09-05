require('scss/index.scss')

const Toast = require('mod/Toast')
const Note = require('mod/Note')
const NoteManager = require('mod/NoteManager')
const WaterFall = require('mod/Waterfall')
const Event = require('mod/Event')

NoteManager.load()

$('.add-note').on('click', function() {
    NoteManager.add()
})
$('.empty-note').on('click', function() {
    NoteManager.empty()
})

Event.on('waterfall', function() {
    WaterFall.init($('#content'))
})