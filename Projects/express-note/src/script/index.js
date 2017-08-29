require('scss/index.scss')

let Toast = require('mod/Toast')
let Note = require('mod/Note')
let NoteManager = require('mod/NoteManager')
let WaterFall = require('mod/Waterfall')
let Event = require('mod/Event')


NoteManager.load()

$('.add-note').on('click', function() {
    NoteManager.add()
})
Event.on('waterfall', function() {
    WaterFall.init($('#container .content'))
})