# Webflow Audit: `unterkonstruktion.de`

## Audit-Umfang
Geprüft wurden öffentlich erreichbare Kernseiten, Navigationseinträge, Produkt-/Kategoriepfade, statische Inhaltsseiten sowie ausgelieferte Frontend-Abhängigkeiten.

## Öffentliche Seitentypen
### Globale Seitentypen
- Startseite `/`
- Produktübersicht `/produkte`
- Kategorien
  - `/unterkonstruktion/schraegdach`
  - `/kategorie/solarmodule`
  - `/kategorie/wechselrichter`
  - `/kategorie/batteriespeicher`
  - `/kategorie/zubehoer`
- Produktdetailseiten `/produkt/*`
- Kontakt `/kontakt`
- FAQ `/haufig-gestelte-fragen`
- Über uns `/uber-uns`
- Rechtstexte
  - `/agb`
  - `/datenschutz`
  - `/impressum`
  - `/wiederrufsrecht` (im Footer verlinkt, nicht separat im Audit gelesen)
- Konfigurator `/konfigurator`
- Kundenportal `/sign-up`

## Globale Seitenstruktur
### Wiederkehrende globale Bereiche
- Topline mit Trust/Promo-Messaging
  - "Tagesaktuelle Bestpreise"
  - "Ganzjährige Top-Deals!"
- Kontaktzeile mit Telefon und E-Mail
- Primäre Kategorienavigation
- wiederkehrender Footer mit:
  - Kontakt-CTA
  - Kategorienliste
  - Navigationslinks
  - Rechtstext-Links
  - Zahlungs-/Servicehinweise

### Wiederkehrende Service-/Trust-Blöcke
- Kontakt-CTA "Sie haben Fragen? Unser Team hilft Ihnen gerne weiter!"
- Service-/USP-Bereich mit Aussagen wie:
  - Hochwertige Produkte
  - Schneller Versand
  - 24/7 für Sie da
- Produktqualitäts-/Marketing-Textblöcke

## Startseite
### Identifizierte Bausteine
- Hero mit Headline, Subheadline und 2 CTAs
- prominenter Konfigurator-CTA
- großes Video-/Visual-Modul
- Kategorien-Übersicht
- mehrere Featured-Produktreihen nach Kategorie
- USP-/Service-Bereich
- Partner-/Markenbezug
- Kontakt-/Support-CTA

## Kategorie-/Listingseiten
### Beobachtete Struktur
- Intro mit Kategorie-Headline
- kurzer Kategorie-Claim
- Kontakt-/Hilfs-Sidebar bzw. Kontaktteaser
- Produktgrid mit sofortigem Add-to-Cart
- Produktkarten zeigen:
  - Verfügbarkeit
  - Preis / Compare-Preis
  - Einheitspreis / Stück-Bezug
  - Titel
  - kurze Beschreibung
  - Mengen-Stepper
  - CTA "In den Warenkorb"
- darunter weitere Marketing-/Service-Segmente

## Produktdetailseiten
### Sichtbare Inhalte
- Titel
- Preis und Compare-Preis
- kurze technische Unterzeile
- Staffelpreise
- Lieferzeit
- Verfügbarkeitsstatus
- Add-to-Cart
- "Jetzt kaufen"
- VAT-Hinweis `0% - Mehrwertsteuer`
- Zahlungsarten
- Kontaktblock
- Tabs / Inhaltsmodule:
  - Beschreibung
  - Lieferung & Versand
  - Downloads

### Produktdatenmuster
- technische Beschreibung in Langform
- Bullet-Listen für technische Daten
- Vorteilslisten
- PDF-Download(s)
- teils einzelne Produkte, teils Bundles/Paletten

## Kontaktseite
### Beobachtete Struktur
- Intro mit Headline und erläuterndem Text
- Formular mit:
  - Anrede
  - Name
  - Kontaktfelder
  - Nachricht
- direkte Kontaktlinks für Telefon und E-Mail
- nachgelagerte Marketing-/Service-Module

## FAQ-Seite
### Beobachtete Struktur
- Intro + CTA
- Liste klassischer FAQ-Akkordeons
- darunter erneut Service-/Footer-nahe Sektionen

## Über-uns-Seite
### Beobachtete Struktur
- Intro / Firmenbeschreibung
- Video-/Medienblock
- Trust-/Service-Argumentation
- Kontakt-CTA

## Rechtliche Seiten
### Beobachtete Struktur
- Standard-Content-Seiten mit Headline und rich text
- inhaltlich weitgehend linear
- weiterhin in globales Site-Chrome eingebettet

## Kundenportal / Auth
### Beobachtete Struktur
- Login/Registrierung
- Google-Anmeldung
- Passwortregeln
- Hinweis auf bestehendes Konto

### Bewertung
- Das ist keine Standard-Shopify-Theme-Funktionalität.
- Sichtbare Hinweise in Datenschutz deuten auf Memberstack oder ähnliche Kontologik.
- Muss als eigener Workstream behandelt werden.

## Konfigurator
### Beobachtete Struktur
- eigenständiger interaktiver Planer
- Projekt-/Kontaktdaten
- Grid-/Layout-Logik
- Modulwahl
- Optimierer-/Zusatzproduktlogik
- Mehrfachkonfigurationen
- Sammel-Add-to-Cart

### Bewertung
- Hochgradig skriptgetrieben
- keine 1:1-Sektion
- benötigt Shopify-natives Redesign auf Basis von:
  - Line Item Properties
  - Bundles / Shopify Functions
  - ggf. App Proxy / Embedded App

## Design-Tokens und visuelle Muster
### Verifizierte Tokens
- Containerbreite: `1290px`
- Blau: `#072544`
- Gelb: `#ffb101`
- Light background / surfaces: u. a. `#fffdfa`, `#f7f7f7`, `#fafafa`
- Radius-Basis: `.5rem`
- Typografie:
  - `Geist Variablefont Wght`
  - punktuell `Outfit`

### Wiederkehrende Spacing-Muster
- häufige Werte: `10px`, `15px`, `20px`, `40px`, `60px`
- Karten und Formflächen mit mittleren Innenabständen
- großzügige vertikale Section-Abstände

### Wiederkehrende visuelle Prinzipien
- dunkle blaue Navigations-/Footer-Flächen
- gelbe Highlights für Akzente/Call-to-Action
- helle Kartenflächen auf Weiß/Offwhite
- technisch-sachliche, aber vertriebsorientierte Produktkommunikation
- kompakte, dichte Produktkarten mit Direktkauf-Fokus

## Externe Frontend-Abhängigkeiten
### Verifiziert im ausgelieferten HTML
- Webflow CSS/JS
- `cdn.foxycart.com/unterkonstruktion/loader.js`
- `unterkonstruktion-cart.vercel.app/styles/foxy-overrides.css`
- `solar-tool-xi.vercel.app/cms-search.min.js`
- `cookiesolution.vercel.app/cookie-solution.min.js`
- GSAP / ScrollTrigger
- GTM / GA-Signale
- Hotjar-Signale
- Facebook Pixel-Signale
- YouTube-nocookie auf Konfigurator-Seite

## Commerce-spezifische Befunde
- sichtbares Cart-Verhalten ist nicht originär Shopify
- Add-to-Cart erfolgt derzeit in externer Commerce-Logik
- Preis-/Bestandsanzeige ist visuell relevant, aber fachlich nicht automatisch korrekt modelliert
- Produktpakete (z. B. Paletten) müssen in Shopify klar als eigene Produkte oder Bundle-Modell definiert werden

## Audit-Fazit
- Der visuelle Layer ist gut in modulare Shopify-Sections überführbar.
- Die größte fachliche Migrationsarbeit liegt nicht im Layout, sondern in:
  - Cart-/Checkout-Neuaufbau
  - Konfigurator-Neukonzeption
  - Auth-/Portal-Entscheidung
  - Tracking/Cookie-Neuaufbau
