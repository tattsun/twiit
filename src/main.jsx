import React from 'react'
import Twitter from 'twitter'
import Store from './store/Twitter'
import Timeline from './components/Timeline'
import TwiitActions from './actions/TwiitActions'
import yaml from 'js-yaml'
import fs from 'fs'

var config = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'))

var client = new Twitter({
    consumer_key: config['consumer_key'],
    consumer_secret: config['consumer_secret'],
    access_token_key: config['access_token_key'],
    access_token_secret: config['access_token_secret']
});


client.stream('statuses/filter', {track: 'javascript'}, (stream) => {
    stream.on('data', (tweet) => {
        console.log(tweet)
        TwiitActions.add(tweet)
    });
    stream.on('error', (err) => {
        console.log(err);
    });
});

const Foo = React.createClass({
    render() {
        return (
            <Timeline />
        )
    }
})

var container = document.querySelector('#container')
React.render(<Foo />, container)
