function PluginLoaderFactory() {
    const PluginLoader = require('./PluginLoader');
    const path         = require('path');
    const filesystem   = require('fs');
    const mainWindow   = require('electron').remote.getCurrentWindow();
    const pluginDirectoryName = 'plugins';

    return new PluginLoader(
        path.join(
            path.join(
                path.normalize(
                    __dirname
                ),
                '..',
                '..',
                '..',
                pluginDirectoryName
            )
        ),
        filesystem,
        path,
        mainWindow
    )
}

module.exports = PluginLoaderFactory;