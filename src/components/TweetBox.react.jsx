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
        TweetStore.addChangeListener(this._onChangeFromStore)
    },
    componentWillUnmount() {
        TweetStore.removeChangeListener(this._onChangeFromStore)
    },
    render() {
        return <div id="tweetbox">
        <input
            id="tweetinput"
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
        this.setState({
            status: event.target.value
        });
    },
    _onChangeFromStore() {
        this.setState(getTweetBoxState())
    },
    _onKeyDown(event) {
        if(event.keyCode === ENTER_KEY_CODE) {
            TwitterClient.tweet(this.state.status, this.state.in_reply_to_status_id);
            TweetActions.clearTweet()
        }
    }
})
