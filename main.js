'use strict';

console.log("Starting Process");

var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
    if(process.platform != 'darwin') {
        app.quit();
    }
});

console.log("Creating BrowserWindow");

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 320,
                                    height: 600,
                                    resizable: false,
                                    title: "Twiit",
                                    "web-preferences": {
                                        "overlay-scrollbars": true
                                    }});
    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
