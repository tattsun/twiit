import React from 'react'

class Foo extends React.Component {
    render() {
        return <div>This is React component?</div>
    }
}

var container = document.querySelector('#container')
React.render(<Foo />, container)
