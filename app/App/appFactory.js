function appFactory() {
    const PluginLoaderFactory = require('./PluginLoader/PluginLoaderFactory.js');
    const App                 = require('./App.js');

    return new App(
        PluginLoaderFactory()
    );
}

module.exports = appFactory;