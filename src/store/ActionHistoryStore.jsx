import Dispatcher from '../dispatcher/AppDispatcher'
import ActionHistoryConstants '../constants/ActionHistoryConstants'
import Events from 'events'

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';

var favoritedTweetIds = [];
var retweetedTweetIds = [];

class ActionHistoryStore extends EventEmitter {
    // Favorited Tweets
    isFavoritedTweetId(id) {
    }
    addFavoritedTweetId(id) {
    }
    removeFavoritedTweetId(id) {
    }

    // Retweeted Tweets
    isRetweetedTweetId(id) {
    }
    addRetweetedTweetId(id) {
    }
    removeRetweetedTweetId(id) {
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
    }
});
