const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/script.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),

    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/practice/frontend_practice/beginner_projects/age_calculator/public/dist/',
        clean:true
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
            watch: true
        },
        open: true,
        liveReload: true,
        watchFiles: ['src/**/*', "index.html"]
    },
    mode: 'development'
};
