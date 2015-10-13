import React from 'react'
import TweetTypeConstants from '../constants/TweetTypeConstants'
import TweetActions from '../actions/TweetActions'
var ReactPropTypes = React.PropTypes;

var Media = React.createClass({
    getInitialState() {
        return {};
    },
    render() {
        var imgstyle = {
            backgroundImage: 'url(' + this.props.media.media_url + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
        };
        return <div className="imageContainer">
            <a href={this.props.media.media_url} target="_blank">
                <div className="imageBackground" style={imgstyle}>
                </div>
            </a>
        </div>;
    }
});

var ProfilePic = React.createClass({
    reactPropTypes: {
        imageUrl: ReactPropTypes.string
    },
    render() {
        return <div className="profile-pic">
            <img src={this.props.imageUrl} />
        </div>
    }
});

var TweetText = React.createClass({
    reactPropTypes: {
        userName: ReactPropTypes.string,
        tweetText: ReactPropTypes.string,
        onClickReply: ReactPropTypes.func
    },
    render() {
        return <div className="text">
            <span><b>{this.props.userName}</b>: {this.props.tweetText}</span>
            <div className="handler">
                <span onClick={this.props.onClickReply}>Reply</span>
            </div>
        </div>
    }
})

var RetweetedTweet = React.createClass({
    propType: {
        user: ReactPropTypes.object,
        sourceUser: ReactPropTypes.object,
        sourceTweet: ReactPropTypes.object
    },
    getInitialState() {
        return {}
    },
    render() {
        return <div>
            <span className="retweetAnnotation">{this.props.user.name} Retweeted:</span>
            <div className="tweet">
                <ProfilePic imageUrl={this.props.sourceUser.profile_image_url} />
                <TweetText userName={this.props.sourceUser.name}
                           tweetText={this.props.sourceTweet.text}
                           onClickReply={this._onClick} />
            </div>
        </div>
    },
    _onClick() {
        var tweetbox = document.getElementById('tweetbox');
        if (tweetbox != null) {
            tweetbox.focus();
        }
        TweetActions.setReplyTarget(this.props.sourceTweet.id, this.props.sourceUser.screen_name);
    }
});

var Tweet = React.createClass({
    propType: {
        user: ReactPropTypes.object
    },
    getInitialState() {
        return {}
    },
    render() {
        var media = [];
        if (this.props.tweet.entities.media !== undefined) {
          for (var m of this.props.tweet.entities.media) {
              media.push(<Media media={m} />)
          }
        }
        return <div className="tweet">
            <ProfilePic imageUrl={this.props.user.profile_image_url} />
            <TweetText userName={this.props.user.name}
                       tweetText={this.props.tweet.text}
                       onClickReply={this._onClick} />
            {media}
        </div>
    },
    _onClick() {
        console.log(this.props.tweet);
        var tweetbox = document.getElementById('tweetbox');
        if (tweetbox != null) {
            tweetbox.focus();
        }
        TweetActions.setReplyTarget(this.props.tweet.id,this.props.user.screen_name);
    }
})

var Favorite = React.createClass({
  render() {
    console.log(this.props.fav);
    return <div>
      <span className="icon icon-favorite-on"></span>

      <strong>{this.props.fav.source.screen_name}</strong> favorited your tweet.
      <div className="quotedTweet">
        {this.props.fav.target_object.text}
      </div>
    </div>
  }
});

export default React.createClass({
    propType: {
        ev: ReactPropTypes.object
    },
    render() {
        var eventView = null;
        switch(this.props.ev.type) {
            case TweetTypeConstants.TWEET:
                if(this.props.ev.tweet.retweeted_status === undefined) {
                    console.log("OK");
                    eventView = <Tweet user={this.props.ev.tweet.user}
                                       tweet={this.props.ev.tweet} />;
                } else {

                    eventView = <RetweetedTweet user={this.props.ev.tweet.user}
                                                sourceUser={this.props.ev.tweet.retweeted_status.user}
                                                sourceTweet={this.props.ev.tweet.retweeted_status} />;
                }
                break;
            case TweetTypeConstants.FAVORITE:
                eventView = <Favorite fav={this.props.ev.fav} />;
                break;
            default:
                console.error("invalid timeline event" + this.props.ev);
        }

        return <div className="timelineEvent">
        {eventView}
        </div>;
    }
});
