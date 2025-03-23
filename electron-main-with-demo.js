const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
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
}

// 📦 Auto-generate demo project folder and rules
function ensureDemoProjectFolder(documentsPath) {
  const demoFolder = path.join(documentsPath, 'AI-Workspaces', 'Demo-TaskApp');
  const rulesFile = path.join(demoFolder, 'project.rules');

  if (!fs.existsSync(demoFolder)) {
    fs.mkdirSync(demoFolder, { recursive: true });
  }

  if (!fs.existsSync(rulesFile)) {
    const demoRules = `name: Task Tracker App
description: A simple app to manage tasks with user authentication.
language: JavaScript
framework: React + Tailwind
platform: Web
steps:
  - title: Setup Project
    description: Create the base React app with Vite and install dependencies.
  - title: Authentication
    description: Add login, logout, and register components with local storage.
  - title: Task CRUD
    description: Build UI and logic for creating, reading, updating, and deleting tasks.
  - title: Styling
    description: Apply Tailwind CSS for a clean, responsive layout.
  - title: Final Review
    description: Lint and format code, check functionality.
`;
    fs.writeFileSync(rulesFile, demoRules);
  }
}

app.whenReady().then(() => {
  const documentsPath = app.getPath('documents');
  ensureDemoProjectFolder(documentsPath);
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
