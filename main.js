import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Api from "./backend/api/Api.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 660,
    acceptFirstMouse:true,
    icon: path.join(__dirname, 'src/img/icon.jpg'),
    autoHideMenuBar:true,
    // fullscreen:true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile('index.html');
}
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
// app.disableHardwareAcceleration();
Api.listen(5000, ()=>{ console.log("http://localhost:5000"); })

