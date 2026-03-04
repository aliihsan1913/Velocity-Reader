const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Remove default menu bar for cleaner look
Menu.setApplicationMenu(null);

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        title: 'Fast Reader',
        backgroundColor: '#0a0e17',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        show: false
    });

    mainWindow.loadFile('speed-reader.html');

    // Show window when ready to prevent flicker
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // F11 for fullscreen toggle
    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F11') {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
