/**
 * Cart Drawer
 * Sidebar cart with AJAX-driven content updates.
 */

class CartDrawer {
  constructor() {
    this.root = document.querySelector('[data-cart-drawer]');
    if (!this.root) return;

    this.panel = this.root.querySelector('.cart-drawer__panel');
    this.content = this.root.querySelector('[data-cart-drawer-content]');
    this.closeButtons = this.root.querySelectorAll('[data-cart-drawer-close]');
    this.isOpen = false;
    this.lastFocusedElement = null;
    this.cart = null;

    this.strings = {
      title: this.root.dataset.drawerTitle || 'Warenkorb',
      empty: this.root.dataset.drawerEmpty || 'Ihr Warenkorb ist leer',
      remove: this.root.dataset.drawerRemove || 'Entfernen',
      subtotal: this.root.dataset.drawerSubtotal || 'Zwischensumme',
      taxes: this.root.dataset.drawerTaxes || '',
      checkout: this.root.dataset.drawerCheckout || 'Zur Kasse',
      viewCart: this.root.dataset.drawerViewCart || 'Warenkorb ansehen',
      clear: this.root.dataset.drawerClear || 'Warenkorb leeren',
      clearConfirm: this.root.dataset.drawerClearConfirm || '',
      quantity: this.root.dataset.drawerQuantity || 'Menge',
      total: this.root.dataset.drawerTotal || 'Gesamt'
    };

    this.bindEvents();
  }

  bindEvents() {
    this.closeButtons.forEach((button) => {
      button.addEventListener('click', () => this.close());
    });

    document.addEventListener('keydown', (event) => {
      if (!this.isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        this.close();
        return;
      }

      if (event.key === 'Tab') {
        this.maintainFocus(event);
      }
    });

    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('.header__cart-btn, .header__cart-icon-mobile');
      if (!trigger) return;
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      this.open();
    });

    document.addEventListener('cart:item-added', () => {
      this.open();
    });

    document.addEventListener('cart:updated', (event) => {
      const cart = event.detail?.cart;
      if (!cart) return;

      this.cart = cart;
      this.updateCartCount(cart.item_count);
      if (this.isOpen) {
        this.renderCart(cart);
      }
    });
  }

  async open() {
    this.lastFocusedElement = document.activeElement;

    this.root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-cart-drawer-open');
    this.isOpen = true;

    try {
      const cart = await this.fetchCart();
      this.cart = cart;
      this.renderCart(cart);
      this.updateCartCount(cart.item_count);
    } catch (error) {
      console.error('Failed to load cart drawer:', error);
    }

    window.requestAnimationFrame(() => {
      this.panel?.focus();
      this.focusFirstElement();
    });
  }

  close() {
    this.root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-cart-drawer-open');
    this.isOpen = false;

    if (this.lastFocusedElement instanceof HTMLElement) {
      this.lastFocusedElement.focus();
    }
  }

  async fetchCart() {
    const response = await fetch(`${window.routes.cart_url}.js`);
    if (!response.ok) {
      throw new Error('Cart fetch failed');
    }
    return response.json();
  }

  renderCart(cart) {
    if (!this.content) return;

    if (!cart.items || cart.items.length === 0) {
      this.content.innerHTML = `
        <div class="cart-drawer__empty">
          <p>${this.escapeHtml(this.strings.empty)}</p>
          <a href="${window.routes.cart_url}" class="btn btn--secondary btn--full">
            ${this.escapeHtml(this.strings.viewCart)}
          </a>
        </div>
      `;
      return;
    }

    const itemsMarkup = cart.items.map((item) => this.renderItem(item)).join('');
    const subtotal = this.formatMoney(cart.total_price);

    this.content.innerHTML = `
      <div class="cart-drawer__items">
        ${itemsMarkup}
      </div>
      <div class="cart-drawer__summary">
        <div class="cart-drawer__summary-row">
          <span>${this.escapeHtml(this.strings.subtotal)}</span>
          <span>${subtotal}</span>
        </div>
        <p class="cart-drawer__summary-info">${this.escapeHtml(this.strings.taxes)}</p>
        <div class="cart-drawer__summary-actions">
          <button
            type="button"
            class="btn btn--secondary btn--full cart-drawer__clear"
            data-cart-clear
            data-confirm="${this.escapeHtml(this.strings.clearConfirm)}"
          >
            ${this.escapeHtml(this.strings.clear)}
          </button>
          <a href="${window.routes.cart_url}" class="btn btn--secondary btn--full">
            ${this.escapeHtml(this.strings.viewCart)}
          </a>
          <a href="/checkout" class="btn btn--primary btn--full btn--lg">
            ${this.escapeHtml(this.strings.checkout)}
          </a>
        </div>
      </div>
    `;
  }

  renderItem(item) {
    const imageUrl = item.image || '';
    const itemUrl = item.url || window.routes.cart_url;
    const isLockedSurcharge = String(item.sku || '').toUpperCase() === 'SURCHARGE_LONG_RAIL';
    const comparePrice = item.original_line_price > item.final_line_price
      ? `<span class="cart-drawer__item-compare">${this.formatMoney(item.original_line_price)}</span>`
      : '';
    const variantTitle = item.variant_title && item.variant_title !== 'Default Title'
      ? `<p class="cart-drawer__item-variant">${this.escapeHtml(item.variant_title)}</p>`
      : '';

    const qtyControl = isLockedSurcharge
      ? `<span class="cart-item__qty-static">${Number(item.quantity) || 1}</span>`
      : `<qty-stepper class="qty-stepper qty-stepper--sm" data-qty-stepper>
              <input
                type="number"
                class="qty-stepper__input"
                value="${Number(item.quantity) || 1}"
                min="1"
                max="99"
                step="1"
                inputmode="numeric"
                pattern="[0-9]*"
                aria-label="${this.escapeAttribute(this.strings.quantity)}"
                data-qty-value
              >
              <div class="qty-stepper__buttons">
                <button type="button" class="qty-stepper__btn qty-stepper__btn--increase" data-qty-increase aria-label="Plus">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                </button>
                <button type="button" class="qty-stepper__btn qty-stepper__btn--decrease" data-qty-decrease aria-label="Minus">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                </button>
              </div>
            </qty-stepper>`;

    const removeControl = isLockedSurcharge
      ? `<p class="cart-item__lock-note">Automatisch hinzugefügt</p>`
      : `<button type="button" class="cart-drawer__item-remove" data-cart-remove="${this.escapeAttribute(item.key)}">
            ${this.escapeHtml(this.strings.remove)}
          </button>`;

    return `
      <article class="cart-drawer__item" data-cart-item data-key="${this.escapeHtml(item.key)}"${isLockedSurcharge ? ' data-cart-locked="true"' : ''}>
        <a href="${this.escapeAttribute(itemUrl)}" class="cart-drawer__item-image">
          ${imageUrl ? `<img src="${this.escapeAttribute(imageUrl)}" alt="${this.escapeAttribute(item.product_title)}" loading="lazy" width="72" height="72">` : ''}
        </a>
        <div class="cart-drawer__item-content">
          <a href="${this.escapeAttribute(itemUrl)}" class="cart-drawer__item-title">${this.escapeHtml(item.product_title)}</a>
          ${variantTitle}
          <div class="cart-drawer__item-actions">
            ${qtyControl}
            <div class="cart-drawer__item-prices">
              ${comparePrice}
              <span class="cart-drawer__item-total">${this.formatMoney(item.final_line_price)}</span>
            </div>
          </div>
          ${removeControl}
        </div>
      </article>
    `;
  }

  updateCartCount(count) {
    document.querySelectorAll('[data-cart-count]').forEach((element) => {
      element.textContent = count;
    });
  }

  maintainFocus(event) {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    const focusables = Array.from(this.panel.querySelectorAll(focusableSelectors.join(',')));
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  focusFirstElement() {
    const firstFocusable = this.panel.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable instanceof HTMLElement) {
      firstFocusable.focus();
    }
  }

  formatMoney(cents) {
    const amount = Number(cents || 0) / 100;
    const currency = window.Shopify?.currency?.active || 'EUR';
    const locale = document.documentElement.lang || 'de-DE';

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
      }).format(amount);
    } catch (error) {
      return `${amount.toFixed(2)} ${currency}`;
    }
  }

  escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  escapeAttribute(value) {
    return this.escapeHtml(value);
  }
}

window.themeCartDrawer = new CartDrawer();
