import Twitter from 'twitter'
import TwiitActions from './actions/TwiitActions'

class TwitterClient {
    init(config) {
        this.client = new Twitter({
            consumer_key: config.consumer_key,
            consumer_secret: config.consumer_secret,
            access_token_key: config.access_token_key,
            access_token_secret: config.access_token_secret
        });

        this.client.stream('user', {}, (stream) => {
            stream.on('data', (tweet) => {
                if(tweet.text === undefined) {
                    return;
                }
                TwiitActions.add(tweet)
            });
            stream.on('error', (err) => {
                console.log(err);
            });
        });
    }

    tweet(status, in_reply_to_status_id) {
        console.log(in_reply_to_status_id);
        this.client.post('statuses/update',
                         {status: status, in_reply_to_status_id: in_reply_to_status_id},
                         (err, tweet, response) => {
                             if(err) {
                                 console.error(err);
                             }
                         });
    }
}

const client = new TwitterClient()
export default client
