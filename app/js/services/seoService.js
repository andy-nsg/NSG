'use strict';

/*
 * Dynamic per-page SEO meta (title / description / canonical / Open Graph).
 *
 * The static tags in index.html are the SITE DEFAULTS. This service overrides
 * them per route as data loads, then restores the defaults on routes that
 * don't set their own. Store-agnostic: the brand suffix comes from the active
 * store's Company.Name, so every storefront gets correct meta from this one file.
 *
 * Wiring (see the SEO scope notes):
 *   1. Include this file in index.html AFTER the other js/services/*.js scripts.
 *   2. ProductCtrl  -> SEO.setProduct(product, companyName)  once the product loads.
 *   3. CategoryCtrl -> SEO.setCategory(category, companyName) once the category loads.
 *   The run() block below handles reset + static-route titles automatically.
 */
four51.app.factory('SEO', function () {

  var head = document.head;

  // Snapshot the defaults shipped in index.html so we can restore them later.
  var defaults = {
    title: document.title,
    description: metaContent('meta[name="description"]'),
    canonical: linkHref('link[rel="canonical"]')
  };

  function el(sel) {
    return head.querySelector(sel);
  }

  function metaContent(sel) {
    var e = el(sel);
    return e ? e.getAttribute('content') : '';
  }

  function linkHref(sel) {
    var e = el(sel);
    return e ? e.getAttribute('href') : '';
  }

  function upsertMeta(keyAttr, keyVal, content) {
    if (content == null) return;
    var e = el('meta[' + keyAttr + '="' + keyVal + '"]');
    if (!e) {
      e = document.createElement('meta');
      e.setAttribute(keyAttr, keyVal);
      head.appendChild(e);
    }
    e.setAttribute('content', content);
  }

  function upsertLink(rel, href) {
    if (!href) return;
    var e = el('link[rel="' + rel + '"]');
    if (!e) {
      e = document.createElement('link');
      e.setAttribute('rel', rel);
      head.appendChild(e);
    }
    e.setAttribute('href', href);
  }

  // Strip HTML tags / collapse whitespace / truncate on a word boundary.
  function strip(text, max) {
    if (!text) return '';
    var t = String(text).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (max && t.length > max) t = t.substring(0, max - 1).replace(/\s+\S*$/, '') + '…';
    return t;
  }

  function brand(name) {
    return name || 'National Service Gear';
  }

  function apply(opts) {
    var title = opts.title || defaults.title;
    var description = (opts.description != null && opts.description !== '') ? opts.description : defaults.description;
    var url = opts.canonical || (location.origin + location.pathname);

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    if (opts.image) {
      upsertMeta('property', 'og:image', opts.image);
      upsertMeta('name', 'twitter:image', opts.image);
    }
  }

  return {
    reset: function () {
      apply({ title: defaults.title, description: defaults.description, canonical: location.origin + location.pathname });
    },

    setStatic: function (label, companyName) {
      apply({ title: label + ' | ' + brand(companyName), canonical: location.origin + location.pathname });
    },

    setProduct: function (product, companyName) {
      if (!product) return;
      apply({
        title: product.Name + ' | ' + brand(companyName),
        description: strip(product.Description, 160) || (product.Name + ' from ' + brand(companyName) + '.'),
        canonical: location.origin + '/product/' + product.InteropID,
        image: product.ImageUrl || product.SmallImageUrl
      });
    },

    setCategory: function (category, companyName) {
      if (!category || !category.Name) { this.reset(); return; }
      apply({
        title: category.Name + ' | ' + brand(companyName),
        description: strip(category.Description, 160) || (category.Name + ' - shop ' + brand(companyName) + '.'),
        canonical: location.origin + '/catalog/' + category.InteropID
      });
    }
  };
});

// Reset meta on navigation + label the static routes. The Product and Category
// controllers set their own meta once their async data resolves, so those paths
// are skipped here to avoid clobbering the richer per-item values.
four51.app.run(['$rootScope', 'SEO', function ($rootScope, SEO) {
  var staticTitles = {
    '/cart': 'Your Cart',
    '/checkout': 'Checkout',
    '/contactus': 'Contact Us',
    '/search': 'Search',
    '/order': 'Order History',
    '/favoriteorders': 'Favorite Orders',
    '/admin': 'My Account',
    '/addresses': 'Address Book',
    '/security': 'Account Security'
  };

  $rootScope.$on('$routeChangeSuccess', function () {
    var path = location.pathname;
    var companyName = $rootScope.user && $rootScope.user.Company && $rootScope.user.Company.Name;

    // Product detail + specific category pages set their own meta in-controller.
    if (path.indexOf('/product/') === 0) return;
    if (path.indexOf('/catalog/') === 0) return;

    if (staticTitles[path]) {
      SEO.setStatic(staticTitles[path], companyName);
    } else {
      SEO.reset();
    }
  });
}]);