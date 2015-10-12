import Dispatcher from '../dispatcher/AppDispatcher'
import TwitterConstants from '../constants/TwitterConstants'

class TwitterActions {
    add(tweet) {
        Dispatcher.dispatch({
            actionType: TwitterConstants.TIMELINE_ADD_TWEET,
            tweet: tweet
        })
    }
    addFavorite(fav) {
      Dispatcher.dispatch({
        actionType: TwitterConstants.TIMELINE_ADD_FAVORITE,
        fav: fav
      })
    }
}

export default new TwitterActions()
