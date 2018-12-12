/**
 * @license Angulartics v0.14.15
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Universal Analytics update contributed by http://github.com/willmcclellan
 * License: MIT
 */
!(function(a) {
	"use strict";
	a.module("angulartics.google.analytics", ["angulartics"]).config([
		"$analyticsProvider",
		function(a) {
			(a.settings.trackRelativePath = !0),
				a.registerPageTrack(function(a) {
					window._gaq && _gaq.push(["_trackPageview", a]),
						window.ga && ga("send", "pageview", a);
				}),
				a.registerEventTrack(function(a, b) {
					window._gaq
						? _gaq.push([
								"_trackEvent",
								b.category,
								a,
								b.label,
								b.value,
								b.noninteraction
							])
						: window.ga &&
							(b.noninteraction
								? ga("send", "event", b.category, a, b.label, b.value, {
										nonInteraction: 1
									})
								: ga("send", "event", b.category, a, b.label, b.value));
				});
		}
	]);
})(angular);

/**
 * @license Angulartics v0.14.15
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * License: MIT
 */
!(function(a) {
	"use strict";
	var b = window.angulartics || (window.angulartics = {});
	(b.waitForVendorApi = function(a, c, d) {
		Object.prototype.hasOwnProperty.call(window, a)
			? d(window[a])
			: setTimeout(function() {
					b.waitForVendorApi(a, c, d);
				}, c);
	}),
		a
			.module("angulartics", [])
			.provider("$analytics", function() {
				var b = {
						pageTracking: {
							autoTrackFirstPage: !0,
							autoTrackVirtualPages: !0,
							trackRelativePath: !1,
							basePath: "",
							bufferFlushDelay: 1e3
						},
						eventTracking: { bufferFlushDelay: 1e3 }
					},
					c = { pageviews: [], events: [] },
					d = function(a) {
						c.pageviews.push(a);
					},
					e = function(a, b) {
						c.events.push({ name: a, properties: b });
					},
					f = { settings: b, pageTrack: d, eventTrack: e },
					g = function(d) {
						(f.pageTrack = d),
							a.forEach(c.pageviews, function(a, c) {
								setTimeout(function() {
									f.pageTrack(a);
								}, c * b.pageTracking.bufferFlushDelay);
							});
					},
					h = function(d) {
						(f.eventTrack = d),
							a.forEach(c.events, function(a, c) {
								setTimeout(function() {
									f.eventTrack(a.name, a.properties);
								}, c * b.eventTracking.bufferFlushDelay);
							});
					};
				return {
					$get: function() {
						return f;
					},
					settings: b,
					virtualPageviews: function(a) {
						this.settings.pageTracking.autoTrackVirtualPages = a;
					},
					firstPageview: function(a) {
						this.settings.pageTracking.autoTrackFirstPage = a;
					},
					withBase: function(b) {
						this.settings.pageTracking.basePath = b
							? a
									.element("base")
									.attr("href")
									.slice(0, -1)
							: "";
					},
					registerPageTrack: g,
					registerEventTrack: h
				};
			})
			.run([
				"$rootScope",
				"$location",
				"$analytics",
				function(a, b, c) {
					c.settings.pageTracking.autoTrackFirstPage &&
						c.pageTrack(c.settings.trackRelativePath ? b.url() : b.absUrl()),
						c.settings.pageTracking.autoTrackVirtualPages &&
							a.$on("$locationChangeSuccess", function(a, d) {
								if (!d || !(d.$$route || d).redirectTo) {
									var e = c.settings.pageTracking.basePath + b.url();
									c.pageTrack(e);
								}
							});
				}
			])
			.directive("analyticsOn", [
				"$analytics",
				function(b) {
					function c(a) {
						return (
							[
								"a:",
								"button:",
								"button:button",
								"button:submit",
								"input:button",
								"input:submit"
							].indexOf(a.tagName.toLowerCase() + ":" + (a.type || "")) >= 0
						);
					}
					function d(a) {
						return c(a) ? "click" : "click";
					}
					function e(a) {
						return c(a) ? a.innerText || a.value : a.id || a.name || a.tagName;
					}
					function f(a) {
						return (
							"analytics" === a.substr(0, 9) &&
							-1 === ["on", "event"].indexOf(a.substr(10))
						);
					}
					return {
						restrict: "A",
						scope: !1,
						link: function(c, g, h) {
							var i = h.analyticsOn || d(g[0]);
							a.element(g[0]).bind(i, function() {
								var c = h.analyticsEvent || e(g[0]),
									d = {};
								a.forEach(h.$attr, function(a, b) {
									f(b) && (d[b.slice(9).toLowerCase()] = h[b]);
								}),
									b.eventTrack(c, d);
							});
						}
					};
				}
			]);
})(angular);
