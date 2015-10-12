import React from 'react'
import TweetTypeConstants from '../constants/TweetTypeConstants'
var ReactPropTypes = React.PropTypes;

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
            var imgstyle = {
              backgroundImage: 'url(' + m.media_url + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            };
            media.push(
              <div className="imageContainer">
                <a href={m.media_url} target="_blank">
                  <div className="imageBackground"
                      style={imgstyle}>
                  </div>
                </a>
              </div>);
          }
        }
        return <div
                   className="tweet"
               >
            <div className="profile-pic">
            <img
                src={this.props.user.profile_image_url}
            />
            </div>
            <div className="text">
                <b>{this.props.user.name}</b>:
                           {this.props.tweet.text}
            <div className="handler">
              <span onClick={this._onClick}>Reply</span>
            </div>
            </div>
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
        eventView = <Tweet user={this.props.ev.tweet.user}
                      tweet={this.props.ev.tweet} />;
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
