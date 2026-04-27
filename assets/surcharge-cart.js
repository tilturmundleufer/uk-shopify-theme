/**
 * Shopify Cart — Übergrößenzuschlag Automatik
 * ============================================
 * Fügt automatisch ein verstecktes Zuschlag-Produkt hinzu oder entfernt es,
 * wenn uk_schiene360 oder uk_schiene240 im Warenkorb ist.
 *
 * SETUP-ANLEITUNG:
 * ─────────────────
 * 1. VERSANDSTAFFELN (Shopify Admin → Settings → Shipping and delivery)
 *    Erstelle 2 Versandprofile mit je 8 Gewichtsstufen (in Gramm):
 *
 *    ── Profil A: "Speditionslieferung inkl. telefonischer Avisierung" ──
 *    0g      – 100.000g  → €29.90
 *    100.001 – 200.000g  → €55.90
 *    200.001 – 300.000g  → €79.90
 *    300.001 – 500.000g  → €99.90
 *    500.001 – 750.000g  → €129.90
 *    750.001 – 1.000.000g → €169.90
 *    1.000.001 – 2.500.000g → €199.90
 *    2.500.001g+         → €269.90
 *
 *    ── Profil B: "Neutrale Speditionslieferung" ──
 *    0g      – 100.000g  → €44.90
 *    100.001 – 200.000g  → €73.90
 *    200.001 – 300.000g  → €99.90
 *    300.001 – 500.000g  → €124.90
 *    500.001 – 750.000g  → €159.90
 *    750.001 – 1.000.000g → €204.90
 *    1.000.001 – 2.500.000g → €236.90
 *    2.500.001g+         → €309.90
 *
 *    ── Abholoptionen (kostenlos) ──
 *    "Selbstabholung in 22926 Ahrensburg" → €0.00
 *    "Selbstabholung in 31275 Lehrte"     → €0.00
 *
 * 2. ZUSCHLAG-PRODUKT ERSTELLEN
 *    Shopify Admin → Products → Add product
 *    - Title: "Übergrößenzuschlag Schiene"
 *    - Price: €50.00
 *    - SKU: SURCHARGE_LONG_RAIL  ← wichtig, muss exakt so sein
 *    - Weight: 0g
 *    - Track quantity: OFF
 *    - Taxable: je nach deiner Konfiguration
 *    - Status: ACTIVE (muss aktiv sein, aber versteckt im Shop)
 *    - Sales channels: nur "Online Store" DEAKTIVIEREN → nur über Cart API erreichbar
 *    → Nach dem Speichern: Variant ID aus der URL kopieren
 *      z.B. /variants/1234567890  → Zahl unten eintragen
 *
 * 3. SNIPPET EINBINDEN
 *    Shopify Admin → Online Store → Themes → Edit code
 *    → theme.liquid: diesen Script-Tag vor </body> einfügen:
 *    <script src="{{ 'surcharge-cart.js' | asset_url }}" defer></script>
 *    → Datei in Assets hochladen als: surcharge-cart.js
 */

(function () {
    'use strict';
  
    // ─── KONFIGURATION ───────────────────────────────────────────────────────────
  
    /** Shopify Variant ID des Zuschlag-Produkts (Zahl aus der URL) */
    const SURCHARGE_VARIANT_ID = 581af3c14c2d917fdcca8fce77e7d919; // ← HIER DEINE VARIANT ID EINTRAGEN
  
    /** SKU des Zuschlag-Produkts — zur Erkennung im Cart */
    const SURCHARGE_SKU = 'SURCHARGE_LONG_RAIL';
  
    /** Zuschlagspreis in Cent (nur zur Anzeige in Logs) */
    const SURCHARGE_PRICE_CENTS = 5000; // €50.00
  
    /** SKU-Fragmente, die den Zuschlag auslösen (case-insensitive) */
    const TRIGGER_SKU_FRAGMENTS = ['uk_schiene360', 'uk_schiene240'];
  
    // ─── HILFSFUNKTIONEN ─────────────────────────────────────────────────────────
  
    /** Gibt true zurück wenn der Cart Trigger-SKUs enthält */
    function cartHasLongRails(cart) {
      return cart.items.some(function (item) {
        const sku = String(item.sku || '').toLowerCase();
        return TRIGGER_SKU_FRAGMENTS.some(function (fragment) {
          return sku.includes(fragment.toLowerCase());
        });
      });
    }
  
    /** Gibt die Cart-Zeile des Zuschlags zurück (oder null) */
    function getSurchargeLineItem(cart) {
      return cart.items.find(function (item) {
        const sku = String(item.sku || '').toLowerCase();
        return sku === SURCHARGE_SKU.toLowerCase();
      }) || null;
    }
  
    /** Fetcht den aktuellen Cart */
    function fetchCart() {
      return fetch('/cart.js', { headers: { 'Content-Type': 'application/json' } })
        .then(function (r) { return r.json(); });
    }
  
    /** Fügt den Zuschlag zum Cart hinzu */
    function addSurcharge() {
      console.log('[Surcharge] Füge Übergrößenzuschlag hinzu (+€50.00)');
      return fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            id: SURCHARGE_VARIANT_ID,
            quantity: 1
          }]
        })
      }).then(function (r) { return r.json(); });
    }
  
    /** Entfernt den Zuschlag aus dem Cart */
    function removeSurcharge(lineItemKey) {
      console.log('[Surcharge] Entferne Übergrößenzuschlag');
      return fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lineItemKey,
          quantity: 0
        })
      }).then(function (r) { return r.json(); });
    }
  
    // ─── KERNLOGIK ───────────────────────────────────────────────────────────────
  
    /**
     * Prüft den Cart und synchronisiert den Zuschlag.
     * Wird nach jeder Cart-Änderung aufgerufen.
     */
    function syncSurcharge() {
      return fetchCart().then(function (cart) {
        const hasLongRails = cartHasLongRails(cart);
        const surchargeItem = getSurchargeLineItem(cart);
  
        if (hasLongRails && !surchargeItem) {
          // Schienen im Cart, kein Zuschlag → hinzufügen
          return addSurcharge().then(function () {
            // Cart-Update-Event feuern damit Theme-UI sich aktualisiert
            document.dispatchEvent(new CustomEvent('cart:updated'));
          });
        } else if (!hasLongRails && surchargeItem) {
          // Keine Schienen mehr, Zuschlag noch da → entfernen
          return removeSurcharge(surchargeItem.key).then(function () {
            document.dispatchEvent(new CustomEvent('cart:updated'));
          });
        }
        // Sonst: alles korrekt, nichts tun
      }).catch(function (err) {
        console.error('[Surcharge] Fehler bei Cart-Sync:', err);
      });
    }
  
    // ─── EVENT LISTENERS ─────────────────────────────────────────────────────────
  
    /**
     * Shopify AJAX Cart Events abfangen.
     * Funktioniert mit den meisten Themes (Dawn, Debut, etc.)
     */
  
    // Native Shopify fetch/XMLHttpRequest Interceptor für Cart-Endpunkte
    var originalFetch = window.fetch;
    window.fetch = function (url) {
      var result = originalFetch.apply(this, arguments);
      var urlStr = String(url || '');
  
      if (
        urlStr.includes('/cart/add') ||
        urlStr.includes('/cart/change') ||
        urlStr.includes('/cart/update') ||
        urlStr.includes('/cart/clear')
      ) {
        result.then(function (response) {
          // Clone damit der Original-Response nicht verbraucht wird
          if (response.ok) {
            // Kurze Verzögerung damit Shopify den Cart intern aktualisiert hat
            setTimeout(syncSurcharge, 300);
          }
          return response;
        });
      }
  
      return result;
    };
  
    // Zusätzlich: Custom Events die manche Themes feuern
    document.addEventListener('cart:updated', function (e) {
      // Verhindert Endlosschleife: nur reagieren wenn Event nicht von uns kommt
      if (e.detail && e.detail.source === 'surcharge') return;
      setTimeout(syncSurcharge, 100);
    });
  
    document.addEventListener('cart:item-added', function () {
      setTimeout(syncSurcharge, 300);
    });
  
    document.addEventListener('cart:item-removed', function () {
      setTimeout(syncSurcharge, 300);
    });
  
    // Initialer Sync beim Seitenload (z.B. nach Browser-Back)
    document.addEventListener('DOMContentLoaded', function () {
      syncSurcharge();
    });
  
    // ─── OPTIONAL: AJAX XMLHttpRequest INTERCEPTOR ───────────────────────────────
    // Für ältere Themes die XHR statt fetch verwenden
  
    var OriginalXHR = window.XMLHttpRequest;
    function PatchedXHR() {
      var xhr = new OriginalXHR();
      var originalOpen = xhr.open.bind(xhr);
      var capturedUrl = '';
  
      xhr.open = function (method, url) {
        capturedUrl = String(url || '');
        return originalOpen.apply(this, arguments);
      };
  
      xhr.addEventListener('load', function () {
        if (
          capturedUrl.includes('/cart/add') ||
          capturedUrl.includes('/cart/change') ||
          capturedUrl.includes('/cart/update')
        ) {
          setTimeout(syncSurcharge, 300);
        }
      });
  
      return xhr;
    }
    PatchedXHR.prototype = OriginalXHR.prototype;
    window.XMLHttpRequest = PatchedXHR;
  
  })();