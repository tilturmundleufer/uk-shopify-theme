/**
 * Quantity Stepper Component
 * Handles increment/decrement of quantity inputs
 */

class QuantityStepper extends HTMLElement {
  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    this.input = this.querySelector('[data-qty-value]');
    this.decreaseBtn = this.querySelector('[data-qty-decrease]');
    this.increaseBtn = this.querySelector('[data-qty-increase]');

    if (!this.input) return;

    this.min = parseInt(this.input.min) || 1;
    this.max = parseInt(this.input.max) || 99;

    this.bindEvents();
    this.updateButtonStates();
  }
  
  bindEvents() {
    this.decreaseBtn?.addEventListener('click', this.decrease.bind(this));
    this.increaseBtn?.addEventListener('click', this.increase.bind(this));
    this.input?.addEventListener('change', this.onChange.bind(this));
    this.input?.addEventListener('keydown', this.onKeydown.bind(this));
  }
  
  decrease() {
    const currentValue = parseInt(this.input.value) || 1;
    const newValue = Math.max(this.min, currentValue - 1);
    this.updateValue(newValue);
  }
  
  increase() {
    const currentValue = parseInt(this.input.value) || 1;
    const newValue = Math.min(this.max, currentValue + 1);
    this.updateValue(newValue);
  }
  
  onChange() {
    let value = parseInt(this.input.value) || this.min;
    value = Math.max(this.min, Math.min(this.max, value));
    this.updateValue(value);
  }
  
  onKeydown(event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.increase();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.decrease();
    }
  }
  
  updateValue(value) {
    this.input.value = value;
    this.updateButtonStates();
    this.syncWithForm();
    this.dispatchEvent(new CustomEvent('qty-change', { 
      detail: { value },
      bubbles: true 
    }));
  }
  
  updateButtonStates() {
    const value = parseInt(this.input.value) || 1;
    
    if (this.decreaseBtn) {
      this.decreaseBtn.disabled = value <= this.min;
    }
    if (this.increaseBtn) {
      this.increaseBtn.disabled = value >= this.max;
    }
  }
  
  syncWithForm() {
    // Find associated form input and sync value
    const formId = this.dataset.formId;
    if (formId) {
      const formInput = document.querySelector(`#product-form-${formId} [data-qty-input]`);
      if (formInput) {
        formInput.value = this.input.value;
      }
    }
  }
}

// Register custom element
if (!customElements.get('qty-stepper')) {
  customElements.define('qty-stepper', QuantityStepper);
}
