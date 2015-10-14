import React from 'react'
import TimelineStore from '../store/Twitter'
import TweetActions from '../actions/TweetActions'
import TweetTypeConstants from '../constants/TweetTypeConstants'
import TimelineEvent from './TimelineEvent.react'
import ActionHistoryStore from '../store/ActionHistoryStore'
var ReactPropTypes = React.PropTypes;

export default React.createClass({
    getInitialState() {
        return {
            timeline: TimelineStore.getAll(),
            favoritedTweetIds: ActionHistoryStore.getFavoritedTweetIds(),
            retweetedTweetIds: ActionHistoryStore.getRetweetedTweetIds()
        }
    },
    componentDidMount() {
        TimelineStore.addChangeListener(this._onChange);
        document.addEventListener("scrollOnTop", this._onChange);

        ActionHistoryStore.addChangeListener(this._onChangeActionHistory);
    },
    componentWillUnmount() {
        TimelineStore.removeChangeListener(this._onChange);
        document.removeEventListener("scrollOnTop", this._onChange);

        ActionHistoryStore.removeChangeListener(this._onChangeActionHistory);
    },
    render() {
        var timeline = [];
        for(var ev of this.state.timeline) {
            timeline.push(<TimelineEvent
                              ev={ev}
                              favoritedTweetIds={this.state.favoritedTweetIds}
                              retweetedTweetIds={this.state.retweetedTweetIds} />);
        }

        return <div>
            <div>{timeline}</div>
        </div>
    },
    _onChange() {
        if(window.scrollY === 0) {
            this.setState({
                timeline: TimelineStore.getAll(),
                favoritedTweetIds: this.state.favoritedTweetIds,
                retweetedTweetIds: this.state.retweetedTweetIds
            });
        }
    },
    _onChangeActionHistory() {
        this.setState({
            timeline: this.state.timeline,
            favoritedTweetIds: ActionHistoryStore.getFavoritedTweetIds(),
            retweetedTweetIds: ActionHistoryStore.getRetweetedTweetIds()
        });
    }
});
