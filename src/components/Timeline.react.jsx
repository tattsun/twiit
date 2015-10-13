import React from 'react'
import TimelineStore from '../store/Twitter'
import TweetActions from '../actions/TweetActions'
import TweetTypeConstants from '../constants/TweetTypeConstants'
import TimelineEvent from './TimelineEvent.react'
var ReactPropTypes = React.PropTypes;

function getTimelineState() {
    return {
        timeline: TimelineStore.getAll()
    }
}

export default React.createClass({
    getInitialState() {
        return getTimelineState()
    },
    componentDidMount() {
        TimelineStore.addChangeListener(this._onChange);
        document.addEventListener("scrollOnTop", this._onChange);
    },
    componentWillUnmount() {
        TimelineStore.removeChangeListener(this._onChange);
        document.removeEventListener("scrollOnTop", this._onChange);
    },
    render() {
        var timeline = [];
        for(var ev of this.state.timeline) {
          timeline.push(<TimelineEvent ev={ev} />);
        }

        return <div>
            <div>{timeline}</div>
        </div>
    },
    _onChange() {
        if(window.scrollY === 0) {
            this.setState(getTimelineState());
        }
    }
});
