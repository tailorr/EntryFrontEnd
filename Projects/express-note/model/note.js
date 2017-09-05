const Sequelize = require('sequelize')
const path = require('path')

const sequelize = new Sequelize(undefined, undefined, undefined, {
        host: 'localhost',
        dialect: 'sqlite',

        // SQLite only
        storage: path.join(__dirname, '../database/database.sqlite')
    })
    // test connection
    // sequelize
    //     .authenticate()
    //     .then(() => {
    //         console.log('Connection has been established successfully.');
    //     })
    //     .catch(err => {
    //         console.error('Unable to connect to the database:', err);
    //     });

const Note = sequelize.define('note', {
    text: {
        type: Sequelize.STRING
    },
    uid: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    }
})

// Note.sync({ force: true })
// {force: true} will drop the table if it already exists
// Note.sync().then(() => {
// Table created
//     return Note.create({
//         text: 'hello'
//     });
// }).then(function() {
//     Note.findAll({ raw: true }).then(function(notes) {
//         console.log(notes)
//     })
// })

// Note.findAll({ raw: true }).then(function(note) {
//     console.log(note)
// })

module.exports = Note