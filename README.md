# eCommerce-Express-API

REST-API mit Express.js für ein E-Commerce-Projekt. Ermöglicht die Verwaltung von Produkten, Benutzern und Bestellungen über HTTP-Anfragen.

##  Funktionen
- Erstellen, Lesen, Aktualisieren und Löschen von Produkten (CRUD).
- Benutzerverwaltung (Registrierung, Authentifizierung).
- Bestellverwaltung (Erstellen, Anzeigen, Status ändern).
- Validierung der Eingabedaten mit Schemas (z. B. Joi oder Ajv).
- Middleware für Authentifizierung und Fehlerbehandlung.

##  Installation
```bash
git clone https://github.com/SergiiBzn/eCommerce-express-api.git
cd eCommerce-express-api
npm install

Konfiguration
	•	Erstellen Sie eine .env-Datei neben server.js.
	•	Fügen Sie die folgenden Umgebungsvariablen hinzu:

PORT=3000
DB_URI=<Ihre Datenbank-Verbindungszeichenfolge>
JWT_SECRET=<Ihr geheimer JWT-Schlüssel>
