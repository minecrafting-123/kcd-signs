const { app, BrowserWindow, ipcMain } = require('electron')
const calculator = require('./index.js')
const path = require('node:path')

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

async function handleCalculate (event){
  const result = await calculator.calculate();
  let final = '';
  for (i = 0; i < result.length; i++){
    final = final.concat(`${result[i]['person1']} & ${result[i]['person2']}, ${result[i]['dist']} miles\n`);
  }
  return final;
}

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')
  }

app.whenReady().then(() => {
    createWindow()
    ipcMain.on('set-title', handleSetTitle)
    ipcMain.handle('calculate', handleCalculate)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })