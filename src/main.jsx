import React from 'react'

const TextInput = React.createClass({
    getInitialState() {
        return {
            value: this.props.value || ''
        }
    },
    render() {
        return <input
                   type="text"
                   value={this.state.value}
                   onChange={this._onChange}
               />
    },
    _onChange(event) {
        this.setState({
            value: event.target.value
        });
        this.props.onSave(event.target.value)
    }
})

const Foo = React.createClass({
    render() {
        return (
            <TextInput
                onSave={this._received}
            />
        )
    },
    _received(event) {
        console.log(event)
    }
})

var container = document.querySelector('#container')
React.render(<Foo />, container)
