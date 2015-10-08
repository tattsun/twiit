import React from 'react'
import TwitterClient from './TwitterClient'
import Store from './store/Twitter'
import TwiitActions from './actions/TwiitActions'
import yaml from 'js-yaml'
import fs from 'fs'

import Timeline from './components/Timeline.react'
import TweetBox from './components/TweetBox.react'

var config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));

TwitterClient.init({
    consumer_key: config['consumer_key'],
    consumer_secret: config['consumer_secret'],
    access_token_key: config['access_token_key'],
    access_token_secret: config['access_token_secret']
});

for(var i=0; i<10; i++) {
    TwiitActions.add({"created_at":"Thu Oct 08 14:21:26 +0000 2015","id":652126659085213700,"id_str":"652126659085213696","text":"testあああああああああああああああああああああああああああああああああああああああああああああああああああ","source":"<a href=\"https://about.twitter.com/products/tweetdeck\" rel=\"nofollow\">TweetDeck</a>","truncated":false,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"user":{"id":2840855672,"id_str":"2840855672","name":"tattsun","screen_name":"tattsun58","location":"Osaka, Japan","url":"https://github.com/tattsun","description":"interest:Haskell/C/C++/EmacsLisp working at kamasu.jp, LINE(アルバイト) http://tattsun.hateblo.jp","protected":false,"verified":false,"followers_count":80,"friends_count":135,"listed_count":3,"favourites_count":199,"statuses_count":889,"created_at":"Sun Oct 05 05:57:49 +0000 2014","utc_offset":32400,"time_zone":"Tokyo","geo_enabled":false,"lang":"ja","contributors_enabled":false,"is_translator":false,"profile_background_color":"C0DEED","profile_background_image_url":"http://abs.twimg.com/images/themes/theme1/bg.png","profile_background_image_url_https":"https://abs.twimg.com/images/themes/theme1/bg.png","profile_background_tile":false,"profile_link_color":"0084B4","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"profile_image_url":"http://pbs.twimg.com/profile_images/597272317387886592/avrYQwB1_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/597272317387886592/avrYQwB1_normal.jpg","default_profile":true,"default_profile_image":false,"following":null,"follow_request_sent":null,"notifications":null},"geo":null,"coordinates":null,"place":null,"contributors":null,"is_quote_status":false,"retweet_count":0,"favorite_count":0,"entities":{"hashtags":[],"urls":[],"user_mentions":[],"symbols":[]},"favorited":false,"retweeted":false,"filter_level":"low","lang":"en","timestamp_ms":"1444314086110"})
}

const Main = React.createClass({
    render() {
        return <div>
            <TweetBox />
            <Timeline />
        </div>
    }
})

var container = document.querySelector('#container')
React.render(<Main />, container)
