import Dispatcher from '../dispatcher/AppDispatcher'
import TweetConstants from '../constants/TweetConstants'

class TweetActions {
    setStatus(status) {
        Dispatcher.dispatch({
            actionType: TweetConstants.SET_STATUS,
            status: status
        })
    }
    setReplyTarget(status_id, screen_name) {
        Dispatcher.dispatch({
            actionType: TweetConstants.SET_REPLY_TARGET,
            status_id: status_id,
            user_screen_id: screen_name
        })
    }
    clearTweet() {
        Dispatcher.dispatch({
            actionType: TweetConstants.CLEAR_TWEET
        })
    }
}


export default new TweetActions()
