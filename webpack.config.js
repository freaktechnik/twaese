/* eslint-disable filenames/match-regex */
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/twaese/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                modules: false
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|woff2?|eot|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: process.env.NODE_ENV !== 'production'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        publicPath: '/twaese/dist/',
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [ __filename ]
        }
    }
};

if(process.env.NODE_ENV === 'production') {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]);
}
