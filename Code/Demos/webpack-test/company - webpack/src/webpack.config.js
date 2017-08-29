const path = require('path')
const entryPath = {
    app: './app.js'
}

module.exports = {
    entry: entryPath,
    devtool: 'source-map',
    output: {
        path: path.resolve('../', 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.html/,
            use: {
                loader: 'html-loader',
                options: {
                    minimize: true,
                    attrs: false
                }

            }
        }]
    }

}