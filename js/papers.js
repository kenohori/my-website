(function () {
  'use strict';

  function clearHighlights(root) {
    root.querySelectorAll('mark').forEach(function (mark) {
      var parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize();
    });
  }

  function highlight(root, term) {
    var t = term.toLowerCase();
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (node.parentElement && node.parentElement.closest('.bibtex')) {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.toLowerCase().indexOf(t) !== -1
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      }
    });
    var nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
    nodes.forEach(function (node) {
      var text = node.nodeValue;
      var lower = text.toLowerCase();
      var frag = document.createDocumentFragment();
      var idx = 0;
      var pos;
      while ((pos = lower.indexOf(t, idx)) !== -1) {
        if (pos > idx) {
          frag.appendChild(document.createTextNode(text.slice(idx, pos)));
        }
        var mark = document.createElement('mark');
        mark.textContent = text.slice(pos, pos + t.length);
        frag.appendChild(mark);
        idx = pos + t.length;
      }
      if (idx < text.length) {
        frag.appendChild(document.createTextNode(text.slice(idx)));
      }
      node.parentNode.replaceChild(frag, node);
    });
  }

  function applyFilter(input) {
    var filter = input.value;
    var other = input.id === 'filter'
      ? document.getElementById('small-filter')
      : document.getElementById('filter');
    if (other) {
      other.value = filter;
    }

    var term = filter.toLowerCase();
    document.querySelectorAll('.filteredgroup').forEach(function (group) {
      var count = 0;
      group.querySelectorAll(':scope > .filteredelement').forEach(function (el) {
        var show = term.length === 0 || el.textContent.toLowerCase().indexOf(term) !== -1;
        clearHighlights(el);
        if (show && term.length > 0) {
          highlight(el, filter);
        }
        el.style.display = show ? '' : 'none';
        if (show) {
          count++;
        }
      });
      group.style.display = count > 0 ? '' : 'none';
    });

    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  var smallFilter = document.getElementById('small-filter');
  var filter = document.getElementById('filter');
  if (smallFilter) {
    smallFilter.addEventListener('input', function () { applyFilter(this); });
  }
  if (filter) {
    filter.addEventListener('input', function () { applyFilter(this); });
  }

  function updateSidebar() {
    document.querySelectorAll('.papers-sidebar > .nav > .nav-item > .nav').forEach(function (sub) {
      sub.style.display = 'none';
    });
    document.querySelectorAll('.papers-sidebar > .nav > .nav-item > .nav-link.active').forEach(function (link) {
      var sub = link.parentElement.querySelector(':scope > .nav');
      if (sub) {
        sub.style.display = '';
      }
    });
  }

  if (window.bootstrap && document.getElementById('sidebar')) {
    new bootstrap.ScrollSpy(document.body, { target: '#sidebar', offset: 0 });
    updateSidebar();
    document.body.addEventListener('activate.bs.scrollspy', updateSidebar);
  }
})();
