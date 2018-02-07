class NativeMenu {
    constructor(app) {
        this.app  = app;
        this.Menu = require('electron').Menu;

        this.mainMenuTemplate = [
            {
                label: 'File',
                submenu: [
                    {
                        label: 'Quit',
                        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                        click() {
                            app.quit();
                        }
                    }
                ]
            }
        ];
    }

    build() {
        let mainMenu = this.Menu.buildFromTemplate(this.mainMenuTemplate);

        this.Menu.setApplicationMenu(mainMenu);
    }
}

module.exports = NativeMenu;