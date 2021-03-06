import React from 'react'
import TweetTypeConstants from '../constants/TweetTypeConstants'
import TweetActions from '../actions/TweetActions'
import Shell from 'shell'
import TwitterClient from '../TwitterClient'
import ActionHistoryActions from '../actions/ActionHistoryActions'
import ActionHistoryStore from '../store/ActionHistoryStore'
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

var Medium = React.createClass({
    propType: {
        medium: ReactPropTypes.array
    },
    render() {
        var view = [];
        if (this.props.medium !== undefined) {
            for(var m of this.props.medium) {
                view.push(<Media media={m} />);
            }
        }
        return <div>{view}</div>;
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
        tweet: ReactPropTypes.object.isRequired,
        userName: ReactPropTypes.string,
        tweetText: ReactPropTypes.string,
        onClickReply: ReactPropTypes.func,
        onClickFavorite: ReactPropTypes.func,
        onClickRetweet: ReactPropTypes.func,
        favoritedTweetIds: ReactPropTypes.array,
        retweetedTweetIds: ReactPropTypes.array
    },
    render() {
        var favoriteButtonClass = "button button-favorite";
        for(var id of this.props.favoritedTweetIds) {
            if (id === this.props.tweet.id_str) {
                favoriteButtonClass = "button button-favorite-on";
            }
        }

        return <div className="text">
            <span><b>{this.props.userName}</b>: {this._linkUrls(this.props.tweetText)}</span>
            <div className="handler">
                <span className="button button-reply"
                      onClick={this.props.onClickReply}></span>
                <span className="button button-retweet"
                      onClick={this.props.onClickRetweet}></span>
                <span className={favoriteButtonClass}
                      onClick={this.props.onClickFavorite}></span>
            </div>
        </div>
    },
    _linkUrls(text) {
        var urls = text.match(/(https?:\/\/[a-zA-Z0-9\-_\.:@!~*'\(¥);\/?&=\+$,%#]+)/gm, '<a href="$1">$1</a>');
        var text = text.replace(/(https?:\/\/[a-zA-Z0-9\-_\.:@!~*'\(¥);\/?&=\+$,%#]+)/gm, '');
        var component = [];
        component.push(<span>{text}</span>);
        if(urls !== null) {
            for(var url of urls) {
                component.push(<a onClick={this._openUrl(url)}>{url}</a>);
            }
        }
        return component;
    },
    _openUrl(url) {
        return () => {
            Shell.openExternal(url);
        };
    }
})

var RetweetedTweet = React.createClass({
    propType: {
        user: ReactPropTypes.object,
        sourceUser: ReactPropTypes.object,
        sourceTweet: ReactPropTypes.object,
        tweetHandler: ReactPropTypes.object,
        favoritedTweetIds: ReactPropTypes.array,
        retweetedTweetIds: ReactPropTypes.array
    },
    getInitialState() {
        return {}
    },
    render() {
        return <div>
            <span className="retweetAnnotation">{this.props.user.name} Retweeted:</span>
            <div className="tweet">
                <ProfilePic imageUrl={this.props.sourceUser.profile_image_url} />
                <TweetText tweet={this.props.sourceTweet}
                           userName={this.props.sourceUser.name}
                           tweetText={this.props.sourceTweet.text}
                           onClickReply={this.props.tweetHandler.onClickReply(
                                         this.props.sourceTweet, this.props.sourceUser)}
                           onClickFavorite={this.props.tweetHandler.onClickFavorite(
                                            this.props.sourceTweet)}
                           favoritedTweetIds={this.props.favoritedTweetIds}
                           retweetedTweetIds={this.props.retweetedTweetIds} />
                <Medium medium={this.props.sourceTweet.entities.media} />
            </div>
        </div>
    }
});

var Tweet = React.createClass({
    propType: {
        tweet: ReactPropTypes.object,
        user: ReactPropTypes.object,
        tweetHandler: ReactPropTypes.object,
        favoritedTweetIds: ReactPropTypes.array,
        retweetedTweetIds: ReactPropTypes.array
    },
    getInitialState() {
        return {}
    },
    render() {
        return <div className="tweet">
            <ProfilePic imageUrl={this.props.user.profile_image_url} />
            <TweetText tweet={this.props.tweet}
                       userName={this.props.user.name}
                       tweetText={this.props.tweet.text}
                       onClickReply={this.props.tweetHandler.onClickReply(
                                     this.props.tweet, this.props.user)}
                       onClickFavorite={this.props.tweetHandler.onClickFavorite(
                                        this.props.tweet)}
                       favoritedTweetIds={this.props.favoritedTweetIds}
                       retweetedTweetIds={this.props.retweetedTweetIds} />
            <Medium medium={this.props.tweet.entities.media} />
        </div>
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
        ev: ReactPropTypes.object,
        favoritedTweetIds: ReactPropTypes.array,
        RetweetedTweetIds: ReactPropTypes.array
    },
    render() {
        var eventView = null;
        switch(this.props.ev.type) {
            case TweetTypeConstants.TWEET:
                if(this.props.ev.tweet.retweeted_status === undefined) {
                    eventView = <Tweet user={this.props.ev.tweet.user}
                                       tweet={this.props.ev.tweet}
                                       tweetHandler={this._tweetHandler}
                                       favoritedTweetIds={this.props.favoritedTweetIds}
                                       retweetedTweetIds={this.props.retweetedTweetIds} />;
                } else {

                    eventView = <RetweetedTweet user={this.props.ev.tweet.user}
                                                sourceUser={this.props.ev.tweet.retweeted_status.user}
                                                sourceTweet={this.props.ev.tweet.retweeted_status}
                                                tweetHandler={this._tweetHandler}
                                                favoritedTweetIds={this.props.favoritedTweetIds}
                                                retweetedTweetIds={this.props.retweetedTweetIds} />;
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
    },
    _tweetHandler: {
        onClickReply(tweet, user) {
            return () => {
                console.log(tweet);
                var tweetbox = document.getElementById('tweetbox');
                if (tweetbox != null) {
                    tweetbox.focus();
                }
                window.scroll(0,0);
                Tweetactions.setReplyTarget(tweet.id,user.screen_name);
            }},
        onClickFavorite(tweet) {
            return () => {
                if(ActionHistoryStore.isFavoritedTweetId(tweet.id_str)) {
                    TwitterClient.unfavorite(tweet.id_str);
                    ActionHistoryActions.removeFavoritedTweetId(tweet.id_str);
                    return;
                }
                TwitterClient.favorite(tweet.id_str);
                ActionHistoryActions.addFavoritedTweetId(tweet.id_str);
            }
        }
    }
});
