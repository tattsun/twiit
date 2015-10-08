import Dispatcher from '../dispatcher/AppDispatcher'
import TwitterConstants from '../constants/TwitterConstants'
import Events from 'events'
const EventEmitter = Events.EventEmitter

const CHANGE_EVENT = 'change';

var timeline = [];

class TimelineStore extends EventEmitter {
    getAll() {
        return timeline;
    }

    add(tweet) {
        timeline.unshift(tweet);
        while(timeline.length > 10) {
            timeline.pop();
        }
        this.emitChange();
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVNET, callback);
    }
}

const store = new TimelineStore();

Dispatcher.register((act) => {
    switch(act.actionType) {
        case TwitterConstants.TIMELINE_ADD_TWEET:
            store.add(act.tweet);
            break;
        default:
    }
});

export default store;
