import express from 'express'
import React from 'react'
import fs from 'fs'
import path from 'path'
import ReactDOMServer from 'react-dom/server'

import App from './app'

function readRootDirFileAsString(filename) {
    return fs.readFileSync(
        path.join(__dirname, '..', filename),
        { encoding: 'utf-8' }
    )
}

const indexTemplate = readRootDirFileAsString('src/index.html')

const app = express()

app.get('/', async (req, res) => {
    const initialProps = {
        content: readRootDirFileAsString('README.md')
    }

    const html = ReactDOMServer.renderToString(<App  {...initialProps} />)
    const script = `
    <script>window['RSSR.App']={initialProps:${JSON.stringify(initialProps)}}</script>
    <script src="/bundle.js"></script>`
    const result = indexTemplate.replace('<!-- html -->', html).replace('<!-- script -->', script)
    res.setHeader('Content-Type', 'text/html');
    res.end(result)
})

app.get('/bundle.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    fs.createReadStream(path.join(__dirname, 'bundle.js')).pipe(res)
})

app.listen(3000, () => console.log('> Serving on http://localhost:3000'))
