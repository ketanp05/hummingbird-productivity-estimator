/*
this file is the main process of our Electron application
*/

// const { create } = require('core-js/core/object');

// import the 'app' and 'BrowserWindow' modules from Electron
const { app, BrowserWindow } = require('electron');

// import the 'path' module so that we can work with file and dir path
const path = require('path');

// we have defined a function to create the main application window
function createWindow(){
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),

            // enabling Node.js integration within the window
            nodeIntegration: true
        }
    });

    // this will load our Vue.js application URL in the window
    mainWindow.loadURL('http://localhost:8080');
    mainWindow.webContents.openDevTools(); // open developer tools for debugging
}

// we listen for a 'ready' event which is triggered/emitted when Electron finishes initialization
app.on('ready', createWindow);

// we listen for a 'window-all-closed' event which is triggered/emitted when all windows are closed
app.on('window-all-closed', () => {
    // on macos, its common for applications to stay open until user quits explicitly uisng Cmd+Q
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

// we listen for activat event when the application is activated
app.on('activate', () => {
    // On macOS, recreate a window if the app is reactivated and there are no open windows.
    if (BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
});