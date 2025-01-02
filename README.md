# Doughy Clicks! 🍩📸  

**Doughy Clicks!** è una web app full-stack per la gestione di una photo gallery.  

## 🛠️ Tecnologie Utilizzate  

### Graphic Design 
- **[Coolors](https://coolors.co/)**: per la creazione della palette di colori.
- **Adobe Illustrator**: utilizzato per la creazione del marchio di Doughy Clicks.
- **Adobe Photoshop**: per creazione degli assets ed editing immagini.

### UI/UX Design  
- **Figma**: utilizzato per progettare le interfacce e l'esperienza utente.  

### Front-End  
- **HTML** e **CSS**: sviluppati in vanilla senza librerie o framework esterni.  
- **Vanilla JavaScript**: per le funzionalità interattive, senza l'uso di framework come React o Angular.
- **[Spline](https://spline.design/)**: per la creazione di un modello interattivo per la landing page.

### Back-End  
- **Node.js** e **Express**: per la gestione del server.  
- **Sequelize**: ORM per la gestione del database.  
- **CORS**: per la gestione delle richieste cross-origin.  
- **jsonwebtoken**: per l'autenticazione tramite token JWT.  

### Database  
- **MySQL**: utilizzato come database relazionale.  

## 📋 Funzionalità  

### 1. Registrazione  
Gli utenti possono registrarsi selezionando un piano:  
- **Utenti Standard**: possono caricare un massimo di 3 foto.  
- **Utenti Premium**: possono caricare un massimo di 10 foto.  

### 2. Login  
Gli utenti registrati possono effettuare il login per accedere alle funzionalità dell'app. Una volta effettuato l'accesso:  
- Viene generato un token JWT per autenticare le operazioni.  
- Le operazioni disponibili includono:  
  - Visualizzazione della **Public Gallery** (foto caricate da tutti gli utenti).  
  - Gestione della propria **Personal Gallery** (visualizzazione, aggiunta, modifica e cancellazione delle proprie foto).  

### 3. Public Gallery  
Gli utenti possono visualizzare le foto caricate dagli altri utenti.  

### 4. Personal Gallery  
Gli utenti possono accedere alla propria gallery personale.  

### 5. Aggiungere Immagini  
Caricamento di immagini nella propria gallery personale, rispettando i limiti del piano.  

### 6. Modificare Immagini  
Possibilità di modificare il titolo delle immagini caricate.  

### 7. Cancellare Immagini  
Rimozione delle immagini dalla propria gallery personale.  

### 8. Logout  
Gli utenti possono disconnettersi dall'app.  

