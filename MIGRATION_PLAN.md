# Migration Plan: `unterkonstruktion.de` -> Shopify Theme

## Ziel
Die öffentliche Webflow-Storefront soll so nah wie praktisch möglich in ein natives, wartbares Shopify-Theme überführt werden. Die neue Umsetzung muss section-basiert, editorfreundlich und commerce-seitig sauber auf Shopify modelliert sein.

## Leitprinzipien
- Die Live-Site ist die visuelle Referenz für Layout, Rhythmus, Komponenten und sichtbare Interaktionen.
- Shopify ist die fachliche Quelle für Produkte, Collections, Varianten, Cart und Checkout.
- Wiederkehrendes UI wird in `sections/`, `snippets/` und schema-gesteuerte Settings zerlegt.
- Nicht nativ übertragbare Logik wird nicht stillschweigend nachgebaut, sondern als Annahme oder offener Punkt dokumentiert.

## Verifizierte Ausgangslage
- Das Repo enthält bereits ein OS-2.0-Theme mit `layout/theme.liquid`, JSON-Templates und zentralen Sections für Header, Footer, Product, Collection und Cart.
- Die Quellseite basiert auf Webflow und verwendet sichtbare externe Commerce-/Script-Abhängigkeiten:
  - `cdn.foxycart.com/unterkonstruktion/loader.js`
  - `unterkonstruktion-cart.vercel.app/styles/foxy-overrides.css`
  - `solar-tool-xi.vercel.app/cms-search.min.js`
  - `cookiesolution.vercel.app/*`
  - GTM/GA/Hotjar/Facebook-Pixel-Hinweise in ausgeliefertem HTML
- Global erkennbare Quell-Tokens:
  - Containerbreite ca. `1290px`
  - Primärfarben aus CSS-Variablen: dunkles Blau `#072544` / Gelb `#ffb101`
  - Typografie: `Geist Variablefont Wght`, partiell `Outfit`
  - Radius-Basis: `.5rem`

## Priorisierte Implementierungsreihenfolge
1. Audit- und Mapping-Dokumentation festschreiben.
2. Globale Theme-Foundation angleichen:
   - Tokens
   - Typografie
   - Header
   - Footer
   - Section-Rhythmus
3. Produktlisten-System angleichen:
   - Produktkarten
   - Collection-Grid
   - Sortierung
   - Sidebar-/Kontaktmodul
4. Produktdetailseite angleichen:
   - Medienbereich
   - Preisblock
   - Staffelpreise
   - Downloads
   - Liefer-/VAT-/Kontaktblöcke
5. Cart nativ finalisieren.
6. Inhaltsseiten angleichen:
   - Kontakt
   - FAQ
   - Über uns
   - Rechtstexte
7. Homepage-Sections visuell nachschärfen.
8. Visuelle QA gegen die Quellseite durchführen und Restabweichungen dokumentieren.

## Zielarchitektur
### Layout
- `layout/theme.liquid`
  - zentrale Token-Ausgabe
  - Asset-Ladung
  - globale Header-/Footer-Gruppen
  - keine wachsende Monolith-Logik

### Templates
- `templates/index.json`
- `templates/product.json`
- `templates/collection.json`
- `templates/cart.json`
- `templates/page.json`
- `templates/page.contact.json`
- `templates/page.faq.json`
- Ergänzend sinnvoll:
  - `templates/page.about.json`
  - `templates/page.legal.json`
  - optional `templates/search.json`
  - optional `templates/customers/*.json`

### Sections
- globale Announcement-/Trust-Bar
- Header
- Footer
- Hero / Intro
- Category Overview
- Featured Collection / Produkt-Strip
- Main Collection
- Main Product
- Main Cart
- Contact Form / Contact CTA
- FAQ
- Standard Content / Legal Content

### Snippets
- `product-card`
- `price-display`
- `stock-badge`
- `tier-prices`
- `product-tabs`
- `qty-stepper`
- `payment-icons`
- Kontakt-/Icon-/Utility-Snippets

### Datenmodell
- Shopify-Produkte für:
  - Name
  - Beschreibung
  - Medien
  - Varianten
  - Preise
  - Compare-at-Preise
  - Bestand
- Metafields für:
  - `custom.short_subtitle`
  - `custom.delivery_time`
  - `custom.tier_prices`
  - `custom.downloads`
  - optional `custom.unit_price`
  - optionale technische Daten / Bullet-Listen
- Collections für Kategorieseiten
- Metaobjects optional für:
  - Trust-/USP-Elemente
  - Partnerlogos
  - Service-Kacheln
  - FAQ-Sets, falls redaktionell zentral gepflegt

## Nicht-1:1 migrierbare Bereiche
- Foxycart-/Cartgenie-Verhalten wird nativ auf Shopify Cart/Checkout abgebildet.
- Der Konfigurator wird nicht als roher HTML-/Script-Export übernommen.
- Mitglieds-/Portal-Logik (`sign-up`, Memberstack-Hinweis in Datenschutz) benötigt eine separate Shopify-Konto-Entscheidung.
- Tracking/Cookie-Management wird Shopify-konform neu eingebunden.

## Definition of Done
- Visuelle Hierarchie und Komponentenstruktur entsprechen der Quellseite eng genug.
- Templates bleiben dünn und section-basiert.
- Repeated UI ist modularisiert.
- Commerce-Flows laufen nativ über Shopify oder sind explizit als offen markiert.
- Annahmen, Lücken und Abweichungen sind dokumentiert.
