import React from 'react'
import TimelineStore from '../store/Twitter'
import TweetActions from '../actions/TweetActions'
var ReactPropTypes = React.PropTypes;

var Tweet = React.createClass({
    propType: {
        user: ReactPropTypes.object
    },
    getInitialState() {
        return {}
    },
    render() {
        return <div
                   className="tweet"
                   onClick={this._onClick}
               >
            <div className="profile-pic">
            <img
                src={this.props.user.profile_image_url}
            />
            </div>
            <div className="text">
                <b>{this.props.user.name}</b>:
                           {this.props.tweet.text}
            </div>
        </div>
    },
    _onClick() {
        var tweetbox = document.getElementById('tweetbox');
        if (tweetbox != null) {
            tweetbox.focus();
        }
        TweetActions.setReplyTarget(this.props.tweet.id,this.props.user.screen_name);
    }
})

function getTimelineState() {
    return {
        tweets: TimelineStore.getAll()
    }
}

export default React.createClass({
    getInitialState() {
        return getTimelineState()
    },
    componentDidMount() {
        TimelineStore.addChangeListener(this._onChange)
    },
    componentWillUnmount() {
        TimelineStore.removeChangeListener(this._onChange)
    },
    render() {
        var tweets = [];
        for(var tweet of this.state.tweets) {
            tweets.push(
                <Tweet
                    user={tweet.user}
                    tweet={tweet}
                />
            )
        }

        return <div>
            <div>{tweets}</div>
        </div>
    },
    _onChange() {
        this.setState(getTimelineState())
    }
});