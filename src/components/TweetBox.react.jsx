import React from 'react'
import TwitterClient from '../TwitterClient'

const ENTER_KEY_CODE = 13;

export default React.createClass({
    getInitialState: function() {
        return {
            value: ''
        }
    },
    render() {
        return <div>
        <input
        id="tweetbox"
        type="text"
        value={this.state.value}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        autoFocus={true}
        />
        </div>
    },
    _onChange(event) {
        this.setState({
            value: event.target.value
        });
    },
    _onKeyDown(event) {
        if(event.keyCode === ENTER_KEY_CODE) {
            TwitterClient.tweet(this.state.value);
            this.setState({
                value: ''
            });
        }
    }
})
