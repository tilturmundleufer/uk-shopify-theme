/**
 * Product Form Component
 * Handles AJAX add to cart functionality
 */

class ProductForm extends HTMLElement {
  constructor() {
    super();
    this.form = this.querySelector('form');
    this.submitButton = this.querySelector('[data-add-to-cart]');
    this.errorMessage = this.closest('.product-card')?.querySelector('[data-card-message]');
    
    if (!this.form) return;
    
    this.form.addEventListener('submit', this.onSubmit.bind(this));
  }
  
  async onSubmit(event) {
    event.preventDefault();
    
    if (this.submitButton.disabled) return;
    
    this.setLoading(true);
    this.hideMessage();
    
    const formData = new FormData(this.form);
    
    // Get quantity from qty-stepper if present
    const qtyStepper = this.closest('.product-card, .product-form')?.querySelector('qty-stepper');
    if (qtyStepper) {
      const qtyInput = qtyStepper.querySelector('[data-qty-value]');
      if (qtyInput) {
        formData.set('quantity', qtyInput.value);
      }
    }
    
    try {
      const response = await fetch(window.routes.cart_add_url, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        this.onSuccess(data);
      } else {
        this.onError(data.description || window.cartStrings.error);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      this.onError(window.cartStrings.error);
    } finally {
      this.setLoading(false);
    }
  }
  
  onSuccess(data) {
    this.showMessage(window.cartStrings.addedToCart, 'success');
    this.updateCartCount();
    
    // Dispatch custom event for other components to listen
    document.dispatchEvent(new CustomEvent('cart:item-added', {
      detail: { item: data }
    }));
  }
  
  onError(message) {
    this.showMessage(message, 'error');
  }
  
  setLoading(isLoading) {
    this.submitButton.classList.toggle('is-loading', isLoading);
    this.submitButton.disabled = isLoading;
  }
  
  showMessage(text, type) {
    if (this.errorMessage) {
      this.errorMessage.textContent = text;
      this.errorMessage.classList.add('is-visible');
      this.errorMessage.classList.toggle('product-card__message--error', type === 'error');
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        this.hideMessage();
      }, 3000);
    }
  }
  
  hideMessage() {
    if (this.errorMessage) {
      this.errorMessage.classList.remove('is-visible');
    }
  }
  
  async updateCartCount() {
    try {
      const response = await fetch(window.routes.cart_url + '.js');
      const cart = await response.json();
      
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach(el => {
        el.textContent = cart.item_count;
      });
    } catch (error) {
      console.error('Failed to update cart count:', error);
    }
  }
}

// Register custom element
if (!customElements.get('product-form')) {
  customElements.define('product-form', ProductForm);
}

/**
 * Cart Item Remove Handler
 */
document.addEventListener('click', async function(event) {
  const removeButton = event.target.closest('[data-cart-remove]');
  if (!removeButton) return;
  
  event.preventDefault();
  
  const key = removeButton.dataset.cartRemove;
  const cartItem = removeButton.closest('[data-cart-item]');
  
  try {
    const response = await fetch(window.routes.cart_change_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: key,
        quantity: 0
      })
    });
    
    if (response.ok) {
      // Reload page to reflect changes
      window.location.reload();
    }
  } catch (error) {
    console.error('Failed to remove item:', error);
  }
});
