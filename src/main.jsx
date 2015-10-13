import React from 'react'
import TwitterClient from './TwitterClient'
import Store from './store/Twitter'
import TwiitActions from './actions/TwiitActions'
import yaml from 'js-yaml'
import fs from 'fs'

import Timeline from './components/Timeline.react'
import TweetBox from './components/TweetBox.react'

var userhome = process.env.HOME || process.env.USERPROFILE;
var config = yaml.safeLoad(fs.readFileSync(userhome + '/.twiit.yml', 'utf8'));

TwitterClient.init({
    consumer_key: config['consumer_key'],
    consumer_secret: config['consumer_secret'],
    access_token_key: config['access_token_key'],
    access_token_secret: config['access_token_secret']
});

export var scrollOnTop = document.createEvent("CustomEvent");
scrollOnTop.initEvent("scrollOnTop", true, false);
window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
        document.dispatchEvent(scrollOnTop);
    }
});

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
