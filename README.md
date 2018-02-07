# AppPlus

AppPlus let u easily customize any web application you use on a daily basis. It provides a simple yet powerful plugin system that you can utilize to modify web apps until they really fit your personal needs the most.

## Configure the electron app
CWA is an electron application that needs a little configuration before we start.
Use the config file to assign the first entry point of your web app you are about to extend. Afterwards you are ready to go!

## Add Plugins
The pluginsystem is designed to be as simple as possible. You just create a javascript file exporting a `main` function and place it into the plugins directory.

```js
function main() {
    console.log('hi there');
}
module.exports = main;
```

As your plugin scales you should use the main function as your entrypoint and move the implementation into smaller pieces your plugin then consumes.
## installation

`npm install`

## start

`npm start`
