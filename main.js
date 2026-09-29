const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 880,
    minWidth: 840,
    minHeight: 650,
    title: 'GBA Pro Studio • Game Boy Advance for macOS',
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#0a0c14',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadURL('http://localhost:3000/?play=1');

  // Native macOS Application Menu
  const template = [
    {
      label: 'GBA Studio',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open ROM...',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            win.webContents.executeJavaScript(`document.getElementById('rom-file-input').click()`);
          }
        },
        {
          label: 'Export Battery Save (.sav)...',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            win.webContents.executeJavaScript(`document.getElementById('btn-export-battery').click()`);
          }
        },
        { type: 'separator' },
        {
          label: 'Quick Save State (F1)',
          accelerator: 'F1',
          click: () => {
            win.webContents.executeJavaScript(`document.getElementById('hud-quicksave').click()`);
          }
        },
        {
          label: 'Quick Load State (F3)',
          accelerator: 'F3',
          click: () => {
            win.webContents.executeJavaScript(`document.getElementById('hud-quickload').click()`);
          }
        }
      ]
    },
    {
      label: 'Cheats',
      submenu: [
        {
          label: '🧙 Open Pokémon Cheats Vault...',
          accelerator: 'CmdOrCtrl+Shift+C',
          click: () => {
            win.webContents.executeJavaScript(`document.getElementById('btn-open-cheats').click()`);
          }
        },
        { type: 'separator' },
        {
          label: 'Toggle Walk Through Walls',
          click: () => {
            win.webContents.executeJavaScript(`
              const chk = document.querySelector('[id*="wtw"]');
              if (chk) { chk.checked = !chk.checked; chk.dispatchEvent(new Event('change')); }
            `);
          }
        },
        {
          label: 'Toggle 99x Master Balls in PC',
          click: () => {
            win.webContents.executeJavaScript(`
              const chk = document.querySelector('[id*="masterball"]');
              if (chk) { chk.checked = !chk.checked; chk.dispatchEvent(new Event('change')); }
            `);
          }
        },
        {
          label: 'Toggle 99x Rare Candies in PC',
          click: () => {
            win.webContents.executeJavaScript(`
              const chk = document.querySelector('[id*="rarecandy"]');
              if (chk) { chk.checked = !chk.checked; chk.dispatchEvent(new Event('change')); }
            `);
          }
        },
        {
          label: 'Toggle Max Money ($999,999)',
          click: () => {
            win.webContents.executeJavaScript(`
              const chk = document.querySelector('[id*="money"]');
              if (chk) { chk.checked = !chk.checked; chk.dispatchEvent(new Event('change')); }
            `);
          }
        },
        {
          label: 'Toggle 100% Catch Rate',
          click: () => {
            win.webContents.executeJavaScript(`
              const chk = document.querySelector('[id*="catch"]');
              if (chk) { chk.checked = !chk.checked; chk.dispatchEvent(new Event('change')); }
            `);
          }
        }
      ]
    },
    {
      label: 'Graphics',
      submenu: [
        {
          label: '🎨 Graphics & Shaders Suite...',
          accelerator: 'CmdOrCtrl+G',
          click: () => {
            win.webContents.executeJavaScript(`document.getElementById('btn-open-shaders').click()`);
          }
        },
        { type: 'separator' },
        {
          label: 'Shader: HQ4x (Ultra HD Vector)',
          click: () => {
            win.webContents.executeJavaScript(`
              document.getElementById('shader-select').value = '4xScaleHQ.glslp';
              document.getElementById('shader-select').dispatchEvent(new Event('change'));
            `);
          }
        },
        {
          label: 'Shader: HQ2x (Crisp Pixel)',
          click: () => {
            win.webContents.executeJavaScript(`
              document.getElementById('shader-select').value = '2xScaleHQ.glslp';
              document.getElementById('shader-select').dispatchEvent(new Event('change'));
            `);
          }
        },
        {
          label: 'Shader: CRT Retro Scanlines',
          click: () => {
            win.webContents.executeJavaScript(`
              document.getElementById('shader-select').value = 'crt-easymode.glslp';
              document.getElementById('shader-select').dispatchEvent(new Event('change'));
            `);
          }
        },
        {
          label: 'Toggle Fullscreen',
          accelerator: 'CmdOrCtrl+F',
          click: () => {
            win.setFullScreen(!win.isFullScreen());
          }
        }
      ]
    },
    {
      label: 'Emulation',
      submenu: [
        {
          label: 'Turbo Fast-Forward (Spacebar)',
          accelerator: 'Space',
          click: () => {
            win.webContents.executeJavaScript(`document.getElementById('hud-turbo-btn').click()`);
          }
        },
        {
          label: '🎮 Configure Controls...',
          accelerator: 'CmdOrCtrl+K',
          click: () => {
            win.webContents.executeJavaScript(`document.getElementById('btn-open-controls').click()`);
          }
        },
        {
          label: 'Take Screenshot (P)',
          accelerator: 'P',
          click: () => {
            win.webContents.executeJavaScript(`document.getElementById('hud-screenshot').click()`);
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
