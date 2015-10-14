import Twitter from 'twitter'
import TwiitActions from './actions/TwiitActions'
import ActionHistoryActions from './actions/ActionHistoryActions'

class TwitterClient {
    init(config) {
        this.client = new Twitter({
            consumer_key: config.consumer_key,
            consumer_secret: config.consumer_secret,
            access_token_key: config.access_token_key,
            access_token_secret: config.access_token_secret
        });

        this.client.get('statuses/home_timeline', {count: 30}, (error, tweets, response) => {
          if (tweets === null) return;

          tweets.reverse();
          for(var tweet of tweets) {
              TwiitActions.add(tweet);
          }
        });

        this.client.get('favorites/list', {count: 30}, (error, tweets, response) => {
            if(tweets === null) return;

            for(var tweet of tweets) {
                ActionHistoryActions.addFavoritedTweetId(tweet.id_str);
            }
        });

        this.initStream();
    }

    initStream() {
      this.client.stream('user', {}, (stream) => {
          stream.on('data', (tweet) => {
              console.log(tweet);
              if(tweet.text === undefined) {
                  return;
              }
              TwiitActions.add(tweet);
          });
          stream.on('favorite', (fav) => {
            TwiitActions.addFavorite(fav);
          });
          stream.on('error', (err) => {
              console.log(err);
          });
          stream.on('end', () => {
            this.initStream();
          });
      });
    }

    tweet(status, in_reply_to_status_id) {
        this.client.post('statuses/update',
                         {status: status, in_reply_to_status_id: in_reply_to_status_id},
                         (err, tweet, response) => {
                             if(err) {
                                 console.error(err);
                             }
                         });
    }

    favorite(status_id) {
        console.log(status_id);
        this.client.post('favorites/create', {id: status_id},
                         (err, tweet, response) => {
                             if(err) {
                                 console.error(err);
                             }
                         }
        );
    }
    unfavorite(status_id) {
        this.client.post('favorites/destroy', {id: status_id},
                         (err, tweet, response) => {
                             if(err) console.error(err);
                         });
    }
}

const client = new TwitterClient()
export default client
