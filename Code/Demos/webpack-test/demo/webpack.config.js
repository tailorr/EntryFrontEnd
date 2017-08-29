const path = require('path')

let base = {
    mian: './src/main.js'
}
module.exports = {
    entry: base,
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist/script'),
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: 'src',
        compress: true,
        port: 3000,
        colors: true
    }
}