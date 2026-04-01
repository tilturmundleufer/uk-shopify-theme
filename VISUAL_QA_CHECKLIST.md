# Visual QA Checklist

## QA-Status 2026-04-01
- `Pass (Baseline)`: Live-Site visuell auf Startseite, Kategorie und Produktseite browserbasiert geprüft.
- `Deviation (Blocker)`: Kein echter Shopify-Preview-Lauf möglich, da in dieser Umgebung keine `shopify`-CLI verfügbar ist und keine laufende Store-/Theme-Session vorliegt.
- `Intentional Change`: Die Commerce-Logik wird nativ auf Shopify umgebaut; visuelles Verhalten wurde daran angenähert, nicht an Foxycart-/Cartgenie-Mechanik gekoppelt.

## Baseline-Referenz aus Browser-QA
### Global
- Dunkelblaue Trust-/Info-Bar mit gelb-orangen Akzenten.
- Sekundäre Linkzeile oberhalb des Hauptheaders.
- Breiter Hauptheader mit Suche, Konfigurator-CTA und Warenkorb-Button.
- Gelb-orange Kategorienavigation mit Icon-Unterstützung.
- Footer mit Kontakt, Kategorien, Navigation, Bezahlhinweisen und Rechtslinks.

### Startseite
- Große Hero-Bühne mit starkem Textkontrast, Doppel-CTA und hervorgehobener Konfigurator-Box.
- Mehrere produktorientierte Reihen mit kompakten Karten und sofortigem Add-to-Cart.
- Wiederkehrende Trust-/USP-Bereiche und CTA-Flächen.

### Collection
- Starkes Intro mit Kategorie-Headline und Support-Kontext.
- 4-spaltiges Produktgrid auf Desktop.
- Preisblöcke mit Compare-Preis und Stück-/Einheitskontext.

### Product
- Zwei-Spalten-Layout mit großer Galerie links und dichtem Commerce-Panel rechts.
- Preisblock, Lieferzeit, Lagerstatus, VAT-Hinweis, Kontaktblock und Tabs sind zentral.
- Downloads und Versandinformationen sind sichtbare Pflichtbestandteile.

## Vorgehen
- Jede Hauptseite wird gegen `unterkonstruktion.de` geprüft.
- Ergebnis je Punkt mit `Pass`, `Deviation` oder `Intentional Change` markieren.
- Jede Abweichung kurz begründen.

## Global
- Header-Höhe, Proportionen und Sticky-Verhalten entsprechen der Referenz.
- Topline/Trust-Bar ist visuell korrekt gewichtet.
- Navigation, Hover- und Dropdown-Zustände wirken konsistent.
- Suchfeld-Proportionen, Radien und Kontraste stimmen.
- Footer hat ähnliche Dichte, Gruppierung und Farbwirkung.
- Containerbreiten und Section-Abstände entsprechen der Quellseite.
- Typografische Hierarchie wirkt gleichwertig.

## Homepage
- Hero-Bühne: Headline, Subheadline, CTA-Gewichtung und Layout passen.
- Konfigurator-Teaser ist klar sichtbar und prominent genug.
- Kategorienraster entspricht der Referenz in Rhythmus und Dichte.
- Produktreihen pro Kategorie sind visuell und strukturell stimmig.
- USP-/Service-Bereich hat die richtige Hierarchie.
- Kontakt-CTA im unteren Bereich wirkt wie auf der Quellseite.

## Collection / Listing
- Introbereich stimmt in Hierarchie und Abstand.
- Sidebar-/Kontaktteaser sitzt korrekt und stört das Grid nicht.
- Produktkarten sind in Bildhöhe, Textdichte und CTA-Struktur vergleichbar.
- Verfügbarkeitsbadges und Preisblöcke wirken korrekt.
- Grid-Spaltenzahl und Responsive-Verhalten passen.
- Sortierung und Pagination sind visuell sauber integriert.

## Product Detail
- Medienbereich und Inhaltsspalte haben korrekte Gewichtung.
- Titel, Kurztext und Preisblock entsprechen der Referenz.
- Staffelpreise, Lieferzeit und VAT-Hinweis sind klar getrennt.
- Add-to-cart-/Buy-now-Buttons haben passende Größe und Hierarchie.
- Tabs / Inhaltsblöcke für Beschreibung, Versand und Downloads stimmen.
- Kontakt- und Zahlungsblöcke sind sichtbar und korrekt positioniert.

## Cart
- Layout ist klar und vertriebsorientiert.
- Produktzeilen, Preis, Menge und Zwischensumme sind gut lesbar.
- Sticky Summary wirkt glaubwürdig und nicht überladen.
- Mobile Darstellung bleibt nutzbar.

## Content-Seiten
- Kontaktseite: Intro, Formular und Direktkontakt wirken hochwertig.
- FAQ-Seite: Akkordeons, Abstände und Lesbarkeit passen.
- About- und Rechtstextseiten wirken geordnet und nicht generisch.

## Responsive
- Mobile Header / Menü / Cart-Entry funktionieren visuell sauber.
- Tablet-Breakpoints halten die visuelle Hierarchie.
- Große Desktop-Ansichten nutzen den Raum ähnlich wie die Referenz.

## States
- Hover, Fokus und Active States sind konsistent.
- Sold-out- und Sale-Zustände sind klar erkennbar.
- Formular-Errors und Success-Meldungen sind gut lesbar.
- Empty States sind gestaltet und nicht roh.
