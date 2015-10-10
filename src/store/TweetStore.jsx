import Dispatcher from '../dispatcher/AppDispatcher'
import TweetConstants from '../constants/TweetConstants'
import Events from 'events'

const EventEmitter = Events.EventEmitter

const CHANGE_EVENT = 'change';

var tweet = {
    status: "",
    in_reply_to_status_id: null
}

class TweetStore extends EventEmitter {
    setStatus(status) {
        tweet.status = status;
        this.emitChange();
    }
    setReplyTarget(status_id, user_screen_id) {
        tweet.status = "@" + user_screen_id + " ";
        tweet.in_reply_to_status_id = status_id;
        this.emitChange();
    }
    clearTweet() {
        tweet.status = "";
        tweet.in_reply_to_status_id = null;
        this.emitChange();
    }
    getTweet() {
        return tweet;
    }
    emitChange() {
        this.emit(CHANGE_EVENT);
    }
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}


const store = new TweetStore();

Dispatcher.register((act) => {
    switch(act.actionType) {
        case TweetConstants.SET_STATUS:
            store.setStatus(act.status);
            break;
        case TweetConstants.SET_REPLY_TARGET:
            store.setReplyTarget(act.status_id, act.user_screen_id);
            break;
        case TweetConstants.CLEAR_TWEET:
            store.clearTweet();
            break;
        default:
    }
});

export default store;
