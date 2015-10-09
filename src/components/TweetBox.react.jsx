import React from 'react'
import TwitterClient from '../TwitterClient'
import TweetStore from '../store/TweetStore'
import TweetActions from '../actions/TweetActions'

const ENTER_KEY_CODE = 13;

function getTweetBoxState() {
    return TweetStore.getTweet();
}

export default React.createClass({
    getInitialState: function() {
        return getTweetBoxState()
    },
    componentDidMount() {
        TweetStore.addChangeListener(this._onChange)
    },
    componentWillUnmount() {
        TweetStore.removeChangeListener(this._onChange)
    },
    render() {
        return <div>
        <input
        id="tweetbox"
        type="text"
        value={this.state.status}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        autoFocus={true}
        placeholder="What's happening?"
        />
        </div>
    },
    _onChange(event) {
        this.setState(getTweetBoxState());
    },
    _onKeyDown(event) {
        console.log(event);
        TweetActions.setStatus(event.target.value);
        if(event.keyCode === ENTER_KEY_CODE) {
            TwitterClient.tweet(this.state.value);
            TweetActions.clearTweet()
        }
    }
})
