const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: path.join(__dirname, 'script/index.js'),
    output: {
        path: path.join(__dirname, '../public'),
        filename: 'js/index.js'
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            mod: path.join(__dirname, 'script/mod'),
            scss: path.join(__dirname, 'scss'),
            css: path.join(__dirname, 'css')
        }
    },
    module: {
        rules: [

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ["css-loader", "sass-loader", "postcss-loader"]
                    }) //把 css 抽离出来生成一个文件
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin("css/index.css"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false
            }
        })
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //         postcss: function() {
        //             return [
        //                 require("autoprefixer")({
        //                     browsers: ['ie>=8', '>1% in CN']
        //                 })
        //             ]
        //         }
        //     }
        // })
    ]
}