const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    win.loadFile('dist/index.html');
  }
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('listProjects', async () => {
  const base = path.join(app.getPath('documents'), 'AI-Workspaces');
  if (!fs.existsSync(base)) fs.mkdirSync(base);
  return fs.readdirSync(base).filter(f => fs.lstatSync(path.join(base, f)).isDirectory());
});

ipcMain.handle('createProjectFolder', async (_, name) => {
  const fullPath = path.join(app.getPath('documents'), 'AI-Workspaces', name);
  fs.mkdirSync(fullPath, { recursive: true });
  return fullPath;
});

ipcMain.handle('deleteProject', async (_, folderPath) => {
  fs.rmSync(folderPath, { recursive: true, force: true });
});

ipcMain.handle('readFile', async (_, filePath) => {
  return fs.readFileSync(filePath, 'utf-8');
});

ipcMain.handle('saveCodeToFile', async (_, filePath, contents) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents);
});
