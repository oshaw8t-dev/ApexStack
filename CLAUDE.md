# ApexStacks — Claude Code Project Context

## Lingua
Rispondi sempre in italiano, anche se il codice e i commenti sono in inglese.

## Progetto
ApexStacks è un'applicazione desktop Windows che aggiunge stack di icone al desktop,
con fan-out animato, edit mode, drag-to-create e archiviazione automatica.
Sviluppato da Marco (Oshawott), GitHub: Oshawott/ApexStack.

## Stack Tecnico
- **Linguaggio principale:** Python (singolo file `ApexStacks.py`, ~90KB)
- **UI:** PyQt6 con overlay trasparente fullscreen
- **Packaging:** PyInstaller (`build.bat`, `ApexStacks.spec`)
- **Installer:** Inno Setup (`ApexStacks.iss`)
- **Frontend web:** Vite + Tailwind (per UI secondaria, `src/`, `index.html`)
- **Python:** `C:\Users\marco\miniconda3\python.exe`
- **Config/log/storage runtime:** `%APPDATA%\ApexStacks\`

## Percorsi Importanti
- Sorgente principale: `ApexStacks.py`
- Dati stack: `stacks.json`
- Storage archiviazione: `storage/` (o path configurabile)
- Build output: `dist/ApexStacks.exe`
- Log debug: `ApexStacks_debug.log`
- Guidelines di sviluppo: `guidelines/`

## Come Eseguire
```bat
run.bat          # avvia in modalità sviluppo
build.bat        # compila exe con PyInstaller
build_installer.bat  # genera installer Inno Setup
```

## Convenzioni di Sviluppo
- Tutto il codice Python sta in un **unico file** (`ApexStacks.py`) — non spezzare in moduli
- I commenti interni sono in italiano o inglese misto
- Le coordinate UI sono spesso in due spazi: schermo globale e widget-locali — usare `_s2l`, `_local_screen_rect`, `_screen_for` per le conversioni
- Il desktop path si rileva con `SHGetFolderPathW` (non hardcodato, supporta OneDrive/GPO)
- Gli hook Windows (drag, IPC con Explorer) usano ctypes/win32api
- Ogni feature nuova va testata su multi-monitor

## Stato Attuale (Sessione 8 completata)
Il progetto è vicino alla **prima release pubblica beta**.
Feature core complete: fan-out, edit mode, drag-to-create, archiviazione automatica,
drag-to-desktop, multi-monitor, config isolation in %APPDATA%, menu contestuale,
label scrolling, toast notifications, autostart Windows.

### Blockers pre-release
- [ ] Selezione icona exe (6 varianti SVG generate, non ancora scelta)
- [ ] Build exe finale stabile
- [ ] Tag release su GitHub

## Da Fare (priorità alta)
Vedi `ROADMAP.md` per la lista completa. Feature principali pendenti:
- Scroll rotella su stack aperto per ciclare sub-app
- Tasto destro sull'icona padre per opzioni stack
- Limite visivo sub-app con freccia navigazione stile Windows 11
- Rebuild installer con fix multi-monitor e storage isolation

## Note Importanti per Claude Code
- **Non usare `subprocess`** per lanciare Python — usare sempre il path assoluto `C:\Users\marco\miniconda3\python.exe`
- **Desktop path** su PC Casetta (home): `C:\Users\marco\OneDrive\Desktop`
- **Il file è grande (~90KB)** — leggere sezioni specifiche con grep/offset invece di tutto il file
- Prima di modificare `ApexStacks.py`, fare sempre un backup o un commit git
- Il repo git è inizializzato nella cartella del progetto
