const Exception = require('../Exception/BaseAppException');

/**
 * Handles the loading and invocation of the plugins
 * the User has been created
 */
class PluginLoader {
    /**
     * @param {string} pluginBaseDir
     * @param {Object} filesystem
     * @param {Object} path
     * @param {Object} mainWindow
     */
    constructor(pluginBaseDir, filesystem, path, mainWindow) {
        if (pluginBaseDir instanceof String) {
            throw new Exception('pluginBaseDir must be type of string. Type "' + typeof pluginBaseDir + '" passed.');
        }

        this.pluginBaseDir = pluginBaseDir;
        this.filesystem    = filesystem;
        this.path          = path;
        this.mainWindow    = mainWindow;
    }

    /**
     * Load and invoke all plugins placed in the plugin directory
     */
    loadAll() {
        if (!this.pluginDirExists()) {
            throw new Exception('Directory for plugins "' + this.pluginBaseDir + '" does not exist');
        }
        
        this.filesystem.readdir(this.pluginBaseDir, (err, files) => {
            if(err !== null) {
                throw err;
            }

            files.forEach(file => {
                let pluginPath = this.path.normalize(this.pluginBaseDir + this.path.sep + file);

                // ignore directories
                if (!this.filesystem.lstatSync(pluginPath).isFile()) {
                    return;
                }

                let plugin = this._loadPlugin(
                    pluginPath
                );

                this._invoke(plugin);
            });
        })
    }

    /**
     * Check whether or not the plugin directory exists
     */
    pluginDirExists() {
        let pathExists = this.filesystem.existsSync(this.pluginBaseDir);
        let pathIsDir = pathExists && this.filesystem.lstatSync(this.pluginBaseDir).isDirectory();

        return pathExists && pathIsDir;
    }

    /**
     * Ensure that the plugin has implemented the main entry
     * point thet we invoke
     */
    _validatePlugin(plugin) {
        return true;
        let pluginIsObject = plugin instanceof Object;
        if (!pluginIsObject) {
            console.error('Plugin must be type of Object but "' + typeof plugin + '" given');
            return false;
        }

        let pluginHasMainMethod = !plugin.main instanceof Function;
        if (pluginHasMainMethod) {
            console.error('Plugin must implement method "main()"');
            return false;
        }

        return true;
    }

    /**
     * Load a plugin for a given path
     * @param {String} path
     */
    _loadPlugin(path) {
        let plugin = require(path);

        if (!this._validatePlugin(plugin)) {
            throw new Exception('Plugin "' + path + '" is not a valid plugin');
        }

        return plugin;
    }

    /**
     * Invoke the plugin being passed
     * @param {Object} plugin
     */
    _invoke(plugin) {
        plugin();
    }
}

module.exports = PluginLoader;