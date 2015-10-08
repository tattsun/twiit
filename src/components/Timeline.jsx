import React from 'react'
import TimelineStore from '../store/Twitter'

//const Tweet = React.createClass({
//});

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
            tweets.push(<div>{tweet.text}<hr /></div>)
        }

        return <div>
            <h1>ついったあ〜〜〜〜</h1>
            <div>{tweets}</div>
        </div>
    },
    _onChange() {
        this.setState(getTimelineState())
    }
});
