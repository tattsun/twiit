import React from 'react'
import TimelineStore from '../store/Twitter'
var ReactPropTypes = React.PropTypes;

var Tweet = React.createClass({
    propType: {
        user: ReactPropTypes.object
    },
    getInitialState() {
        return {}
    },
    render() {
        return <div className="tweet">
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
