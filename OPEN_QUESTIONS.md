# Open Questions

## Commerce / Datenmodell
- Wie sollen Staffelpreise in Shopify fachlich geführt werden?
  - nur als Anzeige via Metafield
  - oder zusätzlich echte Preislogik via B2B-/Functions-/App-Mechanik
- Sollen Paletten-/Bundle-Produkte als eigenständige Produkte bestehen bleiben oder aus Bundles abgeleitet werden?
- Soll die `0% MwSt.`-Kommunikation global gelten oder produkt-/kundengruppenspezifisch steuerbar sein?

## Konfigurator
- Soll der Konfigurator in Phase 1 nur visuell verlinkt werden oder bereits funktional neu gebaut werden?
- Falls funktional: bevorzugter Zielansatz?
  - App / Embedded App
  - Produktkonfigurator im Theme
  - Bundle-/Line-item-properties-Ansatz
- Müssen Konfigurator-Daten im Shopify-Admin dauerhaft rekonstruierbar gespeichert werden?

## Kundenkonto / Portal
- Soll `/sign-up` künftig auf Shopify Customer Accounts abgebildet werden?
- Wird Social Login benötigt oder war dieser nur Teil der bisherigen Memberstack-Lösung?
- Gibt es echte portal-spezifische Funktionen jenseits von Registrierung/Login?

## Navigation / Content-Struktur
- Soll die Seite `/produkte` als echte redaktionelle Landingpage bestehen bleiben oder durch `collections/all` ersetzt werden?
- Sollen rechtliche Seiten weiterhin denselben großen Footer-/Marketing-Unterbau behalten oder im Shopify-Ziel schlanker ausfallen?

## Visuelle Assets
- Werden Original-Brand-Assets, Logos, Video-Dateien und Bildmaterial aus Webflow separat in Shopify bereitgestellt?
- Gibt es eine verbindliche Font-Vorgabe oder soll das Theme auf Shopify-Fonts mit ähnlicher Anmutung zurückfallen?

## Tracking / Compliance
- Welche Tracking-Tools sollen nach der Migration wirklich übernommen werden?
  - GA4
  - GTM
  - Hotjar
  - Meta Pixel
- Soll Cookie-Consent über Shopify/App oder über bestehende Drittlogik laufen?

## Preview / QA-Blocker
- Für echten visuellen Shopify-Preview fehlt in dieser Umgebung aktuell die Shopify-CLI.
- Es liegt keine aktive Store-/Theme-Dev-Session vor, gegen die automatisiert visuell getestet werden kann.
- Nächster Schritt für echte Preview-QA:
  - Shopify CLI installieren oder verfügbar machen
  - Theme mit Store verbinden
  - Preview-URL oder lokale Theme-Dev-Session gegen die Live-Site vergleichen

## Technische Qualität
- Soll Cart mittelfristig als Drawer statt als Seite unterstützt werden?
- Soll Predictive Search aktiv produktiv genutzt werden oder vorerst deaktiviert bleiben?

## Aktuelle Annahmen
- Shopify bleibt Quelle für alle Commerce-Daten.
- Die bestehende Repo-Struktur wird erweitert, nicht ersetzt.
- Nicht nativ abbildbare Quelllogik wird zuerst dokumentiert und visuell abgefedert.
