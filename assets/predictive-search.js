/**
 * Predictive Search
 * Live dropdown with Shopify's suggest API, keyboard navigable.
 */

class PredictiveSearch {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.input = wrapper.querySelector('[data-search-input]');
    this.results = wrapper.querySelector('[data-search-results]');

    if (!this.input || !this.results) return;

    this.query = '';
    this.selectedIndex = -1;
    this.abortController = null;
    this._debounceTimer = null;

    this.input.addEventListener('input', () => this._debounce(() => this.onInput(), 260));
    this.input.addEventListener('keydown', (e) => this.onKeydown(e));
    this.input.addEventListener('focus', () => this.onFocus());
    document.addEventListener('click', (e) => {
      if (!this.wrapper.contains(e.target)) this.close();
    });
  }

  _debounce(fn, ms) {
    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(fn, ms);
  }

  onFocus() {
    if (this.query.length >= 2 && !this.results.hidden) this.open();
  }

  async onInput() {
    const query = this.input.value.trim();
    if (query === this.query) return;
    this.query = query;

    if (query.length < 2) {
      this.close();
      return;
    }

    await this.fetch(query);
  }

  async fetch(query) {
    if (this.abortController) this.abortController.abort();
    this.abortController = new AbortController();

    this.wrapper.classList.add('search-is-loading');

    try {
      const url = `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`;
      const res = await window.fetch(url, { signal: this.abortController.signal });
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      this.render(data?.resources?.results?.products || [], query);
    } catch (err) {
      if (err.name !== 'AbortError') this.close();
    } finally {
      this.wrapper.classList.remove('search-is-loading');
    }
  }

  render(products, query) {
    this.selectedIndex = -1;

    if (!products.length) {
      this.results.innerHTML = `<p class="search-results__empty">Keine Produkte für „${this.esc(query)}" gefunden.</p>`;
      this.open();
      return;
    }

    const searchUrl = `/search?type=product&q=${encodeURIComponent(query)}`;

    const items = products.map((p) => {
      const imgUrl = p.featured_image?.url
        ? p.featured_image.url + (p.featured_image.url.includes('?') ? '&' : '?') + 'width=80'
        : null;
      const price = this.money(Number(p.price));
      const compareAtPrice = Number(p.compare_at_price_max);
      const hasDiscount = compareAtPrice > 0 && compareAtPrice > Number(p.price);
      const comparePriceHtml = hasDiscount
        ? `<s class="search-result__compare">${this.money(compareAtPrice)}</s>`
        : '';

      return `<a class="search-result" data-search-item href="${this.escAttr(p.url)}">
        <div class="search-result__img">
          ${imgUrl ? `<img src="${this.escAttr(imgUrl)}" alt="" width="40" height="40" loading="lazy">` : ''}
        </div>
        <span class="search-result__title">${this.esc(p.title)}</span>
        <span class="search-result__price">${comparePriceHtml}<strong>${price}</strong></span>
      </a>`;
    }).join('');

    this.results.innerHTML = `
      <div class="search-results__list">${items}</div>
      <a href="${searchUrl}" class="search-results__footer">
        Alle Ergebnisse für „${this.esc(query)}"
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>`;

    this.open();
  }

  onKeydown(e) {
    const items = Array.from(this.results.querySelectorAll('[data-search-item]'));
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
    } else if (e.key === 'Enter' && this.selectedIndex >= 0) {
      e.preventDefault();
      const link = items[this.selectedIndex];
      if (link) window.location.href = link.href;
      return;
    } else if (e.key === 'Escape') {
      this.close();
      this.input.blur();
      return;
    } else {
      return;
    }

    items.forEach((el, i) => el.classList.toggle('is-selected', i === this.selectedIndex));
    if (this.selectedIndex >= 0) items[this.selectedIndex].scrollIntoView({ block: 'nearest' });
  }

  open() {
    this.results.hidden = false;
    this.wrapper.classList.add('search-is-open');
  }

  close() {
    this.results.hidden = true;
    this.wrapper.classList.remove('search-is-open');
    this.selectedIndex = -1;
  }

  money(price) {
    // Suggest API returns prices already in currency units (e.g. "12.34"), not cents
    const amount = Number(price || 0);
    const currency = window.Shopify?.currency?.active || 'EUR';
    const locale = document.documentElement.lang || 'de-DE';
    try {
      return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
    } catch {
      return `${amount.toFixed(2)} ${currency}`;
    }
  }

  esc(v) {
    return String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
  }

  escAttr(v) {
    return String(v ?? '').replaceAll('"', '&quot;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-search-wrapper]').forEach((el) => new PredictiveSearch(el));
});
