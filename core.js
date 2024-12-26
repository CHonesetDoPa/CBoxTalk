// core.js

const { app, BrowserWindow ,ipcMain} = require('electron')
const path = require('node:path')

const createWindow = () => {

    mainWindow = new BrowserWindow({
        width: 600,
        height: 800,
        frame: false,
        icon: path.join(__dirname, 'src/assets/icon/i.ico'),
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          nodeIntegration: false, 
          contextIsolation: true, 
          sandbox: true 
        }
        
      });

  mainWindow.loadFile('coreUI.html')


  //ipcEvents
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  ipcMain.on('close-window', () => {
    mainWindow.close();
  });

  ipcMain.on('toggle-fullscreen', () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });


  //DevTools Check
  if (process.argv.includes('--devtools')) {
    mainWindow.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
