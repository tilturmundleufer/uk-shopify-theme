/**
 * Global JavaScript
 * Menu toggle, accordion, tabs, and other global functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initAccordion();
  initTabs();
  initStickyHeader();
});

/**
 * Mobile Menu
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuClose = document.querySelector('[data-menu-close]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const overlay = document.querySelector('[data-header-overlay]');
  
  if (!menuToggle || !mobileMenu) return;
  
  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    overlay?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    overlay?.classList.remove('is-active');
    document.body.style.overflow = '';
  }
  
  menuToggle.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  
  // Close on escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
  
  // Submenu toggles
  const submenuToggles = document.querySelectorAll('[data-submenu-toggle]');
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const submenu = this.nextElementSibling;
      
      this.setAttribute('aria-expanded', !isExpanded);
      submenu.hidden = isExpanded;
    });
  });
}

/**
 * Accordion
 */
function initAccordion() {
  const accordions = document.querySelectorAll('[data-accordion]');
  
  accordions.forEach(accordion => {
    const headers = accordion.querySelectorAll('[data-accordion-header]');
    
    headers.forEach(header => {
      header.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        const content = this.nextElementSibling;
        
        // Close all other items in this accordion
        headers.forEach(otherHeader => {
          if (otherHeader !== this) {
            otherHeader.setAttribute('aria-expanded', 'false');
            const otherContent = otherHeader.nextElementSibling;
            if (otherContent) {
              otherContent.setAttribute('aria-hidden', 'true');
            }
          }
        });
        
        // Toggle current item
        this.setAttribute('aria-expanded', !isExpanded);
        if (content) {
          content.setAttribute('aria-hidden', isExpanded);
        }
      });
    });
  });
}

/**
 * Tabs
 */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');
  
  tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('[data-tab-btn]');
    const tabPanels = container.querySelectorAll('[data-tab-panel]');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('aria-controls');
        
        // Deselect all tabs
        tabButtons.forEach(btn => {
          btn.setAttribute('aria-selected', 'false');
        });
        
        // Hide all panels
        tabPanels.forEach(panel => {
          panel.hidden = true;
        });
        
        // Select clicked tab
        this.setAttribute('aria-selected', 'true');
        
        // Show corresponding panel
        const targetPanel = container.querySelector(`#${targetId}`);
        if (targetPanel) {
          targetPanel.hidden = false;
        }
      });
      
      // Keyboard navigation
      button.addEventListener('keydown', function(event) {
        const tabs = Array.from(tabButtons);
        const index = tabs.indexOf(this);
        
        let newIndex;
        if (event.key === 'ArrowRight') {
          newIndex = (index + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft') {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
          newIndex = 0;
        } else if (event.key === 'End') {
          newIndex = tabs.length - 1;
        }
        
        if (newIndex !== undefined) {
          event.preventDefault();
          tabs[newIndex].click();
          tabs[newIndex].focus();
        }
      });
    });
  });
}

/**
 * Sticky Header
 */
function initStickyHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  function updateHeader() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

/**
 * Utility: Debounce
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Fetch JSON
 */
async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Export utilities for other scripts
window.themeUtils = {
  debounce,
  fetchJSON
};
