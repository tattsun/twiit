import Dispatcher from '../dispatcher/AppDispatcher'
import TwitterConstants from '../constants/TwitterConstants'

class TwitterActions {
    add(tweet) {
        Dispatcher.dispatch({
            actionType: TwitterConstants.TIMELINE_ADD_TWEET,
            tweet: tweet
        })
    }
}

export default new TwitterActions()
