<div align="center">
  <img src="assets/icon_256.png" width="96" alt="Synapps icon" />
  <h1>Synapps</h1>
  <p><strong>Icon stacks for your Windows desktop — hold to fan out, click to launch</strong></p>
  <p>
    <a href="https://github.com/oshaw8t-dev/ApexStack/releases/latest"><img alt="Download" src="https://img.shields.io/github/v/release/oshaw8t-dev/ApexStack?label=download&style=flat-square&color=003dea"></a>
    <img alt="Platform" src="https://img.shields.io/badge/platform-Windows%2010%2F11-blue?style=flat-square">
    <img alt="License" src="https://img.shields.io/github/license/oshaw8t-dev/ApexStack?style=flat-square">
  </p>
</div>

---

> **Beta** — works well for daily use, but edge cases exist. [Report bugs here](https://github.com/oshaw8t-dev/ApexStack/issues).

## What is Synapps?

Synapps lets you group multiple apps, files, and folders behind a single desktop icon.
Hold the icon → it fans out into its sub-apps. Click one to launch it.

No more cluttered desktop. No taskbar bloat. Just your desktop, organized.

![Synapps demo](assets/demo.gif)

## Quick start

1. Download the installer from the [latest release](https://github.com/oshaw8t-dev/ApexStack/releases/latest)
2. Run the installer (Windows 10 / 11, no extra dependencies)
3. Synapps starts in the system tray

## How to use

| Action | Result |
|--------|--------|
| **Long press** on a stack icon (~700ms) | Fan-out animation — sub-apps appear |
| **Click** a sub-app | Launch it |
| **Alt+Click** on any desktop icon | Enter edit mode |
| **Drag** one desktop icon **onto another** | Create a stack automatically |
| **Ctrl+Click** multiple icons + drag onto a stack | Add multiple apps at once |
| **Drag a sub-app off the stack** | Remove it and restore to desktop |

## Features

- Animated fan-out (N / S / E / W, auto-inverts near screen edges)
- **Drag-to-create** — drop any icon onto another to instantly form a stack
- **Multi-drag** — Ctrl+Click or rectangle-select multiple icons, drag them all in at once
- **Edit mode** — add, remove, reorder, rename, change icon of sub-apps
- **Desktop archive** — files added from the desktop move to `storage/` automatically; desktop stays clean
- **Drag back to desktop** — drag a sub-app out to restore the file and remove it from the stack
- Right-click context menu on sub-apps (rename, change icon, replace, open path)
- Configurable archive folder and archive mode (auto / ask / manual)
- Multi-monitor support (including non-primary monitors, mixed DPI)
- Windows startup toggle (via system tray)
- Automatic backup of `stacks.json` (last 3 versions)
- Fully painted UI — no native windows, no taskbar presence

## Known limitations

- Drag-to-create does not work with raw `.exe` icons on the desktop (Windows OLE Shell intercepts the drag). Use `.lnk` shortcuts instead, or add apps manually via Alt+Click → edit mode.

## Configuration

Settings and stack data are stored in `%APPDATA%\Synapps\`. You can back up or migrate this folder between machines.

## Contributing

Bug reports and feature requests are welcome on [Issues](https://github.com/oshaw8t-dev/ApexStack/issues).

## License

MIT — see [LICENSE](LICENSE)

## Author

Osha <3
