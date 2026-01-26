# UK Solar Theme - Shopify OS 2.0

Ein modernes Shopify Online Store 2.0 Theme, optimiert für B2B Solar- und PV-Shops. Das Theme bietet eine klare, technische Optik mit kompakten Produktkarten, Mengen-Stepper, Staffelpreise und umfangreichen Anpassungsmöglichkeiten.

## Features

- **Shopify OS 2.0**: Sections everywhere, JSON Templates
- **Mobile First**: Responsive Design für alle Geräte
- **Performance**: Lazy Loading, minimales JavaScript
- **Accessibility**: WCAG AA konform, Tastaturbedienung
- **Deutsch als Standard**: Vollständige deutsche Lokalisierung
- **B2B Features**: Staffelpreise, Mengen-Stepper, Lagerstatus

## Installation

### Option 1: ZIP Upload

1. Lade das Theme als ZIP-Datei herunter
2. Gehe zu **Shopify Admin > Online Store > Themes**
3. Klicke auf **Add theme > Upload ZIP file**
4. Wähle die ZIP-Datei aus und lade sie hoch
5. Klicke auf **Customize**, um das Theme anzupassen

### Option 2: Shopify CLI

```bash
# Theme in den Shop hochladen
shopify theme push --store=dein-shop.myshopify.com

# Theme lokal entwickeln
shopify theme dev --store=dein-shop.myshopify.com
```

## Metafields einrichten

Das Theme nutzt folgende Product Metafields für erweiterte Funktionen:

### 1. Staffelpreise (`custom.tier_prices`)

- **Namespace**: `custom`
- **Key**: `tier_prices`
- **Typ**: JSON
- **Format**:

```json
[
  {"qty": 40, "price": "11.59"},
  {"qty": 80, "price": "11.25"}
]
```

### 2. Lieferzeit (`custom.delivery_time`)

- **Namespace**: `custom`
- **Key**: `delivery_time`
- **Typ**: Single line text
- **Beispiel**: `1-4 Werktage`

### 3. Kurzbeschreibung (`custom.short_subtitle`)

- **Namespace**: `custom`
- **Key**: `short_subtitle`
- **Typ**: Single line text
- **Beispiel**: `Performanceschiene, schwarz pulverbeschichtet`

### 4. Downloads (`custom.downloads`)

- **Namespace**: `custom`
- **Key**: `downloads`
- **Typ**: JSON
- **Format**:

```json
[
  {"title": "Datenblatt", "url": "https://..."},
  {"title": "Montageanleitung", "url": "https://..."}
]
```

### Metafields anlegen

1. Gehe zu **Shopify Admin > Settings > Custom data**
2. Klicke auf **Products > Add definition**
3. Erstelle die oben genannten Metafield-Definitionen

## Theme Editor - Startseite konfigurieren

Die Startseite ist in `templates/index.json` vorkonfiguriert mit folgenden Sections:

1. **Hero**: Überschrift, Untertitel, 2 CTAs
2. **Kategorie-Übersicht**: 5 Kategorie-Kacheln
3. **Featured Collection**: Produkte aus ausgewählten Collections
4. **USP/Service**: Vorteile und Service-Punkte
5. **Partner Logos**: Logo-Strip
6. **Kontakt CTA**: Kontaktblock

### Collections zuweisen

1. Öffne den Theme Editor (**Customize**)
2. Wähle eine "Featured Collection" Section
3. Wähle unter **Collection** die gewünschte Collection aus

## Theme Settings

### Farben

Unter **Theme settings > Colors** kannst du anpassen:

- **Primary**: Hauptfarbe (Standard: Schwarz #1a1a1a)
- **Secondary**: Akzentfarbe (Standard: Orange #f5a623)
- **Background**: Hintergrundfarbe
- **Text**: Textfarbe
- **Success/Error**: Statusfarben

### Typografie

Unter **Theme settings > Typography**:

- **Heading Font**: Überschriften-Schrift
- **Body Font**: Fließtext-Schrift
- **Base Size**: Basis-Schriftgröße (12-20px)

### Layout

Unter **Theme settings > Layout**:

- **Page Width**: Seitenbreite (1000-1600px)
- **Border Radius**: Eckenradius für Buttons und Karten

### Produkt-Einstellungen

Unter **Theme settings > Product**:

- **Default Delivery Time**: Standard-Lieferzeit
- **VAT Notice**: MwSt.-Hinweis aktivieren/Text anpassen
- **Shipping Info**: Versandinformationen für Tab

### Kontakt

Unter **Theme settings > Social & Contact**:

- **Phone**: Telefonnummer (wird in Header, Footer, Kontakt-CTAs angezeigt)
- **Email**: E-Mail-Adresse

## Dateistruktur

```
uk-shopify-theme/
├── assets/
│   ├── base.css                 # CSS-Variablen, Reset, Utilities
│   ├── component-*.css          # Komponenten-Styles
│   ├── section-*.css            # Section-Styles
│   ├── global.js                # Globales JavaScript
│   ├── qty-stepper.js           # Mengen-Stepper
│   └── product-form.js          # Add-to-cart AJAX
├── config/
│   ├── settings_schema.json     # Theme-Settings Schema
│   └── settings_data.json       # Default-Werte
├── layout/
│   └── theme.liquid             # Haupt-Layout
├── locales/
│   └── de.default.json          # Deutsche Übersetzungen
├── sections/
│   ├── announcement-bar.liquid  # Announcement Bar
│   ├── header.liquid            # Header mit Navigation
│   ├── footer.liquid            # Footer
│   ├── hero.liquid              # Hero Section
│   ├── category-overview.liquid # Kategorie-Kacheln
│   ├── featured-collection.liquid # Featured Produkte
│   ├── main-product.liquid      # Produktseite
│   ├── main-collection.liquid   # Collection-Grid
│   ├── main-cart.liquid         # Warenkorb
│   └── ...
├── snippets/
│   ├── product-card.liquid      # Produktkarte
│   ├── qty-stepper.liquid       # Mengen-Stepper
│   ├── price-display.liquid     # Preisanzeige
│   ├── stock-badge.liquid       # Lagerstatus
│   ├── tier-prices.liquid       # Staffelpreise
│   └── icon-*.liquid            # SVG Icons
└── templates/
    ├── index.json               # Startseite
    ├── collection.json          # Collection
    ├── product.json             # Produkt
    ├── cart.json                # Warenkorb
    ├── page.json                # Standard-Seite
    ├── page.contact.json        # Kontakt-Seite
    └── page.faq.json            # FAQ-Seite
```

## Anpassungen

### Eigene Sections hinzufügen

1. Erstelle eine neue `.liquid` Datei in `/sections/`
2. Füge ein `{% schema %}` Block am Ende hinzu
3. Die Section ist dann im Theme Editor verfügbar

### Styles anpassen

CSS-Variablen sind in `:root` definiert und können über Theme Settings angepasst werden:

```css
:root {
  --color-primary: {{ settings.color_primary }};
  --spacing-md: 16px;
  --radius-md: 8px;
}
```

## Support

Bei Fragen oder Problemen:

- E-Mail: info@example.com
- Telefon: +49 123 456789

## Lizenz

Dieses Theme ist urheberrechtlich geschützt. Nutzung nur mit gültiger Lizenz.
