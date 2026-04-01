# Shopify Mapping: Webflow -> Theme Architecture

## Mapping-Regeln
- Sichtbares Webflow-UI wird in Shopify in wiederverwendbare Sections und Snippets zerlegt.
- Shopify-Datenobjekte ersetzen skriptisch injizierte Commerce-Daten.
- Reine Content-Flächen werden editorfreundlich modelliert.
- Externe Speziallogik wird separat markiert.

## Seitentypen-Mapping
| Quellseitentyp | Quellpfade | Shopify-Ziel | Theme-Bausteine | Datenquelle |
| --- | --- | --- | --- | --- |
| Startseite | `/` | `templates/index.json` | `hero`, `category-overview`, `featured-collection`, `usp-service`, `partner-logos`, `contact-cta` | Theme settings, collections, section blocks |
| Produktübersicht | `/produkte` | optional `page.products.json` oder `collection.all` | Intro-Section + Collection-Layer | Collection `all`, Page content |
| Kategorie | `/kategorie/*`, `/unterkonstruktion/schraegdach` | `templates/collection.json` | `main-collection`, optionale Intro-/CTA-Section | Shopify collections, collection descriptions, metafields |
| Produktdetail | `/produkt/*` | `templates/product.json` | `main-product`, `contact-cta` | Product, variants, metafields |
| Warenkorb | sichtbares Foxycart-Cart | `templates/cart.json` | `main-cart` | Shopify cart |
| Kontakt | `/kontakt` | `templates/page.contact.json` | `main-page`, `contact-form`, optional trust/contact CTA | Page content, theme settings |
| FAQ | `/haufig-gestelte-fragen` | `templates/page.faq.json` | `main-page`, `faq`, optional CTA | Page content, blocks oder metaobjects |
| Über uns | `/uber-uns` | neues `page.about.json` | `main-page`, optional media/text/trust-sections | Page content, section settings |
| Rechtstexte | `/agb`, `/datenschutz`, `/impressum`, `/wiederrufsrecht` | neues `page.legal.json` oder `page.json` | `main-page` | Shopify pages |
| Kundenportal | `/sign-up` | Shopify customer accounts oder extern | außerhalb Kern-Theme, nur visuelle Integration | Shopify customer accounts / App |
| Konfigurator | `/konfigurator` | separates Shopify-Konzept | eigenständiger Workstream | App / properties / functions |

## Komponenten-Mapping
### Global
| Quellkomponente | Shopify-Ziel |
| --- | --- |
| Promo-Leiste / Trust-Leiste | `announcement-bar` oder neue Trust-Bar-Section |
| Kontakt-/Info-Leiste | `header`-Topbar oder eigener Announcement-/Topbar-Bereich |
| Hauptnavigation | `header` mit Menu-Settings |
| Footer mit Kategorien/Navigation/Recht | `footer` mit Menü-Blocks und Legal-Links |

### Homepage
| Quellkomponente | Shopify-Ziel |
| --- | --- |
| Hero mit Doppel-CTA | `sections/hero.liquid` |
| Konfigurator-Teaser | Hero-CTA-Box oder eigene `configurator-cta`-Section |
| Kategorienraster | `sections/category-overview.liquid` |
| Produktreihen je Kategorie | `sections/featured-collection.liquid` mit Tabs oder Collection-Blöcken |
| USP-/Service-Bereich | `sections/usp-service.liquid` |
| Partnerlogos | `sections/partner-logos.liquid` |
| Kontaktteaser | `sections/contact-cta.liquid` |

### Collection / Listing
| Quellkomponente | Shopify-Ziel |
| --- | --- |
| Kategorie-Intro | `collection.title`, `collection.description`, optionale Hero-/Intro-Section |
| Kontakt-Sidebar | in `main-collection` oder separates Sidebar-Snippet |
| Produktgrid | `main-collection` + `product-card` |
| Sortierung | native Shopify `collection.sort_options` |
| Pagination | native Shopify `paginate` |

### Product Detail
| Quellkomponente | Shopify-Ziel |
| --- | --- |
| Mediengalerie | `main-product` |
| Titel / Unterzeile | `product.title`, `custom.short_subtitle` |
| Preis / Compare-at | `variant.price`, `variant.compare_at_price` |
| Staffelpreise | `custom.tier_prices` |
| Lieferzeit | `custom.delivery_time` |
| Bestandsstatus | `variant.available`, optional inventory policy |
| VAT-Hinweis | Theme setting + ggf. product/metafield override |
| Zahlungsarten | Shopify enabled payment types / Theme block |
| Beschreibung / Versand / Downloads | `product.description`, theme setting shipping info, `custom.downloads` |

### Content-Seiten
| Quellkomponente | Shopify-Ziel |
| --- | --- |
| Rich Text Content | `main-page` |
| Kontaktformular | `contact-form` |
| FAQ-Akkordeon | `faq` |
| Video-/Media-Blocks | neue wiederverwendbare Media-Section bei Bedarf |

## Datenmodell-Mapping
### Produkte
- `title` -> Produktname
- `description` -> Langtext / Produktbeschreibung
- `media` -> Produktbilder
- `variants` -> Ausprägungen, falls vorhanden
- `price`, `compare_at_price` -> Preisblöcke
- `available` / inventory -> Lagerstatus

### Produkt-Metafields
| Namespace.Key | Typ | Zweck |
| --- | --- | --- |
| `custom.short_subtitle` | single line text | Kurzbeschreibung unter Titel |
| `custom.delivery_time` | single line text | Lieferzeitblock |
| `custom.tier_prices` | json | Staffelpreise |
| `custom.downloads` | json | Download-Links |
| `custom.unit_price` | single line text oder money/measure-Konzept | Anzeige `/ Stück`-Kontext |
| `custom.specifications` | rich text oder json | technische Daten bei Bedarf |

### Collections
- jede sichtbare Hauptkategorie als Shopify Collection
- `collection.description` für Introtexte
- optional Collection-Metafields für:
  - Hero-Subline
  - CTA-Text
  - Sidebar-Bild

### Metaobjects
Empfehlenswert für zentral pflegbare Content-Sets:
- FAQ-Einträge
- Partnerlogos
- USP-/Service-Kacheln
- Kontakt-/Trust-Bausteine

## Externe Logik -> Shopify-Neuaufbau
### Foxycart / Cartgenie
- Ziel: vollständiger Ersatz durch Shopify Cart + Checkout
- Theme-Effekt:
  - AJAX add-to-cart
  - Cart page oder optional Drawer
  - native Warenkorb-Updates

### Webflow CMS Search
- Ziel: Shopify Search / Predictive Search
- Theme-Effekt:
  - `routes.search_url`
  - optional eigenes `search.json`-Template

### Memberstack / Kundenportal
- Ziel: Entscheidung nötig
  - Shopify New Customer Accounts
  - Shopify Classic Accounts
  - externe Portal-Lösung weiterführen

### Konfigurator
- Ziel: separates Konzept
- mögliche Shopify-Modelle:
  - zusammengesetztes Bundle-Produkt
  - Konfigurations-App
  - Draft-order-/line-item-properties-Ansatz

## Bewusste Architekturentscheidungen
- Keine rohen Webflow-HTML-Exporte in Liquid.
- Keine monolithische Homepage-Section.
- Inline-CSS/JS aus Hauptsections schrittweise in Assets überführen.
- Rechtstextseiten bleiben schlank und content-getrieben.
