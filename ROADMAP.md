# ApexStacks - Roadmap

Roadmap dinamica con sezioni comprimibili e checklist aggiornabile.

<details open>
<summary><strong>Implementato</strong></summary>

<details>
<summary><strong>Sessione 1 (2026-03-23)</strong></summary>

- [x] Fan-out animato icone sub-app (long press ~700ms)
- [x] Edit mode (Alt+Click su icona)
- [x] Rilevamento posizione icone da Explorer via IPC
- [x] Bordi schermo: inversione direzione automatica
- [x] Drag detection: non apre menu durante trascinamento icone
- [x] Pallino badge indicatore stack sull'icona
- [x] Oscuramento schermo in edit mode

</details>

<details>
<summary><strong>Sessione 2 (2026-03-26)</strong></summary>

- [x] Pannello Impostazioni nel tray (`hold_ms`, `sub_size`, `slot_spacing`)
- [x] Riordinamento sub-app con drag & drop in edit mode
- [x] Spostamento sub-app tra slot diversi (N/S/E/W) via drag

</details>

<details>
<summary><strong>Sessione 3 (2026-03-27)</strong></summary>

- [x] Drag icona desktop su altra icona -> crea stack automaticamente
- [x] Arco animato di caricamento durante hover
- [x] Preview ghost dell'icona al hover sul `+` in edit mode pending
- [x] Salvataggio al rilascio del mouse sul `+`
- [x] Uscita dall'edit mode se mouse esce dai margini
- [x] Supporto cartelle e file generici
- [x] Modalita remoto (`Ctrl+Click`)
- [x] Fix tray menu e tray click

</details>

<details>
<summary><strong>Sessione 4 (2026-03-28)</strong></summary>

- [x] Menu contestuale (click destro su sub-app): Cambia icona, Ripristina, Rinomina, Sostituisci, Apri percorso
- [x] Label sub-app con scrolling per nomi lunghi
- [x] Animazione fade-in/fade-out edit mode
- [x] Badge contatore sub-app (adattivo a DPI)
- [x] Fix centro fan-out con `LVM_GETITEMRECT LVIR_ICON`

</details>

<details>
<summary><strong>Sessione 5 (2026-03-28)</strong></summary>

- [x] Build eseguibile standalone (`PyInstaller`, `dist/ApexStacks.exe`)
- [x] Conferma eliminazione stack (dialog dipinto nell'overlay)
- [x] Fix rinomina: edit mode non si chiude durante `QInputDialog`
- [x] Fix `QFileDialog`: rimozione temporanea `WS_EX_NOACTIVATE`
- [x] Fix cerchio drag-to-create non si attiva durante spostamento dialog
- [x] Toggle avvio automatico con Windows (registro `HKCU\...\Run`)
- [x] Refresh badge ogni 50ms (quasi in tempo reale)
- [x] Fix riavvio dal tray
- [x] README, LICENSE, .gitignore per pubblicazione GitHub

</details>

<details>
<summary><strong>Sessione 6 (2026-03-29)</strong></summary>

- [x] Archiviazione automatica dal desktop: quando una sub-app viene aggiunta da desktop, il file viene spostato in `storage/` e il path aggiornato, cosi il desktop resta pulito e lo stack continua a funzionare
- [x] Drag sub-app -> desktop: trascinando una sub-app fuori dallo stack si riporta il file sul desktop e si rimuove dallo stack (con feedback visivo rosso + etichetta)
- [x] Cartella di archiviazione configurabile (default: `BASE_DIR/storage/`)
- [x] Impostazione modalita archiviazione: Automatico / Chiedi conferma / Manuale
- [x] Pulsante sfoglia cartella archivio nelle Impostazioni
- [x] Funzione `_unarchive_to_desktop` con gestione collisioni nomi

</details>

<details>
<summary><strong>Sessione 8 (2026-04-04)</strong></summary>

- [x] Fix: storage/unarchive su PC_Studio — `_get_desktop_dirs()` con `SHGetFolderPathW` per rilevare il desktop anche con OneDrive/GPO; `_drop_to_desktop` non rimuove la sub-app se l'unarchive fallisce
- [x] Fix: config isolation — config, log e storage spostati in `%APPDATA%\ApexStacks\` per separare le impostazioni tra macchine diverse
- [x] Multi-monitor: overlay che copre tutti i monitor con `virtualGeometry()`; coordinate widget-locali corrette ovunque (`_s2l`, `_local_screen_rect`, `_screen_for` con `mapToGlobal`)
- [x] Fix: sub-app appaiono sul monitor sbagliato in edit mode — risolti 6 punti di confusione tra coordinate schermo e coordinate widget-locali
- [x] Fix mirroring al bordo schermo — quando una slot supera il bordo e si specchia, ora parte dopo i slot della direzione opposta per evitare sovrapposizioni
- [x] Workflow sviluppo su PC_Studio via share di rete (Y:\run.bat)

</details>

<details>
<summary><strong>Sessione 7 (2026-04-01)</strong></summary>

- [x] Fix: menu "App / File" e "Cartella" non compariva alla seconda apertura in edit mode (edit mode chiusa durante `QMenu.exec()`)
- [x] Fix: archiviazione `.lnk` che punta a exe fuori dal desktop — parser binario `.lnk` per risolvere il target e trovare il collegamento corretto anche se il nome non corrisponde
- [x] Fix: drag-to-create su `.exe` diretti — Windows OLE intercettava il drag mostrando "Apri con..."; risolto con ESC injection al momento della conferma (hold completato) e rilevamento sincrono della sorgente nel hook
- [x] Fix: durante il drag verso un'icona, il controllo dell'icona sorgente era perso immediatamente; ora l'ESC viene iniettato solo al completamento del timer, lasciando libero lo spostamento normale prima
- [x] Impostazioni drag & drop configurabili: ritardo prima del cerchio e durata del cerchio (indipendenti dal long press)
- [x] Fix: delay drag applicato correttamente a ogni hover, non solo al primo
- [x] Fix: cerchio di caricamento usa `drag_create_ms` invece di `hold_ms`
- [x] Impostazioni riorganizzate in sezioni con descrizioni
- [x] Finestra impostazioni: scroll area, ridimensionabile, centrata sullo schermo
- [x] Impostazioni: "Applica" non chiude il dialog, mostra banner verde di conferma
- [x] Fix: rotella del mouse non modifica i campi delle impostazioni senza focus esplicito
- [x] Notifica toast creazione/eliminazione stack (dipinta nell'overlay)
- [x] Doppio click su sub-app in edit mode per rinominare inline

</details>

</details>

<details>
<summary><strong>Saltato / Rimandato</strong></summary>

- [ ] Blur/frosted glass sfondo sub-app (problemi DPI/DWM)

</details>

<details open>
<summary><strong>Da Fare</strong></summary>

<details open>
<summary><strong>UX</strong></summary>

- [ ] Scroll rotella sopra uno stack aperto per ciclare sub-app
- [ ] Tasto destro sull'icona padre per opzioni stack (senza Alt+Click)
- [ ] In edit mode, rendere il pulsante `+` invisibile di base e farlo comparire gradualmente solo in hover vicino alla sua zona
- [ ] Implementare un limite visivo alle sub-app di uno stack, mostrando le restanti tramite una piccola freccia laterale in stile Windows 11 nativo
- [ ] Rendere configurabile la visualizzazione delle sub-app: mostrare tutto subito oppure solo un numero massimo visibile personalizzabile
- [ ] Gestire le sub-app oltre il limite visivo con navigazione tramite freccia cliccabile e/o scroll della rotella del mouse

</details>

<details>
<summary><strong>Visuale</strong></summary>

- [ ] Temi colore personalizzabili per le bolle
- [ ] Animazione rimbalzo leggera al termine del fan-out
- [ ] Dimensione personalizzabile per singola sub-app

</details>

<details>
<summary><strong>Desktop e Taskbar</strong></summary>

- [ ] Estendere la funzionalita degli stack anche alla barra applicazioni di Windows
- [ ] Studiare come creare stack direttamente dalla barra applicazioni, definendo una UX chiara e sostenibile
- [ ] Permettere di aggiungere alla barra applicazioni stack gia creati sul desktop
- [ ] Permettere di riportare sul desktop stack gia presenti o gestiti dalla barra applicazioni
- [ ] Definire un flusso coerente di sincronizzazione o conversione stack tra desktop e taskbar
- [ ] Supporto drag and drop di piu app alla volta dentro uno stack
- [ ] Supporto aggiunta manuale di piu app alla volta dentro uno stack

</details>

<details>
<summary><strong>Organizzazione</strong></summary>

- [ ] Import/export configurazione JSON
- [ ] Duplica stack
- [ ] Cronologia lanci nel tray
- [ ] Sub-app con URL (apre browser)
- [ ] Gestire lo stack di altri stack, definendo il comportamento del programma quando viene creato uno stack dentro uno stack
- [ ] Valutare UX e regole di navigazione per stack nidificati, inclusi limiti, visualizzazione e interazioni

</details>

<details>
<summary><strong>Produttivita</strong></summary>

- [ ] Hotkey globale configurabile
- [ ] Quick add da tray icon
- [ ] Ricerca dentro gli stack

</details>

<details>
<summary><strong>Tecnici</strong></summary>

- [ ] Log viewer nel tray
- [ ] Backup automatico `stacks.json` (ultime 3 versioni)
- [ ] Rebuild installer con fix multi-monitor, storage isolation, desktop path detection

</details>

</details>

<details>
<summary><strong>Idee Sperimentali</strong></summary>

<details>
<summary><strong>Visualizzazione alternativa</strong></summary>

- [ ] Prototipare una "compact mode" con sistema a ruota: sub-app figlie affiancate alla madre, visualizzazione una alla volta, scroll per cambiare app e preview discreta della precedente
- [ ] Valutare e raccogliere altre idee di visualizzazione alternative per gli stack prima dell'implementazione definitiva
- [ ] Aggiungere ulteriori modalita di visualizzazione degli stack per aumentare la personalizzazione

</details>

<details>
<summary><strong>Facili ma ad effetto</strong></summary>

- [ ] Stack magnetici che emergono vicino ai bordi o in zone sensibili del desktop
- [ ] Mood mode con stile visivo che cambia in base a sfondo, ora o profilo attivo
- [ ] Ghost stacks invisibili che compaiono solo con gesture del mouse o hover specifici

</details>

<details>
<summary><strong>Molto originali</strong></summary>

- [ ] Context stacks che cambiano contenuto o priorita in base ad app aperte, fascia oraria o periferiche collegate
- [ ] Auto-stack suggestions che osservano le combinazioni d'uso e propongono nuovi stack automaticamente
- [ ] Project stacks che raggruppano app, file, cartelle, URL e azioni di un progetto in un unico hub

</details>

<details>
<summary><strong>Complesse ma game changer</strong></summary>

- [ ] Drop-to-stack actions: il drop di un file su uno stack scatena azioni intelligenti oltre all'aggiunta
- [ ] Launch chains: avviare sequenze di app, file, cartelle e URL con un solo click
- [ ] Recent session recovery: ripristinare rapidamente il setup di lavoro precedente

</details>

<details>
<summary><strong>Idee folli</strong></summary>

- [ ] Stack orbitale con inerzia fisica reale e navigazione tipo wheel
- [ ] Stack timeline da sfogliare nel tempo in base a uso recente o momenti della giornata
- [ ] Stack "creature" o personalita visive che reagiscono all'uso e rendono il desktop piu vivo

</details>

</details>
