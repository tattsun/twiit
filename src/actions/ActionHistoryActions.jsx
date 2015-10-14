import Dispatcher from '../dispatcher/AppDispatcher'
import ActionHistoryConstants from '../constants/ActionHistoryConstants'

class ActionHistoryActions {
    addFavoritedTweetId(id) {
        Dispatcher.dispatch({
            actionType: ActionHistoryConstants.ADD_FAVORITED,
            id: id,
        })
    }
    removeFavoritedTweetId(id) {
        Dispatcher.dispatch({
            actionType: ActionHistoryConstants.REMOVE_FAVORITED,
            id: id,
        })
    }

    addRetweetedTweetId(id) {
        Dispatcher.dispatch({
            actionType: ActionHistoryConstants.ADD_RETWEETED,
            id: id,
        })
    }
    removeRetweetedTweetId(id) {
        Dispatcher.dispatch({
            actionType: ActionHistoryConstants.REMOVE_RETWEETED,
            id: id,
        })
    }
}

export default new ActionHistoryActions();
