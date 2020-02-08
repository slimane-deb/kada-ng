const electron = require('electron');
const path = require('path');
const url = require('url');
const { shell } = require('electron');

// SET ENV
process.env.NODE_ENV = 'dev';
// process.env.NODE_ENV = 'prod';
const {app, BrowserWindow, Menu, ipcMain} = electron;

let win;
// start the backend
// shell.openItem("back\\service.bat");

// Create our App Window
app.on("ready", createWindow);
// Fix for MAC to Quite
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
// Focus our Window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
function createWindow() {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      webSecurity: false
    }
  });

  // Loading the Dist Folder
  win.loadURL('file://' + __dirname + '/dist/index.html');
  //On Close Event
  win.on("closed", () => {
    win = null;
  });
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
// Insert menu
  Menu.setApplicationMenu(mainMenu);
}
// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label: 'Quitter',
        accelerator:process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ],

  },
  {
    label: 'A propos',
    submenu:[
      {
        label: 'Developpeur',
        click(){
          shell.openExternal('https://www.linkedin.com/in/slimane-deb/');
        }
      }
    ],

  }
];
// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'prod'){
  mainMenuTemplate.push({
    label: 'Dev-Tool',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

