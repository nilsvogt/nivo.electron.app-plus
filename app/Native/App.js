/**
 * Create and bootstrap the actual window once the application is
 * ready. Handle shutdown of the app and interception of http requests.
 *
 * TODO:
 *  - interception is still a problem - we need to figure out how it is supossed to be done properly
 *  - decouple interception from application class
 */
class App {
    constructor(app, BrowserWindow, path, menu, config){
        this.mainWindow    = undefined; // prevent garbage collection from destroying our window
        this.app           = app;
        this.BrowserWindow = BrowserWindow;
        this.path          = path;
        this.menu          = menu;
        this.config        = config;

        app.on('ready', () => {
            this.createWindow();
        });

        app.on('window-all-closed', function () {
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                app.quit()
            }
        });

        app.on('activate', function () {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) {
                createWindow()
            }
        });
    }

    /**
     *  Create and bootstrap the actual window
     */
    createWindow() {
        process.env.NODE_ENV = 'development';

        this.mainWindow = new this.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: false,
                preload: this.path.join(__dirname, '../preload.js')
            }
        });

        this.mainWindow.loadURL(this.config.url);

        this.mainWindow.on('closed', () => {
            this.mainWindow = null
        });

        if (this.config.openDevTools) {
            this.mainWindow.webContents.openDevTools();
        }

        this.menu.build();
    }

    /*
     * This method is not yet complete since we either run into an infinite loop
     * or loose the session. I did not yet figured out how to handle this properly
     */
    interceptHttp() {
        const protocol = require('electron').protocol;

        // intercepts request but ignores the session. not ignoring the session leads to an infinite loop
        protocol.interceptHttpProtocol('https', function(request, callback){
            console.log(request);
            callback({ 'url' : request.url, 'referrer' : 'https://myreferrergoeshere', 'session': null });
        });
    }
}

module.exports = App;