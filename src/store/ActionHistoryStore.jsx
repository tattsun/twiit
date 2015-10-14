import Dispatcher from '../dispatcher/AppDispatcher'
import ActionHistoryConstants from '../constants/ActionHistoryConstants'
import Events from 'events'

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';

var favoritedTweetIds = [];
var retweetedTweetIds = [];

class ActionHistoryStore extends EventEmitter {
    // Favorited Tweets
    isFavoritedTweetId(id) {
        for(var i of favoritedTweetIds) {
            if (i === id) return true;
        }
        return false;
    }
    getFavoritedTweetIds() {
        return favoritedTweetIds;
    }
    addFavoritedTweetId(id) {
        favoritedTweetIds.push(id);
        this.emitChange();
    }
    removeFavoritedTweetId(id) {
        var i = favoritedTweetIds.indexOf(id);
        if(i != -1) {
            favoritedTweetIds.splice(i, 1);
            this.emitChange();
        }
    }

    // Retweeted Tweets
    isRetweetedTweetId(id) {
        for(var i of retweetedTweetIds) {
            if (i === id) return true;
        }
        return false;
    }
    getRetweetedTweetIds() {
        return retweetedTweetIds;
    }
    addRetweetedTweetId(id) {
        retweetedTweetIds.push(id);
        this.emitChange();
    }
    removeRetweetedTweetId(id) {
        var i = retweetedTweetIds.indexOf(id);
        if(i != 1) {
            retweetedTweetIds.splice(i, 1);
            this.emitChange();
        }
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

const store = new ActionHistoryStore();
export default store;

Dispatcher.register((action) => {
    switch(action.actionType) {
        case ActionHistoryConstants.ADD_FAVORITED:
            store.addFavoritedTweetId(action.id);
            break;
        case ActionHistoryConstants.REMOVE_FAVORITED:
            store.removeFavoritedTweetId(action.id);
            break;
        case ActionHistoryConstants.ADD_RETWEETED:
            store.addRetweetedTweetId(action.id);
            break;
        case ActionHistoryConstants.REMOVE_RETWEETED:
            store.removeRetweetedTweetId(action.id);
            break;
        default:
    }
});
