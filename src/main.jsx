import React from 'react'
import TwiitActions from './actions/TwiitActions'

class Foo extends React.Component {
    render() {
        return <div>This is React component?</div>
    }
}

var x = new TwiitActions()

var container = document.querySelector('#container')
React.render(<Foo />, container)
