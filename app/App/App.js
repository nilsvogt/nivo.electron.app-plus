const Exception = require('./Exception/BaseAppException.js');

class App {
    constructor(pluginLoader) {
        let pluginDirExists = pluginLoader.pluginDirExists()

        if (!pluginDirExists) {
            throw new Exception('plugin directory "' + pluginLoader.pluginBaseDir + '" does not exist');
        }

        pluginLoader.loadAll();
    }
}

module.exports = App;