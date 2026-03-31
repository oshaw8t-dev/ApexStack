# ApexStacks — Roadmap

## ✅ Implementato

### Sessione 1 (2026-03-23)
- Fan-out animato icone sub-app (long press ~700ms)
- Edit mode (Alt+Click su icona)
- Rilevamento posizione icone da Explorer via IPC
- Bordi schermo: inversione direzione automatica
- Drag detection: non apre menu durante trascinamento icone
- Pallino badge indicatore stack sull'icona
- Oscuramento schermo in edit mode

### Sessione 2 (2026-03-26)
- Pannello Impostazioni nel tray (hold_ms, sub_size, slot_spacing)
- Riordinamento sub-app con drag & drop in edit mode
- Spostamento sub-app tra slot diversi (N/S/E/W) via drag

### Sessione 3 (2026-03-27)
- Drag icona desktop su altra icona → crea stack automaticamente
- Arco animato di caricamento durante hover
- Preview ghost dell'icona al hover sul "+" in edit mode pending
- Salvataggio al rilascio del mouse sul "+"
- Uscita dall'edit mode se mouse esce dai margini
- Supporto cartelle e file generici
- Modalità remoto (Ctrl+Click)
- Fix tray menu e tray click

### Sessione 4 (2026-03-28)
- Menu contestuale (click destro su sub-app): Cambia icona, Ripristina, Rinomina, Sostituisci, Apri percorso
- Label sub-app con scrolling per nomi lunghi
- Animazione fade-in/fade-out edit mode
- Badge contatore sub-app (adattivo a DPI)
- Fix centro fan-out con LVM_GETITEMRECT LVIR_ICON

### Sessione 5 (2026-03-28)
- Build eseguibile standalone (PyInstaller, dist/ApexStacks.exe)
- Conferma eliminazione stack (dialog dipinto nell'overlay)
- Fix rinomina: edit mode non si chiude durante QInputDialog
- Fix QFileDialog: rimozione temporanea WS_EX_NOACTIVATE
- Fix cerchio drag-to-create non si attiva durante spostamento dialog
- Toggle avvio automatico con Windows (registro HKCU\...\Run)
- Refresh badge ogni 50ms (quasi in tempo reale)
- Fix riavvio dal tray
- README, LICENSE, .gitignore per pubblicazione GitHub

### Sessione 6 (2026-03-29)
- **Archiviazione automatica dal desktop**: quando una sub-app viene aggiunta da desktop, il file viene spostato in `storage/` e il path aggiornato — desktop resta pulito, stack funziona
- **Drag sub-app → desktop**: trascinando una sub-app fuori dallo stack si riporta il file sul desktop e si rimuove dallo stack (con feedback visivo rosso + etichetta)
- Cartella di archiviazione configurabile (default: `BASE_DIR/storage/`)
- Impostazione modalità archiviazione: Automatico / Chiedi conferma / Manuale
- Pulsante sfoglia cartella archivio nelle Impostazioni
- Funzione `_unarchive_to_desktop` con gestione collisioni nomi
- Import widgets PyQt6 completato (QPushButton, QComboBox, QLineEdit top-level)

---

## ⏸ Saltato / Rimandato
- Supporto multi-monitor
- Blur/frosted glass sfondo sub-app (problemi DPI/DWM)
- Drag-to-create su .exe diretti (Windows OLE intercetta prima del nostro hook)

---

## 📋 Da fare

### UX
- [ ] Doppio click su sub-app per rinominare inline
- [ ] Scroll rotella sopra uno stack aperto per ciclare sub-app
- [ ] Tasto destro sull'icona padre per opzioni stack (senza Alt+Click)

### Visuale
- [ ] Temi colore personalizzabili per le bolle
- [ ] Animazione rimbalzo leggera al termine del fan-out
- [ ] Dimensione personalizzabile per singola sub-app

### Organizzazione
- [ ] Import/export configurazione JSON
- [ ] Duplica stack
- [ ] Cronologia lanci nel tray
- [ ] Sub-app con URL (apre browser)

### Produttività
- [ ] Hotkey globale configurabile
- [ ] Quick add da tray icon
- [ ] Ricerca dentro gli stack

### Tecnici
- [ ] Multi-monitor
- [ ] Log viewer nel tray
- [ ] Notifica toast creazione/eliminazione stack
- [ ] Backup automatico stacks.json (ultime 3 versioni)
