/**
 * GBA Pro Studio - macOS Application Controller
 * Handles ROM loading, WebGL Shaders, Fast-Forward, Pokémon Cheats & Gamepad.
 */

(function () {
  'use strict';

  // State Management
  const state = {
    romLoaded: false,
    romName: 'Demo',
    gameCode: 'BPEE',
    romTitle: 'GBA Game',
    isPokemon: false,
    
    // Fast Forward
    fastForwardActive: false,
    ffSpeed: 4,
    ffMode: 'hold', // 'hold' or 'toggle'
    
    // Graphics & Shaders
    currentShader: '4xScaleHQ.glslp',
    colorCorrection: true,
    saturation: 120,
    contrast: 110,
    brightness: 105,
    lcdGrid: 0,
    scanlines: 0,
    aspectRatio: '3/2',
    skin: 'skin-indigo',
    
    // Cheats
    activeCheats: new Map(), // key: cheatId, value: { code, enabled, index }
    cheatCounter: 0,
    customCheats: [],
    
    // Save States
    currentSlot: 1,
    stateSlots: { 1: null, 2: null, 3: null, 4: null, 5: null },

    // Keybindings (Mac defaults)
    keys: {
      a: { key: 'z', label: 'Z', buttonId: 8 },
      b: { key: 'x', label: 'X', buttonId: 0 },
      l: { key: 'a', label: 'A', buttonId: 10 },
      r: { key: 's', label: 'S', buttonId: 11 },
      start: { key: 'Enter', label: 'ENTER', buttonId: 3 },
      select: { key: 'Shift', label: 'SHIFT', buttonId: 2 },
      up: { key: 'ArrowUp', label: 'UP ARROW', buttonId: 4 },
      down: { key: 'ArrowDown', label: 'DOWN ARROW', buttonId: 5 },
      left: { key: 'ArrowLeft', label: 'LEFT ARROW', buttonId: 6 },
      right: { key: 'ArrowRight', label: 'RIGHT ARROW', buttonId: 7 },
      turbo: { key: ' ', label: 'SPACEBAR', buttonId: 27 },
      save: { key: 'F1', label: 'F1', action: 'save' },
      load: { key: 'F3', label: 'F3', action: 'load' }
    }
  };

  // DOM Elements
  const el = {
    dropzoneHero: document.getElementById('dropzone-hero'),
    emulatorWrapper: document.getElementById('emulator-wrapper'),
    romFileInput: document.getElementById('rom-file-input'),
    heroFileInput: document.getElementById('hero-file-input'),
    btnLoadDemo: document.getElementById('btn-load-demo'),
    btnLaunchLeafgreen: document.getElementById('btn-launch-leafgreen'),
    romStatusText: document.getElementById('rom-status-text'),
    romPulseLed: document.getElementById('rom-pulse-led'),
    gameViewport: document.getElementById('game-viewport'),
    screenContainer: document.getElementById('screen-container'),
    gbaChassis: document.getElementById('gba-chassis'),
    
    // Overlays & HUD
    overlayScanlines: document.getElementById('overlay-scanlines'),
    overlayLcd: document.getElementById('overlay-lcd'),
    speedHudBadge: document.getElementById('speed-hud-badge'),
    speedHudText: document.getElementById('speed-hud-text'),
    toastHud: document.getElementById('toast-hud'),
    toastHudMsg: document.getElementById('toast-hud-msg'),
    toastHudIcon: document.getElementById('toast-hud-icon'),
    hudFps: document.getElementById('hud-fps'),
    hudSpeed: document.getElementById('hud-speed'),
    hudTurboBtn: document.getElementById('hud-turbo-btn'),
    rtcClock: document.getElementById('rtc-clock'),
    shellSkinSelect: document.getElementById('shell-skin-select'),
    
    // Modals
    modalShaders: document.getElementById('modal-shaders'),
    modalCheats: document.getElementById('modal-cheats'),
    modalControls: document.getElementById('modal-controls'),
    modalSaves: document.getElementById('modal-saves'),
    
    // Buttons to open modals
    btnOpenShaders: document.getElementById('btn-open-shaders'),
    btnOpenCheats: document.getElementById('btn-open-cheats'),
    btnOpenControls: document.getElementById('btn-open-controls'),
    btnOpenSaves: document.getElementById('btn-open-saves'),
    
    // Controls modal
    keyMappingGrid: document.getElementById('key-mapping-grid'),
    ffSpeedSelect: document.getElementById('ff-speed-select'),
    ffModeSelect: document.getElementById('ff-mode-select'),
    gamepadName: document.getElementById('gamepad-name'),
    gamepadStatus: document.getElementById('gamepad-status'),
    btnTestVibrate: document.getElementById('btn-test-vibrate'),
    
    // Cheats modal
    cheatsTabs: document.getElementById('cheats-tabs'),
    cheatsTabContent: document.getElementById('cheats-tab-content'),
    customCheatPanel: document.getElementById('custom-cheat-panel'),
    btnAddCustomCheat: document.getElementById('btn-add-custom-cheat'),
    customCheatName: document.getElementById('custom-cheat-name'),
    customCheatCode: document.getElementById('custom-cheat-code'),
    customCheatFormat: document.getElementById('custom-cheat-format'),
    
    // Graphics modal
    shaderSelect: document.getElementById('shader-select'),
    toggleColorCorrection: document.getElementById('toggle-color-correction'),
    sliderSaturation: document.getElementById('slider-saturation'),
    sliderContrast: document.getElementById('slider-contrast'),
    sliderBrightness: document.getElementById('slider-brightness'),
    valSaturation: document.getElementById('val-saturation'),
    valContrast: document.getElementById('val-contrast'),
    valBrightness: document.getElementById('val-brightness'),
    sliderLcdGrid: document.getElementById('slider-lcd-grid'),
    sliderScanlines: document.getElementById('slider-scanlines'),
    valLcdGrid: document.getElementById('val-lcd-grid'),
    valScanlines: document.getElementById('val-scanlines'),
    aspectRatioSelect: document.getElementById('aspect-ratio-select'),

    // Saves modal
    stateSlotsGrid: document.getElementById('state-slots-grid'),
    btnExportState: document.getElementById('btn-export-state'),
    importStateInput: document.getElementById('import-state-input'),
    btnExportBattery: document.getElementById('btn-export-battery'),
    importBatteryInput: document.getElementById('import-battery-input'),
    hudQuicksave: document.getElementById('hud-quicksave'),
    hudQuickload: document.getElementById('hud-quickload'),
    hudScreenshot: document.getElementById('hud-screenshot'),
    hudFullscreenBtn: document.getElementById('hud-fullscreen-btn'),

    // Titlebar
    trafficClose: document.getElementById('traffic-close'),
    trafficMinimize: document.getElementById('traffic-minimize'),
    trafficMaximize: document.getElementById('traffic-maximize'),

    // Hardware buttons
    btnA: document.getElementById('btn-a'),
    btnB: document.getElementById('btn-b'),
    btnStart: document.getElementById('btn-start'),
    btnSelect: document.getElementById('btn-select'),
    btnDpadUp: document.getElementById('btn-dpad-up'),
    btnDpadDown: document.getElementById('btn-dpad-down'),
    btnDpadLeft: document.getElementById('btn-dpad-left'),
    btnDpadRight: document.getElementById('btn-dpad-right'),
    shoulderL: document.getElementById('shoulder-l'),
    shoulderR: document.getElementById('shoulder-r')
  };

  /* ==========================================================================
     Toast Notifications
     ========================================================================== */
  let toastTimer = null;
  function showToast(message, icon = '✨') {
    if (!el.toastHud) return;
    el.toastHudMsg.textContent = message;
    el.toastHudIcon.textContent = icon;
    el.toastHud.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.toastHud.classList.remove('show');
    }, 2800);
  }

  /* ==========================================================================
     Real-Time Clock (RTC) for Pokémon & Stats
     ========================================================================== */
  function startRTC() {
    setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      if (el.rtcClock) {
        el.rtcClock.textContent = `RTC: ${timeStr}`;
      }
    }, 1000);
  }

  /* ==========================================================================
     ROM Header Parser (GBA Standard)
     ========================================================================== */
  function parseGbaHeader(buffer) {
    const view = new DataView(buffer);
    
    // GBA Game Title at offset 0xA0 (12 bytes ASCII)
    let title = '';
    for (let i = 0; i < 12; i++) {
      const charCode = view.getUint8(0xA0 + i);
      if (charCode === 0) break;
      title += String.fromCharCode(charCode);
    }
    title = title.trim();

    // GBA Game Code at offset 0xAC (4 bytes ASCII)
    let gameCode = '';
    for (let i = 0; i < 4; i++) {
      const charCode = view.getUint8(0xAC + i);
      gameCode += String.fromCharCode(charCode);
    }
    gameCode = gameCode.trim().toUpperCase();

    // Check if Pokemon game
    const isPokemon = title.toUpperCase().includes('POKEMON') ||
                      ['BPEE', 'BPRE', 'BPGE', 'AXVE', 'AXPE', 'BPEJ', 'BPRJ'].includes(gameCode);

    return {
      title: title || 'Game Boy Advance Game',
      gameCode: gameCode || 'GBA',
      isPokemon: isPokemon
    };
  }

  /* ==========================================================================
     Load & Start Emulator
     ========================================================================== */
  function startEmulatorWithFile(fileOrUrl, originalFilename = 'game.gba') {
    showToast('Initializing mGBA WebAssembly core...', '🚀');

    // Parse ROM Header if it's a File/Blob
    if (fileOrUrl instanceof Blob) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const headerInfo = parseGbaHeader(e.target.result);
        state.romTitle = headerInfo.title;
        state.gameCode = headerInfo.gameCode;
        state.isPokemon = headerInfo.isPokemon;
        state.romName = originalFilename.replace(/\.[^/.]+$/, "");

        updateRomUI();
      };
      reader.readAsArrayBuffer(fileOrUrl.slice(0, 512));
    } else {
      const urlLower = (typeof fileOrUrl === 'string') ? fileOrUrl.toLowerCase() : '';
      const nameLower = originalFilename.toLowerCase();
      if (urlLower.includes('leaf') || nameLower.includes('leaf')) {
        state.romTitle = 'Pokémon - Leaf Green Version (U) (V1.1)';
        state.gameCode = 'BPGE';
        state.isPokemon = true;
        state.romName = 'Pokemon_LeafGreen';
        updateRomUI();
      } else {
        state.romTitle = 'Anguna - Warriors of Virtue';
        state.gameCode = 'ANGU';
        state.isPokemon = false;
        state.romName = 'Anguna';
        updateRomUI();
      }
    }

    // Switch UI from Hero dropzone to Emulator Viewport
    el.dropzoneHero.style.display = 'none';
    el.emulatorWrapper.style.display = 'flex';
    state.romLoaded = true;

    // Create Object URL for EmulatorJS
    const gameUrl = (typeof fileOrUrl === 'string') ? fileOrUrl : URL.createObjectURL(fileOrUrl);

    // Prepare EmulatorJS Configuration
    window.EJS_player = '#game-viewport';
    window.EJS_core = 'gba';
    window.EJS_gameUrl = gameUrl;
    window.EJS_pathtodata = '/emulatorjs/';
    window.EJS_startOnLoaded = true;
    window.EJS_color = '#8b5cf6';
    window.EJS_defaultOptions = {
      'shader': state.currentShader,
      'save-state-location': 'browser'
    };

    // Callback when game begins running
    window.EJS_onGameStart = function () {
      console.log('🎮 GBA Game Started!');
      showToast(`${state.romTitle} Started! (60 FPS)`, '✨');
      applyGraphicsEnhancements();
      setupCheatsForLoadedGame();
      startPerformanceMonitor();
    };

    // Callback on save
    window.EJS_onSave = function () {
      showToast('Game Progress Saved!', '💾');
    };

    // Load emulator loader script if not already loaded
    if (!window.EJS_emulator) {
      const script = document.createElement('script');
      script.src = '/emulatorjs/loader.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Hot swap game if already instantiated
      location.reload();
    }
  }

  function updateRomUI() {
    el.romStatusText.innerHTML = state.isPokemon 
      ? `<strong>${state.romTitle}</strong> [${state.gameCode}] • 128KB Flash &amp; RTC Active`
      : `<strong>${state.romTitle}</strong> [${state.gameCode}]`;
    el.romPulseLed.classList.add('active');

    if (state.isPokemon) {
      showToast(`✨ Pokémon Game Detected! 128KB Flash & Cheats Ready`, '🌿');
      // Auto-switch to game tab in Cheats modal
      switchCheatsTab(state.gameCode);
    }
  }

  /* ==========================================================================
     Graphics Enhancement Suite
     ========================================================================== */
  function applyGraphicsEnhancements() {
    // 1. WebGL GLSL Shader
    if (window.EJS_emulator && typeof window.EJS_emulator.enableShader === 'function') {
      try {
        window.EJS_emulator.enableShader(state.currentShader);
      } catch (err) {
        console.warn('Shader apply error:', err);
      }
    }

    // 2. Color Grading Matrix on Canvas
    const canvas = document.querySelector('#game-viewport canvas');
    if (canvas) {
      let filterStr = `saturate(${state.saturation}%) contrast(${state.contrast}%) brightness(${state.brightness}%)`;
      
      // Calibrated GBA LCD Gamut profile
      if (state.colorCorrection) {
        filterStr += ` hue-rotate(-2deg)`;
      }
      canvas.style.filter = filterStr;

      // Aspect Ratio
      if (state.aspectRatio === '3/2') {
        canvas.style.objectFit = 'contain';
        canvas.style.aspectRatio = '3/2';
      } else if (state.aspectRatio === 'fill') {
        canvas.style.objectFit = 'fill';
      } else if (state.aspectRatio === '16/9') {
        canvas.style.objectFit = 'fill';
        canvas.style.aspectRatio = '16/9';
      }
    }

    // 3. Screen Overlays (LCD Matrix & CRT Scanlines)
    if (el.overlayLcd) {
      el.overlayLcd.style.opacity = (state.lcdGrid / 100).toString();
    }
    if (el.overlayScanlines) {
      el.overlayScanlines.style.opacity = (state.scanlines / 100).toString();
    }
  }

  /* ==========================================================================
     Fast-Forward Turbo Controller
     ========================================================================== */
  function setFastForward(active) {
    if (!window.EJS_emulator || !window.EJS_emulator.gameManager) return;
    
    state.fastForwardActive = active;

    const ratio = state.ffSpeed === 0 ? 0 : state.ffSpeed;
    window.EJS_emulator.gameManager.setFastForwardRatio(ratio);
    window.EJS_emulator.gameManager.toggleFastForward(active ? 1 : 0);

    // UI Updates
    if (active) {
      el.speedHudBadge.style.display = 'flex';
      el.speedHudText.textContent = `${state.ffSpeed === 0 ? 'MAX' : state.ffSpeed + '.0X'} TURBO`;
      el.hudTurboBtn.classList.add('active');
    } else {
      el.speedHudBadge.style.display = 'none';
      el.hudTurboBtn.classList.remove('active');
    }
  }

  function toggleFastForward() {
    setFastForward(!state.fastForwardActive);
  }

  /* ==========================================================================
     Pokémon & GBA Cheats Engine
     ========================================================================== */
  function setupCheatsForLoadedGame() {
    const gameCheats = window.POKEMON_CHEATS_DB[state.gameCode];
    if (!gameCheats) return;

    // Enable Master Code automatically if required
    if (gameCheats.masterCode && gameCheats.masterCode.required) {
      injectCheatIntoCore(0, true, gameCheats.masterCode.code);
      console.log(`[Cheats] Master Code injected for ${gameCheats.name}`);
    }
  }

  function injectCheatIntoCore(index, enabled, code) {
    if (!window.EJS_emulator || !window.EJS_emulator.gameManager) return;
    try {
      window.EJS_emulator.gameManager.setCheat(index, enabled ? 1 : 0, code);
    } catch (e) {
      console.warn('Failed to inject cheat:', e);
    }
  }

  function renderCheatsTab(gameKey) {
    el.cheatsTabContent.innerHTML = '';
    
    if (gameKey === 'CUSTOM') {
      el.customCheatPanel.style.display = 'flex';
      renderCustomCheatsList();
      return;
    }
    
    el.customCheatPanel.style.display = 'none';

    const gameData = window.POKEMON_CHEATS_DB[gameKey];
    if (!gameData) {
      el.cheatsTabContent.innerHTML = `<div style="color: var(--text-muted); padding: 20px; text-align: center;">No pre-built cheats for this category. Use Custom Cheat to add any Action Replay / GameShark code!</div>`;
      return;
    }

    // Master Code Card
    if (gameData.masterCode) {
      const mcCard = document.createElement('div');
      mcCard.className = 'cheat-card-item enabled';
      mcCard.innerHTML = `
        <div class="setting-card-info">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="setting-card-name">${gameData.masterCode.desc}</span>
            <span style="font-size:0.7rem; background:rgba(16,185,129,0.2); color:#34d399; padding:2px 6px; border-radius:4px; font-weight:700;">REQUIRED</span>
          </div>
          <div class="cheat-code-preview">${gameData.masterCode.code.replace(/\n/g, ' ')}</div>
        </div>
        <span style="color:#10b981; font-weight:700; font-size:0.85rem;">ACTIVE</span>
      `;
      el.cheatsTabContent.appendChild(mcCard);
    }

    // Cheats List
    gameData.cheats.forEach((cheat, i) => {
      const card = document.createElement('div');
      card.className = `cheat-card-item ${cheat.checked ? 'enabled' : ''}`;
      card.id = `cheat-card-${cheat.id}`;
      
      const cheatIndex = i + 1; // 0 is reserved for master code

      card.innerHTML = `
        <div class="setting-card-info" style="flex:1;">
          <span class="setting-card-name">${cheat.name}</span>
          <span class="setting-card-desc">${cheat.desc}</span>
          <div class="cheat-code-preview">${cheat.code.replace(/\n/g, ' ')}</div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="chk-${cheat.id}" ${cheat.checked ? 'checked' : ''}>
          <span class="slider-round"></span>
        </label>
      `;

      // Toggle Listener
      const checkbox = card.querySelector(`#chk-${cheat.id}`);
      checkbox.addEventListener('change', (e) => {
        cheat.checked = e.target.checked;
        if (cheat.checked) {
          card.classList.add('enabled');
          injectCheatIntoCore(cheatIndex, true, cheat.code);
          showToast(`Cheat Activated: ${cheat.name}`, '✨');
        } else {
          card.classList.remove('enabled');
          injectCheatIntoCore(cheatIndex, false, cheat.code);
          showToast(`Cheat Disabled: ${cheat.name}`, '⚪');
        }
      });

      el.cheatsTabContent.appendChild(card);
    });
  }

  function renderCustomCheatsList() {
    state.customCheats.forEach((cheat, index) => {
      const card = document.createElement('div');
      card.className = `cheat-card-item ${cheat.checked ? 'enabled' : ''}`;
      card.innerHTML = `
        <div class="setting-card-info" style="flex:1;">
          <span class="setting-card-name">${cheat.name} (${cheat.format})</span>
          <div class="cheat-code-preview">${cheat.code.replace(/\n/g, ' ')}</div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="chk-custom-${index}" ${cheat.checked ? 'checked' : ''}>
          <span class="slider-round"></span>
        </label>
      `;

      const checkbox = card.querySelector(`#chk-custom-${index}`);
      checkbox.addEventListener('change', (e) => {
        cheat.checked = e.target.checked;
        injectCheatIntoCore(50 + index, cheat.checked, cheat.code);
        card.classList.toggle('enabled', cheat.checked);
        showToast(`Custom Cheat: ${cheat.checked ? 'Enabled' : 'Disabled'}`, '🛠️');
      });

      el.cheatsTabContent.appendChild(card);
    });
  }

  function switchCheatsTab(tabKey) {
    const tabs = el.cheatsTabs.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabKey));
    renderCheatsTab(tabKey);
  }

  /* ==========================================================================
     Saves & Battery Backup (.sav)
     ========================================================================== */
  function quickSaveState() {
    if (!window.EJS_emulator || !window.EJS_emulator.gameManager) return;
    try {
      window.EJS_emulator.gameManager.quickSave();
      showToast(`Quick State Saved to Slot ${state.currentSlot}!`, '💾');
      captureStateThumbnail(state.currentSlot);
    } catch (e) {
      console.warn('Quick save error:', e);
    }
  }

  function quickLoadState() {
    if (!window.EJS_emulator || !window.EJS_emulator.gameManager) return;
    try {
      window.EJS_emulator.gameManager.quickLoad();
      showToast(`Quick State Loaded from Slot ${state.currentSlot}!`, '🔄');
    } catch (e) {
      console.warn('Quick load error:', e);
    }
  }

  function exportBatterySave() {
    if (!window.EJS_emulator || !window.EJS_emulator.gameManager) {
      showToast('Game must be running to export .sav!', '⚠️');
      return;
    }

    try {
      // Flush memory to virtual FS
      window.EJS_emulator.gameManager.saveSaveFiles();
      
      const savData = window.EJS_emulator.gameManager.getSaveFile(false);
      if (!savData || savData.length === 0) {
        showToast('No in-game save data found yet!', '⚠️');
        return;
      }

      const blob = new Blob([savData], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${state.romName}.sav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast(`Exported ${state.romName}.sav (128KB Flash)`, '💾');
    } catch (e) {
      console.error('Export .sav error:', e);
      showToast('Failed to export battery save', '❌');
    }
  }

  function importBatterySave(file) {
    if (!window.EJS_emulator || !window.EJS_emulator.gameManager) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = new Uint8Array(e.target.result);
        window.EJS_emulator.gameManager.loadSaveFiles(data);
        window.EJS_emulator.gameManager.restart();
        showToast(`Battery Save Loaded! Restarting game...`, '✅');
      } catch (err) {
        console.error('Import save error:', err);
        showToast('Failed to load .sav file', '❌');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function captureStateThumbnail(slot) {
    const canvas = document.querySelector('#game-viewport canvas');
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      state.stateSlots[slot] = dataUrl;
      renderStateSlots();
    } catch (e) {}
  }

  function renderStateSlots() {
    el.stateSlotsGrid.innerHTML = '';
    for (let slot = 1; slot <= 5; slot++) {
      const card = document.createElement('div');
      card.className = `state-slot-card ${slot === state.currentSlot ? 'active' : ''}`;
      
      const thumb = state.stateSlots[slot] 
        ? `<img src="${state.stateSlots[slot]}" class="state-slot-thumb" alt="Slot ${slot}">`
        : `<div class="state-slot-thumb">📁</div>`;

      card.innerHTML = `
        ${thumb}
        <div style="font-weight:700; font-size:0.85rem;">Slot ${slot}</div>
        <div style="font-size:0.7rem; color:var(--text-dim); margin-top:2px;">
          ${state.stateSlots[slot] ? 'Active' : 'Empty'}
        </div>
      `;

      card.addEventListener('click', () => {
        state.currentSlot = slot;
        renderStateSlots();
        showToast(`Selected Slot ${slot}`, '📌');
      });

      el.stateSlotsGrid.appendChild(card);
    }
  }

  /* ==========================================================================
     Screenshot Capture Tool
     ========================================================================== */
  function takeScreenshot() {
    const canvas = document.querySelector('#game-viewport canvas');
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${state.romName}_${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Screenshot Captured!', '📸');
    } catch (e) {
      console.warn('Screenshot error:', e);
    }
  }

  /* ==========================================================================
     Keyboard Controls & Physical Button Visualizer
     ========================================================================== */
  function setupKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      // Fast Forward (Spacebar)
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (state.ffMode === 'hold') {
          if (!state.fastForwardActive) setFastForward(true);
        } else if (state.ffMode === 'toggle') {
          toggleFastForward();
        }
        return;
      }

      // Quick Save (F1 / 1)
      if (e.key === 'F1' || (e.key === '1' && e.altKey)) {
        e.preventDefault();
        quickSaveState();
        return;
      }

      // Quick Load (F3 / 2)
      if (e.key === 'F3' || (e.key === '2' && e.altKey)) {
        e.preventDefault();
        quickLoadState();
        return;
      }

      // Screenshot (P)
      if (e.key.toLowerCase() === 'p' && !e.metaKey && !e.ctrlKey) {
        takeScreenshot();
        return;
      }

      // Fullscreen (F)
      if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey) {
        toggleFullscreen();
        return;
      }

      // Check Tactile Buttons
      checkButtonPress(e, true);
    });

    window.addEventListener('keyup', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

      // Fast Forward release in 'hold' mode
      if ((e.key === ' ' || e.code === 'Space') && state.ffMode === 'hold') {
        setFastForward(false);
      }

      checkButtonPress(e, false);
    });
  }

  function checkButtonPress(e, pressed) {
    const key = e.key;
    const k = key.toLowerCase();
    const code = e.code;
    
    // A Button (A or Z)
    if (k === 'a' || k === 'z') {
      el.btnA.classList.toggle('pressed', pressed);
      simulateCoreInput(8, pressed);
    }
    // B Button (S or X)
    else if (k === 's' || k === 'x') {
      el.btnB.classList.toggle('pressed', pressed);
      simulateCoreInput(0, pressed);
    }
    // L Trigger (Q)
    else if (k === 'q') {
      el.shoulderL.classList.toggle('active', pressed);
      simulateCoreInput(10, pressed);
    }
    // R Trigger (E)
    else if (k === 'e') {
      el.shoulderR.classList.toggle('active', pressed);
      simulateCoreInput(11, pressed);
    }
    // Start (Command / Meta or Enter)
    else if (key === 'Meta' || code === 'MetaLeft' || code === 'MetaRight' || key === 'Enter') {
      el.btnStart.classList.toggle('pressed', pressed);
      simulateCoreInput(3, pressed);
    }
    // Select / Menu (Option / Alt or Shift)
    else if (key === 'Alt' || code === 'AltLeft' || code === 'AltRight' || key === 'Shift' || key === 'Backspace') {
      el.btnSelect.classList.toggle('pressed', pressed);
      simulateCoreInput(2, pressed);
    }
    // D-Pad Up
    else if (key === 'ArrowUp') {
      el.btnDpadUp.classList.toggle('pressed', pressed);
      simulateCoreInput(4, pressed);
    }
    // D-Pad Down
    else if (key === 'ArrowDown') {
      el.btnDpadDown.classList.toggle('pressed', pressed);
      simulateCoreInput(5, pressed);
    }
    // D-Pad Left
    else if (key === 'ArrowLeft') {
      el.btnDpadLeft.classList.toggle('pressed', pressed);
      simulateCoreInput(6, pressed);
    }
    // D-Pad Right
    else if (key === 'ArrowRight') {
      el.btnDpadRight.classList.toggle('pressed', pressed);
      simulateCoreInput(7, pressed);
    }
  }

  function simulateCoreInput(buttonId, pressed) {
    if (!window.EJS_emulator || !window.EJS_emulator.gameManager) return;
    try {
      window.EJS_emulator.gameManager.simulateInput(0, buttonId, pressed ? 1 : 0);
    } catch (e) {}
  }

  /* Tactile Mouse / Touch Event Bindings for GBA Chassis Buttons */
  function setupTactileButtonClicks() {
    const bindBtn = (buttonElem, buttonId) => {
      const press = (e) => {
        e.preventDefault();
        buttonElem.classList.add('pressed');
        simulateCoreInput(buttonId, true);
      };
      const release = (e) => {
        e.preventDefault();
        buttonElem.classList.remove('pressed');
        simulateCoreInput(buttonId, false);
      };

      buttonElem.addEventListener('mousedown', press);
      buttonElem.addEventListener('mouseup', release);
      buttonElem.addEventListener('mouseleave', release);
      buttonElem.addEventListener('touchstart', press, { passive: false });
      buttonElem.addEventListener('touchend', release, { passive: false });
    };

    bindBtn(el.btnA, 8);
    bindBtn(el.btnB, 0);
    bindBtn(el.btnStart, 3);
    bindBtn(el.btnSelect, 2);
    bindBtn(el.btnDpadUp, 4);
    bindBtn(el.btnDpadDown, 5);
    bindBtn(el.btnDpadLeft, 6);
    bindBtn(el.btnDpadRight, 7);

    // Shoulder Triggers
    const bindShoulder = (btnElem, buttonId) => {
      btnElem.addEventListener('mousedown', () => {
        btnElem.classList.add('active');
        simulateCoreInput(buttonId, true);
      });
      btnElem.addEventListener('mouseup', () => {
        btnElem.classList.remove('active');
        simulateCoreInput(buttonId, false);
      });
    };
    bindShoulder(el.shoulderL, 10);
    bindShoulder(el.shoulderR, 11);
  }

  /* ==========================================================================
     Gamepad API Support (Mac Bluetooth / USB Controllers)
     ========================================================================== */
  function setupGamepadSupport() {
    window.addEventListener('gamepadconnected', (e) => {
      const gp = e.gamepad;
      el.gamepadName.textContent = `Connected: ${gp.id}`;
      el.gamepadStatus.textContent = `${gp.buttons.length} Buttons • Standard Mapping`;
      el.btnTestVibrate.style.display = gp.vibrationActuator ? 'block' : 'none';
      showToast(`Gamepad Connected: ${gp.id.split(' ')[0]}`, '🎮');
    });

    window.addEventListener('gamepaddisconnected', () => {
      el.gamepadName.textContent = 'No Gamepad Detected';
      el.gamepadStatus.textContent = 'Connect your PS5 DualSense, Xbox Series, or Switch Pro controller';
      el.btnTestVibrate.style.display = 'none';
      showToast('Gamepad Disconnected', '⚪');
    });

    el.btnTestVibrate.addEventListener('click', () => {
      const gamepads = navigator.getGamepads();
      if (gamepads && gamepads[0] && gamepads[0].vibrationActuator) {
        gamepads[0].vibrationActuator.playEffect('dual-rumble', {
          startDelay: 0,
          duration: 300,
          weakMagnitude: 1.0,
          strongMagnitude: 1.0
        });
      }
    });
  }

  /* ==========================================================================
     Performance & FPS Monitor
     ========================================================================== */
  let frameCount = 0;
  let lastTime = performance.now();
  function startPerformanceMonitor() {
    function loop(now) {
      frameCount++;
      if (now - lastTime >= 1000) {
        const fps = ((frameCount * 1000) / (now - lastTime)).toFixed(1);
        if (el.hudFps) el.hudFps.textContent = fps;
        if (el.hudSpeed) {
          const speedPct = state.fastForwardActive ? (state.ffSpeed === 0 ? '800%' : `${state.ffSpeed * 100}%`) : '100%';
          el.hudSpeed.textContent = speedPct;
        }
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ==========================================================================
     Fullscreen & Window Controls
     ========================================================================== */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  /* ==========================================================================
     Event Listeners Setup
     ========================================================================== */
  function initEventListeners() {
    // File inputs
    el.romFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        startEmulatorWithFile(e.target.files[0], e.target.files[0].name);
      }
    });

    el.heroFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        startEmulatorWithFile(e.target.files[0], e.target.files[0].name);
      }
    });

    // Demo Game Button (Anguna GBA Homebrew)
    el.btnLoadDemo.addEventListener('click', () => {
      startEmulatorWithFile('/roms/anguna.gba', 'anguna.gba');
    });

    // Launch LeafGreen ROM Button
    if (el.btnLaunchLeafgreen) {
      el.btnLaunchLeafgreen.addEventListener('click', () => {
        startEmulatorWithFile('/roms/pokemon_leafgreen.gba', 'Pokemon - Leaf Green Version (U) (V1.1).gba');
      });
    }

    // Drag and Drop ROM onto Hero Dropzone & Window
    ['dragenter', 'dragover'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.dropzoneHero.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      window.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        el.dropzoneHero.classList.remove('drag-over');
      });
    });

    window.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files[0]) {
        startEmulatorWithFile(files[0], files[0].name);
      }
    });

    // Turbo button on HUD
    el.hudTurboBtn.addEventListener('click', () => {
      toggleFastForward();
    });

    // Quick Save & Quick Load from HUD
    el.hudQuicksave.addEventListener('click', quickSaveState);
    el.hudQuickload.addEventListener('click', quickLoadState);
    el.hudScreenshot.addEventListener('click', takeScreenshot);
    el.hudFullscreenBtn.addEventListener('click', toggleFullscreen);

    // Shell Skin Switcher
    el.shellSkinSelect.addEventListener('change', (e) => {
      el.gbaChassis.className = `gba-chassis ${e.target.value}`;
      state.skin = e.target.value;
      showToast(`Skin: ${e.target.options[e.target.selectedIndex].text}`, '🎨');
    });

    // Traffic light dots
    el.trafficClose.addEventListener('click', () => {
      if (confirm('Eject ROM and return to launcher?')) {
        location.reload();
      }
    });
    el.trafficMaximize.addEventListener('click', toggleFullscreen);
    el.trafficMinimize.addEventListener('click', () => {
      el.gbaChassis.classList.toggle('skin-borderless');
    });

    // Modal Triggers
    const setupModal = (btn, modal) => {
      btn.addEventListener('click', () => {
        modal.classList.add('open');
      });
    };

    setupModal(el.btnOpenShaders, el.modalShaders);
    setupModal(el.btnOpenCheats, el.modalCheats);
    setupModal(el.btnOpenControls, el.modalControls);
    setupModal(el.btnOpenSaves, el.modalSaves);

    // Close Modals
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        document.getElementById(modalId).classList.remove('open');
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      });
    });

    // Shaders & Graphics Controls
    el.shaderSelect.addEventListener('change', (e) => {
      state.currentShader = e.target.value;
      applyGraphicsEnhancements();
      showToast(`Shader: ${e.target.options[e.target.selectedIndex].text}`, '🎨');
    });

    el.toggleColorCorrection.addEventListener('change', (e) => {
      state.colorCorrection = e.target.checked;
      applyGraphicsEnhancements();
    });

    el.sliderSaturation.addEventListener('input', (e) => {
      state.saturation = e.target.value;
      el.valSaturation.textContent = `${e.target.value}%`;
      applyGraphicsEnhancements();
    });

    el.sliderContrast.addEventListener('input', (e) => {
      state.contrast = e.target.value;
      el.valContrast.textContent = `${e.target.value}%`;
      applyGraphicsEnhancements();
    });

    el.sliderBrightness.addEventListener('input', (e) => {
      state.brightness = e.target.value;
      el.valBrightness.textContent = `${e.target.value}%`;
      applyGraphicsEnhancements();
    });

    el.sliderLcdGrid.addEventListener('input', (e) => {
      state.lcdGrid = e.target.value;
      el.valLcdGrid.textContent = `${e.target.value}%`;
      applyGraphicsEnhancements();
    });

    el.sliderScanlines.addEventListener('input', (e) => {
      state.scanlines = e.target.value;
      el.valScanlines.textContent = `${e.target.value}%`;
      applyGraphicsEnhancements();
    });

    el.aspectRatioSelect.addEventListener('change', (e) => {
      state.aspectRatio = e.target.value;
      applyGraphicsEnhancements();
    });

    // Fast-Forward Speed & Mode selection
    el.ffSpeedSelect.addEventListener('change', (e) => {
      state.ffSpeed = parseFloat(e.target.value);
      if (state.fastForwardActive) setFastForward(true);
    });

    el.ffModeSelect.addEventListener('change', (e) => {
      state.ffMode = e.target.value;
    });

    // Cheats Tabs
    el.cheatsTabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-btn')) {
        const tabKey = e.target.getAttribute('data-tab');
        switchCheatsTab(tabKey);
      }
    });

    // Add Custom Cheat Button
    el.btnAddCustomCheat.addEventListener('click', () => {
      const name = el.customCheatName.value.trim();
      const code = el.customCheatCode.value.trim();
      const format = el.customCheatFormat.value;

      if (!name || !code) {
        alert('Please enter a description and cheat code.');
        return;
      }

      state.customCheats.push({ name, code, format, checked: true });
      injectCheatIntoCore(50 + state.customCheats.length, true, code);
      
      el.customCheatName.value = '';
      el.customCheatCode.value = '';
      renderCustomCheatsList();
      showToast(`Custom Cheat Injected: ${name}`, '✨');
    });

    // Battery Save Export & Import
    el.btnExportBattery.addEventListener('click', exportBatterySave);
    el.importBatteryInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importBatterySave(e.target.files[0]);
      }
    });

    // Keybindings List Populate
    renderKeybindingsGrid();
    renderStateSlots();
  }

  function renderKeybindingsGrid() {
    el.keyMappingGrid.innerHTML = '';
    const keyLabels = [
      { id: 'a', name: 'A Button', default: 'Z' },
      { id: 'b', name: 'B Button', default: 'X' },
      { id: 'l', name: 'L Trigger', default: 'A / Q' },
      { id: 'r', name: 'R Trigger', default: 'S / E' },
      { id: 'start', name: 'Start', default: 'Enter' },
      { id: 'select', name: 'Select', default: 'Shift' },
      { id: 'up', name: 'D-Pad Up', default: 'Up / W' },
      { id: 'down', name: 'D-Pad Down', default: 'Down / S' },
      { id: 'left', name: 'D-Pad Left', default: 'Left / A' },
      { id: 'right', name: 'D-Pad Right', default: 'Right / D' },
      { id: 'turbo', name: 'Turbo Fast-Forward', default: 'Space' },
      { id: 'save', name: 'Quick Save State', default: 'F1' },
      { id: 'load', name: 'Quick Load State', default: 'F3' },
      { id: 'shot', name: 'Screenshot', default: 'P' },
    ];

    keyLabels.forEach(k => {
      const card = document.createElement('div');
      card.className = 'key-bind-card';
      card.innerHTML = `
        <span style="font-size:0.85rem; font-weight:600;">${k.name}</span>
        <span class="key-badge">${k.default}</span>
      `;
      el.keyMappingGrid.appendChild(card);
    });
  }

  // Initialization
  function init() {
    initEventListeners();
    setupKeyboardControls();
    setupTactileButtonClicks();
    setupGamepadSupport();
    startRTC();
    renderCheatsTab('BPGE');

    // Auto-start LeafGreen if requested in query
    if (window.location.search.includes('leafgreen') || window.location.search.includes('play=1')) {
      setTimeout(() => {
        startEmulatorWithFile('/roms/pokemon_leafgreen.gba', 'Pokemon - Leaf Green Version (U) (V1.1).gba');
      }, 250);
    }
  }

  // Boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
