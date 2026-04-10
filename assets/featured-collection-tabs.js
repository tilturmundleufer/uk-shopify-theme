/**
 * Tab panels for featured-collection section (no page reload).
 */
(function () {
  function init(root) {
    var tablist = root.querySelector('[data-featured-tabs]');
    if (!tablist) return;

    var tabs = tablist.querySelectorAll('[data-tab-button]');
    var panels = root.querySelectorAll('[data-tab-panel]');

    function activate(targetId) {
      tabs.forEach(function (tab) {
        var isSel = tab.getAttribute('data-tab-target') === targetId;
        tab.setAttribute('aria-selected', isSel ? 'true' : 'false');
        tab.classList.toggle('category-tabs__tab--active', isSel);
      });
      panels.forEach(function (panel) {
        var match = panel.getAttribute('id') === targetId;
        if (match) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });
    }

    tablist.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-tab-button]');
      if (!btn || !tablist.contains(btn)) return;
      e.preventDefault();
      var id = btn.getAttribute('data-tab-target');
      if (id) activate(id);
    });

    tablist.addEventListener('keydown', function (e) {
      var keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (keys.indexOf(e.key) === -1) return;
      var list = Array.prototype.slice.call(tabs);
      var i = list.indexOf(document.activeElement);
      if (i === -1) return;
      e.preventDefault();
      var next = i;
      if (e.key === 'ArrowRight') next = (i + 1) % list.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + list.length) % list.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = list.length - 1;
      list[next].focus();
      var id = list[next].getAttribute('data-tab-target');
      if (id) activate(id);
    });
  }

  document.querySelectorAll('[data-featured-collection-root]').forEach(init);
})();
