const App        = require('./App.js');
const NativeMenu = require('./Menu/Menu.js');
const config     = require('./../../config.js');
const path       = require('path');
const electron   = require('electron');
const {
    app,
    BrowserWindow,
    Menu
} = electron;

function appFactory() {
    const menu = new NativeMenu(app);

    return new App(app, BrowserWindow, path, menu, config);
}

module.exports = appFactory;