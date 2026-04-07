# ApexStacks

**ApexStacks** is a Windows 11 desktop launcher that lets you stack multiple apps behind a single desktop icon, inspired by the Apex Launcher concept on Android.

![ApexStacks demo](assets/demo.gif)

## What it does

Instead of cluttering your desktop with dozens of icons, you group related apps under one icon. Hold the icon to fan out its sub-apps, click to launch.

- **Long press** on any desktop icon → fan-out animation reveals sub-apps
- **Alt+Click** on any desktop icon → enter edit mode to add/remove/reorder sub-apps
- **Drag one icon onto another** → auto-creates a stack (works with .lnk shortcuts)
- Badge on the icon shows how many apps are stacked

## Features

- Animated fan-out (N/S/E/W directions, auto-inverts near screen edges)
- Edit mode with fade in/out animation
- Drag & drop reordering of sub-apps inside a stack
- Right-click context menu on sub-apps: rename, change icon, replace, open path
- Long scrolling label for sub-apps with long names
- Support for apps, files, folders, and URLs
- Badge counter on parent icon (adapts to icon size and DPI)
- Tray icon with settings, restart, and stack management
- Remote mode: Ctrl+Click opens fan-out (for TeamViewer/RDP sessions)
- Windows startup toggle
- **Desktop archive**: adding a sub-app from the desktop automatically moves the file to a hidden `storage/` folder — desktop stays clean, stack keeps working
- **Drag sub-app back to desktop**: drag a sub-app outside the stack to remove it and restore the file to the desktop
- Configurable archive folder and archive mode (auto / ask / manual)
- Fully painted UI (no native windows, no taskbar presence)

## Requirements

- Windows 10 / 11
- No installation required — just run `ApexStacks.exe`

## Running from source

```bash
pip install PyQt6
python ApexStacks.py
```

Or use `run.bat` for a console window.

## Building

```bash
pip install pyinstaller
pyinstaller ApexStacks.spec --clean
```

Output: `dist/ApexStacks.exe`

## Configuration

Settings are saved in `stacks.json` next to the executable. You can back it up or move it between machines.

## License

MIT License — see [LICENSE](LICENSE)

## Author

Marco — [M2 Studios](https://m2studios.it)
