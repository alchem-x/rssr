const path = require('path')
const config = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{ loader: 'ts-loader' }],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
}

module.exports = config