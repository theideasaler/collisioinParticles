const webpack = require("webpack");
const path = require("path");
const cssExtract = require("mini-css-extract-plugin");
const cssMinify = require("optimize-css-assets-webpack-plugin");
const jsMinify = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new jsMinify({
                parallel: true
            }),
            new cssMinify({})
        ]
    },
    plugins:[
        new cssExtract({
            filename: "index.css",
            chunkFilename: "[id].css"
        })
    ],
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets:["env"]
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use:[
                    cssExtract.loader,//extract css from js
                    "css-loader",//change sass to css
                    "sass-loader",//read sass
                    "postcss-loader"//add prefixer
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
        open: true,
        port: 10022
    }
};