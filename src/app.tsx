import React, { useState } from 'react'
import marked from 'marked'

function Content(props) {

    let state

    switch (props.mode) {
        case 'html':
            state = {
                dangerouslySetInnerHTML: {
                    __html: marked(props.content || '')
                }
            }
            break
        case 'markdown':
            state = {
                style: { whiteSpace: 'pre' },
                children: props.content
            }
            break
        default:
            state = {
                children: 'Illegal mode'
            }
    }

    return <div {...state} />

}


export default function App(props) {

    const [mode, setMode] = useState('html')

    function switchMode() {
        setMode(mode === 'html' ? 'markdown' : 'html')
    }

    return (
        <div>
            <button onClick={switchMode}>switch</button>
            <hr />
            <Content mode={mode} content={props.content} />
        </div >
    )

}

