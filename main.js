'use strict';

console.log("Starting Process");

var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');

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

    var template = [{
    label: "Application",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
      "label": "View",
      submenu: [
        { label: "Reload", accelerator: "Command+R", click: () => mainWindow.reload() }
      ]
    },{
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+Command+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "Command+X", selector: "cut:" },
        { label: "Copy", accelerator: "Command+C", selector: "copy:" },
        { label: "Paste", accelerator: "Command+V", selector: "paste:" },
        { label: "Select All", accelerator: "Command+A", selector: "selectAll:" }
    ]}, {
      label: "Development",
      submenu: [
        { label: "DevConsole", click: () => mainWindow.toggleDevTools() }
      ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

});
