/**
 * Load the web application
 */

const mainWindow = require('electron').remote.getCurrentWindow();

let AppFactory = require('./App/appFactory.js');

try {
    let app = AppFactory();
} catch(e) {
    console.error(e.toString());
    mainWindow.webContents.openDevTools();
}