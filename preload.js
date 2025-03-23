const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  listProjects: () => ipcRenderer.invoke('listProjects'),
  createProjectFolder: (name) => ipcRenderer.invoke('createProjectFolder', name),
  deleteProject: (folderPath) => ipcRenderer.invoke('deleteProject', folderPath),
  readFile: (filePath) => ipcRenderer.invoke('readFile', filePath),
  saveCodeToFile: (filePath, contents) => ipcRenderer.invoke('saveCodeToFile', filePath, contents)
});
