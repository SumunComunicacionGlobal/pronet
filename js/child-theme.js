/*!
  * Understrap v1.2.0 (https://understrap.com)
  * Copyright 2013-2025 The Understrap Authors (https://github.com/understrap/understrap/graphs/contributors)
  * Licensed under GPL-3.0 (undefined)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.understrap = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
					var args = [null];
					args.push.apply(args, arguments);
					var Ctor = Function.bind.apply(f, args);
					return new Ctor();
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var alert$1 = {exports: {}};

	var util = {exports: {}};

	/*!
	  * Bootstrap index.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return util.exports;
		hasRequiredUtil = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/index.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const MAX_UID = 1000000;
			  const MILLISECONDS_MULTIPLIER = 1000;
			  const TRANSITION_END = 'transitionend'; // Shout-out Angus Croll (https://goo.gl/pxwQGp)

			  const toType = object => {
			    if (object === null || object === undefined) {
			      return `${object}`;
			    }
			    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
			  };
			  /**
			   * Public Util API
			   */

			  const getUID = prefix => {
			    do {
			      prefix += Math.floor(Math.random() * MAX_UID);
			    } while (document.getElementById(prefix));
			    return prefix;
			  };
			  const getSelector = element => {
			    let selector = element.getAttribute('data-bs-target');
			    if (!selector || selector === '#') {
			      let hrefAttribute = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
			      // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
			      // `document.querySelector` will rightfully complain it is invalid.
			      // See https://github.com/twbs/bootstrap/issues/32273

			      if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
			        return null;
			      } // Just in case some CMS puts out a full URL with the anchor appended

			      if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
			        hrefAttribute = `#${hrefAttribute.split('#')[1]}`;
			      }
			      selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
			    }
			    return selector;
			  };
			  const getSelectorFromElement = element => {
			    const selector = getSelector(element);
			    if (selector) {
			      return document.querySelector(selector) ? selector : null;
			    }
			    return null;
			  };
			  const getElementFromSelector = element => {
			    const selector = getSelector(element);
			    return selector ? document.querySelector(selector) : null;
			  };
			  const getTransitionDurationFromElement = element => {
			    if (!element) {
			      return 0;
			    } // Get transition-duration of the element

			    let {
			      transitionDuration,
			      transitionDelay
			    } = window.getComputedStyle(element);
			    const floatTransitionDuration = Number.parseFloat(transitionDuration);
			    const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

			    if (!floatTransitionDuration && !floatTransitionDelay) {
			      return 0;
			    } // If multiple durations are defined, take the first

			    transitionDuration = transitionDuration.split(',')[0];
			    transitionDelay = transitionDelay.split(',')[0];
			    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
			  };
			  const triggerTransitionEnd = element => {
			    element.dispatchEvent(new Event(TRANSITION_END));
			  };
			  const isElement = object => {
			    if (!object || typeof object !== 'object') {
			      return false;
			    }
			    if (typeof object.jquery !== 'undefined') {
			      object = object[0];
			    }
			    return typeof object.nodeType !== 'undefined';
			  };
			  const getElement = object => {
			    // it's a jQuery object or a node element
			    if (isElement(object)) {
			      return object.jquery ? object[0] : object;
			    }
			    if (typeof object === 'string' && object.length > 0) {
			      return document.querySelector(object);
			    }
			    return null;
			  };
			  const isVisible = element => {
			    if (!isElement(element) || element.getClientRects().length === 0) {
			      return false;
			    }
			    const elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible'; // Handle `details` element as its content may falsie appear visible when it is closed

			    const closedDetails = element.closest('details:not([open])');
			    if (!closedDetails) {
			      return elementIsVisible;
			    }
			    if (closedDetails !== element) {
			      const summary = element.closest('summary');
			      if (summary && summary.parentNode !== closedDetails) {
			        return false;
			      }
			      if (summary === null) {
			        return false;
			      }
			    }
			    return elementIsVisible;
			  };
			  const isDisabled = element => {
			    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
			      return true;
			    }
			    if (element.classList.contains('disabled')) {
			      return true;
			    }
			    if (typeof element.disabled !== 'undefined') {
			      return element.disabled;
			    }
			    return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
			  };
			  const findShadowRoot = element => {
			    if (!document.documentElement.attachShadow) {
			      return null;
			    } // Can find the shadow root otherwise it'll return the document

			    if (typeof element.getRootNode === 'function') {
			      const root = element.getRootNode();
			      return root instanceof ShadowRoot ? root : null;
			    }
			    if (element instanceof ShadowRoot) {
			      return element;
			    } // when we don't find a shadow root

			    if (!element.parentNode) {
			      return null;
			    }
			    return findShadowRoot(element.parentNode);
			  };
			  const noop = () => {};
			  /**
			   * Trick to restart an element's animation
			   *
			   * @param {HTMLElement} element
			   * @return void
			   *
			   * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
			   */

			  const reflow = element => {
			    element.offsetHeight; // eslint-disable-line no-unused-expressions
			  };

			  const getjQuery = () => {
			    if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
			      return window.jQuery;
			    }
			    return null;
			  };
			  const DOMContentLoadedCallbacks = [];
			  const onDOMContentLoaded = callback => {
			    if (document.readyState === 'loading') {
			      // add listener on the first call when the document is in loading state
			      if (!DOMContentLoadedCallbacks.length) {
			        document.addEventListener('DOMContentLoaded', () => {
			          for (const callback of DOMContentLoadedCallbacks) {
			            callback();
			          }
			        });
			      }
			      DOMContentLoadedCallbacks.push(callback);
			    } else {
			      callback();
			    }
			  };
			  const isRTL = () => document.documentElement.dir === 'rtl';
			  const defineJQueryPlugin = plugin => {
			    onDOMContentLoaded(() => {
			      const $ = getjQuery();
			      /* istanbul ignore if */

			      if ($) {
			        const name = plugin.NAME;
			        const JQUERY_NO_CONFLICT = $.fn[name];
			        $.fn[name] = plugin.jQueryInterface;
			        $.fn[name].Constructor = plugin;
			        $.fn[name].noConflict = () => {
			          $.fn[name] = JQUERY_NO_CONFLICT;
			          return plugin.jQueryInterface;
			        };
			      }
			    });
			  };
			  const execute = callback => {
			    if (typeof callback === 'function') {
			      callback();
			    }
			  };
			  const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
			    if (!waitForTransition) {
			      execute(callback);
			      return;
			    }
			    const durationPadding = 5;
			    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
			    let called = false;
			    const handler = ({
			      target
			    }) => {
			      if (target !== transitionElement) {
			        return;
			      }
			      called = true;
			      transitionElement.removeEventListener(TRANSITION_END, handler);
			      execute(callback);
			    };
			    transitionElement.addEventListener(TRANSITION_END, handler);
			    setTimeout(() => {
			      if (!called) {
			        triggerTransitionEnd(transitionElement);
			      }
			    }, emulatedDuration);
			  };
			  /**
			   * Return the previous/next element of a list.
			   *
			   * @param {array} list    The list of elements
			   * @param activeElement   The active element
			   * @param shouldGetNext   Choose to get next or previous element
			   * @param isCycleAllowed
			   * @return {Element|elem} The proper element
			   */

			  const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
			    const listLength = list.length;
			    let index = list.indexOf(activeElement); // if the element does not exist in the list return an element
			    // depending on the direction and if cycle is allowed

			    if (index === -1) {
			      return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
			    }
			    index += shouldGetNext ? 1 : -1;
			    if (isCycleAllowed) {
			      index = (index + listLength) % listLength;
			    }
			    return list[Math.max(0, Math.min(index, listLength - 1))];
			  };
			  exports.defineJQueryPlugin = defineJQueryPlugin;
			  exports.execute = execute;
			  exports.executeAfterTransition = executeAfterTransition;
			  exports.findShadowRoot = findShadowRoot;
			  exports.getElement = getElement;
			  exports.getElementFromSelector = getElementFromSelector;
			  exports.getNextActiveElement = getNextActiveElement;
			  exports.getSelectorFromElement = getSelectorFromElement;
			  exports.getTransitionDurationFromElement = getTransitionDurationFromElement;
			  exports.getUID = getUID;
			  exports.getjQuery = getjQuery;
			  exports.isDisabled = isDisabled;
			  exports.isElement = isElement;
			  exports.isRTL = isRTL;
			  exports.isVisible = isVisible;
			  exports.noop = noop;
			  exports.onDOMContentLoaded = onDOMContentLoaded;
			  exports.reflow = reflow;
			  exports.toType = toType;
			  exports.triggerTransitionEnd = triggerTransitionEnd;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (util, util.exports));
		return util.exports;
	}

	var eventHandler = {exports: {}};

	/*!
	  * Bootstrap event-handler.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredEventHandler;

	function requireEventHandler () {
		if (hasRequiredEventHandler) return eventHandler.exports;
		hasRequiredEventHandler = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/event-handler.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
			  const stripNameRegex = /\..*/;
			  const stripUidRegex = /::\d+$/;
			  const eventRegistry = {}; // Events storage

			  let uidEvent = 1;
			  const customEvents = {
			    mouseenter: 'mouseover',
			    mouseleave: 'mouseout'
			  };
			  const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
			  /**
			   * Private methods
			   */

			  function makeEventUid(element, uid) {
			    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
			  }
			  function getElementEvents(element) {
			    const uid = makeEventUid(element);
			    element.uidEvent = uid;
			    eventRegistry[uid] = eventRegistry[uid] || {};
			    return eventRegistry[uid];
			  }
			  function bootstrapHandler(element, fn) {
			    return function handler(event) {
			      hydrateObj(event, {
			        delegateTarget: element
			      });
			      if (handler.oneOff) {
			        EventHandler.off(element, event.type, fn);
			      }
			      return fn.apply(element, [event]);
			    };
			  }
			  function bootstrapDelegationHandler(element, selector, fn) {
			    return function handler(event) {
			      const domElements = element.querySelectorAll(selector);
			      for (let {
			        target
			      } = event; target && target !== this; target = target.parentNode) {
			        for (const domElement of domElements) {
			          if (domElement !== target) {
			            continue;
			          }
			          hydrateObj(event, {
			            delegateTarget: target
			          });
			          if (handler.oneOff) {
			            EventHandler.off(element, event.type, selector, fn);
			          }
			          return fn.apply(target, [event]);
			        }
			      }
			    };
			  }
			  function findHandler(events, callable, delegationSelector = null) {
			    return Object.values(events).find(event => event.callable === callable && event.delegationSelector === delegationSelector);
			  }
			  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
			    const isDelegated = typeof handler === 'string'; // todo: tooltip passes `false` instead of selector, so we need to check

			    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
			    let typeEvent = getTypeEvent(originalTypeEvent);
			    if (!nativeEvents.has(typeEvent)) {
			      typeEvent = originalTypeEvent;
			    }
			    return [isDelegated, callable, typeEvent];
			  }
			  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
			    if (typeof originalTypeEvent !== 'string' || !element) {
			      return;
			    }
			    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction); // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
			    // this prevents the handler from being dispatched the same way as mouseover or mouseout does

			    if (originalTypeEvent in customEvents) {
			      const wrapFunction = fn => {
			        return function (event) {
			          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
			            return fn.call(this, event);
			          }
			        };
			      };
			      callable = wrapFunction(callable);
			    }
			    const events = getElementEvents(element);
			    const handlers = events[typeEvent] || (events[typeEvent] = {});
			    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
			    if (previousFunction) {
			      previousFunction.oneOff = previousFunction.oneOff && oneOff;
			      return;
			    }
			    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
			    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
			    fn.delegationSelector = isDelegated ? handler : null;
			    fn.callable = callable;
			    fn.oneOff = oneOff;
			    fn.uidEvent = uid;
			    handlers[uid] = fn;
			    element.addEventListener(typeEvent, fn, isDelegated);
			  }
			  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
			    const fn = findHandler(events[typeEvent], handler, delegationSelector);
			    if (!fn) {
			      return;
			    }
			    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
			    delete events[typeEvent][fn.uidEvent];
			  }
			  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
			    const storeElementEvent = events[typeEvent] || {};
			    for (const handlerKey of Object.keys(storeElementEvent)) {
			      if (handlerKey.includes(namespace)) {
			        const event = storeElementEvent[handlerKey];
			        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			      }
			    }
			  }
			  function getTypeEvent(event) {
			    // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
			    event = event.replace(stripNameRegex, '');
			    return customEvents[event] || event;
			  }
			  const EventHandler = {
			    on(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, false);
			    },
			    one(element, event, handler, delegationFunction) {
			      addHandler(element, event, handler, delegationFunction, true);
			    },
			    off(element, originalTypeEvent, handler, delegationFunction) {
			      if (typeof originalTypeEvent !== 'string' || !element) {
			        return;
			      }
			      const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
			      const inNamespace = typeEvent !== originalTypeEvent;
			      const events = getElementEvents(element);
			      const storeElementEvent = events[typeEvent] || {};
			      const isNamespace = originalTypeEvent.startsWith('.');
			      if (typeof callable !== 'undefined') {
			        // Simplest case: handler is passed, remove that listener ONLY.
			        if (!Object.keys(storeElementEvent).length) {
			          return;
			        }
			        removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
			        return;
			      }
			      if (isNamespace) {
			        for (const elementEvent of Object.keys(events)) {
			          removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
			        }
			      }
			      for (const keyHandlers of Object.keys(storeElementEvent)) {
			        const handlerKey = keyHandlers.replace(stripUidRegex, '');
			        if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
			          const event = storeElementEvent[keyHandlers];
			          removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
			        }
			      }
			    },
			    trigger(element, event, args) {
			      if (typeof event !== 'string' || !element) {
			        return null;
			      }
			      const $ = index.getjQuery();
			      const typeEvent = getTypeEvent(event);
			      const inNamespace = event !== typeEvent;
			      let jQueryEvent = null;
			      let bubbles = true;
			      let nativeDispatch = true;
			      let defaultPrevented = false;
			      if (inNamespace && $) {
			        jQueryEvent = $.Event(event, args);
			        $(element).trigger(jQueryEvent);
			        bubbles = !jQueryEvent.isPropagationStopped();
			        nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
			        defaultPrevented = jQueryEvent.isDefaultPrevented();
			      }
			      let evt = new Event(event, {
			        bubbles,
			        cancelable: true
			      });
			      evt = hydrateObj(evt, args);
			      if (defaultPrevented) {
			        evt.preventDefault();
			      }
			      if (nativeDispatch) {
			        element.dispatchEvent(evt);
			      }
			      if (evt.defaultPrevented && jQueryEvent) {
			        jQueryEvent.preventDefault();
			      }
			      return evt;
			    }
			  };
			  function hydrateObj(obj, meta) {
			    for (const [key, value] of Object.entries(meta || {})) {
			      try {
			        obj[key] = value;
			      } catch (_unused) {
			        Object.defineProperty(obj, key, {
			          configurable: true,
			          get() {
			            return value;
			          }
			        });
			      }
			    }
			    return obj;
			  }
			  return EventHandler;
			});
	} (eventHandler));
		return eventHandler.exports;
	}

	var baseComponent = {exports: {}};

	var data = {exports: {}};

	/*!
	  * Bootstrap data.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredData;

	function requireData () {
		if (hasRequiredData) return data.exports;
		hasRequiredData = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/data.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  /**
			   * Constants
			   */
			  const elementMap = new Map();
			  const data = {
			    set(element, key, instance) {
			      if (!elementMap.has(element)) {
			        elementMap.set(element, new Map());
			      }
			      const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
			      // can be removed later when multiple key/instances are fine to be used

			      if (!instanceMap.has(key) && instanceMap.size !== 0) {
			        // eslint-disable-next-line no-console
			        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
			        return;
			      }
			      instanceMap.set(key, instance);
			    },
			    get(element, key) {
			      if (elementMap.has(element)) {
			        return elementMap.get(element).get(key) || null;
			      }
			      return null;
			    },
			    remove(element, key) {
			      if (!elementMap.has(element)) {
			        return;
			      }
			      const instanceMap = elementMap.get(element);
			      instanceMap.delete(key); // free up element references if there are no instances left for an element

			      if (instanceMap.size === 0) {
			        elementMap.delete(element);
			      }
			    }
			  };
			  return data;
			});
	} (data));
		return data.exports;
	}

	var config = {exports: {}};

	var manipulator = {exports: {}};

	/*!
	  * Bootstrap manipulator.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredManipulator;

	function requireManipulator () {
		if (hasRequiredManipulator) return manipulator.exports;
		hasRequiredManipulator = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory() ;
			})(commonjsGlobal, function () {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/manipulator.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  function normalizeData(value) {
			    if (value === 'true') {
			      return true;
			    }
			    if (value === 'false') {
			      return false;
			    }
			    if (value === Number(value).toString()) {
			      return Number(value);
			    }
			    if (value === '' || value === 'null') {
			      return null;
			    }
			    if (typeof value !== 'string') {
			      return value;
			    }
			    try {
			      return JSON.parse(decodeURIComponent(value));
			    } catch (_unused) {
			      return value;
			    }
			  }
			  function normalizeDataKey(key) {
			    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
			  }
			  const Manipulator = {
			    setDataAttribute(element, key, value) {
			      element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
			    },
			    removeDataAttribute(element, key) {
			      element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
			    },
			    getDataAttributes(element) {
			      if (!element) {
			        return {};
			      }
			      const attributes = {};
			      const bsKeys = Object.keys(element.dataset).filter(key => key.startsWith('bs') && !key.startsWith('bsConfig'));
			      for (const key of bsKeys) {
			        let pureKey = key.replace(/^bs/, '');
			        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
			        attributes[pureKey] = normalizeData(element.dataset[key]);
			      }
			      return attributes;
			    },
			    getDataAttribute(element, key) {
			      return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
			    }
			  };
			  return Manipulator;
			});
	} (manipulator));
		return manipulator.exports;
	}

	/*!
	  * Bootstrap config.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredConfig;

	function requireConfig () {
		if (hasRequiredConfig) return config.exports;
		hasRequiredConfig = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil(), requireManipulator()) ;
			})(commonjsGlobal, function (index, Manipulator) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/config.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Class definition
			   */

			  class Config {
			    // Getters
			    static get Default() {
			      return {};
			    }
			    static get DefaultType() {
			      return {};
			    }
			    static get NAME() {
			      throw new Error('You have to implement the static method "NAME", for each component!');
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    }
			    _configAfterMerge(config) {
			      return config;
			    }
			    _mergeConfigObj(config, element) {
			      const jsonConfig = index.isElement(element) ? Manipulator__default.default.getDataAttribute(element, 'config') : {}; // try to parse

			      return {
			        ...this.constructor.Default,
			        ...(typeof jsonConfig === 'object' ? jsonConfig : {}),
			        ...(index.isElement(element) ? Manipulator__default.default.getDataAttributes(element) : {}),
			        ...(typeof config === 'object' ? config : {})
			      };
			    }
			    _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
			      for (const property of Object.keys(configTypes)) {
			        const expectedTypes = configTypes[property];
			        const value = config[property];
			        const valueType = index.isElement(value) ? 'element' : index.toType(value);
			        if (!new RegExp(expectedTypes).test(valueType)) {
			          throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
			        }
			      }
			    }
			  }
			  return Config;
			});
	} (config));
		return config.exports;
	}

	/*!
	  * Bootstrap base-component.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBaseComponent;

	function requireBaseComponent () {
		if (hasRequiredBaseComponent) return baseComponent.exports;
		hasRequiredBaseComponent = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireData(), requireUtil(), requireEventHandler(), requireConfig()) ;
			})(commonjsGlobal, function (Data, index, EventHandler, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Data__default = /*#__PURE__*/_interopDefaultLegacy(Data);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): base-component.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const VERSION = '5.2.3';
			  /**
			   * Class definition
			   */

			  class BaseComponent extends Config__default.default {
			    constructor(element, config) {
			      super();
			      element = index.getElement(element);
			      if (!element) {
			        return;
			      }
			      this._element = element;
			      this._config = this._getConfig(config);
			      Data__default.default.set(this._element, this.constructor.DATA_KEY, this);
			    } // Public

			    dispose() {
			      Data__default.default.remove(this._element, this.constructor.DATA_KEY);
			      EventHandler__default.default.off(this._element, this.constructor.EVENT_KEY);
			      for (const propertyName of Object.getOwnPropertyNames(this)) {
			        this[propertyName] = null;
			      }
			    }
			    _queueCallback(callback, element, isAnimated = true) {
			      index.executeAfterTransition(callback, element, isAnimated);
			    }
			    _getConfig(config) {
			      config = this._mergeConfigObj(config, this._element);
			      config = this._configAfterMerge(config);
			      this._typeCheckConfig(config);
			      return config;
			    } // Static

			    static getInstance(element) {
			      return Data__default.default.get(index.getElement(element), this.DATA_KEY);
			    }
			    static getOrCreateInstance(element, config = {}) {
			      return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
			    }
			    static get VERSION() {
			      return VERSION;
			    }
			    static get DATA_KEY() {
			      return `bs.${this.NAME}`;
			    }
			    static get EVENT_KEY() {
			      return `.${this.DATA_KEY}`;
			    }
			    static eventName(name) {
			      return `${name}${this.EVENT_KEY}`;
			    }
			  }
			  return BaseComponent;
			});
	} (baseComponent));
		return baseComponent.exports;
	}

	var componentFunctions = {exports: {}};

	/*!
	  * Bootstrap component-functions.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredComponentFunctions;

	function requireComponentFunctions () {
		if (hasRequiredComponentFunctions) return componentFunctions.exports;
		hasRequiredComponentFunctions = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports, requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (exports, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/component-functions.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */

			  const enableDismissTrigger = (component, method = 'hide') => {
			    const clickEvent = `click.dismiss${component.EVENT_KEY}`;
			    const name = component.NAME;
			    EventHandler__default.default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
			      if (['A', 'AREA'].includes(this.tagName)) {
			        event.preventDefault();
			      }
			      if (index.isDisabled(this)) {
			        return;
			      }
			      const target = index.getElementFromSelector(this) || this.closest(`.${name}`);
			      const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

			      instance[method]();
			    });
			  };
			  exports.enableDismissTrigger = enableDismissTrigger;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (componentFunctions, componentFunctions.exports));
		return componentFunctions.exports;
	}

	/*!
	  * Bootstrap alert.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): alert.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'alert';
		  const DATA_KEY = 'bs.alert';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_CLOSE = `close${EVENT_KEY}`;
		  const EVENT_CLOSED = `closed${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  /**
		   * Class definition
		   */

		  class Alert extends BaseComponent__default.default {
		    // Getters
		    static get NAME() {
		      return NAME;
		    } // Public

		    close() {
		      const closeEvent = EventHandler__default.default.trigger(this._element, EVENT_CLOSE);
		      if (closeEvent.defaultPrevented) {
		        return;
		      }
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      const isAnimated = this._element.classList.contains(CLASS_NAME_FADE);
		      this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
		    } // Private

		    _destroyElement() {
		      this._element.remove();
		      EventHandler__default.default.trigger(this._element, EVENT_CLOSED);
		      this.dispose();
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Alert.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  componentFunctions.enableDismissTrigger(Alert, 'close');
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Alert);
		  return Alert;
		});
	} (alert$1));

	var alert = alert$1.exports;

	var button$1 = {exports: {}};

	/*!
	  * Bootstrap button.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): button.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'button';
		  const DATA_KEY = 'bs.button';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="button"]';
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  /**
		   * Class definition
		   */

		  class Button extends BaseComponent__default.default {
		    // Getters
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
		      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE));
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Button.getOrCreateInstance(this);
		        if (config === 'toggle') {
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, event => {
		    event.preventDefault();
		    const button = event.target.closest(SELECTOR_DATA_TOGGLE);
		    const data = Button.getOrCreateInstance(button);
		    data.toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Button);
		  return Button;
		});
	} (button$1));

	var button = button$1.exports;

	var carousel$1 = {exports: {}};

	var selectorEngine = {exports: {}};

	/*!
	  * Bootstrap selector-engine.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSelectorEngine;

	function requireSelectorEngine () {
		if (hasRequiredSelectorEngine) return selectorEngine.exports;
		hasRequiredSelectorEngine = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireUtil()) ;
			})(commonjsGlobal, function (index) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): dom/selector-engine.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */
			  const SelectorEngine = {
			    find(selector, element = document.documentElement) {
			      return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
			    },
			    findOne(selector, element = document.documentElement) {
			      return Element.prototype.querySelector.call(element, selector);
			    },
			    children(element, selector) {
			      return [].concat(...element.children).filter(child => child.matches(selector));
			    },
			    parents(element, selector) {
			      const parents = [];
			      let ancestor = element.parentNode.closest(selector);
			      while (ancestor) {
			        parents.push(ancestor);
			        ancestor = ancestor.parentNode.closest(selector);
			      }
			      return parents;
			    },
			    prev(element, selector) {
			      let previous = element.previousElementSibling;
			      while (previous) {
			        if (previous.matches(selector)) {
			          return [previous];
			        }
			        previous = previous.previousElementSibling;
			      }
			      return [];
			    },
			    // TODO: this is now unused; remove later along with prev()
			    next(element, selector) {
			      let next = element.nextElementSibling;
			      while (next) {
			        if (next.matches(selector)) {
			          return [next];
			        }
			        next = next.nextElementSibling;
			      }
			      return [];
			    },
			    focusableChildren(element) {
			      const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(',');
			      return this.find(focusables, element).filter(el => !index.isDisabled(el) && index.isVisible(el));
			    }
			  };
			  return SelectorEngine;
			});
	} (selectorEngine));
		return selectorEngine.exports;
	}

	var swipe = {exports: {}};

	/*!
	  * Bootstrap swipe.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSwipe;

	function requireSwipe () {
		if (hasRequiredSwipe) return swipe.exports;
		hasRequiredSwipe = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireConfig(), requireEventHandler(), requireUtil()) ;
			})(commonjsGlobal, function (Config, EventHandler, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/swipe.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'swipe';
			  const EVENT_KEY = '.bs.swipe';
			  const EVENT_TOUCHSTART = `touchstart${EVENT_KEY}`;
			  const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY}`;
			  const EVENT_TOUCHEND = `touchend${EVENT_KEY}`;
			  const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY}`;
			  const EVENT_POINTERUP = `pointerup${EVENT_KEY}`;
			  const POINTER_TYPE_TOUCH = 'touch';
			  const POINTER_TYPE_PEN = 'pen';
			  const CLASS_NAME_POINTER_EVENT = 'pointer-event';
			  const SWIPE_THRESHOLD = 40;
			  const Default = {
			    endCallback: null,
			    leftCallback: null,
			    rightCallback: null
			  };
			  const DefaultType = {
			    endCallback: '(function|null)',
			    leftCallback: '(function|null)',
			    rightCallback: '(function|null)'
			  };
			  /**
			   * Class definition
			   */

			  class Swipe extends Config__default.default {
			    constructor(element, config) {
			      super();
			      this._element = element;
			      if (!element || !Swipe.isSupported()) {
			        return;
			      }
			      this._config = this._getConfig(config);
			      this._deltaX = 0;
			      this._supportPointerEvents = Boolean(window.PointerEvent);
			      this._initEvents();
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    dispose() {
			      EventHandler__default.default.off(this._element, EVENT_KEY);
			    } // Private

			    _start(event) {
			      if (!this._supportPointerEvents) {
			        this._deltaX = event.touches[0].clientX;
			        return;
			      }
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX;
			      }
			    }
			    _end(event) {
			      if (this._eventIsPointerPenTouch(event)) {
			        this._deltaX = event.clientX - this._deltaX;
			      }
			      this._handleSwipe();
			      index.execute(this._config.endCallback);
			    }
			    _move(event) {
			      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
			    }
			    _handleSwipe() {
			      const absDeltaX = Math.abs(this._deltaX);
			      if (absDeltaX <= SWIPE_THRESHOLD) {
			        return;
			      }
			      const direction = absDeltaX / this._deltaX;
			      this._deltaX = 0;
			      if (!direction) {
			        return;
			      }
			      index.execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
			    }
			    _initEvents() {
			      if (this._supportPointerEvents) {
			        EventHandler__default.default.on(this._element, EVENT_POINTERDOWN, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_POINTERUP, event => this._end(event));
			        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
			      } else {
			        EventHandler__default.default.on(this._element, EVENT_TOUCHSTART, event => this._start(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHMOVE, event => this._move(event));
			        EventHandler__default.default.on(this._element, EVENT_TOUCHEND, event => this._end(event));
			      }
			    }
			    _eventIsPointerPenTouch(event) {
			      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
			    } // Static

			    static isSupported() {
			      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
			    }
			  }
			  return Swipe;
			});
	} (swipe));
		return swipe.exports;
	}

	/*!
	  * Bootstrap carousel.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireSwipe(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, Manipulator, SelectorEngine, Swipe, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Swipe__default = /*#__PURE__*/_interopDefaultLegacy(Swipe);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): carousel.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'carousel';
		  const DATA_KEY = 'bs.carousel';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

		  const ORDER_NEXT = 'next';
		  const ORDER_PREV = 'prev';
		  const DIRECTION_LEFT = 'left';
		  const DIRECTION_RIGHT = 'right';
		  const EVENT_SLIDE = `slide${EVENT_KEY}`;
		  const EVENT_SLID = `slid${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY}`;
		  const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY}`;
		  const EVENT_DRAG_START = `dragstart${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_CAROUSEL = 'carousel';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_SLIDE = 'slide';
		  const CLASS_NAME_END = 'carousel-item-end';
		  const CLASS_NAME_START = 'carousel-item-start';
		  const CLASS_NAME_NEXT = 'carousel-item-next';
		  const CLASS_NAME_PREV = 'carousel-item-prev';
		  const SELECTOR_ACTIVE = '.active';
		  const SELECTOR_ITEM = '.carousel-item';
		  const SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
		  const SELECTOR_ITEM_IMG = '.carousel-item img';
		  const SELECTOR_INDICATORS = '.carousel-indicators';
		  const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
		  const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
		  const KEY_TO_DIRECTION = {
		    [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
		    [ARROW_RIGHT_KEY]: DIRECTION_LEFT
		  };
		  const Default = {
		    interval: 5000,
		    keyboard: true,
		    pause: 'hover',
		    ride: false,
		    touch: true,
		    wrap: true
		  };
		  const DefaultType = {
		    interval: '(number|boolean)',
		    // TODO:v6 remove boolean support
		    keyboard: 'boolean',
		    pause: '(string|boolean)',
		    ride: '(boolean|string)',
		    touch: 'boolean',
		    wrap: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Carousel extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._interval = null;
		      this._activeElement = null;
		      this._isSliding = false;
		      this.touchTimeout = null;
		      this._swipeHelper = null;
		      this._indicatorsElement = SelectorEngine__default.default.findOne(SELECTOR_INDICATORS, this._element);
		      this._addEventListeners();
		      if (this._config.ride === CLASS_NAME_CAROUSEL) {
		        this.cycle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    next() {
		      this._slide(ORDER_NEXT);
		    }
		    nextWhenVisible() {
		      // FIXME TODO use `document.visibilityState`
		      // Don't call next when the page isn't visible
		      // or the carousel or its parent isn't visible
		      if (!document.hidden && index.isVisible(this._element)) {
		        this.next();
		      }
		    }
		    prev() {
		      this._slide(ORDER_PREV);
		    }
		    pause() {
		      if (this._isSliding) {
		        index.triggerTransitionEnd(this._element);
		      }
		      this._clearInterval();
		    }
		    cycle() {
		      this._clearInterval();
		      this._updateInterval();
		      this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
		    }
		    _maybeEnableCycle() {
		      if (!this._config.ride) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.cycle());
		        return;
		      }
		      this.cycle();
		    }
		    to(index) {
		      const items = this._getItems();
		      if (index > items.length - 1 || index < 0) {
		        return;
		      }
		      if (this._isSliding) {
		        EventHandler__default.default.one(this._element, EVENT_SLID, () => this.to(index));
		        return;
		      }
		      const activeIndex = this._getItemIndex(this._getActive());
		      if (activeIndex === index) {
		        return;
		      }
		      const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
		      this._slide(order, items[index]);
		    }
		    dispose() {
		      if (this._swipeHelper) {
		        this._swipeHelper.dispose();
		      }
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      config.defaultInterval = config.interval;
		      return config;
		    }
		    _addEventListeners() {
		      if (this._config.keyboard) {
		        EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		      }
		      if (this._config.pause === 'hover') {
		        EventHandler__default.default.on(this._element, EVENT_MOUSEENTER, () => this.pause());
		        EventHandler__default.default.on(this._element, EVENT_MOUSELEAVE, () => this._maybeEnableCycle());
		      }
		      if (this._config.touch && Swipe__default.default.isSupported()) {
		        this._addTouchEventListeners();
		      }
		    }
		    _addTouchEventListeners() {
		      for (const img of SelectorEngine__default.default.find(SELECTOR_ITEM_IMG, this._element)) {
		        EventHandler__default.default.on(img, EVENT_DRAG_START, event => event.preventDefault());
		      }
		      const endCallBack = () => {
		        if (this._config.pause !== 'hover') {
		          return;
		        } // If it's a touch-enabled device, mouseenter/leave are fired as
		        // part of the mouse compatibility events on first tap - the carousel
		        // would stop cycling until user tapped out of it;
		        // here, we listen for touchend, explicitly pause the carousel
		        // (as if it's the second time we tap on it, mouseenter compat event
		        // is NOT fired) and after a timeout (to allow for mouse compatibility
		        // events to fire) we explicitly restart cycling

		        this.pause();
		        if (this.touchTimeout) {
		          clearTimeout(this.touchTimeout);
		        }
		        this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
		      };
		      const swipeConfig = {
		        leftCallback: () => this._slide(this._directionToOrder(DIRECTION_LEFT)),
		        rightCallback: () => this._slide(this._directionToOrder(DIRECTION_RIGHT)),
		        endCallback: endCallBack
		      };
		      this._swipeHelper = new Swipe__default.default(this._element, swipeConfig);
		    }
		    _keydown(event) {
		      if (/input|textarea/i.test(event.target.tagName)) {
		        return;
		      }
		      const direction = KEY_TO_DIRECTION[event.key];
		      if (direction) {
		        event.preventDefault();
		        this._slide(this._directionToOrder(direction));
		      }
		    }
		    _getItemIndex(element) {
		      return this._getItems().indexOf(element);
		    }
		    _setActiveIndicatorElement(index) {
		      if (!this._indicatorsElement) {
		        return;
		      }
		      const activeIndicator = SelectorEngine__default.default.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
		      activeIndicator.classList.remove(CLASS_NAME_ACTIVE);
		      activeIndicator.removeAttribute('aria-current');
		      const newActiveIndicator = SelectorEngine__default.default.findOne(`[data-bs-slide-to="${index}"]`, this._indicatorsElement);
		      if (newActiveIndicator) {
		        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE);
		        newActiveIndicator.setAttribute('aria-current', 'true');
		      }
		    }
		    _updateInterval() {
		      const element = this._activeElement || this._getActive();
		      if (!element) {
		        return;
		      }
		      const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
		      this._config.interval = elementInterval || this._config.defaultInterval;
		    }
		    _slide(order, element = null) {
		      if (this._isSliding) {
		        return;
		      }
		      const activeElement = this._getActive();
		      const isNext = order === ORDER_NEXT;
		      const nextElement = element || index.getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
		      if (nextElement === activeElement) {
		        return;
		      }
		      const nextElementIndex = this._getItemIndex(nextElement);
		      const triggerEvent = eventName => {
		        return EventHandler__default.default.trigger(this._element, eventName, {
		          relatedTarget: nextElement,
		          direction: this._orderToDirection(order),
		          from: this._getItemIndex(activeElement),
		          to: nextElementIndex
		        });
		      };
		      const slideEvent = triggerEvent(EVENT_SLIDE);
		      if (slideEvent.defaultPrevented) {
		        return;
		      }
		      if (!activeElement || !nextElement) {
		        // Some weirdness is happening, so we bail
		        // todo: change tests that use empty divs to avoid this check
		        return;
		      }
		      const isCycling = Boolean(this._interval);
		      this.pause();
		      this._isSliding = true;
		      this._setActiveIndicatorElement(nextElementIndex);
		      this._activeElement = nextElement;
		      const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
		      const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
		      nextElement.classList.add(orderClassName);
		      index.reflow(nextElement);
		      activeElement.classList.add(directionalClassName);
		      nextElement.classList.add(directionalClassName);
		      const completeCallBack = () => {
		        nextElement.classList.remove(directionalClassName, orderClassName);
		        nextElement.classList.add(CLASS_NAME_ACTIVE);
		        activeElement.classList.remove(CLASS_NAME_ACTIVE, orderClassName, directionalClassName);
		        this._isSliding = false;
		        triggerEvent(EVENT_SLID);
		      };
		      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
		      if (isCycling) {
		        this.cycle();
		      }
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_SLIDE);
		    }
		    _getActive() {
		      return SelectorEngine__default.default.findOne(SELECTOR_ACTIVE_ITEM, this._element);
		    }
		    _getItems() {
		      return SelectorEngine__default.default.find(SELECTOR_ITEM, this._element);
		    }
		    _clearInterval() {
		      if (this._interval) {
		        clearInterval(this._interval);
		        this._interval = null;
		      }
		    }
		    _directionToOrder(direction) {
		      if (index.isRTL()) {
		        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
		      }
		      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
		    }
		    _orderToDirection(order) {
		      if (index.isRTL()) {
		        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
		      }
		      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Carousel.getOrCreateInstance(this, config);
		        if (typeof config === 'number') {
		          data.to(config);
		          return;
		        }
		        if (typeof config === 'string') {
		          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_SLIDE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
		      return;
		    }
		    event.preventDefault();
		    const carousel = Carousel.getOrCreateInstance(target);
		    const slideIndex = this.getAttribute('data-bs-slide-to');
		    if (slideIndex) {
		      carousel.to(slideIndex);
		      carousel._maybeEnableCycle();
		      return;
		    }
		    if (Manipulator__default.default.getDataAttribute(this, 'slide') === 'next') {
		      carousel.next();
		      carousel._maybeEnableCycle();
		      return;
		    }
		    carousel.prev();
		    carousel._maybeEnableCycle();
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    const carousels = SelectorEngine__default.default.find(SELECTOR_DATA_RIDE);
		    for (const carousel of carousels) {
		      Carousel.getOrCreateInstance(carousel);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Carousel);
		  return Carousel;
		});
	} (carousel$1));

	var carousel = carousel$1.exports;

	var collapse$1 = {exports: {}};

	/*!
	  * Bootstrap collapse.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): collapse.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'collapse';
		  const DATA_KEY = 'bs.collapse';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_COLLAPSE = 'collapse';
		  const CLASS_NAME_COLLAPSING = 'collapsing';
		  const CLASS_NAME_COLLAPSED = 'collapsed';
		  const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
		  const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
		  const WIDTH = 'width';
		  const HEIGHT = 'height';
		  const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="collapse"]';
		  const Default = {
		    parent: null,
		    toggle: true
		  };
		  const DefaultType = {
		    parent: '(null|element)',
		    toggle: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Collapse extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isTransitioning = false;
		      this._triggerArray = [];
		      const toggleList = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE);
		      for (const elem of toggleList) {
		        const selector = index.getSelectorFromElement(elem);
		        const filterElement = SelectorEngine__default.default.find(selector).filter(foundElement => foundElement === this._element);
		        if (selector !== null && filterElement.length) {
		          this._triggerArray.push(elem);
		        }
		      }
		      this._initializeChildren();
		      if (!this._config.parent) {
		        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
		      }
		      if (this._config.toggle) {
		        this.toggle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      if (this._isShown()) {
		        this.hide();
		      } else {
		        this.show();
		      }
		    }
		    show() {
		      if (this._isTransitioning || this._isShown()) {
		        return;
		      }
		      let activeChildren = []; // find active children

		      if (this._config.parent) {
		        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(element => element !== this._element).map(element => Collapse.getOrCreateInstance(element, {
		          toggle: false
		        }));
		      }
		      if (activeChildren.length && activeChildren[0]._isTransitioning) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      for (const activeInstance of activeChildren) {
		        activeInstance.hide();
		      }
		      const dimension = this._getDimension();
		      this._element.classList.remove(CLASS_NAME_COLLAPSE);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.style[dimension] = 0;
		      this._addAriaAndCollapsedClass(this._triggerArray, true);
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		        this._element.style[dimension] = '';
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
		      };
		      const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
		      const scrollSize = `scroll${capitalizedDimension}`;
		      this._queueCallback(complete, this._element, true);
		      this._element.style[dimension] = `${this._element[scrollSize]}px`;
		    }
		    hide() {
		      if (this._isTransitioning || !this._isShown()) {
		        return;
		      }
		      const startEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (startEvent.defaultPrevented) {
		        return;
		      }
		      const dimension = this._getDimension();
		      this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_COLLAPSING);
		      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW);
		      for (const trigger of this._triggerArray) {
		        const element = index.getElementFromSelector(trigger);
		        if (element && !this._isShown(element)) {
		          this._addAriaAndCollapsedClass([trigger], false);
		        }
		      }
		      this._isTransitioning = true;
		      const complete = () => {
		        this._isTransitioning = false;
		        this._element.classList.remove(CLASS_NAME_COLLAPSING);
		        this._element.classList.add(CLASS_NAME_COLLAPSE);
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.style[dimension] = '';
		      this._queueCallback(complete, this._element, true);
		    }
		    _isShown(element = this._element) {
		      return element.classList.contains(CLASS_NAME_SHOW);
		    } // Private

		    _configAfterMerge(config) {
		      config.toggle = Boolean(config.toggle); // Coerce string values

		      config.parent = index.getElement(config.parent);
		      return config;
		    }
		    _getDimension() {
		      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
		    }
		    _initializeChildren() {
		      if (!this._config.parent) {
		        return;
		      }
		      const children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE);
		      for (const element of children) {
		        const selected = index.getElementFromSelector(element);
		        if (selected) {
		          this._addAriaAndCollapsedClass([element], this._isShown(selected));
		        }
		      }
		    }
		    _getFirstLevelChildren(selector) {
		      const children = SelectorEngine__default.default.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent); // remove children if greater depth

		      return SelectorEngine__default.default.find(selector, this._config.parent).filter(element => !children.includes(element));
		    }
		    _addAriaAndCollapsedClass(triggerArray, isOpen) {
		      if (!triggerArray.length) {
		        return;
		      }
		      for (const element of triggerArray) {
		        element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
		        element.setAttribute('aria-expanded', isOpen);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      const _config = {};
		      if (typeof config === 'string' && /show|hide/.test(config)) {
		        _config.toggle = false;
		      }
		      return this.each(function () {
		        const data = Collapse.getOrCreateInstance(this, _config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config]();
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
		    if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
		      event.preventDefault();
		    }
		    const selector = index.getSelectorFromElement(this);
		    const selectorElements = SelectorEngine__default.default.find(selector);
		    for (const element of selectorElements) {
		      Collapse.getOrCreateInstance(element, {
		        toggle: false
		      }).toggle();
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Collapse);
		  return Collapse;
		});
	} (collapse$1));

	var collapse = collapse$1.exports;

	var dropdown$1 = {exports: {}};

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }
	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }
	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}
	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}
	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }
	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]

	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];
	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}
	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;
	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }
	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }
	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getUAString() {
	  var uaData = navigator.userAgentData;
	  if (uaData != null && uaData.brands) {
	    return uaData.brands.map(function (item) {
	      return item.brand + "/" + item.version;
	    }).join(' ');
	  }
	  return navigator.userAgent;
	}

	function isLayoutViewport() {
	  return !/^((?!chrome|android).)*safari/i.test(getUAString());
	}

	function getBoundingClientRect(element, includeScale, isFixedStrategy) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }
	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }
	  var clientRect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;
	  if (includeScale && isHTMLElement(element)) {
	    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
	    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
	  }
	  var _ref = isElement(element) ? getWindow(element) : window,
	    visualViewport = _ref.visualViewport;
	  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
	  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
	  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
	  var width = clientRect.width / scaleX;
	  var height = clientRect.height / scaleY;
	  return {
	    width: width,
	    height: height,
	    top: y,
	    right: x + width,
	    bottom: y + height,
	    left: x,
	    x: x,
	    y: y
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;
	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }
	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }
	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	    var next = child;
	    do {
	      if (next && parent.isSameNode(next)) {
	        return true;
	      } // $FlowFixMe[prop-missing]: need a better way to handle this...

	      next = next.parentNode || next.host;
	    } while (next);
	  } // Give up, the result is false

	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument :
	  // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }
	  return (
	    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot ||
	    // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || (
	    // DOM Element detected
	    isShadowRoot(element) ? element.host : null) ||
	    // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback
	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) ||
	  // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }
	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block

	function getContainingBlock(element) {
	  var isFirefox = /firefox/i.test(getUAString());
	  var isIE = /Trident/i.test(getUAString());
	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);
	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }
	  var currentNode = getParentNode(element);
	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }
	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }
	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.

	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }
	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};
	function arrow(_ref) {
	  var _state$modifiersData$;
	  var state = _ref.state,
	    name = _ref.name,
	    options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';
	  if (!arrowElement || !popperOffsets) {
	    return;
	  }
	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}
	function effect$1(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options;
	  var _options$element = options.element,
	    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
	  if (arrowElement == null) {
	    return;
	  } // CSS selector

	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);
	    if (!arrowElement) {
	      return;
	    }
	  }
	  if (!contains(state.elements.popper, arrowElement)) {
	    return;
	  }
	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules

	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	    y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}
	function mapToStyles(_ref2) {
	  var _Object$assign2;
	  var popper = _ref2.popper,
	    popperRect = _ref2.popperRect,
	    placement = _ref2.placement,
	    variation = _ref2.variation,
	    offsets = _ref2.offsets,
	    position = _ref2.position,
	    gpuAcceleration = _ref2.gpuAcceleration,
	    adaptive = _ref2.adaptive,
	    roundOffsets = _ref2.roundOffsets,
	    isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	    x = _offsets$x === void 0 ? 0 : _offsets$x,
	    _offsets$y = offsets.y,
	    y = _offsets$y === void 0 ? 0 : _offsets$y;
	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;
	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';
	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);
	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

	    offsetParent = offsetParent;
	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
	      // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }
	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
	      // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }
	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);
	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };
	  x = _ref4.x;
	  y = _ref4.y;
	  if (gpuAcceleration) {
	    var _Object$assign;
	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }
	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}
	function computeStyles(_ref5) {
	  var state = _ref5.state,
	    options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	    _options$adaptive = options.adaptive,
	    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	    _options$roundOffsets = options.roundOffsets,
	    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };
	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }
	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};
	function effect(_ref) {
	  var state = _ref.state,
	    instance = _ref.instance,
	    options = _ref.options;
	  var _options$scroll = options.scroll,
	    scroll = _options$scroll === void 0 ? true : _options$scroll,
	    _options$resize = options.resize,
	    resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }
	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }
	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }
	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules

	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element, strategy) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0;
	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    var layoutViewport = isLayoutViewport();
	    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;
	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;
	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }
	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	    overflow = _getComputedStyle.overflow,
	    overflowX = _getComputedStyle.overflowX,
	    overflowY = _getComputedStyle.overflowY;
	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }
	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }
	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;
	  if (list === void 0) {
	    list = [];
	  }
	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList :
	  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element, strategy) {
	  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}
	function getClientRectFromMixedType(element, clippingParent, strategy) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`

	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents

	function getClippingRect(element, boundary, rootBoundary, strategy) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	    element = _ref.element,
	    placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;
	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;
	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;
	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;
	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }
	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    _options$placement = _options.placement,
	    placement = _options$placement === void 0 ? state.placement : _options$placement,
	    _options$strategy = _options.strategy,
	    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
	    _options$boundary = _options.boundary,
	    boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	    _options$rootBoundary = _options.rootBoundary,
	    rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	    _options$elementConte = _options.elementContext,
	    elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	    _options$altBoundary = _options.altBoundary,
	    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	    _options$padding = _options.padding,
	    padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }
	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  var _options = options,
	    placement = _options.placement,
	    boundary = _options.boundary,
	    rootBoundary = _options.rootBoundary,
	    padding = _options.padding,
	    flipVariations = _options.flipVariations,
	    _options$allowedAutoP = _options.allowedAutoPlacements,
	    allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });
	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }
	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}
	function flip(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  if (state.modifiersData[name]._skip) {
	    return;
	  }
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	    specifiedFallbackPlacements = options.fallbackPlacements,
	    padding = options.padding,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    _options$flipVariatio = options.flipVariations,
	    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	    allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];
	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];
	    var _basePlacement = getBasePlacement(placement);
	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }
	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];
	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }
	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }
	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }
	    checksMap.set(placement, checks);
	  }
	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;
	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);
	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });
	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };
	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);
	      if (_ret === "break") break;
	    }
	  }
	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules

	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }
	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}
	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}
	function hide(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	      placement: placement
	    })) : offset,
	    skidding = _ref[0],
	    distance = _ref[1];
	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}
	function offset(_ref2) {
	  var state = _ref2.state,
	    options = _ref2.options,
	    name = _ref2.name;
	  var _options$offset = options.offset,
	    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	    x = _data$state$placement.x,
	    y = _data$state$placement.y;
	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	    name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules

	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	    options = _ref.options,
	    name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	    _options$altAxis = options.altAxis,
	    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	    boundary = options.boundary,
	    rootBoundary = options.rootBoundary,
	    altBoundary = options.altBoundary,
	    padding = options.padding,
	    _options$tether = options.tether,
	    tether = _options$tether === void 0 ? true : _options$tether,
	    _options$tetherOffset = options.tetherOffset,
	    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };
	  if (!popperOffsets) {
	    return;
	  }
	  if (checkMainAxis) {
	    var _offsetModifierState$;
	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }
	  if (checkAltAxis) {
	    var _offsetModifierState$2;
	    var _mainSide = mainAxis === 'x' ? top : left;
	    var _altSide = mainAxis === 'x' ? bottom : right;
	    var _offset = popperOffsets[altAxis];
	    var _len = altAxis === 'y' ? 'height' : 'width';
	    var _min = _offset + overflow[_mainSide];
	    var _max = _offset - overflow[_altSide];
	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }
	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules

	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.

	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' ||
	    // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }
	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);
	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }
	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}
	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }
	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};
	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}
	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }
	  var _generatorOptions = generatorOptions,
	    _generatorOptions$def = _generatorOptions.defaultModifiers,
	    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	    _generatorOptions$def2 = _generatorOptions.defaultOptions,
	    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }
	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned
	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }
	        var _state$elements = state.elements,
	          reference = _state$elements.reference,
	          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          return;
	        } // Store the reference and popper rects to be read by modifiers

	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }
	          var _state$orderedModifie = state.orderedModifiers[index],
	            fn = _state$orderedModifie.fn,
	            _state$orderedModifie2 = _state$orderedModifie.options,
	            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	            name = _state$orderedModifie.name;
	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };
	    if (!areValidElements(reference, popper)) {
	      return instance;
	    }
	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	          _ref3$options = _ref3.options,
	          options = _ref3$options === void 0 ? {} : _ref3$options,
	          effect = _ref3.effect;
	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });
	          var noopFn = function noopFn() {};
	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }
	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }
	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper$2,
		createPopper: createPopper,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib);

	/*!
	  * Bootstrap dropdown.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireUtil(), requireEventHandler(), requireManipulator(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (Popper, index, EventHandler, Manipulator, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  function _interopNamespace(e) {
		    if (e && e.__esModule) return e;
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): dropdown.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'dropdown';
		  const DATA_KEY = 'bs.dropdown';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const TAB_KEY = 'Tab';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_DROPUP = 'dropup';
		  const CLASS_NAME_DROPEND = 'dropend';
		  const CLASS_NAME_DROPSTART = 'dropstart';
		  const CLASS_NAME_DROPUP_CENTER = 'dropup-center';
		  const CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
		  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
		  const SELECTOR_MENU = '.dropdown-menu';
		  const SELECTOR_NAVBAR = '.navbar';
		  const SELECTOR_NAVBAR_NAV = '.navbar-nav';
		  const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
		  const PLACEMENT_TOP = index.isRTL() ? 'top-end' : 'top-start';
		  const PLACEMENT_TOPEND = index.isRTL() ? 'top-start' : 'top-end';
		  const PLACEMENT_BOTTOM = index.isRTL() ? 'bottom-end' : 'bottom-start';
		  const PLACEMENT_BOTTOMEND = index.isRTL() ? 'bottom-start' : 'bottom-end';
		  const PLACEMENT_RIGHT = index.isRTL() ? 'left-start' : 'right-start';
		  const PLACEMENT_LEFT = index.isRTL() ? 'right-start' : 'left-start';
		  const PLACEMENT_TOPCENTER = 'top';
		  const PLACEMENT_BOTTOMCENTER = 'bottom';
		  const Default = {
		    autoClose: true,
		    boundary: 'clippingParents',
		    display: 'dynamic',
		    offset: [0, 2],
		    popperConfig: null,
		    reference: 'toggle'
		  };
		  const DefaultType = {
		    autoClose: '(boolean|string)',
		    boundary: '(string|element)',
		    display: 'string',
		    offset: '(array|string|function)',
		    popperConfig: '(null|object|function)',
		    reference: '(string|element|object)'
		  };
		  /**
		   * Class definition
		   */

		  class Dropdown extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._popper = null;
		      this._parent = this._element.parentNode; // dropdown wrapper
		      // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      this._menu = SelectorEngine__default.default.next(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine__default.default.findOne(SELECTOR_MENU, this._parent);
		      this._inNavbar = this._detectNavbar();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle() {
		      return this._isShown() ? this.hide() : this.show();
		    }
		    show() {
		      if (index.isDisabled(this._element) || this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, relatedTarget);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._createPopper(); // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

		      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.on(element, 'mouseover', index.noop);
		        }
		      }
		      this._element.focus();
		      this._element.setAttribute('aria-expanded', true);
		      this._menu.classList.add(CLASS_NAME_SHOW);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      EventHandler__default.default.trigger(this._element, EVENT_SHOWN, relatedTarget);
		    }
		    hide() {
		      if (index.isDisabled(this._element) || !this._isShown()) {
		        return;
		      }
		      const relatedTarget = {
		        relatedTarget: this._element
		      };
		      this._completeHide(relatedTarget);
		    }
		    dispose() {
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      super.dispose();
		    }
		    update() {
		      this._inNavbar = this._detectNavbar();
		      if (this._popper) {
		        this._popper.update();
		      }
		    } // Private

		    _completeHide(relatedTarget) {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE, relatedTarget);
		      if (hideEvent.defaultPrevented) {
		        return;
		      } // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.off(element, 'mouseover', index.noop);
		        }
		      }
		      if (this._popper) {
		        this._popper.destroy();
		      }
		      this._menu.classList.remove(CLASS_NAME_SHOW);
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._element.setAttribute('aria-expanded', 'false');
		      Manipulator__default.default.removeDataAttribute(this._menu, 'popper');
		      EventHandler__default.default.trigger(this._element, EVENT_HIDDEN, relatedTarget);
		    }
		    _getConfig(config) {
		      config = super._getConfig(config);
		      if (typeof config.reference === 'object' && !index.isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
		        // Popper virtual elements require a getBoundingClientRect method
		        throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
		      }
		      return config;
		    }
		    _createPopper() {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
		      }
		      let referenceElement = this._element;
		      if (this._config.reference === 'parent') {
		        referenceElement = this._parent;
		      } else if (index.isElement(this._config.reference)) {
		        referenceElement = index.getElement(this._config.reference);
		      } else if (typeof this._config.reference === 'object') {
		        referenceElement = this._config.reference;
		      }
		      const popperConfig = this._getPopperConfig();
		      this._popper = Popper__namespace.createPopper(referenceElement, this._menu, popperConfig);
		    }
		    _isShown() {
		      return this._menu.classList.contains(CLASS_NAME_SHOW);
		    }
		    _getPlacement() {
		      const parentDropdown = this._parent;
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
		        return PLACEMENT_RIGHT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
		        return PLACEMENT_LEFT;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
		        return PLACEMENT_TOPCENTER;
		      }
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
		        return PLACEMENT_BOTTOMCENTER;
		      } // We need to trim the value because custom properties can also include spaces

		      const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
		      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
		        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
		      }
		      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
		    }
		    _detectNavbar() {
		      return this._element.closest(SELECTOR_NAVBAR) !== null;
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _getPopperConfig() {
		      const defaultBsPopperConfig = {
		        placement: this._getPlacement(),
		        modifiers: [{
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }]
		      }; // Disable Popper if we have a static display or Dropdown is in Navbar

		      if (this._inNavbar || this._config.display === 'static') {
		        Manipulator__default.default.setDataAttribute(this._menu, 'popper', 'static'); // todo:v6 remove

		        defaultBsPopperConfig.modifiers = [{
		          name: 'applyStyles',
		          enabled: false
		        }];
		      }
		      return {
		        ...defaultBsPopperConfig,
		        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
		      };
		    }
		    _selectMenuItem({
		      key,
		      target
		    }) {
		      const items = SelectorEngine__default.default.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(element => index.isVisible(element));
		      if (!items.length) {
		        return;
		      } // if target isn't included in items (e.g. when expanding the dropdown)
		      // allow cycling to get the last item in case key equals ARROW_UP_KEY

		      index.getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Dropdown.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		    static clearMenus(event) {
		      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
		        return;
		      }
		      const openToggles = SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_SHOWN);
		      for (const toggle of openToggles) {
		        const context = Dropdown.getInstance(toggle);
		        if (!context || context._config.autoClose === false) {
		          continue;
		        }
		        const composedPath = event.composedPath();
		        const isMenuTarget = composedPath.includes(context._menu);
		        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
		          continue;
		        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu

		        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY || /input|select|option|textarea|form/i.test(event.target.tagName))) {
		          continue;
		        }
		        const relatedTarget = {
		          relatedTarget: context._element
		        };
		        if (event.type === 'click') {
		          relatedTarget.clickEvent = event;
		        }
		        context._completeHide(relatedTarget);
		      }
		    }
		    static dataApiKeydownHandler(event) {
		      // If not an UP | DOWN | ESCAPE key => not a dropdown command
		      // If input/textarea && if key is other than ESCAPE => not a dropdown command
		      const isInput = /input|textarea/i.test(event.target.tagName);
		      const isEscapeEvent = event.key === ESCAPE_KEY;
		      const isUpOrDownEvent = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key);
		      if (!isUpOrDownEvent && !isEscapeEvent) {
		        return;
		      }
		      if (isInput && !isEscapeEvent) {
		        return;
		      }
		      event.preventDefault(); // todo: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.2/forms/input-group/

		      const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine__default.default.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine__default.default.findOne(SELECTOR_DATA_TOGGLE, event.delegateTarget.parentNode);
		      const instance = Dropdown.getOrCreateInstance(getToggleButton);
		      if (isUpOrDownEvent) {
		        event.stopPropagation();
		        instance.show();
		        instance._selectMenuItem(event);
		        return;
		      }
		      if (instance._isShown()) {
		        // else is escape and we check if it is shown
		        event.stopPropagation();
		        instance.hide();
		        getToggleButton.focus();
		      }
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    event.preventDefault();
		    Dropdown.getOrCreateInstance(this).toggle();
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Dropdown);
		  return Dropdown;
		});
	} (dropdown$1));

	var dropdown = /*@__PURE__*/getDefaultExportFromCjs(dropdown$1.exports);

	var modal$1 = {exports: {}};

	var scrollbar = {exports: {}};

	/*!
	  * Bootstrap scrollbar.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredScrollbar;

	function requireScrollbar () {
		if (hasRequiredScrollbar) return scrollbar.exports;
		hasRequiredScrollbar = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSelectorEngine(), requireManipulator(), requireUtil()) ;
			})(commonjsGlobal, function (SelectorEngine, Manipulator, index) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/scrollBar.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
			  const SELECTOR_STICKY_CONTENT = '.sticky-top';
			  const PROPERTY_PADDING = 'padding-right';
			  const PROPERTY_MARGIN = 'margin-right';
			  /**
			   * Class definition
			   */

			  class ScrollBarHelper {
			    constructor() {
			      this._element = document.body;
			    } // Public

			    getWidth() {
			      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
			      const documentWidth = document.documentElement.clientWidth;
			      return Math.abs(window.innerWidth - documentWidth);
			    }
			    hide() {
			      const width = this.getWidth();
			      this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width

			      this._setElementAttributes(this._element, PROPERTY_PADDING, calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth

			      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, calculatedValue => calculatedValue + width);
			      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, calculatedValue => calculatedValue - width);
			    }
			    reset() {
			      this._resetElementAttributes(this._element, 'overflow');
			      this._resetElementAttributes(this._element, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
			      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
			    }
			    isOverflowing() {
			      return this.getWidth() > 0;
			    } // Private

			    _disableOverFlow() {
			      this._saveInitialAttribute(this._element, 'overflow');
			      this._element.style.overflow = 'hidden';
			    }
			    _setElementAttributes(selector, styleProperty, callback) {
			      const scrollbarWidth = this.getWidth();
			      const manipulationCallBack = element => {
			        if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
			          return;
			        }
			        this._saveInitialAttribute(element, styleProperty);
			        const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
			        element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _saveInitialAttribute(element, styleProperty) {
			      const actualValue = element.style.getPropertyValue(styleProperty);
			      if (actualValue) {
			        Manipulator__default.default.setDataAttribute(element, styleProperty, actualValue);
			      }
			    }
			    _resetElementAttributes(selector, styleProperty) {
			      const manipulationCallBack = element => {
			        const value = Manipulator__default.default.getDataAttribute(element, styleProperty); // We only want to remove the property if the value is `null`; the value can also be zero

			        if (value === null) {
			          element.style.removeProperty(styleProperty);
			          return;
			        }
			        Manipulator__default.default.removeDataAttribute(element, styleProperty);
			        element.style.setProperty(styleProperty, value);
			      };
			      this._applyManipulationCallback(selector, manipulationCallBack);
			    }
			    _applyManipulationCallback(selector, callBack) {
			      if (index.isElement(selector)) {
			        callBack(selector);
			        return;
			      }
			      for (const sel of SelectorEngine__default.default.find(selector, this._element)) {
			        callBack(sel);
			      }
			    }
			  }
			  return ScrollBarHelper;
			});
	} (scrollbar));
		return scrollbar.exports;
	}

	var backdrop = {exports: {}};

	/*!
	  * Bootstrap backdrop.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredBackdrop;

	function requireBackdrop () {
		if (hasRequiredBackdrop) return backdrop.exports;
		hasRequiredBackdrop = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireUtil(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, index, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/backdrop.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'backdrop';
			  const CLASS_NAME_FADE = 'fade';
			  const CLASS_NAME_SHOW = 'show';
			  const EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
			  const Default = {
			    className: 'modal-backdrop',
			    clickCallback: null,
			    isAnimated: false,
			    isVisible: true,
			    // if false, we use the backdrop helper without adding any element to the dom
			    rootElement: 'body' // give the choice to place backdrop under different elements
			  };

			  const DefaultType = {
			    className: 'string',
			    clickCallback: '(function|null)',
			    isAnimated: 'boolean',
			    isVisible: 'boolean',
			    rootElement: '(element|string)'
			  };
			  /**
			   * Class definition
			   */

			  class Backdrop extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isAppended = false;
			      this._element = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    show(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._append();
			      const element = this._getElement();
			      if (this._config.isAnimated) {
			        index.reflow(element);
			      }
			      element.classList.add(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        index.execute(callback);
			      });
			    }
			    hide(callback) {
			      if (!this._config.isVisible) {
			        index.execute(callback);
			        return;
			      }
			      this._getElement().classList.remove(CLASS_NAME_SHOW);
			      this._emulateAnimation(() => {
			        this.dispose();
			        index.execute(callback);
			      });
			    }
			    dispose() {
			      if (!this._isAppended) {
			        return;
			      }
			      EventHandler__default.default.off(this._element, EVENT_MOUSEDOWN);
			      this._element.remove();
			      this._isAppended = false;
			    } // Private

			    _getElement() {
			      if (!this._element) {
			        const backdrop = document.createElement('div');
			        backdrop.className = this._config.className;
			        if (this._config.isAnimated) {
			          backdrop.classList.add(CLASS_NAME_FADE);
			        }
			        this._element = backdrop;
			      }
			      return this._element;
			    }
			    _configAfterMerge(config) {
			      // use getElement() with the default "body" to get a fresh Element on each instantiation
			      config.rootElement = index.getElement(config.rootElement);
			      return config;
			    }
			    _append() {
			      if (this._isAppended) {
			        return;
			      }
			      const element = this._getElement();
			      this._config.rootElement.append(element);
			      EventHandler__default.default.on(element, EVENT_MOUSEDOWN, () => {
			        index.execute(this._config.clickCallback);
			      });
			      this._isAppended = true;
			    }
			    _emulateAnimation(callback) {
			      index.executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
			    }
			  }
			  return Backdrop;
			});
	} (backdrop));
		return backdrop.exports;
	}

	var focustrap = {exports: {}};

	/*!
	  * Bootstrap focustrap.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredFocustrap;

	function requireFocustrap () {
		if (hasRequiredFocustrap) return focustrap.exports;
		hasRequiredFocustrap = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireEventHandler(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (EventHandler, SelectorEngine, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/focustrap.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'focustrap';
			  const DATA_KEY = 'bs.focustrap';
			  const EVENT_KEY = `.${DATA_KEY}`;
			  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
			  const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
			  const TAB_KEY = 'Tab';
			  const TAB_NAV_FORWARD = 'forward';
			  const TAB_NAV_BACKWARD = 'backward';
			  const Default = {
			    autofocus: true,
			    trapElement: null // The element to trap focus inside of
			  };

			  const DefaultType = {
			    autofocus: 'boolean',
			    trapElement: 'element'
			  };
			  /**
			   * Class definition
			   */

			  class FocusTrap extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			      this._isActive = false;
			      this._lastTabNavDirection = null;
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    activate() {
			      if (this._isActive) {
			        return;
			      }
			      if (this._config.autofocus) {
			        this._config.trapElement.focus();
			      }
			      EventHandler__default.default.off(document, EVENT_KEY); // guard against infinite focus loop

			      EventHandler__default.default.on(document, EVENT_FOCUSIN, event => this._handleFocusin(event));
			      EventHandler__default.default.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
			      this._isActive = true;
			    }
			    deactivate() {
			      if (!this._isActive) {
			        return;
			      }
			      this._isActive = false;
			      EventHandler__default.default.off(document, EVENT_KEY);
			    } // Private

			    _handleFocusin(event) {
			      const {
			        trapElement
			      } = this._config;
			      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
			        return;
			      }
			      const elements = SelectorEngine__default.default.focusableChildren(trapElement);
			      if (elements.length === 0) {
			        trapElement.focus();
			      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
			        elements[elements.length - 1].focus();
			      } else {
			        elements[0].focus();
			      }
			    }
			    _handleKeydown(event) {
			      if (event.key !== TAB_KEY) {
			        return;
			      }
			      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
			    }
			  }
			  return FocusTrap;
			});
	} (focustrap));
		return focustrap.exports;
	}

	/*!
	  * Bootstrap modal.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireScrollbar(), requireBaseComponent(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, ScrollBarHelper, BaseComponent, Backdrop, FocusTrap, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): modal.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'modal';
		  const DATA_KEY = 'bs.modal';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const ESCAPE_KEY = 'Escape';
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
		  const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_OPEN = 'modal-open';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_STATIC = 'modal-static';
		  const OPEN_SELECTOR = '.modal.show';
		  const SELECTOR_DIALOG = '.modal-dialog';
		  const SELECTOR_MODAL_BODY = '.modal-body';
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="modal"]';
		  const Default = {
		    backdrop: true,
		    focus: true,
		    keyboard: true
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    focus: 'boolean',
		    keyboard: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Modal extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._dialog = SelectorEngine__default.default.findOne(SELECTOR_DIALOG, this._element);
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._isShown = false;
		      this._isTransitioning = false;
		      this._scrollBar = new ScrollBarHelper__default.default();
		      this._addEventListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown || this._isTransitioning) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._isTransitioning = true;
		      this._scrollBar.hide();
		      document.body.classList.add(CLASS_NAME_OPEN);
		      this._adjustDialog();
		      this._backdrop.show(() => this._showElement(relatedTarget));
		    }
		    hide() {
		      if (!this._isShown || this._isTransitioning) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = false;
		      this._isTransitioning = true;
		      this._focustrap.deactivate();
		      this._element.classList.remove(CLASS_NAME_SHOW);
		      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated());
		    }
		    dispose() {
		      for (const htmlElement of [window, this._dialog]) {
		        EventHandler__default.default.off(htmlElement, EVENT_KEY);
		      }
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    }
		    handleUpdate() {
		      this._adjustDialog();
		    } // Private

		    _initializeBackDrop() {
		      return new Backdrop__default.default({
		        isVisible: Boolean(this._config.backdrop),
		        // 'static' option will be translated to true, and booleans will keep their value,
		        isAnimated: this._isAnimated()
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }
		    _showElement(relatedTarget) {
		      // try to append dynamic modal
		      if (!document.body.contains(this._element)) {
		        document.body.append(this._element);
		      }
		      this._element.style.display = 'block';
		      this._element.removeAttribute('aria-hidden');
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.scrollTop = 0;
		      const modalBody = SelectorEngine__default.default.findOne(SELECTOR_MODAL_BODY, this._dialog);
		      if (modalBody) {
		        modalBody.scrollTop = 0;
		      }
		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW);
		      const transitionComplete = () => {
		        if (this._config.focus) {
		          this._focustrap.activate();
		        }
		        this._isTransitioning = false;
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
		    }
		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (this._config.keyboard) {
		          event.preventDefault();
		          this.hide();
		          return;
		        }
		        this._triggerBackdropTransition();
		      });
		      EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		        if (this._isShown && !this._isTransitioning) {
		          this._adjustDialog();
		        }
		      });
		      EventHandler__default.default.on(this._element, EVENT_MOUSEDOWN_DISMISS, event => {
		        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
		        EventHandler__default.default.one(this._element, EVENT_CLICK_DISMISS, event2 => {
		          if (this._element !== event.target || this._element !== event2.target) {
		            return;
		          }
		          if (this._config.backdrop === 'static') {
		            this._triggerBackdropTransition();
		            return;
		          }
		          if (this._config.backdrop) {
		            this.hide();
		          }
		        });
		      });
		    }
		    _hideModal() {
		      this._element.style.display = 'none';
		      this._element.setAttribute('aria-hidden', true);
		      this._element.removeAttribute('aria-modal');
		      this._element.removeAttribute('role');
		      this._isTransitioning = false;
		      this._backdrop.hide(() => {
		        document.body.classList.remove(CLASS_NAME_OPEN);
		        this._resetAdjustments();
		        this._scrollBar.reset();
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      });
		    }
		    _isAnimated() {
		      return this._element.classList.contains(CLASS_NAME_FADE);
		    }
		    _triggerBackdropTransition() {
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const initialOverflowY = this._element.style.overflowY; // return if the following background transition hasn't yet completed

		      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
		        return;
		      }
		      if (!isModalOverflowing) {
		        this._element.style.overflowY = 'hidden';
		      }
		      this._element.classList.add(CLASS_NAME_STATIC);
		      this._queueCallback(() => {
		        this._element.classList.remove(CLASS_NAME_STATIC);
		        this._queueCallback(() => {
		          this._element.style.overflowY = initialOverflowY;
		        }, this._dialog);
		      }, this._dialog);
		      this._element.focus();
		    }
		    /**
		     * The following methods are used to handle overflowing modals
		     */

		    _adjustDialog() {
		      const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
		      const scrollbarWidth = this._scrollBar.getWidth();
		      const isBodyOverflowing = scrollbarWidth > 0;
		      if (isBodyOverflowing && !isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingLeft' : 'paddingRight';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		      if (!isBodyOverflowing && isModalOverflowing) {
		        const property = index.isRTL() ? 'paddingRight' : 'paddingLeft';
		        this._element.style[property] = `${scrollbarWidth}px`;
		      }
		    }
		    _resetAdjustments() {
		      this._element.style.paddingLeft = '';
		      this._element.style.paddingRight = '';
		    } // Static

		    static jQueryInterface(config, relatedTarget) {
		      return this.each(function () {
		        const data = Modal.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](relatedTarget);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    EventHandler__default.default.one(target, EVENT_SHOW, showEvent => {
		      if (showEvent.defaultPrevented) {
		        // only register focus restorer if modal will actually get shown
		        return;
		      }
		      EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		        if (index.isVisible(this)) {
		          this.focus();
		        }
		      });
		    }); // avoid conflict when clicking modal toggler while another one is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
		    if (alreadyOpen) {
		      Modal.getInstance(alreadyOpen).hide();
		    }
		    const data = Modal.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  componentFunctions.enableDismissTrigger(Modal);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Modal);
		  return Modal;
		});
	} (modal$1));

	var modal = modal$1.exports;

	var offcanvas$1 = {exports: {}};

	/*!
	  * Bootstrap offcanvas.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireScrollbar(), requireEventHandler(), requireBaseComponent(), requireSelectorEngine(), requireBackdrop(), requireFocustrap(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, ScrollBarHelper, EventHandler, BaseComponent, SelectorEngine, Backdrop, FocusTrap, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const ScrollBarHelper__default = /*#__PURE__*/_interopDefaultLegacy(ScrollBarHelper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const Backdrop__default = /*#__PURE__*/_interopDefaultLegacy(Backdrop);
		  const FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): offcanvas.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'offcanvas';
		  const DATA_KEY = 'bs.offcanvas';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const ESCAPE_KEY = 'Escape';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const CLASS_NAME_HIDING = 'hiding';
		  const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
		  const OPEN_SELECTOR = '.offcanvas.show';
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_RESIZE = `resize${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
		  const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
		  const Default = {
		    backdrop: true,
		    keyboard: true,
		    scroll: false
		  };
		  const DefaultType = {
		    backdrop: '(boolean|string)',
		    keyboard: 'boolean',
		    scroll: 'boolean'
		  };
		  /**
		   * Class definition
		   */

		  class Offcanvas extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._isShown = false;
		      this._backdrop = this._initializeBackDrop();
		      this._focustrap = this._initializeFocusTrap();
		      this._addEventListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    toggle(relatedTarget) {
		      return this._isShown ? this.hide() : this.show(relatedTarget);
		    }
		    show(relatedTarget) {
		      if (this._isShown) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW, {
		        relatedTarget
		      });
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._isShown = true;
		      this._backdrop.show();
		      if (!this._config.scroll) {
		        new ScrollBarHelper__default.default().hide();
		      }
		      this._element.setAttribute('aria-modal', true);
		      this._element.setAttribute('role', 'dialog');
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      const completeCallBack = () => {
		        if (!this._config.scroll || this._config.backdrop) {
		          this._focustrap.activate();
		        }
		        this._element.classList.add(CLASS_NAME_SHOW);
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN, {
		          relatedTarget
		        });
		      };
		      this._queueCallback(completeCallBack, this._element, true);
		    }
		    hide() {
		      if (!this._isShown) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      this._focustrap.deactivate();
		      this._element.blur();
		      this._isShown = false;
		      this._element.classList.add(CLASS_NAME_HIDING);
		      this._backdrop.hide();
		      const completeCallback = () => {
		        this._element.classList.remove(CLASS_NAME_SHOW, CLASS_NAME_HIDING);
		        this._element.removeAttribute('aria-modal');
		        this._element.removeAttribute('role');
		        if (!this._config.scroll) {
		          new ScrollBarHelper__default.default().reset();
		        }
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._queueCallback(completeCallback, this._element, true);
		    }
		    dispose() {
		      this._backdrop.dispose();
		      this._focustrap.deactivate();
		      super.dispose();
		    } // Private

		    _initializeBackDrop() {
		      const clickCallback = () => {
		        if (this._config.backdrop === 'static') {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }
		        this.hide();
		      }; // 'static' option will be translated to true, and booleans will keep their value

		      const isVisible = Boolean(this._config.backdrop);
		      return new Backdrop__default.default({
		        className: CLASS_NAME_BACKDROP,
		        isVisible,
		        isAnimated: true,
		        rootElement: this._element.parentNode,
		        clickCallback: isVisible ? clickCallback : null
		      });
		    }
		    _initializeFocusTrap() {
		      return new FocusTrap__default.default({
		        trapElement: this._element
		      });
		    }
		    _addEventListeners() {
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
		        if (event.key !== ESCAPE_KEY) {
		          return;
		        }
		        if (!this._config.keyboard) {
		          EventHandler__default.default.trigger(this._element, EVENT_HIDE_PREVENTED);
		          return;
		        }
		        this.hide();
		      });
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Offcanvas.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config](this);
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    const target = index.getElementFromSelector(this);
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index.isDisabled(this)) {
		      return;
		    }
		    EventHandler__default.default.one(target, EVENT_HIDDEN, () => {
		      // focus on trigger when it is closed
		      if (index.isVisible(this)) {
		        this.focus();
		      }
		    }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

		    const alreadyOpen = SelectorEngine__default.default.findOne(OPEN_SELECTOR);
		    if (alreadyOpen && alreadyOpen !== target) {
		      Offcanvas.getInstance(alreadyOpen).hide();
		    }
		    const data = Offcanvas.getOrCreateInstance(target);
		    data.toggle(this);
		  });
		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const selector of SelectorEngine__default.default.find(OPEN_SELECTOR)) {
		      Offcanvas.getOrCreateInstance(selector).show();
		    }
		  });
		  EventHandler__default.default.on(window, EVENT_RESIZE, () => {
		    for (const element of SelectorEngine__default.default.find('[aria-modal][class*=show][class*=offcanvas-]')) {
		      if (getComputedStyle(element).position !== 'fixed') {
		        Offcanvas.getOrCreateInstance(element).hide();
		      }
		    }
		  });
		  componentFunctions.enableDismissTrigger(Offcanvas);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Offcanvas);
		  return Offcanvas;
		});
	} (offcanvas$1));

	var offcanvas = offcanvas$1.exports;

	var popover$1 = {exports: {}};

	var tooltip$1 = {exports: {}};

	var sanitizer = {exports: {}};

	/*!
	  * Bootstrap sanitizer.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredSanitizer;

	function requireSanitizer () {
		if (hasRequiredSanitizer) return sanitizer.exports;
		hasRequiredSanitizer = 1;
		(function (module, exports) {
			(function (global, factory) {
			  factory(exports) ;
			})(commonjsGlobal, function (exports) {

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/sanitizer.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
			  const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
			  /**
			   * A pattern that recognizes a commonly useful subset of URLs that are safe.
			   *
			   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
			   */

			  const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
			  /**
			   * A pattern that matches safe data URLs. Only matches image, video and audio types.
			   *
			   * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
			   */

			  const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
			  const allowedAttribute = (attribute, allowedAttributeList) => {
			    const attributeName = attribute.nodeName.toLowerCase();
			    if (allowedAttributeList.includes(attributeName)) {
			      if (uriAttributes.has(attributeName)) {
			        return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
			      }
			      return true;
			    } // Check if a regular expression validates the attribute.

			    return allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp).some(regex => regex.test(attributeName));
			  };
			  const DefaultAllowlist = {
			    // Global attributes allowed on any supplied element below.
			    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
			    a: ['target', 'href', 'title', 'rel'],
			    area: [],
			    b: [],
			    br: [],
			    col: [],
			    code: [],
			    div: [],
			    em: [],
			    hr: [],
			    h1: [],
			    h2: [],
			    h3: [],
			    h4: [],
			    h5: [],
			    h6: [],
			    i: [],
			    img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
			    li: [],
			    ol: [],
			    p: [],
			    pre: [],
			    s: [],
			    small: [],
			    span: [],
			    sub: [],
			    sup: [],
			    strong: [],
			    u: [],
			    ul: []
			  };
			  function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
			    if (!unsafeHtml.length) {
			      return unsafeHtml;
			    }
			    if (sanitizeFunction && typeof sanitizeFunction === 'function') {
			      return sanitizeFunction(unsafeHtml);
			    }
			    const domParser = new window.DOMParser();
			    const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
			    const elements = [].concat(...createdDocument.body.querySelectorAll('*'));
			    for (const element of elements) {
			      const elementName = element.nodeName.toLowerCase();
			      if (!Object.keys(allowList).includes(elementName)) {
			        element.remove();
			        continue;
			      }
			      const attributeList = [].concat(...element.attributes);
			      const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
			      for (const attribute of attributeList) {
			        if (!allowedAttribute(attribute, allowedAttributes)) {
			          element.removeAttribute(attribute.nodeName);
			        }
			      }
			    }
			    return createdDocument.body.innerHTML;
			  }
			  exports.DefaultAllowlist = DefaultAllowlist;
			  exports.sanitizeHtml = sanitizeHtml;
			  Object.defineProperties(exports, {
			    __esModule: {
			      value: true
			    },
			    [Symbol.toStringTag]: {
			      value: 'Module'
			    }
			  });
			});
	} (sanitizer, sanitizer.exports));
		return sanitizer.exports;
	}

	var templateFactory = {exports: {}};

	/*!
	  * Bootstrap template-factory.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	var hasRequiredTemplateFactory;

	function requireTemplateFactory () {
		if (hasRequiredTemplateFactory) return templateFactory.exports;
		hasRequiredTemplateFactory = 1;
		(function (module, exports) {
			(function (global, factory) {
			  module.exports = factory(requireSanitizer(), requireUtil(), requireSelectorEngine(), requireConfig()) ;
			})(commonjsGlobal, function (sanitizer, index, SelectorEngine, Config) {

			  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
			    default: e
			  };
			  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
			  const Config__default = /*#__PURE__*/_interopDefaultLegacy(Config);

			  /**
			   * --------------------------------------------------------------------------
			   * Bootstrap (v5.2.3): util/template-factory.js
			   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
			   * --------------------------------------------------------------------------
			   */
			  /**
			   * Constants
			   */

			  const NAME = 'TemplateFactory';
			  const Default = {
			    allowList: sanitizer.DefaultAllowlist,
			    content: {},
			    // { selector : text ,  selector2 : text2 , }
			    extraClass: '',
			    html: false,
			    sanitize: true,
			    sanitizeFn: null,
			    template: '<div></div>'
			  };
			  const DefaultType = {
			    allowList: 'object',
			    content: 'object',
			    extraClass: '(string|function)',
			    html: 'boolean',
			    sanitize: 'boolean',
			    sanitizeFn: '(null|function)',
			    template: 'string'
			  };
			  const DefaultContentType = {
			    entry: '(string|element|function|null)',
			    selector: '(string|element)'
			  };
			  /**
			   * Class definition
			   */

			  class TemplateFactory extends Config__default.default {
			    constructor(config) {
			      super();
			      this._config = this._getConfig(config);
			    } // Getters

			    static get Default() {
			      return Default;
			    }
			    static get DefaultType() {
			      return DefaultType;
			    }
			    static get NAME() {
			      return NAME;
			    } // Public

			    getContent() {
			      return Object.values(this._config.content).map(config => this._resolvePossibleFunction(config)).filter(Boolean);
			    }
			    hasContent() {
			      return this.getContent().length > 0;
			    }
			    changeContent(content) {
			      this._checkContent(content);
			      this._config.content = {
			        ...this._config.content,
			        ...content
			      };
			      return this;
			    }
			    toHtml() {
			      const templateWrapper = document.createElement('div');
			      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
			      for (const [selector, text] of Object.entries(this._config.content)) {
			        this._setContent(templateWrapper, text, selector);
			      }
			      const template = templateWrapper.children[0];
			      const extraClass = this._resolvePossibleFunction(this._config.extraClass);
			      if (extraClass) {
			        template.classList.add(...extraClass.split(' '));
			      }
			      return template;
			    } // Private

			    _typeCheckConfig(config) {
			      super._typeCheckConfig(config);
			      this._checkContent(config.content);
			    }
			    _checkContent(arg) {
			      for (const [selector, content] of Object.entries(arg)) {
			        super._typeCheckConfig({
			          selector,
			          entry: content
			        }, DefaultContentType);
			      }
			    }
			    _setContent(template, content, selector) {
			      const templateElement = SelectorEngine__default.default.findOne(selector, template);
			      if (!templateElement) {
			        return;
			      }
			      content = this._resolvePossibleFunction(content);
			      if (!content) {
			        templateElement.remove();
			        return;
			      }
			      if (index.isElement(content)) {
			        this._putElementInTemplate(index.getElement(content), templateElement);
			        return;
			      }
			      if (this._config.html) {
			        templateElement.innerHTML = this._maybeSanitize(content);
			        return;
			      }
			      templateElement.textContent = content;
			    }
			    _maybeSanitize(arg) {
			      return this._config.sanitize ? sanitizer.sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
			    }
			    _resolvePossibleFunction(arg) {
			      return typeof arg === 'function' ? arg(this) : arg;
			    }
			    _putElementInTemplate(element, templateElement) {
			      if (this._config.html) {
			        templateElement.innerHTML = '';
			        templateElement.append(element);
			        return;
			      }
			      templateElement.textContent = element.textContent;
			    }
			  }
			  return TemplateFactory;
			});
	} (templateFactory));
		return templateFactory.exports;
	}

	/*!
	  * Bootstrap tooltip.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(require$$0, requireUtil(), requireSanitizer(), requireEventHandler(), requireManipulator(), requireBaseComponent(), requireTemplateFactory()) ;
		})(commonjsGlobal, function (Popper, index, sanitizer, EventHandler, Manipulator, BaseComponent, TemplateFactory) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  function _interopNamespace(e) {
		    if (e && e.__esModule) return e;
		    const n = Object.create(null, {
		      [Symbol.toStringTag]: {
		        value: 'Module'
		      }
		    });
		    if (e) {
		      for (const k in e) {
		        if (k !== 'default') {
		          const d = Object.getOwnPropertyDescriptor(e, k);
		          Object.defineProperty(n, k, d.get ? d : {
		            enumerable: true,
		            get: () => e[k]
		          });
		        }
		      }
		    }
		    n.default = e;
		    return Object.freeze(n);
		  }
		  const Popper__namespace = /*#__PURE__*/_interopNamespace(Popper);
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const Manipulator__default = /*#__PURE__*/_interopDefaultLegacy(Manipulator);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
		  const TemplateFactory__default = /*#__PURE__*/_interopDefaultLegacy(TemplateFactory);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): tooltip.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'tooltip';
		  const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_MODAL = 'modal';
		  const CLASS_NAME_SHOW = 'show';
		  const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
		  const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
		  const EVENT_MODAL_HIDE = 'hide.bs.modal';
		  const TRIGGER_HOVER = 'hover';
		  const TRIGGER_FOCUS = 'focus';
		  const TRIGGER_CLICK = 'click';
		  const TRIGGER_MANUAL = 'manual';
		  const EVENT_HIDE = 'hide';
		  const EVENT_HIDDEN = 'hidden';
		  const EVENT_SHOW = 'show';
		  const EVENT_SHOWN = 'shown';
		  const EVENT_INSERTED = 'inserted';
		  const EVENT_CLICK = 'click';
		  const EVENT_FOCUSIN = 'focusin';
		  const EVENT_FOCUSOUT = 'focusout';
		  const EVENT_MOUSEENTER = 'mouseenter';
		  const EVENT_MOUSELEAVE = 'mouseleave';
		  const AttachmentMap = {
		    AUTO: 'auto',
		    TOP: 'top',
		    RIGHT: index.isRTL() ? 'left' : 'right',
		    BOTTOM: 'bottom',
		    LEFT: index.isRTL() ? 'right' : 'left'
		  };
		  const Default = {
		    allowList: sanitizer.DefaultAllowlist,
		    animation: true,
		    boundary: 'clippingParents',
		    container: false,
		    customClass: '',
		    delay: 0,
		    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
		    html: false,
		    offset: [0, 0],
		    placement: 'top',
		    popperConfig: null,
		    sanitize: true,
		    sanitizeFn: null,
		    selector: false,
		    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
		    title: '',
		    trigger: 'hover focus'
		  };
		  const DefaultType = {
		    allowList: 'object',
		    animation: 'boolean',
		    boundary: '(string|element)',
		    container: '(string|element|boolean)',
		    customClass: '(string|function)',
		    delay: '(number|object)',
		    fallbackPlacements: 'array',
		    html: 'boolean',
		    offset: '(array|string|function)',
		    placement: '(string|function)',
		    popperConfig: '(null|object|function)',
		    sanitize: 'boolean',
		    sanitizeFn: '(null|function)',
		    selector: '(string|boolean)',
		    template: 'string',
		    title: '(string|element|function)',
		    trigger: 'string'
		  };
		  /**
		   * Class definition
		   */

		  class Tooltip extends BaseComponent__default.default {
		    constructor(element, config) {
		      if (typeof Popper__namespace === 'undefined') {
		        throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
		      }
		      super(element, config); // Private

		      this._isEnabled = true;
		      this._timeout = 0;
		      this._isHovered = null;
		      this._activeTrigger = {};
		      this._popper = null;
		      this._templateFactory = null;
		      this._newContent = null; // Protected

		      this.tip = null;
		      this._setListeners();
		      if (!this._config.selector) {
		        this._fixTitle();
		      }
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    enable() {
		      this._isEnabled = true;
		    }
		    disable() {
		      this._isEnabled = false;
		    }
		    toggleEnabled() {
		      this._isEnabled = !this._isEnabled;
		    }
		    toggle() {
		      if (!this._isEnabled) {
		        return;
		      }
		      this._activeTrigger.click = !this._activeTrigger.click;
		      if (this._isShown()) {
		        this._leave();
		        return;
		      }
		      this._enter();
		    }
		    dispose() {
		      clearTimeout(this._timeout);
		      EventHandler__default.default.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		      if (this._element.getAttribute('data-bs-original-title')) {
		        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
		      }
		      this._disposePopper();
		      super.dispose();
		    }
		    show() {
		      if (this._element.style.display === 'none') {
		        throw new Error('Please use show on visible elements');
		      }
		      if (!(this._isWithContent() && this._isEnabled)) {
		        return;
		      }
		      const showEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOW));
		      const shadowRoot = index.findShadowRoot(this._element);
		      const isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
		      if (showEvent.defaultPrevented || !isInTheDom) {
		        return;
		      } // todo v6 remove this OR make it optional

		      this._disposePopper();
		      const tip = this._getTipElement();
		      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
		      const {
		        container
		      } = this._config;
		      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
		        container.append(tip);
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
		      }
		      this._popper = this._createPopper(tip);
		      tip.classList.add(CLASS_NAME_SHOW); // If this is a touch-enabled device we add extra
		      // empty mouseover listeners to the body's immediate children;
		      // only needed because of broken event delegation on iOS
		      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.on(element, 'mouseover', index.noop);
		        }
		      }
		      const complete = () => {
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_SHOWN));
		        if (this._isHovered === false) {
		          this._leave();
		        }
		        this._isHovered = false;
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    hide() {
		      if (!this._isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDE));
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const tip = this._getTipElement();
		      tip.classList.remove(CLASS_NAME_SHOW); // If this is a touch-enabled device we remove the extra
		      // empty mouseover listeners we added for iOS support

		      if ('ontouchstart' in document.documentElement) {
		        for (const element of [].concat(...document.body.children)) {
		          EventHandler__default.default.off(element, 'mouseover', index.noop);
		        }
		      }
		      this._activeTrigger[TRIGGER_CLICK] = false;
		      this._activeTrigger[TRIGGER_FOCUS] = false;
		      this._activeTrigger[TRIGGER_HOVER] = false;
		      this._isHovered = null; // it is a trick to support manual triggering

		      const complete = () => {
		        if (this._isWithActiveTrigger()) {
		          return;
		        }
		        if (!this._isHovered) {
		          this._disposePopper();
		        }
		        this._element.removeAttribute('aria-describedby');
		        EventHandler__default.default.trigger(this._element, this.constructor.eventName(EVENT_HIDDEN));
		      };
		      this._queueCallback(complete, this.tip, this._isAnimated());
		    }
		    update() {
		      if (this._popper) {
		        this._popper.update();
		      }
		    } // Protected

		    _isWithContent() {
		      return Boolean(this._getTitle());
		    }
		    _getTipElement() {
		      if (!this.tip) {
		        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
		      }
		      return this.tip;
		    }
		    _createTipElement(content) {
		      const tip = this._getTemplateFactory(content).toHtml(); // todo: remove this check on v6

		      if (!tip) {
		        return null;
		      }
		      tip.classList.remove(CLASS_NAME_FADE, CLASS_NAME_SHOW); // todo: on v6 the following can be achieved with CSS only

		      tip.classList.add(`bs-${this.constructor.NAME}-auto`);
		      const tipId = index.getUID(this.constructor.NAME).toString();
		      tip.setAttribute('id', tipId);
		      if (this._isAnimated()) {
		        tip.classList.add(CLASS_NAME_FADE);
		      }
		      return tip;
		    }
		    setContent(content) {
		      this._newContent = content;
		      if (this._isShown()) {
		        this._disposePopper();
		        this.show();
		      }
		    }
		    _getTemplateFactory(content) {
		      if (this._templateFactory) {
		        this._templateFactory.changeContent(content);
		      } else {
		        this._templateFactory = new TemplateFactory__default.default({
		          ...this._config,
		          // the `content` var has to be after `this._config`
		          // to override config.content in case of popover
		          content,
		          extraClass: this._resolvePossibleFunction(this._config.customClass)
		        });
		      }
		      return this._templateFactory;
		    }
		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TOOLTIP_INNER]: this._getTitle()
		      };
		    }
		    _getTitle() {
		      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
		    } // Private

		    _initializeOnDelegatedTarget(event) {
		      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
		    }
		    _isAnimated() {
		      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE);
		    }
		    _isShown() {
		      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW);
		    }
		    _createPopper(tip) {
		      const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;
		      const attachment = AttachmentMap[placement.toUpperCase()];
		      return Popper__namespace.createPopper(this._element, tip, this._getPopperConfig(attachment));
		    }
		    _getOffset() {
		      const {
		        offset
		      } = this._config;
		      if (typeof offset === 'string') {
		        return offset.split(',').map(value => Number.parseInt(value, 10));
		      }
		      if (typeof offset === 'function') {
		        return popperData => offset(popperData, this._element);
		      }
		      return offset;
		    }
		    _resolvePossibleFunction(arg) {
		      return typeof arg === 'function' ? arg.call(this._element) : arg;
		    }
		    _getPopperConfig(attachment) {
		      const defaultBsPopperConfig = {
		        placement: attachment,
		        modifiers: [{
		          name: 'flip',
		          options: {
		            fallbackPlacements: this._config.fallbackPlacements
		          }
		        }, {
		          name: 'offset',
		          options: {
		            offset: this._getOffset()
		          }
		        }, {
		          name: 'preventOverflow',
		          options: {
		            boundary: this._config.boundary
		          }
		        }, {
		          name: 'arrow',
		          options: {
		            element: `.${this.constructor.NAME}-arrow`
		          }
		        }, {
		          name: 'preSetPlacement',
		          enabled: true,
		          phase: 'beforeMain',
		          fn: data => {
		            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
		            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
		            this._getTipElement().setAttribute('data-popper-placement', data.state.placement);
		          }
		        }]
		      };
		      return {
		        ...defaultBsPopperConfig,
		        ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
		      };
		    }
		    _setListeners() {
		      const triggers = this._config.trigger.split(' ');
		      for (const trigger of triggers) {
		        if (trigger === 'click') {
		          EventHandler__default.default.on(this._element, this.constructor.eventName(EVENT_CLICK), this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context.toggle();
		          });
		        } else if (trigger !== TRIGGER_MANUAL) {
		          const eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN);
		          const eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT);
		          EventHandler__default.default.on(this._element, eventIn, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
		            context._enter();
		          });
		          EventHandler__default.default.on(this._element, eventOut, this._config.selector, event => {
		            const context = this._initializeOnDelegatedTarget(event);
		            context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
		            context._leave();
		          });
		        }
		      }
		      this._hideModalHandler = () => {
		        if (this._element) {
		          this.hide();
		        }
		      };
		      EventHandler__default.default.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
		    }
		    _fixTitle() {
		      const title = this._element.getAttribute('title');
		      if (!title) {
		        return;
		      }
		      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
		        this._element.setAttribute('aria-label', title);
		      }
		      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility

		      this._element.removeAttribute('title');
		    }
		    _enter() {
		      if (this._isShown() || this._isHovered) {
		        this._isHovered = true;
		        return;
		      }
		      this._isHovered = true;
		      this._setTimeout(() => {
		        if (this._isHovered) {
		          this.show();
		        }
		      }, this._config.delay.show);
		    }
		    _leave() {
		      if (this._isWithActiveTrigger()) {
		        return;
		      }
		      this._isHovered = false;
		      this._setTimeout(() => {
		        if (!this._isHovered) {
		          this.hide();
		        }
		      }, this._config.delay.hide);
		    }
		    _setTimeout(handler, timeout) {
		      clearTimeout(this._timeout);
		      this._timeout = setTimeout(handler, timeout);
		    }
		    _isWithActiveTrigger() {
		      return Object.values(this._activeTrigger).includes(true);
		    }
		    _getConfig(config) {
		      const dataAttributes = Manipulator__default.default.getDataAttributes(this._element);
		      for (const dataAttribute of Object.keys(dataAttributes)) {
		        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
		          delete dataAttributes[dataAttribute];
		        }
		      }
		      config = {
		        ...dataAttributes,
		        ...(typeof config === 'object' && config ? config : {})
		      };
		      config = this._mergeConfigObj(config);
		      config = this._configAfterMerge(config);
		      this._typeCheckConfig(config);
		      return config;
		    }
		    _configAfterMerge(config) {
		      config.container = config.container === false ? document.body : index.getElement(config.container);
		      if (typeof config.delay === 'number') {
		        config.delay = {
		          show: config.delay,
		          hide: config.delay
		        };
		      }
		      if (typeof config.title === 'number') {
		        config.title = config.title.toString();
		      }
		      if (typeof config.content === 'number') {
		        config.content = config.content.toString();
		      }
		      return config;
		    }
		    _getDelegateConfig() {
		      const config = {};
		      for (const key in this._config) {
		        if (this.constructor.Default[key] !== this._config[key]) {
		          config[key] = this._config[key];
		        }
		      }
		      config.selector = false;
		      config.trigger = 'manual'; // In the future can be replaced with:
		      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
		      // `Object.fromEntries(keysWithDifferentValues)`

		      return config;
		    }
		    _disposePopper() {
		      if (this._popper) {
		        this._popper.destroy();
		        this._popper = null;
		      }
		      if (this.tip) {
		        this.tip.remove();
		        this.tip = null;
		      }
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tooltip.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Tooltip);
		  return Tooltip;
		});
	} (tooltip$1));

	var tooltip = /*@__PURE__*/getDefaultExportFromCjs(tooltip$1.exports);

	/*!
	  * Bootstrap popover.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), tooltip$1.exports) ;
		})(commonjsGlobal, function (index, Tooltip) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const Tooltip__default = /*#__PURE__*/_interopDefaultLegacy(Tooltip);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): popover.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'popover';
		  const SELECTOR_TITLE = '.popover-header';
		  const SELECTOR_CONTENT = '.popover-body';
		  const Default = {
		    ...Tooltip__default.default.Default,
		    content: '',
		    offset: [0, 8],
		    placement: 'right',
		    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
		    trigger: 'click'
		  };
		  const DefaultType = {
		    ...Tooltip__default.default.DefaultType,
		    content: '(null|string|element|function)'
		  };
		  /**
		   * Class definition
		   */

		  class Popover extends Tooltip__default.default {
		    // Getters
		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Overrides

		    _isWithContent() {
		      return this._getTitle() || this._getContent();
		    } // Private

		    _getContentForTemplate() {
		      return {
		        [SELECTOR_TITLE]: this._getTitle(),
		        [SELECTOR_CONTENT]: this._getContent()
		      };
		    }
		    _getContent() {
		      return this._resolvePossibleFunction(this._config.content);
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Popover.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (typeof data[config] === 'undefined') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Popover);
		  return Popover;
		});
	} (popover$1));

	var popover = popover$1.exports;

	var scrollspy$1 = {exports: {}};

	/*!
	  * Bootstrap scrollspy.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): scrollspy.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'scrollspy';
		  const DATA_KEY = 'bs.scrollspy';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const DATA_API_KEY = '.data-api';
		  const EVENT_ACTIVATE = `activate${EVENT_KEY}`;
		  const EVENT_CLICK = `click${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
		  const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
		  const CLASS_NAME_ACTIVE = 'active';
		  const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
		  const SELECTOR_TARGET_LINKS = '[href]';
		  const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
		  const SELECTOR_NAV_LINKS = '.nav-link';
		  const SELECTOR_NAV_ITEMS = '.nav-item';
		  const SELECTOR_LIST_ITEMS = '.list-group-item';
		  const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`;
		  const SELECTOR_DROPDOWN = '.dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const Default = {
		    offset: null,
		    // TODO: v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: '0px 0px -25%',
		    smoothScroll: false,
		    target: null,
		    threshold: [0.1, 0.5, 1]
		  };
		  const DefaultType = {
		    offset: '(number|null)',
		    // TODO v6 @deprecated, keep it for backwards compatibility reasons
		    rootMargin: 'string',
		    smoothScroll: 'boolean',
		    target: 'element',
		    threshold: 'array'
		  };
		  /**
		   * Class definition
		   */

		  class ScrollSpy extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config); // this._element is the observablesContainer and config.target the menu links wrapper

		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element;
		      this._activeTarget = null;
		      this._observer = null;
		      this._previousScrollData = {
		        visibleEntryTop: 0,
		        parentScrollTop: 0
		      };
		      this.refresh(); // initialize
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    refresh() {
		      this._initializeTargetsAndObservables();
		      this._maybeEnableSmoothScroll();
		      if (this._observer) {
		        this._observer.disconnect();
		      } else {
		        this._observer = this._getNewObserver();
		      }
		      for (const section of this._observableSections.values()) {
		        this._observer.observe(section);
		      }
		    }
		    dispose() {
		      this._observer.disconnect();
		      super.dispose();
		    } // Private

		    _configAfterMerge(config) {
		      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
		      config.target = index.getElement(config.target) || document.body; // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only

		      config.rootMargin = config.offset ? `${config.offset}px 0px -30%` : config.rootMargin;
		      if (typeof config.threshold === 'string') {
		        config.threshold = config.threshold.split(',').map(value => Number.parseFloat(value));
		      }
		      return config;
		    }
		    _maybeEnableSmoothScroll() {
		      if (!this._config.smoothScroll) {
		        return;
		      } // unregister any previous listeners

		      EventHandler__default.default.off(this._config.target, EVENT_CLICK);
		      EventHandler__default.default.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, event => {
		        const observableSection = this._observableSections.get(event.target.hash);
		        if (observableSection) {
		          event.preventDefault();
		          const root = this._rootElement || window;
		          const height = observableSection.offsetTop - this._element.offsetTop;
		          if (root.scrollTo) {
		            root.scrollTo({
		              top: height,
		              behavior: 'smooth'
		            });
		            return;
		          } // Chrome 60 doesn't support `scrollTo`

		          root.scrollTop = height;
		        }
		      });
		    }
		    _getNewObserver() {
		      const options = {
		        root: this._rootElement,
		        threshold: this._config.threshold,
		        rootMargin: this._config.rootMargin
		      };
		      return new IntersectionObserver(entries => this._observerCallback(entries), options);
		    } // The logic of selection

		    _observerCallback(entries) {
		      const targetElement = entry => this._targetLinks.get(`#${entry.target.id}`);
		      const activate = entry => {
		        this._previousScrollData.visibleEntryTop = entry.target.offsetTop;
		        this._process(targetElement(entry));
		      };
		      const parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
		      const userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
		      this._previousScrollData.parentScrollTop = parentScrollTop;
		      for (const entry of entries) {
		        if (!entry.isIntersecting) {
		          this._activeTarget = null;
		          this._clearActiveClass(targetElement(entry));
		          continue;
		        }
		        const entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop; // if we are scrolling down, pick the bigger offsetTop

		        if (userScrollsDown && entryIsLowerThanPrevious) {
		          activate(entry); // if parent isn't scrolled, let's keep the first visible item, breaking the iteration

		          if (!parentScrollTop) {
		            return;
		          }
		          continue;
		        } // if we are scrolling up, pick the smallest offsetTop

		        if (!userScrollsDown && !entryIsLowerThanPrevious) {
		          activate(entry);
		        }
		      }
		    }
		    _initializeTargetsAndObservables() {
		      this._targetLinks = new Map();
		      this._observableSections = new Map();
		      const targetLinks = SelectorEngine__default.default.find(SELECTOR_TARGET_LINKS, this._config.target);
		      for (const anchor of targetLinks) {
		        // ensure that the anchor has an id and is not disabled
		        if (!anchor.hash || index.isDisabled(anchor)) {
		          continue;
		        }
		        const observableSection = SelectorEngine__default.default.findOne(anchor.hash, this._element); // ensure that the observableSection exists & is visible

		        if (index.isVisible(observableSection)) {
		          this._targetLinks.set(anchor.hash, anchor);
		          this._observableSections.set(anchor.hash, observableSection);
		        }
		      }
		    }
		    _process(target) {
		      if (this._activeTarget === target) {
		        return;
		      }
		      this._clearActiveClass(this._config.target);
		      this._activeTarget = target;
		      target.classList.add(CLASS_NAME_ACTIVE);
		      this._activateParents(target);
		      EventHandler__default.default.trigger(this._element, EVENT_ACTIVATE, {
		        relatedTarget: target
		      });
		    }
		    _activateParents(target) {
		      // Activate dropdown parents
		      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
		        SelectorEngine__default.default.findOne(SELECTOR_DROPDOWN_TOGGLE, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE);
		        return;
		      }
		      for (const listGroup of SelectorEngine__default.default.parents(target, SELECTOR_NAV_LIST_GROUP)) {
		        // Set triggered links parents as active
		        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
		        for (const item of SelectorEngine__default.default.prev(listGroup, SELECTOR_LINK_ITEMS)) {
		          item.classList.add(CLASS_NAME_ACTIVE);
		        }
		      }
		    }
		    _clearActiveClass(parent) {
		      parent.classList.remove(CLASS_NAME_ACTIVE);
		      const activeNodes = SelectorEngine__default.default.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE}`, parent);
		      for (const node of activeNodes) {
		        node.classList.remove(CLASS_NAME_ACTIVE);
		      }
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = ScrollSpy.getOrCreateInstance(this, config);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const spy of SelectorEngine__default.default.find(SELECTOR_DATA_SPY)) {
		      ScrollSpy.getOrCreateInstance(spy);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(ScrollSpy);
		  return ScrollSpy;
		});
	} (scrollspy$1));

	var scrollspy = scrollspy$1.exports;

	var tab$1 = {exports: {}};

	/*!
	  * Bootstrap tab.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireSelectorEngine(), requireBaseComponent()) ;
		})(commonjsGlobal, function (index, EventHandler, SelectorEngine, BaseComponent) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const SelectorEngine__default = /*#__PURE__*/_interopDefaultLegacy(SelectorEngine);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): tab.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'tab';
		  const DATA_KEY = 'bs.tab';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}`;
		  const EVENT_KEYDOWN = `keydown${EVENT_KEY}`;
		  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}`;
		  const ARROW_LEFT_KEY = 'ArrowLeft';
		  const ARROW_RIGHT_KEY = 'ArrowRight';
		  const ARROW_UP_KEY = 'ArrowUp';
		  const ARROW_DOWN_KEY = 'ArrowDown';
		  const CLASS_NAME_ACTIVE = 'active';
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_DROPDOWN = 'dropdown';
		  const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
		  const SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
		  const NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
		  const SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
		  const SELECTOR_OUTER = '.nav-item, .list-group-item';
		  const SELECTOR_INNER = `.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // todo:v6: could be only `tab`

		  const SELECTOR_INNER_ELEM = `${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`;
		  const SELECTOR_DATA_TOGGLE_ACTIVE = `.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;
		  /**
		   * Class definition
		   */

		  class Tab extends BaseComponent__default.default {
		    constructor(element) {
		      super(element);
		      this._parent = this._element.closest(SELECTOR_TAB_PANEL);
		      if (!this._parent) {
		        return; // todo: should Throw exception on v6
		        // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
		      } // Set up initial aria attributes

		      this._setInitialAttributes(this._parent, this._getChildren());
		      EventHandler__default.default.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
		    } // Getters

		    static get NAME() {
		      return NAME;
		    } // Public

		    show() {
		      // Shows this elem and deactivate the active sibling if exists
		      const innerElem = this._element;
		      if (this._elemIsActive(innerElem)) {
		        return;
		      } // Search for active tab on same parent to deactivate it

		      const active = this._getActiveElem();
		      const hideEvent = active ? EventHandler__default.default.trigger(active, EVENT_HIDE, {
		        relatedTarget: innerElem
		      }) : null;
		      const showEvent = EventHandler__default.default.trigger(innerElem, EVENT_SHOW, {
		        relatedTarget: active
		      });
		      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
		        return;
		      }
		      this._deactivate(active, innerElem);
		      this._activate(innerElem, active);
		    } // Private

		    _activate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.add(CLASS_NAME_ACTIVE);
		      this._activate(index.getElementFromSelector(element)); // Search and activate/show the proper section

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.add(CLASS_NAME_SHOW);
		          return;
		        }
		        element.removeAttribute('tabindex');
		        element.setAttribute('aria-selected', true);
		        this._toggleDropDown(element, true);
		        EventHandler__default.default.trigger(element, EVENT_SHOWN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _deactivate(element, relatedElem) {
		      if (!element) {
		        return;
		      }
		      element.classList.remove(CLASS_NAME_ACTIVE);
		      element.blur();
		      this._deactivate(index.getElementFromSelector(element)); // Search and deactivate the shown section too

		      const complete = () => {
		        if (element.getAttribute('role') !== 'tab') {
		          element.classList.remove(CLASS_NAME_SHOW);
		          return;
		        }
		        element.setAttribute('aria-selected', false);
		        element.setAttribute('tabindex', '-1');
		        this._toggleDropDown(element, false);
		        EventHandler__default.default.trigger(element, EVENT_HIDDEN, {
		          relatedTarget: relatedElem
		        });
		      };
		      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE));
		    }
		    _keydown(event) {
		      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
		        return;
		      }
		      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page

		      event.preventDefault();
		      const isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
		      const nextActiveElement = index.getNextActiveElement(this._getChildren().filter(element => !index.isDisabled(element)), event.target, isNext, true);
		      if (nextActiveElement) {
		        nextActiveElement.focus({
		          preventScroll: true
		        });
		        Tab.getOrCreateInstance(nextActiveElement).show();
		      }
		    }
		    _getChildren() {
		      // collection of inner elements
		      return SelectorEngine__default.default.find(SELECTOR_INNER_ELEM, this._parent);
		    }
		    _getActiveElem() {
		      return this._getChildren().find(child => this._elemIsActive(child)) || null;
		    }
		    _setInitialAttributes(parent, children) {
		      this._setAttributeIfNotExists(parent, 'role', 'tablist');
		      for (const child of children) {
		        this._setInitialAttributesOnChild(child);
		      }
		    }
		    _setInitialAttributesOnChild(child) {
		      child = this._getInnerElement(child);
		      const isActive = this._elemIsActive(child);
		      const outerElem = this._getOuterElement(child);
		      child.setAttribute('aria-selected', isActive);
		      if (outerElem !== child) {
		        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
		      }
		      if (!isActive) {
		        child.setAttribute('tabindex', '-1');
		      }
		      this._setAttributeIfNotExists(child, 'role', 'tab'); // set attributes to the related panel too

		      this._setInitialAttributesOnTargetPanel(child);
		    }
		    _setInitialAttributesOnTargetPanel(child) {
		      const target = index.getElementFromSelector(child);
		      if (!target) {
		        return;
		      }
		      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
		      if (child.id) {
		        this._setAttributeIfNotExists(target, 'aria-labelledby', `#${child.id}`);
		      }
		    }
		    _toggleDropDown(element, open) {
		      const outerElem = this._getOuterElement(element);
		      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
		        return;
		      }
		      const toggle = (selector, className) => {
		        const element = SelectorEngine__default.default.findOne(selector, outerElem);
		        if (element) {
		          element.classList.toggle(className, open);
		        }
		      };
		      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
		      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW);
		      outerElem.setAttribute('aria-expanded', open);
		    }
		    _setAttributeIfNotExists(element, attribute, value) {
		      if (!element.hasAttribute(attribute)) {
		        element.setAttribute(attribute, value);
		      }
		    }
		    _elemIsActive(elem) {
		      return elem.classList.contains(CLASS_NAME_ACTIVE);
		    } // Try to get the inner element (usually the .nav-link)

		    _getInnerElement(elem) {
		      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine__default.default.findOne(SELECTOR_INNER_ELEM, elem);
		    } // Try to get the outer element (usually the .nav-item)

		    _getOuterElement(elem) {
		      return elem.closest(SELECTOR_OUTER) || elem;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Tab.getOrCreateInstance(this);
		        if (typeof config !== 'string') {
		          return;
		        }
		        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
		          throw new TypeError(`No method named "${config}"`);
		        }
		        data[config]();
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  EventHandler__default.default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
		    if (['A', 'AREA'].includes(this.tagName)) {
		      event.preventDefault();
		    }
		    if (index.isDisabled(this)) {
		      return;
		    }
		    Tab.getOrCreateInstance(this).show();
		  });
		  /**
		   * Initialize on focus
		   */

		  EventHandler__default.default.on(window, EVENT_LOAD_DATA_API, () => {
		    for (const element of SelectorEngine__default.default.find(SELECTOR_DATA_TOGGLE_ACTIVE)) {
		      Tab.getOrCreateInstance(element);
		    }
		  });
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Tab);
		  return Tab;
		});
	} (tab$1));

	var tab = tab$1.exports;

	var toast$1 = {exports: {}};

	/*!
	  * Bootstrap toast.js v5.2.3 (https://getbootstrap.com/)
	  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory(requireUtil(), requireEventHandler(), requireBaseComponent(), requireComponentFunctions()) ;
		})(commonjsGlobal, function (index, EventHandler, BaseComponent, componentFunctions) {

		  const _interopDefaultLegacy = e => e && typeof e === 'object' && 'default' in e ? e : {
		    default: e
		  };
		  const EventHandler__default = /*#__PURE__*/_interopDefaultLegacy(EventHandler);
		  const BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

		  /**
		   * --------------------------------------------------------------------------
		   * Bootstrap (v5.2.3): toast.js
		   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
		   * --------------------------------------------------------------------------
		   */
		  /**
		   * Constants
		   */

		  const NAME = 'toast';
		  const DATA_KEY = 'bs.toast';
		  const EVENT_KEY = `.${DATA_KEY}`;
		  const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
		  const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
		  const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
		  const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
		  const EVENT_HIDE = `hide${EVENT_KEY}`;
		  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
		  const EVENT_SHOW = `show${EVENT_KEY}`;
		  const EVENT_SHOWN = `shown${EVENT_KEY}`;
		  const CLASS_NAME_FADE = 'fade';
		  const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

		  const CLASS_NAME_SHOW = 'show';
		  const CLASS_NAME_SHOWING = 'showing';
		  const DefaultType = {
		    animation: 'boolean',
		    autohide: 'boolean',
		    delay: 'number'
		  };
		  const Default = {
		    animation: true,
		    autohide: true,
		    delay: 5000
		  };
		  /**
		   * Class definition
		   */

		  class Toast extends BaseComponent__default.default {
		    constructor(element, config) {
		      super(element, config);
		      this._timeout = null;
		      this._hasMouseInteraction = false;
		      this._hasKeyboardInteraction = false;
		      this._setListeners();
		    } // Getters

		    static get Default() {
		      return Default;
		    }
		    static get DefaultType() {
		      return DefaultType;
		    }
		    static get NAME() {
		      return NAME;
		    } // Public

		    show() {
		      const showEvent = EventHandler__default.default.trigger(this._element, EVENT_SHOW);
		      if (showEvent.defaultPrevented) {
		        return;
		      }
		      this._clearTimeout();
		      if (this._config.animation) {
		        this._element.classList.add(CLASS_NAME_FADE);
		      }
		      const complete = () => {
		        this._element.classList.remove(CLASS_NAME_SHOWING);
		        EventHandler__default.default.trigger(this._element, EVENT_SHOWN);
		        this._maybeScheduleHide();
		      };
		      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated

		      index.reflow(this._element);
		      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    hide() {
		      if (!this.isShown()) {
		        return;
		      }
		      const hideEvent = EventHandler__default.default.trigger(this._element, EVENT_HIDE);
		      if (hideEvent.defaultPrevented) {
		        return;
		      }
		      const complete = () => {
		        this._element.classList.add(CLASS_NAME_HIDE); // @deprecated

		        this._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
		        EventHandler__default.default.trigger(this._element, EVENT_HIDDEN);
		      };
		      this._element.classList.add(CLASS_NAME_SHOWING);
		      this._queueCallback(complete, this._element, this._config.animation);
		    }
		    dispose() {
		      this._clearTimeout();
		      if (this.isShown()) {
		        this._element.classList.remove(CLASS_NAME_SHOW);
		      }
		      super.dispose();
		    }
		    isShown() {
		      return this._element.classList.contains(CLASS_NAME_SHOW);
		    } // Private

		    _maybeScheduleHide() {
		      if (!this._config.autohide) {
		        return;
		      }
		      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
		        return;
		      }
		      this._timeout = setTimeout(() => {
		        this.hide();
		      }, this._config.delay);
		    }
		    _onInteraction(event, isInteracting) {
		      switch (event.type) {
		        case 'mouseover':
		        case 'mouseout':
		          {
		            this._hasMouseInteraction = isInteracting;
		            break;
		          }
		        case 'focusin':
		        case 'focusout':
		          {
		            this._hasKeyboardInteraction = isInteracting;
		            break;
		          }
		      }
		      if (isInteracting) {
		        this._clearTimeout();
		        return;
		      }
		      const nextElement = event.relatedTarget;
		      if (this._element === nextElement || this._element.contains(nextElement)) {
		        return;
		      }
		      this._maybeScheduleHide();
		    }
		    _setListeners() {
		      EventHandler__default.default.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
		      EventHandler__default.default.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
		      EventHandler__default.default.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
		      EventHandler__default.default.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
		    }
		    _clearTimeout() {
		      clearTimeout(this._timeout);
		      this._timeout = null;
		    } // Static

		    static jQueryInterface(config) {
		      return this.each(function () {
		        const data = Toast.getOrCreateInstance(this, config);
		        if (typeof config === 'string') {
		          if (typeof data[config] === 'undefined') {
		            throw new TypeError(`No method named "${config}"`);
		          }
		          data[config](this);
		        }
		      });
		    }
		  }
		  /**
		   * Data API implementation
		   */

		  componentFunctions.enableDismissTrigger(Toast);
		  /**
		   * jQuery
		   */

		  index.defineJQueryPlugin(Toast);
		  return Toast;
		});
	} (toast$1));

	var toast = toast$1.exports;

	/**
	 * File skip-link-focus-fix.js.
	 *
	 * Helps with accessibility for keyboard only users.
	 *
	 * Learn more: https://git.io/vWdr2
	 */
	(function () {
	  var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
	    isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
	    isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
	  if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
	    window.addEventListener('hashchange', function () {
	      var id = location.hash.substring(1),
	        element;
	      if (!/^[A-z0-9_-]+$/.test(id)) {
	        return;
	      }
	      element = document.getElementById(id);
	      if (element) {
	        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
	          element.tabIndex = -1;
	        }
	        element.focus();
	      }
	    }, false);
	  }
	})();

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	  return self;
	}
	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	/*!
	 * GSAP 3.12.7
	 * https://gsap.com
	 *
	 * @license Copyright 2008-2025, GreenSock. All rights reserved.
	 * Subject to the terms at https://gsap.com/standard-license or for
	 * Club GSAP members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	/* eslint-disable */
	var _config = {
	    autoSleep: 120,
	    force3D: "auto",
	    nullTargetWarn: 1,
	    units: {
	      lineHeight: ""
	    }
	  },
	  _defaults$1 = {
	    duration: .5,
	    overwrite: false,
	    delay: 0
	  },
	  _suppressOverwrites$1,
	  _reverting$1,
	  _context$2,
	  _bigNum$1 = 1e8,
	  _tinyNum = 1 / _bigNum$1,
	  _2PI = Math.PI * 2,
	  _HALF_PI = _2PI / 4,
	  _gsID = 0,
	  _sqrt = Math.sqrt,
	  _cos = Math.cos,
	  _sin = Math.sin,
	  _isString$1 = function _isString(value) {
	    return typeof value === "string";
	  },
	  _isFunction$1 = function _isFunction(value) {
	    return typeof value === "function";
	  },
	  _isNumber$1 = function _isNumber(value) {
	    return typeof value === "number";
	  },
	  _isUndefined = function _isUndefined(value) {
	    return typeof value === "undefined";
	  },
	  _isObject$1 = function _isObject(value) {
	    return typeof value === "object";
	  },
	  _isNotFalse = function _isNotFalse(value) {
	    return value !== false;
	  },
	  _windowExists$2 = function _windowExists() {
	    return typeof window !== "undefined";
	  },
	  _isFuncOrString = function _isFuncOrString(value) {
	    return _isFunction$1(value) || _isString$1(value);
	  },
	  _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function () {},
	  // note: IE10 has ArrayBuffer, but NOT ArrayBuffer.isView().
	  _isArray = Array.isArray,
	  _strictNumExp = /(?:-?\.?\d|\.)+/gi,
	  //only numbers (including negatives and decimals) but NOT relative values.
	  _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
	  //finds any numbers, including ones that start with += or -=, negative numbers, and ones in scientific notation like 1e-8.
	  _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
	  _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
	  //duplicate so that while we're looping through matches from exec(), it doesn't contaminate the lastIndex of _numExp which we use to search for colors too.
	  _relExp = /[+-]=-?[.\d]+/,
	  _delimitedValueExp = /[^,'"\[\]\s]+/gi,
	  // previously /[#\-+.]*\b[a-z\d\-=+%.]+/gi but didn't catch special characters.
	  _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
	  _globalTimeline,
	  _win$3,
	  _coreInitted$2,
	  _doc$3,
	  _globals = {},
	  _installScope = {},
	  _coreReady,
	  _install = function _install(scope) {
	    return (_installScope = _merge(scope, _globals)) && gsap$2;
	  },
	  _missingPlugin = function _missingPlugin(property, value) {
	    return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
	  },
	  _warn = function _warn(message, suppress) {
	    return !suppress && console.warn(message);
	  },
	  _addGlobal = function _addGlobal(name, obj) {
	    return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
	  },
	  _emptyFunc = function _emptyFunc() {
	    return 0;
	  },
	  _startAtRevertConfig = {
	    suppressEvents: true,
	    isStart: true,
	    kill: false
	  },
	  _revertConfigNoKill = {
	    suppressEvents: true,
	    kill: false
	  },
	  _revertConfig = {
	    suppressEvents: true
	  },
	  _reservedProps = {},
	  _lazyTweens = [],
	  _lazyLookup = {},
	  _lastRenderedFrame,
	  _plugins = {},
	  _effects = {},
	  _nextGCFrame = 30,
	  _harnessPlugins = [],
	  _callbackNames = "",
	  _harness = function _harness(targets) {
	    var target = targets[0],
	      harnessPlugin,
	      i;
	    _isObject$1(target) || _isFunction$1(target) || (targets = [targets]);
	    if (!(harnessPlugin = (target._gsap || {}).harness)) {
	      // find the first target with a harness. We assume targets passed into an animation will be of similar type, meaning the same kind of harness can be used for them all (performance optimization)
	      i = _harnessPlugins.length;
	      while (i-- && !_harnessPlugins[i].targetTest(target)) {}
	      harnessPlugin = _harnessPlugins[i];
	    }
	    i = targets.length;
	    while (i--) {
	      targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
	    }
	    return targets;
	  },
	  _getCache = function _getCache(target) {
	    return target._gsap || _harness(toArray(target))[0]._gsap;
	  },
	  _getProperty = function _getProperty(target, property, v) {
	    return (v = target[property]) && _isFunction$1(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
	  },
	  _forEachName = function _forEachName(names, func) {
	    return (names = names.split(",")).forEach(func) || names;
	  },
	  //split a comma-delimited list of names into an array, then run a forEach() function and return the split array (this is just a way to consolidate/shorten some code).
	  _round$1 = function _round(value) {
	    return Math.round(value * 100000) / 100000 || 0;
	  },
	  _roundPrecise = function _roundPrecise(value) {
	    return Math.round(value * 10000000) / 10000000 || 0;
	  },
	  // increased precision mostly for timing values.
	  _parseRelative = function _parseRelative(start, value) {
	    var operator = value.charAt(0),
	      end = parseFloat(value.substr(2));
	    start = parseFloat(start);
	    return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
	  },
	  _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
	    //searches one array to find matches for any of the items in the toFind array. As soon as one is found, it returns true. It does NOT return all the matches; it's simply a boolean search.
	    var l = toFind.length,
	      i = 0;
	    for (; toSearch.indexOf(toFind[i]) < 0 && ++i < l;) {}
	    return i < l;
	  },
	  _lazyRender = function _lazyRender() {
	    var l = _lazyTweens.length,
	      a = _lazyTweens.slice(0),
	      i,
	      tween;
	    _lazyLookup = {};
	    _lazyTweens.length = 0;
	    for (i = 0; i < l; i++) {
	      tween = a[i];
	      tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
	    }
	  },
	  _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
	    _lazyTweens.length && !_reverting$1 && _lazyRender();
	    animation.render(time, suppressEvents, force || _reverting$1 && time < 0 && (animation._initted || animation._startAt));
	    _lazyTweens.length && !_reverting$1 && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
	  },
	  _numericIfPossible = function _numericIfPossible(value) {
	    var n = parseFloat(value);
	    return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString$1(value) ? value.trim() : value;
	  },
	  _passThrough$1 = function _passThrough(p) {
	    return p;
	  },
	  _setDefaults$1 = function _setDefaults(obj, defaults) {
	    for (var p in defaults) {
	      p in obj || (obj[p] = defaults[p]);
	    }
	    return obj;
	  },
	  _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
	    return function (obj, defaults) {
	      for (var p in defaults) {
	        p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
	      }
	    };
	  },
	  _merge = function _merge(base, toMerge) {
	    for (var p in toMerge) {
	      base[p] = toMerge[p];
	    }
	    return base;
	  },
	  _mergeDeep = function _mergeDeep(base, toMerge) {
	    for (var p in toMerge) {
	      p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject$1(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
	    }
	    return base;
	  },
	  _copyExcluding = function _copyExcluding(obj, excluding) {
	    var copy = {},
	      p;
	    for (p in obj) {
	      p in excluding || (copy[p] = obj[p]);
	    }
	    return copy;
	  },
	  _inheritDefaults = function _inheritDefaults(vars) {
	    var parent = vars.parent || _globalTimeline,
	      func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults$1;
	    if (_isNotFalse(vars.inherit)) {
	      while (parent) {
	        func(vars, parent.vars.defaults);
	        parent = parent.parent || parent._dp;
	      }
	    }
	    return vars;
	  },
	  _arraysMatch = function _arraysMatch(a1, a2) {
	    var i = a1.length,
	      match = i === a2.length;
	    while (match && i-- && a1[i] === a2[i]) {}
	    return i < 0;
	  },
	  _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
	    if (firstProp === void 0) {
	      firstProp = "_first";
	    }
	    if (lastProp === void 0) {
	      lastProp = "_last";
	    }
	    var prev = parent[lastProp],
	      t;
	    if (sortBy) {
	      t = child[sortBy];
	      while (prev && prev[sortBy] > t) {
	        prev = prev._prev;
	      }
	    }
	    if (prev) {
	      child._next = prev._next;
	      prev._next = child;
	    } else {
	      child._next = parent[firstProp];
	      parent[firstProp] = child;
	    }
	    if (child._next) {
	      child._next._prev = child;
	    } else {
	      parent[lastProp] = child;
	    }
	    child._prev = prev;
	    child.parent = child._dp = parent;
	    return child;
	  },
	  _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
	    if (firstProp === void 0) {
	      firstProp = "_first";
	    }
	    if (lastProp === void 0) {
	      lastProp = "_last";
	    }
	    var prev = child._prev,
	      next = child._next;
	    if (prev) {
	      prev._next = next;
	    } else if (parent[firstProp] === child) {
	      parent[firstProp] = next;
	    }
	    if (next) {
	      next._prev = prev;
	    } else if (parent[lastProp] === child) {
	      parent[lastProp] = prev;
	    }
	    child._next = child._prev = child.parent = null; // don't delete the _dp just so we can revert if necessary. But parent should be null to indicate the item isn't in a linked list.
	  },
	  _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
	    child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
	    child._act = 0;
	  },
	  _uncache = function _uncache(animation, child) {
	    if (animation && (!child || child._end > animation._dur || child._start < 0)) {
	      // performance optimization: if a child animation is passed in we should only uncache if that child EXTENDS the animation (its end time is beyond the end)
	      var a = animation;
	      while (a) {
	        a._dirty = 1;
	        a = a.parent;
	      }
	    }
	    return animation;
	  },
	  _recacheAncestors = function _recacheAncestors(animation) {
	    var parent = animation.parent;
	    while (parent && parent.parent) {
	      //sometimes we must force a re-sort of all children and update the duration/totalDuration of all ancestor timelines immediately in case, for example, in the middle of a render loop, one tween alters another tween's timeScale which shoves its startTime before 0, forcing the parent timeline to shift around and shiftChildren() which could affect that next tween's render (startTime). Doesn't matter for the root timeline though.
	      parent._dirty = 1;
	      parent.totalDuration();
	      parent = parent.parent;
	    }
	    return animation;
	  },
	  _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
	    return tween._startAt && (_reverting$1 ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
	  },
	  _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
	    return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
	  },
	  _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
	    return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
	  },
	  // feed in the totalTime and cycleDuration and it'll return the cycle (iteration minus 1) and if the playhead is exactly at the very END, it will NOT bump up to the next cycle.
	  _animationCycle = function _animationCycle(tTime, cycleDuration) {
	    var whole = Math.floor(tTime = _roundPrecise(tTime / cycleDuration));
	    return tTime && whole === tTime ? whole - 1 : whole;
	  },
	  _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
	    return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
	  },
	  _setEnd = function _setEnd(animation) {
	    return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
	  },
	  _alignPlayhead = function _alignPlayhead(animation, totalTime) {
	    // adjusts the animation's _start and _end according to the provided totalTime (only if the parent's smoothChildTiming is true and the animation isn't paused). It doesn't do any rendering or forcing things back into parent timelines, etc. - that's what totalTime() is for.
	    var parent = animation._dp;
	    if (parent && parent.smoothChildTiming && animation._ts) {
	      animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
	      _setEnd(animation);
	      parent._dirty || _uncache(parent, animation); //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
	    }

	    return animation;
	  },
	  /*
	  _totalTimeToTime = (clampedTotalTime, duration, repeat, repeatDelay, yoyo) => {
	  	let cycleDuration = duration + repeatDelay,
	  		time = _round(clampedTotalTime % cycleDuration);
	  	if (time > duration) {
	  		time = duration;
	  	}
	  	return (yoyo && (~~(clampedTotalTime / cycleDuration) & 1)) ? duration - time : time;
	  },
	  */
	  _postAddChecks = function _postAddChecks(timeline, child) {
	    var t;
	    if (child._time || !child._dur && child._initted || child._start < timeline._time && (child._dur || !child.add)) {
	      // in case, for example, the _start is moved on a tween that has already rendered, or if it's being inserted into a timeline BEFORE where the playhead is currently. Imagine it's at its end state, then the startTime is moved WAY later (after the end of this timeline), it should render at its beginning. Special case: if it's a timeline (has .add() method) and no duration, we can skip rendering because the user may be populating it AFTER adding it to a parent timeline (unconventional, but possible, and we wouldn't want it to get removed if the parent's autoRemoveChildren is true).
	      t = _parentToChildTotalTime(timeline.rawTime(), child);
	      if (!child._dur || _clamp$1(0, child.totalDuration(), t) - child._tTime > _tinyNum) {
	        child.render(t, true);
	      }
	    } //if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.

	    if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
	      //in case any of the ancestors had completed but should now be enabled...
	      if (timeline._dur < timeline.duration()) {
	        t = timeline;
	        while (t._dp) {
	          t.rawTime() >= 0 && t.totalTime(t._tTime); //moves the timeline (shifts its startTime) if necessary, and also enables it. If it's currently zero, though, it may not be scheduled to render until later so there's no need to force it to align with the current playhead position. Only move to catch up with the playhead.

	          t = t._dp;
	        }
	      }
	      timeline._zTime = -_tinyNum; // helps ensure that the next render() will be forced (crossingStart = true in render()), even if the duration hasn't changed (we're adding a child which would need to get rendered). Definitely an edge case. Note: we MUST do this AFTER the loop above where the totalTime() might trigger a render() because this _addToTimeline() method gets called from the Animation constructor, BEFORE tweens even record their targets, etc. so we wouldn't want things to get triggered in the wrong order.
	    }
	  },
	  _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
	    child.parent && _removeFromParent(child);
	    child._start = _roundPrecise((_isNumber$1(position) ? position : position || timeline !== _globalTimeline ? _parsePosition$1(timeline, position, child) : timeline._time) + child._delay);
	    child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
	    _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);
	    _isFromOrFromStart(child) || (timeline._recent = child);
	    skipChecks || _postAddChecks(timeline, child);
	    timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime); // if the timeline is reversed and the new child makes it longer, we may need to adjust the parent's _start (push it back)

	    return timeline;
	  },
	  _scrollTrigger = function _scrollTrigger(animation, trigger) {
	    return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
	  },
	  _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
	    _initTween(tween, time, tTime);
	    if (!tween._initted) {
	      return 1;
	    }
	    if (!force && tween._pt && !_reverting$1 && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
	      _lazyTweens.push(tween);
	      tween._lazy = [tTime, suppressEvents];
	      return 1;
	    }
	  },
	  _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
	    var parent = _ref.parent;
	    return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
	  },
	  // check parent's _lock because when a timeline repeats/yoyos and does its artificial wrapping, we shouldn't force the ratio back to 0
	  _isFromOrFromStart = function _isFromOrFromStart(_ref2) {
	    var data = _ref2.data;
	    return data === "isFromStart" || data === "isStart";
	  },
	  _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
	    var prevRatio = tween.ratio,
	      ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1,
	      // if the tween or its parent is reversed and the totalTime is 0, we should go to a ratio of 0. Edge case: if a from() or fromTo() stagger tween is placed later in a timeline, the "startAt" zero-duration tween could initially render at a time when the parent timeline's playhead is technically BEFORE where this tween is, so make sure that any "from" and "fromTo" startAt tweens are rendered the first time at a ratio of 1.
	      repeatDelay = tween._rDelay,
	      tTime = 0,
	      pt,
	      iteration,
	      prevIteration;
	    if (repeatDelay && tween._repeat) {
	      // in case there's a zero-duration tween that has a repeat with a repeatDelay
	      tTime = _clamp$1(0, tween._tDur, totalTime);
	      iteration = _animationCycle(tTime, repeatDelay);
	      tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
	      if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
	        // if iteration changed
	        prevRatio = 1 - ratio;
	        tween.vars.repeatRefresh && tween._initted && tween.invalidate();
	      }
	    }
	    if (ratio !== prevRatio || _reverting$1 || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
	      if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
	        // if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
	        return;
	      }
	      prevIteration = tween._zTime;
	      tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0); // when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

	      suppressEvents || (suppressEvents = totalTime && !prevIteration); // if it was rendered previously at exactly 0 (_zTime) and now the playhead is moving away, DON'T fire callbacks otherwise they'll seem like duplicates.

	      tween.ratio = ratio;
	      tween._from && (ratio = 1 - ratio);
	      tween._time = 0;
	      tween._tTime = tTime;
	      pt = tween._pt;
	      while (pt) {
	        pt.r(ratio, pt.d);
	        pt = pt._next;
	      }
	      totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
	      tween._onUpdate && !suppressEvents && _callback$1(tween, "onUpdate");
	      tTime && tween._repeat && !suppressEvents && tween.parent && _callback$1(tween, "onRepeat");
	      if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
	        ratio && _removeFromParent(tween, 1);
	        if (!suppressEvents && !_reverting$1) {
	          _callback$1(tween, ratio ? "onComplete" : "onReverseComplete", true);
	          tween._prom && tween._prom();
	        }
	      }
	    } else if (!tween._zTime) {
	      tween._zTime = totalTime;
	    }
	  },
	  _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
	    var child;
	    if (time > prevTime) {
	      child = animation._first;
	      while (child && child._start <= time) {
	        if (child.data === "isPause" && child._start > prevTime) {
	          return child;
	        }
	        child = child._next;
	      }
	    } else {
	      child = animation._last;
	      while (child && child._start >= time) {
	        if (child.data === "isPause" && child._start < prevTime) {
	          return child;
	        }
	        child = child._prev;
	      }
	    }
	  },
	  _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
	    var repeat = animation._repeat,
	      dur = _roundPrecise(duration) || 0,
	      totalProgress = animation._tTime / animation._tDur;
	    totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
	    animation._dur = dur;
	    animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
	    totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
	    animation.parent && _setEnd(animation);
	    skipUncache || _uncache(animation.parent, animation);
	    return animation;
	  },
	  _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
	    return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
	  },
	  _zeroPosition = {
	    _start: 0,
	    endTime: _emptyFunc,
	    totalDuration: _emptyFunc
	  },
	  _parsePosition$1 = function _parsePosition(animation, position, percentAnimation) {
	    var labels = animation.labels,
	      recent = animation._recent || _zeroPosition,
	      clippedDuration = animation.duration() >= _bigNum$1 ? recent.endTime(false) : animation._dur,
	      //in case there's a child that infinitely repeats, users almost never intend for the insertion point of a new child to be based on a SUPER long value like that so we clip it and assume the most recently-added child's endTime should be used instead.
	      i,
	      offset,
	      isPercent;
	    if (_isString$1(position) && (isNaN(position) || position in labels)) {
	      //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
	      offset = position.charAt(0);
	      isPercent = position.substr(-1) === "%";
	      i = position.indexOf("=");
	      if (offset === "<" || offset === ">") {
	        i >= 0 && (position = position.replace(/=/, ""));
	        return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
	      }
	      if (i < 0) {
	        position in labels || (labels[position] = clippedDuration);
	        return labels[position];
	      }
	      offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
	      if (isPercent && percentAnimation) {
	        offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
	      }
	      return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
	    }
	    return position == null ? clippedDuration : +position;
	  },
	  _createTweenType = function _createTweenType(type, params, timeline) {
	    var isLegacy = _isNumber$1(params[1]),
	      varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1),
	      vars = params[varsIndex],
	      irVars,
	      parent;
	    isLegacy && (vars.duration = params[1]);
	    vars.parent = timeline;
	    if (type) {
	      irVars = vars;
	      parent = timeline;
	      while (parent && !("immediateRender" in irVars)) {
	        // inheritance hasn't happened yet, but someone may have set a default in an ancestor timeline. We could do vars.immediateRender = _isNotFalse(_inheritDefaults(vars).immediateRender) but that'd exact a slight performance penalty because _inheritDefaults() also runs in the Tween constructor. We're paying a small kb price here to gain speed.
	        irVars = parent.vars.defaults || {};
	        parent = _isNotFalse(parent.vars.inherit) && parent.parent;
	      }
	      vars.immediateRender = _isNotFalse(irVars.immediateRender);
	      type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1]; // "from" vars
	    }

	    return new Tween(params[0], vars, params[varsIndex + 1]);
	  },
	  _conditionalReturn = function _conditionalReturn(value, func) {
	    return value || value === 0 ? func(value) : func;
	  },
	  _clamp$1 = function _clamp(min, max, value) {
	    return value < min ? min : value > max ? max : value;
	  },
	  getUnit = function getUnit(value, v) {
	    return !_isString$1(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
	  },
	  // note: protect against padded numbers as strings, like "100.100". That shouldn't return "00" as the unit. If it's numeric, return no unit.
	  clamp = function clamp(min, max, value) {
	    return _conditionalReturn(value, function (v) {
	      return _clamp$1(min, max, v);
	    });
	  },
	  _slice = [].slice,
	  _isArrayLike = function _isArrayLike(value, nonEmpty) {
	    return value && _isObject$1(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject$1(value[0])) && !value.nodeType && value !== _win$3;
	  },
	  _flatten = function _flatten(ar, leaveStrings, accumulator) {
	    if (accumulator === void 0) {
	      accumulator = [];
	    }
	    return ar.forEach(function (value) {
	      var _accumulator;
	      return _isString$1(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
	    }) || accumulator;
	  },
	  //takes any value and returns an array. If it's a string (and leaveStrings isn't true), it'll use document.querySelectorAll() and convert that to an array. It'll also accept iterables like jQuery objects.
	  toArray = function toArray(value, scope, leaveStrings) {
	    return _context$2 && !scope && _context$2.selector ? _context$2.selector(value) : _isString$1(value) && !leaveStrings && (_coreInitted$2 || !_wake()) ? _slice.call((scope || _doc$3).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
	  },
	  selector = function selector(value) {
	    value = toArray(value)[0] || _warn("Invalid scope") || {};
	    return function (v) {
	      var el = value.current || value.nativeElement || value;
	      return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc$3.createElement("div") : value);
	    };
	  },
	  shuffle = function shuffle(a) {
	    return a.sort(function () {
	      return .5 - Math.random();
	    });
	  },
	  // alternative that's a bit faster and more reliably diverse but bigger:   for (let j, v, i = a.length; i; j = (Math.random() * i) | 0, v = a[--i], a[i] = a[j], a[j] = v); return a;
	  //for distributing values across an array. Can accept a number, a function or (most commonly) a function which can contain the following properties: {base, amount, from, ease, grid, axis, length, each}. Returns a function that expects the following parameters: index, target, array. Recognizes the following
	  distribute = function distribute(v) {
	    if (_isFunction$1(v)) {
	      return v;
	    }
	    var vars = _isObject$1(v) ? v : {
	        each: v
	      },
	      //n:1 is just to indicate v was a number; we leverage that later to set v according to the length we get. If a number is passed in, we treat it like the old stagger value where 0.1, for example, would mean that things would be distributed with 0.1 between each element in the array rather than a total "amount" that's chunked out among them all.
	      ease = _parseEase(vars.ease),
	      from = vars.from || 0,
	      base = parseFloat(vars.base) || 0,
	      cache = {},
	      isDecimal = from > 0 && from < 1,
	      ratios = isNaN(from) || isDecimal,
	      axis = vars.axis,
	      ratioX = from,
	      ratioY = from;
	    if (_isString$1(from)) {
	      ratioX = ratioY = {
	        center: .5,
	        edges: .5,
	        end: 1
	      }[from] || 0;
	    } else if (!isDecimal && ratios) {
	      ratioX = from[0];
	      ratioY = from[1];
	    }
	    return function (i, target, a) {
	      var l = (a || vars).length,
	        distances = cache[l],
	        originX,
	        originY,
	        x,
	        y,
	        d,
	        j,
	        max,
	        min,
	        wrapAt;
	      if (!distances) {
	        wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum$1])[1];
	        if (!wrapAt) {
	          max = -_bigNum$1;
	          while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) {}
	          wrapAt < l && wrapAt--;
	        }
	        distances = cache[l] = [];
	        originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
	        originY = wrapAt === _bigNum$1 ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
	        max = 0;
	        min = _bigNum$1;
	        for (j = 0; j < l; j++) {
	          x = j % wrapAt - originX;
	          y = originY - (j / wrapAt | 0);
	          distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
	          d > max && (max = d);
	          d < min && (min = d);
	        }
	        from === "random" && shuffle(distances);
	        distances.max = max - min;
	        distances.min = min;
	        distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
	        distances.b = l < 0 ? base - l : base;
	        distances.u = getUnit(vars.amount || vars.each) || 0; //unit

	        ease = ease && l < 0 ? _invertEase(ease) : ease;
	      }
	      l = (distances[i] - distances.min) / distances.max || 0;
	      return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u; //round in order to work around floating point errors
	    };
	  },
	  _roundModifier = function _roundModifier(v) {
	    //pass in 0.1 get a function that'll round to the nearest tenth, or 5 to round to the closest 5, or 0.001 to the closest 1000th, etc.
	    var p = Math.pow(10, ((v + "").split(".")[1] || "").length); //to avoid floating point math errors (like 24 * 0.1 == 2.4000000000000004), we chop off at a specific number of decimal places (much faster than toFixed())

	    return function (raw) {
	      var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
	      return (n - n % 1) / p + (_isNumber$1(raw) ? 0 : getUnit(raw)); // n - n % 1 replaces Math.floor() in order to handle negative values properly. For example, Math.floor(-150.00000000000003) is 151!
	    };
	  },
	  snap = function snap(snapTo, value) {
	    var isArray = _isArray(snapTo),
	      radius,
	      is2D;
	    if (!isArray && _isObject$1(snapTo)) {
	      radius = isArray = snapTo.radius || _bigNum$1;
	      if (snapTo.values) {
	        snapTo = toArray(snapTo.values);
	        if (is2D = !_isNumber$1(snapTo[0])) {
	          radius *= radius; //performance optimization so we don't have to Math.sqrt() in the loop.
	        }
	      } else {
	        snapTo = _roundModifier(snapTo.increment);
	      }
	    }
	    return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction$1(snapTo) ? function (raw) {
	      is2D = snapTo(raw);
	      return Math.abs(is2D - raw) <= radius ? is2D : raw;
	    } : function (raw) {
	      var x = parseFloat(is2D ? raw.x : raw),
	        y = parseFloat(is2D ? raw.y : 0),
	        min = _bigNum$1,
	        closest = 0,
	        i = snapTo.length,
	        dx,
	        dy;
	      while (i--) {
	        if (is2D) {
	          dx = snapTo[i].x - x;
	          dy = snapTo[i].y - y;
	          dx = dx * dx + dy * dy;
	        } else {
	          dx = Math.abs(snapTo[i] - x);
	        }
	        if (dx < min) {
	          min = dx;
	          closest = i;
	        }
	      }
	      closest = !radius || min <= radius ? snapTo[closest] : raw;
	      return is2D || closest === raw || _isNumber$1(raw) ? closest : closest + getUnit(raw);
	    });
	  },
	  random = function random(min, max, roundingIncrement, returnFunction) {
	    return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function () {
	      return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
	    });
	  },
	  pipe = function pipe() {
	    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
	      functions[_key] = arguments[_key];
	    }
	    return function (value) {
	      return functions.reduce(function (v, f) {
	        return f(v);
	      }, value);
	    };
	  },
	  unitize = function unitize(func, unit) {
	    return function (value) {
	      return func(parseFloat(value)) + (unit || getUnit(value));
	    };
	  },
	  normalize = function normalize(min, max, value) {
	    return mapRange(min, max, 0, 1, value);
	  },
	  _wrapArray = function _wrapArray(a, wrapper, value) {
	    return _conditionalReturn(value, function (index) {
	      return a[~~wrapper(index)];
	    });
	  },
	  wrap = function wrap(min, max, value) {
	    // NOTE: wrap() CANNOT be an arrow function! A very odd compiling bug causes problems (unrelated to GSAP).
	    var range = max - min;
	    return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, function (value) {
	      return (range + (value - min) % range) % range + min;
	    });
	  },
	  wrapYoyo = function wrapYoyo(min, max, value) {
	    var range = max - min,
	      total = range * 2;
	    return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, function (value) {
	      value = (total + (value - min) % total) % total || 0;
	      return min + (value > range ? total - value : value);
	    });
	  },
	  _replaceRandom = function _replaceRandom(value) {
	    //replaces all occurrences of random(...) in a string with the calculated random value. can be a range like random(-100, 100, 5) or an array like random([0, 100, 500])
	    var prev = 0,
	      s = "",
	      i,
	      nums,
	      end,
	      isArray;
	    while (~(i = value.indexOf("random(", prev))) {
	      end = value.indexOf(")", i);
	      isArray = value.charAt(i + 7) === "[";
	      nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
	      s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
	      prev = end + 1;
	    }
	    return s + value.substr(prev, value.length - prev);
	  },
	  mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
	    var inRange = inMax - inMin,
	      outRange = outMax - outMin;
	    return _conditionalReturn(value, function (value) {
	      return outMin + ((value - inMin) / inRange * outRange || 0);
	    });
	  },
	  interpolate = function interpolate(start, end, progress, mutate) {
	    var func = isNaN(start + end) ? 0 : function (p) {
	      return (1 - p) * start + p * end;
	    };
	    if (!func) {
	      var isString = _isString$1(start),
	        master = {},
	        p,
	        i,
	        interpolators,
	        l,
	        il;
	      progress === true && (mutate = 1) && (progress = null);
	      if (isString) {
	        start = {
	          p: start
	        };
	        end = {
	          p: end
	        };
	      } else if (_isArray(start) && !_isArray(end)) {
	        interpolators = [];
	        l = start.length;
	        il = l - 2;
	        for (i = 1; i < l; i++) {
	          interpolators.push(interpolate(start[i - 1], start[i])); //build the interpolators up front as a performance optimization so that when the function is called many times, it can just reuse them.
	        }

	        l--;
	        func = function func(p) {
	          p *= l;
	          var i = Math.min(il, ~~p);
	          return interpolators[i](p - i);
	        };
	        progress = end;
	      } else if (!mutate) {
	        start = _merge(_isArray(start) ? [] : {}, start);
	      }
	      if (!interpolators) {
	        for (p in end) {
	          _addPropTween.call(master, start, p, "get", end[p]);
	        }
	        func = function func(p) {
	          return _renderPropTweens(p, master) || (isString ? start.p : start);
	        };
	      }
	    }
	    return _conditionalReturn(progress, func);
	  },
	  _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
	    //used for nextLabel() and previousLabel()
	    var labels = timeline.labels,
	      min = _bigNum$1,
	      p,
	      distance,
	      label;
	    for (p in labels) {
	      distance = labels[p] - fromTime;
	      if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
	        label = p;
	        min = distance;
	      }
	    }
	    return label;
	  },
	  _callback$1 = function _callback(animation, type, executeLazyFirst) {
	    var v = animation.vars,
	      callback = v[type],
	      prevContext = _context$2,
	      context = animation._ctx,
	      params,
	      scope,
	      result;
	    if (!callback) {
	      return;
	    }
	    params = v[type + "Params"];
	    scope = v.callbackScope || animation;
	    executeLazyFirst && _lazyTweens.length && _lazyRender(); //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.

	    context && (_context$2 = context);
	    result = params ? callback.apply(scope, params) : callback.call(scope);
	    _context$2 = prevContext;
	    return result;
	  },
	  _interrupt = function _interrupt(animation) {
	    _removeFromParent(animation);
	    animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting$1);
	    animation.progress() < 1 && _callback$1(animation, "onInterrupt");
	    return animation;
	  },
	  _quickTween,
	  _registerPluginQueue = [],
	  _createPlugin = function _createPlugin(config) {
	    if (!config) return;
	    config = !config.name && config["default"] || config; // UMD packaging wraps things oddly, so for example MotionPathHelper becomes {MotionPathHelper:MotionPathHelper, default:MotionPathHelper}.

	    if (_windowExists$2() || config.headless) {
	      // edge case: some build tools may pass in a null/undefined value
	      var name = config.name,
	        isFunc = _isFunction$1(config),
	        Plugin = name && !isFunc && config.init ? function () {
	          this._props = [];
	        } : config,
	        //in case someone passes in an object that's not a plugin, like CustomEase
	        instanceDefaults = {
	          init: _emptyFunc,
	          render: _renderPropTweens,
	          add: _addPropTween,
	          kill: _killPropTweensOf,
	          modifier: _addPluginModifier,
	          rawVars: 0
	        },
	        statics = {
	          targetTest: 0,
	          get: 0,
	          getSetter: _getSetter,
	          aliases: {},
	          register: 0
	        };
	      _wake();
	      if (config !== Plugin) {
	        if (_plugins[name]) {
	          return;
	        }
	        _setDefaults$1(Plugin, _setDefaults$1(_copyExcluding(config, instanceDefaults), statics)); //static methods

	        _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics))); //instance methods

	        _plugins[Plugin.prop = name] = Plugin;
	        if (config.targetTest) {
	          _harnessPlugins.push(Plugin);
	          _reservedProps[name] = 1;
	        }
	        name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin"; //for the global name. "motionPath" should become MotionPathPlugin
	      }

	      _addGlobal(name, Plugin);
	      config.register && config.register(gsap$2, Plugin, PropTween);
	    } else {
	      _registerPluginQueue.push(config);
	    }
	  },
	  /*
	   * --------------------------------------------------------------------------------------
	   * COLORS
	   * --------------------------------------------------------------------------------------
	   */
	  _255 = 255,
	  _colorLookup = {
	    aqua: [0, _255, _255],
	    lime: [0, _255, 0],
	    silver: [192, 192, 192],
	    black: [0, 0, 0],
	    maroon: [128, 0, 0],
	    teal: [0, 128, 128],
	    blue: [0, 0, _255],
	    navy: [0, 0, 128],
	    white: [_255, _255, _255],
	    olive: [128, 128, 0],
	    yellow: [_255, _255, 0],
	    orange: [_255, 165, 0],
	    gray: [128, 128, 128],
	    purple: [128, 0, 128],
	    green: [0, 128, 0],
	    red: [_255, 0, 0],
	    pink: [_255, 192, 203],
	    cyan: [0, _255, _255],
	    transparent: [_255, _255, _255, 0]
	  },
	  // possible future idea to replace the hard-coded color name values - put this in the ticker.wake() where we set the _doc:
	  // let ctx = _doc.createElement("canvas").getContext("2d");
	  // _forEachName("aqua,lime,silver,black,maroon,teal,blue,navy,white,olive,yellow,orange,gray,purple,green,red,pink,cyan", color => {ctx.fillStyle = color; _colorLookup[color] = splitColor(ctx.fillStyle)});
	  _hue = function _hue(h, m1, m2) {
	    h += h < 0 ? 1 : h > 1 ? -1 : 0;
	    return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
	  },
	  splitColor = function splitColor(v, toHSL, forceAlpha) {
	    var a = !v ? _colorLookup.black : _isNumber$1(v) ? [v >> 16, v >> 8 & _255, v & _255] : 0,
	      r,
	      g,
	      b,
	      h,
	      s,
	      l,
	      max,
	      min,
	      d,
	      wasHSL;
	    if (!a) {
	      if (v.substr(-1) === ",") {
	        //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
	        v = v.substr(0, v.length - 1);
	      }
	      if (_colorLookup[v]) {
	        a = _colorLookup[v];
	      } else if (v.charAt(0) === "#") {
	        if (v.length < 6) {
	          //for shorthand like #9F0 or #9F0F (could have alpha)
	          r = v.charAt(1);
	          g = v.charAt(2);
	          b = v.charAt(3);
	          v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
	        }
	        if (v.length === 9) {
	          // hex with alpha, like #fd5e53ff
	          a = parseInt(v.substr(1, 6), 16);
	          return [a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255];
	        }
	        v = parseInt(v.substr(1), 16);
	        a = [v >> 16, v >> 8 & _255, v & _255];
	      } else if (v.substr(0, 3) === "hsl") {
	        a = wasHSL = v.match(_strictNumExp);
	        if (!toHSL) {
	          h = +a[0] % 360 / 360;
	          s = +a[1] / 100;
	          l = +a[2] / 100;
	          g = l <= .5 ? l * (s + 1) : l + s - l * s;
	          r = l * 2 - g;
	          a.length > 3 && (a[3] *= 1); //cast as number

	          a[0] = _hue(h + 1 / 3, r, g);
	          a[1] = _hue(h, r, g);
	          a[2] = _hue(h - 1 / 3, r, g);
	        } else if (~v.indexOf("=")) {
	          //if relative values are found, just return the raw strings with the relative prefixes in place.
	          a = v.match(_numExp);
	          forceAlpha && a.length < 4 && (a[3] = 1);
	          return a;
	        }
	      } else {
	        a = v.match(_strictNumExp) || _colorLookup.transparent;
	      }
	      a = a.map(Number);
	    }
	    if (toHSL && !wasHSL) {
	      r = a[0] / _255;
	      g = a[1] / _255;
	      b = a[2] / _255;
	      max = Math.max(r, g, b);
	      min = Math.min(r, g, b);
	      l = (max + min) / 2;
	      if (max === min) {
	        h = s = 0;
	      } else {
	        d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
	        h *= 60;
	      }
	      a[0] = ~~(h + .5);
	      a[1] = ~~(s * 100 + .5);
	      a[2] = ~~(l * 100 + .5);
	    }
	    forceAlpha && a.length < 4 && (a[3] = 1);
	    return a;
	  },
	  _colorOrderData = function _colorOrderData(v) {
	    // strips out the colors from the string, finds all the numeric slots (with units) and returns an array of those. The Array also has a "c" property which is an Array of the index values where the colors belong. This is to help work around issues where there's a mis-matched order of color/numeric data like drop-shadow(#f00 0px 1px 2px) and drop-shadow(0x 1px 2px #f00). This is basically a helper function used in _formatColors()
	    var values = [],
	      c = [],
	      i = -1;
	    v.split(_colorExp).forEach(function (v) {
	      var a = v.match(_numWithUnitExp) || [];
	      values.push.apply(values, a);
	      c.push(i += a.length + 1);
	    });
	    values.c = c;
	    return values;
	  },
	  _formatColors = function _formatColors(s, toHSL, orderMatchData) {
	    var result = "",
	      colors = (s + result).match(_colorExp),
	      type = toHSL ? "hsla(" : "rgba(",
	      i = 0,
	      c,
	      shell,
	      d,
	      l;
	    if (!colors) {
	      return s;
	    }
	    colors = colors.map(function (color) {
	      return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
	    });
	    if (orderMatchData) {
	      d = _colorOrderData(s);
	      c = orderMatchData.c;
	      if (c.join(result) !== d.c.join(result)) {
	        shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
	        l = shell.length - 1;
	        for (; i < l; i++) {
	          result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
	        }
	      }
	    }
	    if (!shell) {
	      shell = s.split(_colorExp);
	      l = shell.length - 1;
	      for (; i < l; i++) {
	        result += shell[i] + colors[i];
	      }
	    }
	    return result + shell[l];
	  },
	  _colorExp = function () {
	    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
	      //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
	      p;
	    for (p in _colorLookup) {
	      s += "|" + p + "\\b";
	    }
	    return new RegExp(s + ")", "gi");
	  }(),
	  _hslExp = /hsl[a]?\(/,
	  _colorStringFilter = function _colorStringFilter(a) {
	    var combined = a.join(" "),
	      toHSL;
	    _colorExp.lastIndex = 0;
	    if (_colorExp.test(combined)) {
	      toHSL = _hslExp.test(combined);
	      a[1] = _formatColors(a[1], toHSL);
	      a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1])); // make sure the order of numbers/colors match with the END value.

	      return true;
	    }
	  },
	  /*
	   * --------------------------------------------------------------------------------------
	   * TICKER
	   * --------------------------------------------------------------------------------------
	   */
	  _tickerActive,
	  _ticker = function () {
	    var _getTime = Date.now,
	      _lagThreshold = 500,
	      _adjustedLag = 33,
	      _startTime = _getTime(),
	      _lastUpdate = _startTime,
	      _gap = 1000 / 240,
	      _nextTime = _gap,
	      _listeners = [],
	      _id,
	      _req,
	      _raf,
	      _self,
	      _delta,
	      _i,
	      _tick = function _tick(v) {
	        var elapsed = _getTime() - _lastUpdate,
	          manual = v === true,
	          overlap,
	          dispatch,
	          time,
	          frame;
	        (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
	        _lastUpdate += elapsed;
	        time = _lastUpdate - _startTime;
	        overlap = time - _nextTime;
	        if (overlap > 0 || manual) {
	          frame = ++_self.frame;
	          _delta = time - _self.time * 1000;
	          _self.time = time = time / 1000;
	          _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
	          dispatch = 1;
	        }
	        manual || (_id = _req(_tick)); //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.

	        if (dispatch) {
	          for (_i = 0; _i < _listeners.length; _i++) {
	            // use _i and check _listeners.length instead of a variable because a listener could get removed during the loop, and if that happens to an element less than the current index, it'd throw things off in the loop.
	            _listeners[_i](time, _delta, frame, v);
	          }
	        }
	      };
	    _self = {
	      time: 0,
	      frame: 0,
	      tick: function tick() {
	        _tick(true);
	      },
	      deltaRatio: function deltaRatio(fps) {
	        return _delta / (1000 / (fps || 60));
	      },
	      wake: function wake() {
	        if (_coreReady) {
	          if (!_coreInitted$2 && _windowExists$2()) {
	            _win$3 = _coreInitted$2 = window;
	            _doc$3 = _win$3.document || {};
	            _globals.gsap = gsap$2;
	            (_win$3.gsapVersions || (_win$3.gsapVersions = [])).push(gsap$2.version);
	            _install(_installScope || _win$3.GreenSockGlobals || !_win$3.gsap && _win$3 || {});
	            _registerPluginQueue.forEach(_createPlugin);
	          }
	          _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
	          _id && _self.sleep();
	          _req = _raf || function (f) {
	            return setTimeout(f, _nextTime - _self.time * 1000 + 1 | 0);
	          };
	          _tickerActive = 1;
	          _tick(2);
	        }
	      },
	      sleep: function sleep() {
	        (_raf ? cancelAnimationFrame : clearTimeout)(_id);
	        _tickerActive = 0;
	        _req = _emptyFunc;
	      },
	      lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
	        _lagThreshold = threshold || Infinity; // zero should be interpreted as basically unlimited

	        _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
	      },
	      fps: function fps(_fps) {
	        _gap = 1000 / (_fps || 240);
	        _nextTime = _self.time * 1000 + _gap;
	      },
	      add: function add(callback, once, prioritize) {
	        var func = once ? function (t, d, f, v) {
	          callback(t, d, f, v);
	          _self.remove(func);
	        } : callback;
	        _self.remove(callback);
	        _listeners[prioritize ? "unshift" : "push"](func);
	        _wake();
	        return func;
	      },
	      remove: function remove(callback, i) {
	        ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
	      },
	      _listeners: _listeners
	    };
	    return _self;
	  }(),
	  _wake = function _wake() {
	    return !_tickerActive && _ticker.wake();
	  },
	  //also ensures the core classes are initialized.

	  /*
	  * -------------------------------------------------
	  * EASING
	  * -------------------------------------------------
	  */
	  _easeMap = {},
	  _customEaseExp = /^[\d.\-M][\d.\-,\s]/,
	  _quotesExp = /["']/g,
	  _parseObjectInString = function _parseObjectInString(value) {
	    //takes a string like "{wiggles:10, type:anticipate})" and turns it into a real object. Notice it ends in ")" and includes the {} wrappers. This is because we only use this function for parsing ease configs and prioritized optimization rather than reusability.
	    var obj = {},
	      split = value.substr(1, value.length - 3).split(":"),
	      key = split[0],
	      i = 1,
	      l = split.length,
	      index,
	      val,
	      parsedVal;
	    for (; i < l; i++) {
	      val = split[i];
	      index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
	      parsedVal = val.substr(0, index);
	      obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
	      key = val.substr(index + 1).trim();
	    }
	    return obj;
	  },
	  _valueInParentheses = function _valueInParentheses(value) {
	    var open = value.indexOf("(") + 1,
	      close = value.indexOf(")"),
	      nested = value.indexOf("(", open);
	    return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
	  },
	  _configEaseFromString = function _configEaseFromString(name) {
	    //name can be a string like "elastic.out(1,0.5)", and pass in _easeMap as obj and it'll parse it out and call the actual function like _easeMap.Elastic.easeOut.config(1,0.5). It will also parse custom ease strings as long as CustomEase is loaded and registered (internally as _easeMap._CE).
	    var split = (name + "").split("("),
	      ease = _easeMap[split[0]];
	    return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
	  },
	  _invertEase = function _invertEase(ease) {
	    return function (p) {
	      return 1 - ease(1 - p);
	    };
	  },
	  // allow yoyoEase to be set in children and have those affected when the parent/ancestor timeline yoyos.
	  _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
	    var child = timeline._first,
	      ease;
	    while (child) {
	      if (child instanceof Timeline) {
	        _propagateYoyoEase(child, isYoyo);
	      } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
	        if (child.timeline) {
	          _propagateYoyoEase(child.timeline, isYoyo);
	        } else {
	          ease = child._ease;
	          child._ease = child._yEase;
	          child._yEase = ease;
	          child._yoyo = isYoyo;
	        }
	      }
	      child = child._next;
	    }
	  },
	  _parseEase = function _parseEase(ease, defaultEase) {
	    return !ease ? defaultEase : (_isFunction$1(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
	  },
	  _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
	    if (easeOut === void 0) {
	      easeOut = function easeOut(p) {
	        return 1 - easeIn(1 - p);
	      };
	    }
	    if (easeInOut === void 0) {
	      easeInOut = function easeInOut(p) {
	        return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
	      };
	    }
	    var ease = {
	        easeIn: easeIn,
	        easeOut: easeOut,
	        easeInOut: easeInOut
	      },
	      lowercaseName;
	    _forEachName(names, function (name) {
	      _easeMap[name] = _globals[name] = ease;
	      _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
	      for (var p in ease) {
	        _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
	      }
	    });
	    return ease;
	  },
	  _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
	    return function (p) {
	      return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
	    };
	  },
	  _configElastic = function _configElastic(type, amplitude, period) {
	    var p1 = amplitude >= 1 ? amplitude : 1,
	      //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
	      p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1),
	      p3 = p2 / _2PI * (Math.asin(1 / p1) || 0),
	      easeOut = function easeOut(p) {
	        return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
	      },
	      ease = type === "out" ? easeOut : type === "in" ? function (p) {
	        return 1 - easeOut(1 - p);
	      } : _easeInOutFromOut(easeOut);
	    p2 = _2PI / p2; //precalculate to optimize

	    ease.config = function (amplitude, period) {
	      return _configElastic(type, amplitude, period);
	    };
	    return ease;
	  },
	  _configBack = function _configBack(type, overshoot) {
	    if (overshoot === void 0) {
	      overshoot = 1.70158;
	    }
	    var easeOut = function easeOut(p) {
	        return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
	      },
	      ease = type === "out" ? easeOut : type === "in" ? function (p) {
	        return 1 - easeOut(1 - p);
	      } : _easeInOutFromOut(easeOut);
	    ease.config = function (overshoot) {
	      return _configBack(type, overshoot);
	    };
	    return ease;
	  }; // a cheaper (kb and cpu) but more mild way to get a parameterized weighted ease by feeding in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEase = ratio => {
	// 	let y = 0.5 + ratio / 2;
	// 	return p => (2 * (1 - p) * p * y + p * p);
	// },
	// a stronger (but more expensive kb/cpu) parameterized weighted ease that lets you feed in a value between -1 (easeIn) and 1 (easeOut) where 0 is linear.
	// _weightedEaseStrong = ratio => {
	// 	ratio = .5 + ratio / 2;
	// 	let o = 1 / 3 * (ratio < .5 ? ratio : 1 - ratio),
	// 		b = ratio - o,
	// 		c = ratio + o;
	// 	return p => p === 1 ? p : 3 * b * (1 - p) * (1 - p) * p + 3 * c * (1 - p) * p * p + p * p * p;
	// };

	_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function (name, i) {
	  var power = i < 5 ? i + 1 : i;
	  _insertEase(name + ",Power" + (power - 1), i ? function (p) {
	    return Math.pow(p, power);
	  } : function (p) {
	    return p;
	  }, function (p) {
	    return 1 - Math.pow(1 - p, power);
	  }, function (p) {
	    return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
	  });
	});
	_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
	_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
	(function (n, c) {
	  var n1 = 1 / c,
	    n2 = 2 * n1,
	    n3 = 2.5 * n1,
	    easeOut = function easeOut(p) {
	      return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
	    };
	  _insertEase("Bounce", function (p) {
	    return 1 - easeOut(1 - p);
	  }, easeOut);
	})(7.5625, 2.75);
	_insertEase("Expo", function (p) {
	  return Math.pow(2, 10 * (p - 1)) * p + p * p * p * p * p * p * (1 - p);
	}); // previously 2 ** (10 * (p - 1)) but that doesn't end up with the value quite at the right spot so we do a blended ease to ensure it lands where it should perfectly.

	_insertEase("Circ", function (p) {
	  return -(_sqrt(1 - p * p) - 1);
	});
	_insertEase("Sine", function (p) {
	  return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
	});
	_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
	_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
	  config: function config(steps, immediateStart) {
	    if (steps === void 0) {
	      steps = 1;
	    }
	    var p1 = 1 / steps,
	      p2 = steps + (immediateStart ? 0 : 1),
	      p3 = immediateStart ? 1 : 0,
	      max = 1 - _tinyNum;
	    return function (p) {
	      return ((p2 * _clamp$1(0, max, p) | 0) + p3) * p1;
	    };
	  }
	};
	_defaults$1.ease = _easeMap["quad.out"];
	_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (name) {
	  return _callbackNames += name + "," + name + "Params,";
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * CACHE
	 * --------------------------------------------------------------------------------------
	 */

	var GSCache = function GSCache(target, harness) {
	  this.id = _gsID++;
	  target._gsap = this;
	  this.target = target;
	  this.harness = harness;
	  this.get = harness ? harness.get : _getProperty;
	  this.set = harness ? harness.getSetter : _getSetter;
	};
	/*
	 * --------------------------------------------------------------------------------------
	 * ANIMATION
	 * --------------------------------------------------------------------------------------
	 */

	var Animation = /*#__PURE__*/function () {
	  function Animation(vars) {
	    this.vars = vars;
	    this._delay = +vars.delay || 0;
	    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
	      // TODO: repeat: Infinity on a timeline's children must flag that timeline internally and affect its totalDuration, otherwise it'll stop in the negative direction when reaching the start.
	      this._rDelay = vars.repeatDelay || 0;
	      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
	    }
	    this._ts = 1;
	    _setDuration(this, +vars.duration, 1, 1);
	    this.data = vars.data;
	    if (_context$2) {
	      this._ctx = _context$2;
	      _context$2.data.push(this);
	    }
	    _tickerActive || _ticker.wake();
	  }
	  var _proto = Animation.prototype;
	  _proto.delay = function delay(value) {
	    if (value || value === 0) {
	      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
	      this._delay = value;
	      return this;
	    }
	    return this._delay;
	  };
	  _proto.duration = function duration(value) {
	    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
	  };
	  _proto.totalDuration = function totalDuration(value) {
	    if (!arguments.length) {
	      return this._tDur;
	    }
	    this._dirty = 0;
	    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
	  };
	  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
	    _wake();
	    if (!arguments.length) {
	      return this._tTime;
	    }
	    var parent = this._dp;
	    if (parent && parent.smoothChildTiming && this._ts) {
	      _alignPlayhead(this, _totalTime);
	      !parent._dp || parent.parent || _postAddChecks(parent, this); // edge case: if this is a child of a timeline that already completed, for example, we must re-activate the parent.
	      //in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The start of that child would get pushed out, but one of the ancestors may have completed.

	      while (parent && parent.parent) {
	        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
	          parent.totalTime(parent._tTime, true);
	        }
	        parent = parent.parent;
	      }
	      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
	        //if the animation doesn't have a parent, put it back into its last parent (recorded as _dp for exactly cases like this). Limit to parents with autoRemoveChildren (like globalTimeline) so that if the user manually removes an animation from a timeline and then alters its playhead, it doesn't get added back in.
	        _addToTimeline(this._dp, this, this._start - this._delay);
	      }
	    }
	    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
	      // check for _ptLookup on a Tween instance to ensure it has actually finished being instantiated, otherwise if this.reverse() gets called in the Animation constructor, it could trigger a render() here even though the _targets weren't populated, thus when _init() is called there won't be any PropTweens (it'll act like the tween is non-functional)
	      this._ts || (this._pTime = _totalTime); // otherwise, if an animation is paused, then the playhead is moved back to zero, then resumed, it'd revert back to the original time at the pause
	      //if (!this._lock) { // avoid endless recursion (not sure we need this yet or if it's worth the performance hit)
	      //   this._lock = 1;

	      _lazySafeRender(this, _totalTime, suppressEvents); //   this._lock = 0;
	      //}
	    }

	    return this;
	  };
	  _proto.time = function time(value, suppressEvents) {
	    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time; // note: if the modulus results in 0, the playhead could be exactly at the end or the beginning, and we always defer to the END with a non-zero value, otherwise if you set the time() to the very end (duration()), it would render at the START!
	  };

	  _proto.totalProgress = function totalProgress(value, suppressEvents) {
	    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
	  };
	  _proto.progress = function progress(value, suppressEvents) {
	    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
	  };
	  _proto.iteration = function iteration(value, suppressEvents) {
	    var cycleDuration = this.duration() + this._rDelay;
	    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
	  } // potential future addition:
	  // isPlayingBackwards() {
	  // 	let animation = this,
	  // 		orientation = 1; // 1 = forward, -1 = backward
	  // 	while (animation) {
	  // 		orientation *= animation.reversed() || (animation.repeat() && !(animation.iteration() & 1)) ? -1 : 1;
	  // 		animation = animation.parent;
	  // 	}
	  // 	return orientation < 0;
	  // }
	  ;

	  _proto.timeScale = function timeScale(value, suppressEvents) {
	    if (!arguments.length) {
	      return this._rts === -_tinyNum ? 0 : this._rts; // recorded timeScale. Special case: if someone calls reverse() on an animation with timeScale of 0, we assign it -_tinyNum to remember it's reversed.
	    }

	    if (this._rts === value) {
	      return this;
	    }
	    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime; // make sure to do the parentToChildTotalTime() BEFORE setting the new _ts because the old one must be used in that calculation.
	    // future addition? Up side: fast and minimal file size. Down side: only works on this animation; if a timeline is reversed, for example, its childrens' onReverse wouldn't get called.
	    //(+value < 0 && this._rts >= 0) && _callback(this, "onReverse", true);
	    // prioritize rendering where the parent's playhead lines up instead of this._tTime because there could be a tween that's animating another tween's timeScale in the same rendering loop (same parent), thus if the timeScale tween renders first, it would alter _start BEFORE _tTime was set on that tick (in the rendering loop), effectively freezing it until the timeScale tween finishes.

	    this._rts = +value || 0;
	    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts; // _ts is the functional timeScale which would be 0 if the animation is paused.

	    this.totalTime(_clamp$1(-Math.abs(this._delay), this._tDur, tTime), suppressEvents !== false);
	    _setEnd(this); // if parent.smoothChildTiming was false, the end time didn't get updated in the _alignPlayhead() method, so do it here.

	    return _recacheAncestors(this);
	  };
	  _proto.paused = function paused(value) {
	    if (!arguments.length) {
	      return this._ps;
	    } // possible future addition - if an animation is removed from its parent and then .restart() or .play() or .resume() is called, perhaps we should force it back into the globalTimeline but be careful because what if it's already at its end? We don't want it to just persist forever and not get released for GC.
	    // !this.parent && !value && this._tTime < this._tDur && this !== _globalTimeline && _globalTimeline.add(this);

	    if (this._ps !== value) {
	      this._ps = value;
	      if (value) {
	        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()); // if the pause occurs during the delay phase, make sure that's factored in when resuming.

	        this._ts = this._act = 0; // _ts is the functional timeScale, so a paused tween would effectively have a timeScale of 0. We record the "real" timeScale as _rts (recorded time scale)
	      } else {
	        _wake();
	        this._ts = this._rts; //only defer to _pTime (pauseTime) if tTime is zero. Remember, someone could pause() an animation, then scrub the playhead and resume(). If the parent doesn't have smoothChildTiming, we render at the rawTime() because the startTime won't get updated.

	        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum)); // edge case: animation.progress(1).pause().play() wouldn't render again because the playhead is already at the end, but the call to totalTime() below will add it back to its parent...and not remove it again (since removing only happens upon rendering at a new time). Offsetting the _tTime slightly is done simply to cause the final render in totalTime() that'll pop it off its timeline (if autoRemoveChildren is true, of course). Check to make sure _zTime isn't -_tinyNum to avoid an edge case where the playhead is pushed to the end but INSIDE a tween/callback, the timeline itself is paused thus halting rendering and leaving a few unrendered. When resuming, it wouldn't render those otherwise.
	      }
	    }

	    return this;
	  };
	  _proto.startTime = function startTime(value) {
	    if (arguments.length) {
	      this._start = value;
	      var parent = this.parent || this._dp;
	      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
	      return this;
	    }
	    return this._start;
	  };
	  _proto.endTime = function endTime(includeRepeats) {
	    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
	  };
	  _proto.rawTime = function rawTime(wrapRepeats) {
	    var parent = this.parent || this._dp; // _dp = detached parent

	    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
	  };
	  _proto.revert = function revert(config) {
	    if (config === void 0) {
	      config = _revertConfig;
	    }
	    var prevIsReverting = _reverting$1;
	    _reverting$1 = config;
	    if (this._initted || this._startAt) {
	      this.timeline && this.timeline.revert(config);
	      this.totalTime(-0.01, config.suppressEvents);
	    }
	    this.data !== "nested" && config.kill !== false && this.kill();
	    _reverting$1 = prevIsReverting;
	    return this;
	  };
	  _proto.globalTime = function globalTime(rawTime) {
	    var animation = this,
	      time = arguments.length ? rawTime : animation.rawTime();
	    while (animation) {
	      time = animation._start + time / (Math.abs(animation._ts) || 1);
	      animation = animation._dp;
	    }
	    return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time; // the _startAt tweens for .fromTo() and .from() that have immediateRender should always be FIRST in the timeline (important for context.revert()). "_sat" stands for _startAtTween, referring to the parent tween that created the _startAt. We must discern if that tween had immediateRender so that we can know whether or not to prioritize it in revert().
	  };

	  _proto.repeat = function repeat(value) {
	    if (arguments.length) {
	      this._repeat = value === Infinity ? -2 : value;
	      return _onUpdateTotalDuration(this);
	    }
	    return this._repeat === -2 ? Infinity : this._repeat;
	  };
	  _proto.repeatDelay = function repeatDelay(value) {
	    if (arguments.length) {
	      var time = this._time;
	      this._rDelay = value;
	      _onUpdateTotalDuration(this);
	      return time ? this.time(time) : this;
	    }
	    return this._rDelay;
	  };
	  _proto.yoyo = function yoyo(value) {
	    if (arguments.length) {
	      this._yoyo = value;
	      return this;
	    }
	    return this._yoyo;
	  };
	  _proto.seek = function seek(position, suppressEvents) {
	    return this.totalTime(_parsePosition$1(this, position), _isNotFalse(suppressEvents));
	  };
	  _proto.restart = function restart(includeDelay, suppressEvents) {
	    this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
	    this._dur || (this._zTime = -_tinyNum); // ensures onComplete fires on a zero-duration animation that gets restarted.

	    return this;
	  };
	  _proto.play = function play(from, suppressEvents) {
	    from != null && this.seek(from, suppressEvents);
	    return this.reversed(false).paused(false);
	  };
	  _proto.reverse = function reverse(from, suppressEvents) {
	    from != null && this.seek(from || this.totalDuration(), suppressEvents);
	    return this.reversed(true).paused(false);
	  };
	  _proto.pause = function pause(atTime, suppressEvents) {
	    atTime != null && this.seek(atTime, suppressEvents);
	    return this.paused(true);
	  };
	  _proto.resume = function resume() {
	    return this.paused(false);
	  };
	  _proto.reversed = function reversed(value) {
	    if (arguments.length) {
	      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0)); // in case timeScale is zero, reversing would have no effect so we use _tinyNum.

	      return this;
	    }
	    return this._rts < 0;
	  };
	  _proto.invalidate = function invalidate() {
	    this._initted = this._act = 0;
	    this._zTime = -_tinyNum;
	    return this;
	  };
	  _proto.isActive = function isActive() {
	    var parent = this.parent || this._dp,
	      start = this._start,
	      rawTime;
	    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
	  };
	  _proto.eventCallback = function eventCallback(type, callback, params) {
	    var vars = this.vars;
	    if (arguments.length > 1) {
	      if (!callback) {
	        delete vars[type];
	      } else {
	        vars[type] = callback;
	        params && (vars[type + "Params"] = params);
	        type === "onUpdate" && (this._onUpdate = callback);
	      }
	      return this;
	    }
	    return vars[type];
	  };
	  _proto.then = function then(onFulfilled) {
	    var self = this;
	    return new Promise(function (resolve) {
	      var f = _isFunction$1(onFulfilled) ? onFulfilled : _passThrough$1,
	        _resolve = function _resolve() {
	          var _then = self.then;
	          self.then = null; // temporarily null the then() method to avoid an infinite loop (see https://github.com/greensock/GSAP/issues/322)

	          _isFunction$1(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
	          resolve(f);
	          self.then = _then;
	        };
	      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
	        _resolve();
	      } else {
	        self._prom = _resolve;
	      }
	    });
	  };
	  _proto.kill = function kill() {
	    _interrupt(this);
	  };
	  return Animation;
	}();
	_setDefaults$1(Animation.prototype, {
	  _time: 0,
	  _start: 0,
	  _end: 0,
	  _tTime: 0,
	  _tDur: 0,
	  _dirty: 0,
	  _repeat: 0,
	  _yoyo: false,
	  parent: null,
	  _initted: false,
	  _rDelay: 0,
	  _ts: 1,
	  _dp: 0,
	  ratio: 0,
	  _zTime: -_tinyNum,
	  _prom: 0,
	  _ps: false,
	  _rts: 1
	});
	/*
	 * -------------------------------------------------
	 * TIMELINE
	 * -------------------------------------------------
	 */

	var Timeline = /*#__PURE__*/function (_Animation) {
	  _inheritsLoose(Timeline, _Animation);
	  function Timeline(vars, position) {
	    var _this;
	    if (vars === void 0) {
	      vars = {};
	    }
	    _this = _Animation.call(this, vars) || this;
	    _this.labels = {};
	    _this.smoothChildTiming = !!vars.smoothChildTiming;
	    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
	    _this._sort = _isNotFalse(vars.sortChildren);
	    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
	    vars.reversed && _this.reverse();
	    vars.paused && _this.paused(true);
	    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
	    return _this;
	  }
	  var _proto2 = Timeline.prototype;
	  _proto2.to = function to(targets, vars, position) {
	    _createTweenType(0, arguments, this);
	    return this;
	  };
	  _proto2.from = function from(targets, vars, position) {
	    _createTweenType(1, arguments, this);
	    return this;
	  };
	  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
	    _createTweenType(2, arguments, this);
	    return this;
	  };
	  _proto2.set = function set(targets, vars, position) {
	    vars.duration = 0;
	    vars.parent = this;
	    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
	    vars.immediateRender = !!vars.immediateRender;
	    new Tween(targets, vars, _parsePosition$1(this, position), 1);
	    return this;
	  };
	  _proto2.call = function call(callback, params, position) {
	    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
	  } //ONLY for backward compatibility! Maybe delete?
	  ;

	  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    vars.duration = duration;
	    vars.stagger = vars.stagger || stagger;
	    vars.onComplete = onCompleteAll;
	    vars.onCompleteParams = onCompleteAllParams;
	    vars.parent = this;
	    new Tween(targets, vars, _parsePosition$1(this, position));
	    return this;
	  };
	  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    vars.runBackwards = 1;
	    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
	    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
	  };
	  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
	    toVars.startAt = fromVars;
	    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
	    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
	  };
	  _proto2.render = function render(totalTime, suppressEvents, force) {
	    var prevTime = this._time,
	      tDur = this._dirty ? this.totalDuration() : this._tDur,
	      dur = this._dur,
	      tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime),
	      // if a paused timeline is resumed (or its _start is updated for another reason...which rounds it), that could result in the playhead shifting a **tiny** amount and a zero-duration child at that spot may get rendered at a different ratio, like its totalTime in render() may be 1e-17 instead of 0, for example.
	      crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur),
	      time,
	      child,
	      next,
	      iteration,
	      cycleDuration,
	      prevPaused,
	      pauseTween,
	      timeScale,
	      prevStart,
	      prevIteration,
	      yoyo,
	      isYoyo;
	    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
	    if (tTime !== this._tTime || force || crossingStart) {
	      if (prevTime !== this._time && dur) {
	        //if totalDuration() finds a child with a negative startTime and smoothChildTiming is true, things get shifted around internally so we need to adjust the time accordingly. For example, if a tween starts at -30 we must shift EVERYTHING forward 30 seconds and move this timeline's startTime backward by 30 seconds so that things align with the playhead (no jump).
	        tTime += this._time - prevTime;
	        totalTime += this._time - prevTime;
	      }
	      time = tTime;
	      prevStart = this._start;
	      timeScale = this._ts;
	      prevPaused = !timeScale;
	      if (crossingStart) {
	        dur || (prevTime = this._zTime); //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect.

	        (totalTime || !suppressEvents) && (this._zTime = totalTime);
	      }
	      if (this._repeat) {
	        //adjust the time for repeats and yoyos
	        yoyo = this._yoyo;
	        cycleDuration = dur + this._rDelay;
	        if (this._repeat < -1 && totalTime < 0) {
	          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
	        }
	        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

	        if (tTime === tDur) {
	          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
	          iteration = this._repeat;
	          time = dur;
	        } else {
	          prevIteration = _roundPrecise(tTime / cycleDuration); // full decimal version of iterations, not the previous iteration (we're reusing prevIteration variable for efficiency)

	          iteration = ~~prevIteration;
	          if (iteration && iteration === prevIteration) {
	            time = dur;
	            iteration--;
	          }
	          time > dur && (time = dur);
	        }
	        prevIteration = _animationCycle(this._tTime, cycleDuration);
	        !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration); // edge case - if someone does addPause() at the very beginning of a repeating timeline, that pause is technically at the same spot as the end which causes this._time to get set to 0 when the totalTime would normally place the playhead at the end. See https://gsap.com/forums/topic/23823-closing-nav-animation-not-working-on-ie-and-iphone-6-maybe-other-older-browser/?tab=comments#comment-113005 also, this._tTime - prevIteration * cycleDuration - this._dur <= 0 just checks to make sure it wasn't previously in the "repeatDelay" portion

	        if (yoyo && iteration & 1) {
	          time = dur - time;
	          isYoyo = 1;
	        }
	        /*
	        make sure children at the end/beginning of the timeline are rendered properly. If, for example,
	        a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which
	        would get translated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there
	        could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So
	        we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must
	        ensure that zero-duration tweens at the very beginning or end of the Timeline work.
	        */

	        if (iteration !== prevIteration && !this._lock) {
	          var rewinding = yoyo && prevIteration & 1,
	            doesWrap = rewinding === (yoyo && iteration & 1);
	          iteration < prevIteration && (rewinding = !rewinding);
	          prevTime = rewinding ? 0 : tTime % dur ? dur : tTime; // if the playhead is landing exactly at the end of an iteration, use that totalTime rather than only the duration, otherwise it'll skip the 2nd render since it's effectively at the same time.

	          this._lock = 1;
	          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
	          this._tTime = tTime; // if a user gets the iteration() inside the onRepeat, for example, it should be accurate.

	          !suppressEvents && this.parent && _callback$1(this, "onRepeat");
	          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
	          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
	            // if prevTime is 0 and we render at the very end, _time will be the end, thus won't match. So in this edge case, prevTime won't match _time but that's okay. If it gets killed in the onRepeat, eject as well.
	            return this;
	          }
	          dur = this._dur; // in case the duration changed in the onRepeat

	          tDur = this._tDur;
	          if (doesWrap) {
	            this._lock = 2;
	            prevTime = rewinding ? dur : -0.0001;
	            this.render(prevTime, true);
	            this.vars.repeatRefresh && !isYoyo && this.invalidate();
	          }
	          this._lock = 0;
	          if (!this._ts && !prevPaused) {
	            return this;
	          } //in order for yoyoEase to work properly when there's a stagger, we must swap out the ease in each sub-tween.

	          _propagateYoyoEase(this, isYoyo);
	        }
	      }
	      if (this._hasPause && !this._forcing && this._lock < 2) {
	        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
	        if (pauseTween) {
	          tTime -= time - (time = pauseTween._start);
	        }
	      }
	      this._tTime = tTime;
	      this._time = time;
	      this._act = !timeScale; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

	      if (!this._initted) {
	        this._onUpdate = this.vars.onUpdate;
	        this._initted = 1;
	        this._zTime = totalTime;
	        prevTime = 0; // upon init, the playhead should always go forward; someone could invalidate() a completed timeline and then if they restart(), that would make child tweens render in reverse order which could lock in the wrong starting values if they build on each other, like tl.to(obj, {x: 100}).to(obj, {x: 0}).
	      }

	      if (!prevTime && time && !suppressEvents && !iteration) {
	        _callback$1(this, "onStart");
	        if (this._tTime !== tTime) {
	          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
	          return this;
	        }
	      }
	      if (time >= prevTime && totalTime >= 0) {
	        child = this._first;
	        while (child) {
	          next = child._next;
	          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
	            if (child.parent !== this) {
	              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
	              return this.render(totalTime, suppressEvents, force);
	            }
	            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
	            if (time !== this._time || !this._ts && !prevPaused) {
	              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
	              pauseTween = 0;
	              next && (tTime += this._zTime = -_tinyNum); // it didn't finish rendering, so flag zTime as negative so that the next time render() is called it'll be forced (to render any remaining children)

	              break;
	            }
	          }
	          child = next;
	        }
	      } else {
	        child = this._last;
	        var adjustedTime = totalTime < 0 ? totalTime : time; //when the playhead goes backward beyond the start of this timeline, we must pass that information down to the child animations so that zero-duration tweens know whether to render their starting or ending values.

	        while (child) {
	          next = child._prev;
	          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
	            if (child.parent !== this) {
	              // an extreme edge case - the child's render could do something like kill() the "next" one in the linked list, or reparent it. In that case we must re-initiate the whole render to be safe.
	              return this.render(totalTime, suppressEvents, force);
	            }
	            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting$1 && (child._initted || child._startAt)); // if reverting, we should always force renders of initted tweens (but remember that .fromTo() or .from() may have a _startAt but not _initted yet). If, for example, a .fromTo() tween with a stagger (which creates an internal timeline) gets reverted BEFORE some of its child tweens render for the first time, it may not properly trigger them to revert.

	            if (time !== this._time || !this._ts && !prevPaused) {
	              //in case a tween pauses or seeks the timeline when rendering, like inside of an onUpdate/onComplete
	              pauseTween = 0;
	              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum); // it didn't finish rendering, so adjust zTime so that so that the next time render() is called it'll be forced (to render any remaining children)

	              break;
	            }
	          }
	          child = next;
	        }
	      }
	      if (pauseTween && !suppressEvents) {
	        this.pause();
	        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
	        if (this._ts) {
	          //the callback resumed playback! So since we may have held back the playhead due to where the pause is positioned, go ahead and jump to where it's SUPPOSED to be (if no pause happened).
	          this._start = prevStart; //if the pause was at an earlier time and the user resumed in the callback, it could reposition the timeline (changing its startTime), throwing things off slightly, so we make sure the _start doesn't shift.

	          _setEnd(this);
	          return this.render(totalTime, suppressEvents, force);
	        }
	      }
	      this._onUpdate && !suppressEvents && _callback$1(this, "onUpdate", true);
	      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
	        // remember, a child's callback may alter this timeline's playhead or timeScale which is why we need to add some of these checks.
	        (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

	        if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
	          _callback$1(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
	          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
	        }
	      }
	    }
	    return this;
	  };
	  _proto2.add = function add(child, position) {
	    var _this2 = this;
	    _isNumber$1(position) || (position = _parsePosition$1(this, position, child));
	    if (!(child instanceof Animation)) {
	      if (_isArray(child)) {
	        child.forEach(function (obj) {
	          return _this2.add(obj, position);
	        });
	        return this;
	      }
	      if (_isString$1(child)) {
	        return this.addLabel(child, position);
	      }
	      if (_isFunction$1(child)) {
	        child = Tween.delayedCall(0, child);
	      } else {
	        return this;
	      }
	    }
	    return this !== child ? _addToTimeline(this, child, position) : this; //don't allow a timeline to be added to itself as a child!
	  };

	  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
	    if (nested === void 0) {
	      nested = true;
	    }
	    if (tweens === void 0) {
	      tweens = true;
	    }
	    if (timelines === void 0) {
	      timelines = true;
	    }
	    if (ignoreBeforeTime === void 0) {
	      ignoreBeforeTime = -_bigNum$1;
	    }
	    var a = [],
	      child = this._first;
	    while (child) {
	      if (child._start >= ignoreBeforeTime) {
	        if (child instanceof Tween) {
	          tweens && a.push(child);
	        } else {
	          timelines && a.push(child);
	          nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
	        }
	      }
	      child = child._next;
	    }
	    return a;
	  };
	  _proto2.getById = function getById(id) {
	    var animations = this.getChildren(1, 1, 1),
	      i = animations.length;
	    while (i--) {
	      if (animations[i].vars.id === id) {
	        return animations[i];
	      }
	    }
	  };
	  _proto2.remove = function remove(child) {
	    if (_isString$1(child)) {
	      return this.removeLabel(child);
	    }
	    if (_isFunction$1(child)) {
	      return this.killTweensOf(child);
	    }
	    child.parent === this && _removeLinkedListItem(this, child);
	    if (child === this._recent) {
	      this._recent = this._last;
	    }
	    return _uncache(this);
	  };
	  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
	    if (!arguments.length) {
	      return this._tTime;
	    }
	    this._forcing = 1;
	    if (!this._dp && this._ts) {
	      //special case for the global timeline (or any other that has no parent or detached parent).
	      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
	    }
	    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
	    this._forcing = 0;
	    return this;
	  };
	  _proto2.addLabel = function addLabel(label, position) {
	    this.labels[label] = _parsePosition$1(this, position);
	    return this;
	  };
	  _proto2.removeLabel = function removeLabel(label) {
	    delete this.labels[label];
	    return this;
	  };
	  _proto2.addPause = function addPause(position, callback, params) {
	    var t = Tween.delayedCall(0, callback || _emptyFunc, params);
	    t.data = "isPause";
	    this._hasPause = 1;
	    return _addToTimeline(this, t, _parsePosition$1(this, position));
	  };
	  _proto2.removePause = function removePause(position) {
	    var child = this._first;
	    position = _parsePosition$1(this, position);
	    while (child) {
	      if (child._start === position && child.data === "isPause") {
	        _removeFromParent(child);
	      }
	      child = child._next;
	    }
	  };
	  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
	    var tweens = this.getTweensOf(targets, onlyActive),
	      i = tweens.length;
	    while (i--) {
	      _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
	    }
	    return this;
	  };
	  _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
	    var a = [],
	      parsedTargets = toArray(targets),
	      child = this._first,
	      isGlobalTime = _isNumber$1(onlyActive),
	      // a number is interpreted as a global time. If the animation spans
	      children;
	    while (child) {
	      if (child instanceof Tween) {
	        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
	          // note: if this is for overwriting, it should only be for tweens that aren't paused and are initted.
	          a.push(child);
	        }
	      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
	        a.push.apply(a, children);
	      }
	      child = child._next;
	    }
	    return a;
	  } // potential future feature - targets() on timelines
	  // targets() {
	  // 	let result = [];
	  // 	this.getChildren(true, true, false).forEach(t => result.push(...t.targets()));
	  // 	return result.filter((v, i) => result.indexOf(v) === i);
	  // }
	  ;

	  _proto2.tweenTo = function tweenTo(position, vars) {
	    vars = vars || {};
	    var tl = this,
	      endTime = _parsePosition$1(tl, position),
	      _vars = vars,
	      startAt = _vars.startAt,
	      _onStart = _vars.onStart,
	      onStartParams = _vars.onStartParams,
	      immediateRender = _vars.immediateRender,
	      initted,
	      tween = Tween.to(tl, _setDefaults$1({
	        ease: vars.ease || "none",
	        lazy: false,
	        immediateRender: false,
	        time: endTime,
	        overwrite: "auto",
	        duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
	        onStart: function onStart() {
	          tl.pause();
	          if (!initted) {
	            var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
	            tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
	            initted = 1;
	          }
	          _onStart && _onStart.apply(tween, onStartParams || []); //in case the user had an onStart in the vars - we don't want to overwrite it.
	        }
	      }, vars));
	    return immediateRender ? tween.render(0) : tween;
	  };
	  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
	    return this.tweenTo(toPosition, _setDefaults$1({
	      startAt: {
	        time: _parsePosition$1(this, fromPosition)
	      }
	    }, vars));
	  };
	  _proto2.recent = function recent() {
	    return this._recent;
	  };
	  _proto2.nextLabel = function nextLabel(afterTime) {
	    if (afterTime === void 0) {
	      afterTime = this._time;
	    }
	    return _getLabelInDirection(this, _parsePosition$1(this, afterTime));
	  };
	  _proto2.previousLabel = function previousLabel(beforeTime) {
	    if (beforeTime === void 0) {
	      beforeTime = this._time;
	    }
	    return _getLabelInDirection(this, _parsePosition$1(this, beforeTime), 1);
	  };
	  _proto2.currentLabel = function currentLabel(value) {
	    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
	  };
	  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
	    if (ignoreBeforeTime === void 0) {
	      ignoreBeforeTime = 0;
	    }
	    var child = this._first,
	      labels = this.labels,
	      p;
	    while (child) {
	      if (child._start >= ignoreBeforeTime) {
	        child._start += amount;
	        child._end += amount;
	      }
	      child = child._next;
	    }
	    if (adjustLabels) {
	      for (p in labels) {
	        if (labels[p] >= ignoreBeforeTime) {
	          labels[p] += amount;
	        }
	      }
	    }
	    return _uncache(this);
	  };
	  _proto2.invalidate = function invalidate(soft) {
	    var child = this._first;
	    this._lock = 0;
	    while (child) {
	      child.invalidate(soft);
	      child = child._next;
	    }
	    return _Animation.prototype.invalidate.call(this, soft);
	  };
	  _proto2.clear = function clear(includeLabels) {
	    if (includeLabels === void 0) {
	      includeLabels = true;
	    }
	    var child = this._first,
	      next;
	    while (child) {
	      next = child._next;
	      this.remove(child);
	      child = next;
	    }
	    this._dp && (this._time = this._tTime = this._pTime = 0);
	    includeLabels && (this.labels = {});
	    return _uncache(this);
	  };
	  _proto2.totalDuration = function totalDuration(value) {
	    var max = 0,
	      self = this,
	      child = self._last,
	      prevStart = _bigNum$1,
	      prev,
	      start,
	      parent;
	    if (arguments.length) {
	      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
	    }
	    if (self._dirty) {
	      parent = self.parent;
	      while (child) {
	        prev = child._prev; //record it here in case the tween changes position in the sequence...

	        child._dirty && child.totalDuration(); //could change the tween._startTime, so make sure the animation's cache is clean before analyzing it.

	        start = child._start;
	        if (start > prevStart && self._sort && child._ts && !self._lock) {
	          //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
	          self._lock = 1; //prevent endless recursive calls - there are methods that get triggered that check duration/totalDuration when we add().

	          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
	        } else {
	          prevStart = start;
	        }
	        if (start < 0 && child._ts) {
	          //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
	          max -= start;
	          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
	            self._start += start / self._ts;
	            self._time -= start;
	            self._tTime -= start;
	          }
	          self.shiftChildren(-start, false, -1e999);
	          prevStart = 0;
	        }
	        child._end > max && child._ts && (max = child._end);
	        child = prev;
	      }
	      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
	      self._dirty = 0;
	    }
	    return self._tDur;
	  };
	  Timeline.updateRoot = function updateRoot(time) {
	    if (_globalTimeline._ts) {
	      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
	      _lastRenderedFrame = _ticker.frame;
	    }
	    if (_ticker.frame >= _nextGCFrame) {
	      _nextGCFrame += _config.autoSleep || 120;
	      var child = _globalTimeline._first;
	      if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
	        while (child && !child._ts) {
	          child = child._next;
	        }
	        child || _ticker.sleep();
	      }
	    }
	  };
	  return Timeline;
	}(Animation);
	_setDefaults$1(Timeline.prototype, {
	  _lock: 0,
	  _hasPause: 0,
	  _forcing: 0
	});
	var _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
	    //note: we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
	    var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter),
	      index = 0,
	      matchIndex = 0,
	      result,
	      startNums,
	      color,
	      endNum,
	      chunk,
	      startNum,
	      hasRandom,
	      a;
	    pt.b = start;
	    pt.e = end;
	    start += ""; //ensure values are strings

	    end += "";
	    if (hasRandom = ~end.indexOf("random(")) {
	      end = _replaceRandom(end);
	    }
	    if (stringFilter) {
	      a = [start, end];
	      stringFilter(a, target, prop); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.

	      start = a[0];
	      end = a[1];
	    }
	    startNums = start.match(_complexStringNumExp) || [];
	    while (result = _complexStringNumExp.exec(end)) {
	      endNum = result[0];
	      chunk = end.substring(index, result.index);
	      if (color) {
	        color = (color + 1) % 5;
	      } else if (chunk.substr(-5) === "rgba(") {
	        color = 1;
	      }
	      if (endNum !== startNums[matchIndex++]) {
	        startNum = parseFloat(startNums[matchIndex - 1]) || 0; //these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

	        pt._pt = {
	          _next: pt._pt,
	          p: chunk || matchIndex === 1 ? chunk : ",",
	          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
	          s: startNum,
	          c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
	          m: color && color < 4 ? Math.round : 0
	        };
	        index = _complexStringNumExp.lastIndex;
	      }
	    }
	    pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)

	    pt.fp = funcParam;
	    if (_relExp.test(end) || hasRandom) {
	      pt.e = 0; //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).
	    }

	    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _addComplexStringPropTween.call(tweenInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.

	    return pt;
	  },
	  _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
	    _isFunction$1(end) && (end = end(index || 0, target, targets));
	    var currentValue = target[prop],
	      parsedStart = start !== "get" ? start : !_isFunction$1(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction$1(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](),
	      setter = !_isFunction$1(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc,
	      pt;
	    if (_isString$1(end)) {
	      if (~end.indexOf("random(")) {
	        end = _replaceRandom(end);
	      }
	      if (end.charAt(1) === "=") {
	        pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
	        if (pt || pt === 0) {
	          // to avoid isNaN, like if someone passes in a value like "!= whatever"
	          end = pt;
	        }
	      }
	    }
	    if (!optional || parsedStart !== end || _forceAllPropTweens) {
	      if (!isNaN(parsedStart * end) && end !== "") {
	        // fun fact: any number multiplied by "" is evaluated as the number 0!
	        pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
	        funcParam && (pt.fp = funcParam);
	        modifier && pt.modifier(modifier, this, target);
	        return this._pt = pt;
	      }
	      !currentValue && !(prop in target) && _missingPlugin(prop, end);
	      return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
	    }
	  },
	  //creates a copy of the vars object and processes any function-based values (putting the resulting values directly into the copy) as well as strings with "random()" in them. It does NOT process relative values.
	  _processVars = function _processVars(vars, index, target, targets, tween) {
	    _isFunction$1(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
	    if (!_isObject$1(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
	      return _isString$1(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
	    }
	    var copy = {},
	      p;
	    for (p in vars) {
	      copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
	    }
	    return copy;
	  },
	  _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
	    var plugin, pt, ptLookup, i;
	    if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
	      tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
	      if (tween !== _quickTween) {
	        ptLookup = tween._ptLookup[tween._targets.indexOf(target)]; //note: we can't use tween._ptLookup[index] because for staggered tweens, the index from the fullTargets array won't match what it is in each individual tween that spawns from the stagger.

	        i = plugin._props.length;
	        while (i--) {
	          ptLookup[plugin._props[i]] = pt;
	        }
	      }
	    }
	    return plugin;
	  },
	  _overwritingTween,
	  //store a reference temporarily so we can avoid overwriting itself.
	  _forceAllPropTweens,
	  _initTween = function _initTween(tween, time, tTime) {
	    var vars = tween.vars,
	      ease = vars.ease,
	      startAt = vars.startAt,
	      immediateRender = vars.immediateRender,
	      lazy = vars.lazy,
	      onUpdate = vars.onUpdate,
	      runBackwards = vars.runBackwards,
	      yoyoEase = vars.yoyoEase,
	      keyframes = vars.keyframes,
	      autoRevert = vars.autoRevert,
	      dur = tween._dur,
	      prevStartAt = tween._startAt,
	      targets = tween._targets,
	      parent = tween.parent,
	      fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets,
	      autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites$1,
	      tl = tween.timeline,
	      cleanVars,
	      i,
	      p,
	      pt,
	      target,
	      hasPriority,
	      gsData,
	      harness,
	      plugin,
	      ptLookup,
	      index,
	      harnessVars,
	      overwritten;
	    tl && (!keyframes || !ease) && (ease = "none");
	    tween._ease = _parseEase(ease, _defaults$1.ease);
	    tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults$1.ease)) : 0;
	    if (yoyoEase && tween._yoyo && !tween._repeat) {
	      //there must have been a parent timeline with yoyo:true that is currently in its yoyo phase, so flip the eases.
	      yoyoEase = tween._yEase;
	      tween._yEase = tween._ease;
	      tween._ease = yoyoEase;
	    }
	    tween._from = !tl && !!vars.runBackwards; //nested timelines should never run backwards - the backwards-ness is in the child tweens.

	    if (!tl || keyframes && !vars.stagger) {
	      //if there's an internal timeline, skip all the parsing because we passed that task down the chain.
	      harness = targets[0] ? _getCache(targets[0]).harness : 0;
	      harnessVars = harness && vars[harness.prop]; //someone may need to specify CSS-specific values AND non-CSS values, like if the element has an "x" property plus it's a standard DOM element. We allow people to distinguish by wrapping plugin-specific stuff in a css:{} object for example.

	      cleanVars = _copyExcluding(vars, _reservedProps);
	      if (prevStartAt) {
	        prevStartAt._zTime < 0 && prevStartAt.progress(1); // in case it's a lazy startAt that hasn't rendered yet.

	        time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig); // if it's a "startAt" (not "from()" or runBackwards: true), we only need to do a shallow revert (keep transforms cached in CSSPlugin)
	        // don't just _removeFromParent(prevStartAt.render(-1, true)) because that'll leave inline styles. We're creating a new _startAt for "startAt" tweens that re-capture things to ensure that if the pre-tween values changed since the tween was created, they're recorded.

	        prevStartAt._lazy = 0;
	      }
	      if (startAt) {
	        _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults$1({
	          data: "isStart",
	          overwrite: false,
	          parent: parent,
	          immediateRender: true,
	          lazy: !prevStartAt && _isNotFalse(lazy),
	          startAt: null,
	          delay: 0,
	          onUpdate: onUpdate && function () {
	            return _callback$1(tween, "onUpdate");
	          },
	          stagger: 0
	        }, startAt))); //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, from, to).fromTo(e, to, from);

	        tween._startAt._dp = 0; // don't allow it to get put back into root timeline! Like when revert() is called and totalTime() gets set.

	        tween._startAt._sat = tween; // used in globalTime(). _sat stands for _startAtTween

	        time < 0 && (_reverting$1 || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill); // rare edge case, like if a render is forced in the negative direction of a non-initted tween.

	        if (immediateRender) {
	          if (dur && time <= 0 && tTime <= 0) {
	            // check tTime here because in the case of a yoyo tween whose playhead gets pushed to the end like tween.progress(1), we should allow it through so that the onComplete gets fired properly.
	            time && (tween._zTime = time);
	            return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a Timeline, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
	          }
	        }
	      } else if (runBackwards && dur) {
	        //from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
	        if (!prevStartAt) {
	          time && (immediateRender = false); //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0

	          p = _setDefaults$1({
	            overwrite: false,
	            data: "isFromStart",
	            //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
	            lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
	            immediateRender: immediateRender,
	            //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
	            stagger: 0,
	            parent: parent //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
	          }, cleanVars);
	          harnessVars && (p[harness.prop] = harnessVars); // in case someone does something like .from(..., {css:{}})

	          _removeFromParent(tween._startAt = Tween.set(targets, p));
	          tween._startAt._dp = 0; // don't allow it to get put back into root timeline!

	          tween._startAt._sat = tween; // used in globalTime()

	          time < 0 && (_reverting$1 ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
	          tween._zTime = time;
	          if (!immediateRender) {
	            _initTween(tween._startAt, _tinyNum, _tinyNum); //ensures that the initial values are recorded
	          } else if (!time) {
	            return;
	          }
	        }
	      }
	      tween._pt = tween._ptCache = 0;
	      lazy = dur && _isNotFalse(lazy) || lazy && !dur;
	      for (i = 0; i < targets.length; i++) {
	        target = targets[i];
	        gsData = target._gsap || _harness(targets)[i]._gsap;
	        tween._ptLookup[i] = ptLookup = {};
	        _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)

	        index = fullTargets === targets ? i : fullTargets.indexOf(target);
	        if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
	          tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
	          plugin._props.forEach(function (name) {
	            ptLookup[name] = pt;
	          });
	          plugin.priority && (hasPriority = 1);
	        }
	        if (!harness || harnessVars) {
	          for (p in cleanVars) {
	            if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) {
	              plugin.priority && (hasPriority = 1);
	            } else {
	              ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
	            }
	          }
	        }
	        tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
	        if (autoOverwrite && tween._pt) {
	          _overwritingTween = tween;
	          _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time)); // make sure the overwriting doesn't overwrite THIS tween!!!

	          overwritten = !tween.parent;
	          _overwritingTween = 0;
	        }
	        tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
	      }
	      hasPriority && _sortPropTweensByPriority(tween);
	      tween._onInit && tween._onInit(tween); //plugins like RoundProps must wait until ALL of the PropTweens are instantiated. In the plugin's init() function, it sets the _onInit on the tween instance. May not be pretty/intuitive, but it's fast and keeps file size down.
	    }

	    tween._onUpdate = onUpdate;
	    tween._initted = (!tween._op || tween._pt) && !overwritten; // if overwrittenProps resulted in the entire tween being killed, do NOT flag it as initted or else it may render for one tick.

	    keyframes && time <= 0 && tl.render(_bigNum$1, true, true); // if there's a 0% keyframe, it'll render in the "before" state for any staggered/delayed animations thus when the following tween initializes, it'll use the "before" state instead of the "after" state as the initial values.
	  },
	  _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
	    var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property],
	      pt,
	      rootPT,
	      lookup,
	      i;
	    if (!ptCache) {
	      ptCache = tween._ptCache[property] = [];
	      lookup = tween._ptLookup;
	      i = tween._targets.length;
	      while (i--) {
	        pt = lookup[i][property];
	        if (pt && pt.d && pt.d._pt) {
	          // it's a plugin, so find the nested PropTween
	          pt = pt.d._pt;
	          while (pt && pt.p !== property && pt.fp !== property) {
	            // "fp" is functionParam for things like setting CSS variables which require .setProperty("--var-name", value)
	            pt = pt._next;
	          }
	        }
	        if (!pt) {
	          // there is no PropTween associated with that property, so we must FORCE one to be created and ditch out of this
	          // if the tween has other properties that already rendered at new positions, we'd normally have to rewind to put them back like tween.render(0, true) before forcing an _initTween(), but that can create another edge case like tweening a timeline's progress would trigger onUpdates to fire which could move other things around. It's better to just inform users that .resetTo() should ONLY be used for tweens that already have that property. For example, you can't gsap.to(...{ y: 0 }) and then tween.restTo("x", 200) for example.
	          _forceAllPropTweens = 1; // otherwise, when we _addPropTween() and it finds no change between the start and end values, it skips creating a PropTween (for efficiency...why tween when there's no difference?) but in this case we NEED that PropTween created so we can edit it.

	          tween.vars[property] = "+=0";
	          _initTween(tween, time);
	          _forceAllPropTweens = 0;
	          return skipRecursion ? _warn(property + " not eligible for reset") : 1; // if someone tries to do a quickTo() on a special property like borderRadius which must get split into 4 different properties, that's not eligible for .resetTo().
	        }

	        ptCache.push(pt);
	      }
	    }
	    i = ptCache.length;
	    while (i--) {
	      rootPT = ptCache[i];
	      pt = rootPT._pt || rootPT; // complex values may have nested PropTweens. We only accommodate the FIRST value.

	      pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
	      pt.c = value - pt.s;
	      rootPT.e && (rootPT.e = _round$1(value) + getUnit(rootPT.e)); // mainly for CSSPlugin (end value)

	      rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b)); // (beginning value)
	    }
	  },
	  _addAliasesToVars = function _addAliasesToVars(targets, vars) {
	    var harness = targets[0] ? _getCache(targets[0]).harness : 0,
	      propertyAliases = harness && harness.aliases,
	      copy,
	      p,
	      i,
	      aliases;
	    if (!propertyAliases) {
	      return vars;
	    }
	    copy = _merge({}, vars);
	    for (p in propertyAliases) {
	      if (p in copy) {
	        aliases = propertyAliases[p].split(",");
	        i = aliases.length;
	        while (i--) {
	          copy[aliases[i]] = copy[p];
	        }
	      }
	    }
	    return copy;
	  },
	  // parses multiple formats, like {"0%": {x: 100}, {"50%": {x: -20}} and { x: {"0%": 100, "50%": -20} }, and an "ease" can be set on any object. We populate an "allProps" object with an Array for each property, like {x: [{}, {}], y:[{}, {}]} with data for each property tween. The objects have a "t" (time), "v", (value), and "e" (ease) property. This allows us to piece together a timeline later.
	  _parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
	    var ease = obj.ease || easeEach || "power1.inOut",
	      p,
	      a;
	    if (_isArray(obj)) {
	      a = allProps[prop] || (allProps[prop] = []); // t = time (out of 100), v = value, e = ease

	      obj.forEach(function (value, i) {
	        return a.push({
	          t: i / (obj.length - 1) * 100,
	          v: value,
	          e: ease
	        });
	      });
	    } else {
	      for (p in obj) {
	        a = allProps[p] || (allProps[p] = []);
	        p === "ease" || a.push({
	          t: parseFloat(prop),
	          v: obj[p],
	          e: ease
	        });
	      }
	    }
	  },
	  _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
	    return _isFunction$1(value) ? value.call(tween, i, target, targets) : _isString$1(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
	  },
	  _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
	  _staggerPropsToSkip = {};
	_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function (name) {
	  return _staggerPropsToSkip[name] = 1;
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * TWEEN
	 * --------------------------------------------------------------------------------------
	 */

	var Tween = /*#__PURE__*/function (_Animation2) {
	  _inheritsLoose(Tween, _Animation2);
	  function Tween(targets, vars, position, skipInherit) {
	    var _this3;
	    if (typeof vars === "number") {
	      position.duration = vars;
	      vars = position;
	      position = null;
	    }
	    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
	    var _this3$vars = _this3.vars,
	      duration = _this3$vars.duration,
	      delay = _this3$vars.delay,
	      immediateRender = _this3$vars.immediateRender,
	      stagger = _this3$vars.stagger,
	      overwrite = _this3$vars.overwrite,
	      keyframes = _this3$vars.keyframes,
	      defaults = _this3$vars.defaults,
	      scrollTrigger = _this3$vars.scrollTrigger,
	      yoyoEase = _this3$vars.yoyoEase,
	      parent = vars.parent || _globalTimeline,
	      parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber$1(targets[0]) : "length" in vars) ? [targets] : toArray(targets),
	      tl,
	      i,
	      copy,
	      l,
	      p,
	      curTarget,
	      staggerFunc,
	      staggerVarsToMerge;
	    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
	    _this3._ptLookup = []; //PropTween lookup. An array containing an object for each target, having keys for each tweening property

	    _this3._overwrite = overwrite;
	    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
	      vars = _this3.vars;
	      tl = _this3.timeline = new Timeline({
	        data: "nested",
	        defaults: defaults || {},
	        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
	      }); // we need to store the targets because for staggers and keyframes, we end up creating an individual tween for each but function-based values need to know the index and the whole Array of targets.

	      tl.kill();
	      tl.parent = tl._dp = _assertThisInitialized(_this3);
	      tl._start = 0;
	      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
	        l = parsedTargets.length;
	        staggerFunc = stagger && distribute(stagger);
	        if (_isObject$1(stagger)) {
	          //users can pass in callbacks like onStart/onComplete in the stagger object. These should fire with each individual tween.
	          for (p in stagger) {
	            if (~_staggerTweenProps.indexOf(p)) {
	              staggerVarsToMerge || (staggerVarsToMerge = {});
	              staggerVarsToMerge[p] = stagger[p];
	            }
	          }
	        }
	        for (i = 0; i < l; i++) {
	          copy = _copyExcluding(vars, _staggerPropsToSkip);
	          copy.stagger = 0;
	          yoyoEase && (copy.yoyoEase = yoyoEase);
	          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
	          curTarget = parsedTargets[i]; //don't just copy duration or delay because if they're a string or function, we'd end up in an infinite loop because _isFuncOrString() would evaluate as true in the child tweens, entering this loop, etc. So we parse the value straight from vars and default to 0.

	          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
	          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
	          if (!stagger && l === 1 && copy.delay) {
	            // if someone does delay:"random(1, 5)", repeat:-1, for example, the delay shouldn't be inside the repeat.
	            _this3._delay = delay = copy.delay;
	            _this3._start += delay;
	            copy.delay = 0;
	          }
	          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
	          tl._ease = _easeMap.none;
	        }
	        tl.duration() ? duration = delay = 0 : _this3.timeline = 0; // if the timeline's duration is 0, we don't need a timeline internally!
	      } else if (keyframes) {
	        _inheritDefaults(_setDefaults$1(tl.vars.defaults, {
	          ease: "none"
	        }));
	        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
	        var time = 0,
	          a,
	          kf,
	          v;
	        if (_isArray(keyframes)) {
	          keyframes.forEach(function (frame) {
	            return tl.to(parsedTargets, frame, ">");
	          });
	          tl.duration(); // to ensure tl._dur is cached because we tap into it for performance purposes in the render() method.
	        } else {
	          copy = {};
	          for (p in keyframes) {
	            p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
	          }
	          for (p in copy) {
	            a = copy[p].sort(function (a, b) {
	              return a.t - b.t;
	            });
	            time = 0;
	            for (i = 0; i < a.length; i++) {
	              kf = a[i];
	              v = {
	                ease: kf.e,
	                duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
	              };
	              v[p] = kf.v;
	              tl.to(parsedTargets, v, time);
	              time += v.duration;
	            }
	          }
	          tl.duration() < duration && tl.to({}, {
	            duration: duration - tl.duration()
	          }); // in case keyframes didn't go to 100%
	        }
	      }

	      duration || _this3.duration(duration = tl.duration());
	    } else {
	      _this3.timeline = 0; //speed optimization, faster lookups (no going up the prototype chain)
	    }

	    if (overwrite === true && !_suppressOverwrites$1) {
	      _overwritingTween = _assertThisInitialized(_this3);
	      _globalTimeline.killTweensOf(parsedTargets);
	      _overwritingTween = 0;
	    }
	    _addToTimeline(parent, _assertThisInitialized(_this3), position);
	    vars.reversed && _this3.reverse();
	    vars.paused && _this3.paused(true);
	    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
	      _this3._tTime = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)

	      _this3.render(Math.max(0, -delay) || 0); //in case delay is negative
	    }

	    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
	    return _this3;
	  }
	  var _proto3 = Tween.prototype;
	  _proto3.render = function render(totalTime, suppressEvents, force) {
	    var prevTime = this._time,
	      tDur = this._tDur,
	      dur = this._dur,
	      isNegative = totalTime < 0,
	      tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime,
	      time,
	      pt,
	      iteration,
	      cycleDuration,
	      prevIteration,
	      isYoyo,
	      ratio,
	      timeline,
	      yoyoEase;
	    if (!dur) {
	      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
	    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative || this._lazy) {
	      // this senses if we're crossing over the start time, in which case we must record _zTime and force the render, but we do it in this lengthy conditional way for performance reasons (usually we can skip the calculations): this._initted && (this._zTime < 0) !== (totalTime < 0)
	      time = tTime;
	      timeline = this.timeline;
	      if (this._repeat) {
	        //adjust the time for repeats and yoyos
	        cycleDuration = dur + this._rDelay;
	        if (this._repeat < -1 && isNegative) {
	          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
	        }
	        time = _roundPrecise(tTime % cycleDuration); //round to avoid floating point errors. (4 % 0.8 should be 0 but some browsers report it as 0.79999999!)

	        if (tTime === tDur) {
	          // the tDur === tTime is for edge cases where there's a lengthy decimal on the duration and it may reach the very end but the time is rendered as not-quite-there (remember, tDur is rounded to 4 decimals whereas dur isn't)
	          iteration = this._repeat;
	          time = dur;
	        } else {
	          prevIteration = _roundPrecise(tTime / cycleDuration); // full decimal version of iterations, not the previous iteration (we're reusing prevIteration variable for efficiency)

	          iteration = ~~prevIteration;
	          if (iteration && iteration === prevIteration) {
	            time = dur;
	            iteration--;
	          } else if (time > dur) {
	            time = dur;
	          }
	        }
	        isYoyo = this._yoyo && iteration & 1;
	        if (isYoyo) {
	          yoyoEase = this._yEase;
	          time = dur - time;
	        }
	        prevIteration = _animationCycle(this._tTime, cycleDuration);
	        if (time === prevTime && !force && this._initted && iteration === prevIteration) {
	          //could be during the repeatDelay part. No need to render and fire callbacks.
	          this._tTime = tTime;
	          return this;
	        }
	        if (iteration !== prevIteration) {
	          timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo); //repeatRefresh functionality

	          if (this.vars.repeatRefresh && !isYoyo && !this._lock && time !== cycleDuration && this._initted) {
	            // this._time will === cycleDuration when we render at EXACTLY the end of an iteration. Without this condition, it'd often do the repeatRefresh render TWICE (again on the very next tick).
	            this._lock = force = 1; //force, otherwise if lazy is true, the _attemptInitTween() will return and we'll jump out and get caught bouncing on each tick.

	            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
	          }
	        }
	      }
	      if (!this._initted) {
	        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
	          this._tTime = 0; // in constructor if immediateRender is true, we set _tTime to -_tinyNum to have the playhead cross the starting point but we can't leave _tTime as a negative number.

	          return this;
	        }
	        if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
	          // rare edge case - during initialization, an onUpdate in the _startAt (.fromTo()) might force this tween to render at a different spot in which case we should ditch this render() call so that it doesn't revert the values. But we also don't want to dump if we're doing a repeatRefresh render!
	          return this;
	        }
	        if (dur !== this._dur) {
	          // while initting, a plugin like InertiaPlugin might alter the duration, so rerun from the start to ensure everything renders as it should.
	          return this.render(totalTime, suppressEvents, force);
	        }
	      }
	      this._tTime = tTime;
	      this._time = time;
	      if (!this._act && this._ts) {
	        this._act = 1; //as long as it's not paused, force it to be active so that if the user renders independent of the parent timeline, it'll be forced to re-render on the next tick.

	        this._lazy = 0;
	      }
	      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
	      if (this._from) {
	        this.ratio = ratio = 1 - ratio;
	      }
	      if (time && !prevTime && !suppressEvents && !iteration) {
	        _callback$1(this, "onStart");
	        if (this._tTime !== tTime) {
	          // in case the onStart triggered a render at a different spot, eject. Like if someone did animation.pause(0.5) or something inside the onStart.
	          return this;
	        }
	      }
	      pt = this._pt;
	      while (pt) {
	        pt.r(ratio, pt.d);
	        pt = pt._next;
	      }
	      timeline && timeline.render(totalTime < 0 ? totalTime : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
	      if (this._onUpdate && !suppressEvents) {
	        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.

	        _callback$1(this, "onUpdate");
	      }
	      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback$1(this, "onRepeat");
	      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
	        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
	        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1); // don't remove if we're rendering at exactly a time of 0, as there could be autoRevert values that should get set on the next tick (if the playhead goes backward beyond the startTime, negative totalTime). Don't remove if the timeline is reversed and the playhead isn't at 0, otherwise tl.progress(1).reverse() won't work. Only remove if the playhead is at the end and timeScale is positive, or if the playhead is at 0 and the timeScale is negative.

	        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
	          // if prevTime and tTime are zero, we shouldn't fire the onReverseComplete. This could happen if you gsap.to(... {paused:true}).play();
	          _callback$1(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
	          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
	        }
	      }
	    }
	    return this;
	  };
	  _proto3.targets = function targets() {
	    return this._targets;
	  };
	  _proto3.invalidate = function invalidate(soft) {
	    // "soft" gives us a way to clear out everything EXCEPT the recorded pre-"from" portion of from() tweens. Otherwise, for example, if you tween.progress(1).render(0, true true).invalidate(), the "from" values would persist and then on the next render, the from() tweens would initialize and the current value would match the "from" values, thus animate from the same value to the same value (no animation). We tap into this in ScrollTrigger's refresh() where we must push a tween to completion and then back again but honor its init state in case the tween is dependent on another tween further up on the page.
	    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
	    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
	    this._ptLookup = [];
	    this.timeline && this.timeline.invalidate(soft);
	    return _Animation2.prototype.invalidate.call(this, soft);
	  };
	  _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
	    _tickerActive || _ticker.wake();
	    this._ts || this.play();
	    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts),
	      ratio;
	    this._initted || _initTween(this, time);
	    ratio = this._ease(time / this._dur); // don't just get tween.ratio because it may not have rendered yet.
	    // possible future addition to allow an object with multiple values to update, like tween.resetTo({x: 100, y: 200}); At this point, it doesn't seem worth the added kb given the fact that most users will likely opt for the convenient gsap.quickTo() way of interacting with this method.
	    // if (_isObject(property)) { // performance optimization
	    // 	for (p in property) {
	    // 		if (_updatePropTweens(this, p, property[p], value ? value[p] : null, start, ratio, time)) {
	    // 			return this.resetTo(property, value, start, startIsRelative); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
	    // 		}
	    // 	}
	    // } else {

	    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
	      return this.resetTo(property, value, start, startIsRelative, 1); // if a PropTween wasn't found for the property, it'll get forced with a re-initialization so we need to jump out and start over again.
	    } //}

	    _alignPlayhead(this, 0);
	    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
	    return this.render(0);
	  };
	  _proto3.kill = function kill(targets, vars) {
	    if (vars === void 0) {
	      vars = "all";
	    }
	    if (!targets && (!vars || vars === "all")) {
	      this._lazy = this._pt = 0;
	      this.parent ? _interrupt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_reverting$1);
	      return this;
	    }
	    if (this.timeline) {
	      var tDur = this.timeline.totalDuration();
	      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this); // if nothing is left tweening, interrupt.

	      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1); // if a nested tween is killed that changes the duration, it should affect this tween's duration. We must use the ratio, though, because sometimes the internal timeline is stretched like for keyframes where they don't all add up to whatever the parent tween's duration was set to.

	      return this;
	    }
	    var parsedTargets = this._targets,
	      killingTargets = targets ? toArray(targets) : parsedTargets,
	      propTweenLookup = this._ptLookup,
	      firstPT = this._pt,
	      overwrittenProps,
	      curLookup,
	      curOverwriteProps,
	      props,
	      p,
	      pt,
	      i;
	    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
	      vars === "all" && (this._pt = 0);
	      return _interrupt(this);
	    }
	    overwrittenProps = this._op = this._op || [];
	    if (vars !== "all") {
	      //so people can pass in a comma-delimited list of property names
	      if (_isString$1(vars)) {
	        p = {};
	        _forEachName(vars, function (name) {
	          return p[name] = 1;
	        });
	        vars = p;
	      }
	      vars = _addAliasesToVars(parsedTargets, vars);
	    }
	    i = parsedTargets.length;
	    while (i--) {
	      if (~killingTargets.indexOf(parsedTargets[i])) {
	        curLookup = propTweenLookup[i];
	        if (vars === "all") {
	          overwrittenProps[i] = vars;
	          props = curLookup;
	          curOverwriteProps = {};
	        } else {
	          curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
	          props = vars;
	        }
	        for (p in props) {
	          pt = curLookup && curLookup[p];
	          if (pt) {
	            if (!("kill" in pt.d) || pt.d.kill(p) === true) {
	              _removeLinkedListItem(this, pt, "_pt");
	            }
	            delete curLookup[p];
	          }
	          if (curOverwriteProps !== "all") {
	            curOverwriteProps[p] = 1;
	          }
	        }
	      }
	    }
	    this._initted && !this._pt && firstPT && _interrupt(this); //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.

	    return this;
	  };
	  Tween.to = function to(targets, vars) {
	    return new Tween(targets, vars, arguments[2]);
	  };
	  Tween.from = function from(targets, vars) {
	    return _createTweenType(1, arguments);
	  };
	  Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
	    return new Tween(callback, 0, {
	      immediateRender: false,
	      lazy: false,
	      overwrite: false,
	      delay: delay,
	      onComplete: callback,
	      onReverseComplete: callback,
	      onCompleteParams: params,
	      onReverseCompleteParams: params,
	      callbackScope: scope
	    }); // we must use onReverseComplete too for things like timeline.add(() => {...}) which should be triggered in BOTH directions (forward and reverse)
	  };

	  Tween.fromTo = function fromTo(targets, fromVars, toVars) {
	    return _createTweenType(2, arguments);
	  };
	  Tween.set = function set(targets, vars) {
	    vars.duration = 0;
	    vars.repeatDelay || (vars.repeat = 0);
	    return new Tween(targets, vars);
	  };
	  Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
	    return _globalTimeline.killTweensOf(targets, props, onlyActive);
	  };
	  return Tween;
	}(Animation);
	_setDefaults$1(Tween.prototype, {
	  _targets: [],
	  _lazy: 0,
	  _startAt: 0,
	  _op: 0,
	  _onInit: 0
	}); //add the pertinent timeline methods to Tween instances so that users can chain conveniently and create a timeline automatically. (removed due to concerns that it'd ultimately add to more confusion especially for beginners)
	// _forEachName("to,from,fromTo,set,call,add,addLabel,addPause", name => {
	// 	Tween.prototype[name] = function() {
	// 		let tl = new Timeline();
	// 		return _addToTimeline(tl, this)[name].apply(tl, toArray(arguments));
	// 	}
	// });
	//for backward compatibility. Leverage the timeline calls.

	_forEachName("staggerTo,staggerFrom,staggerFromTo", function (name) {
	  Tween[name] = function () {
	    var tl = new Timeline(),
	      params = _slice.call(arguments, 0);
	    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
	    return tl[name].apply(tl, params);
	  };
	});
	/*
	 * --------------------------------------------------------------------------------------
	 * PROPTWEEN
	 * --------------------------------------------------------------------------------------
	 */

	var _setterPlain = function _setterPlain(target, property, value) {
	    return target[property] = value;
	  },
	  _setterFunc = function _setterFunc(target, property, value) {
	    return target[property](value);
	  },
	  _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
	    return target[property](data.fp, value);
	  },
	  _setterAttribute = function _setterAttribute(target, property, value) {
	    return target.setAttribute(property, value);
	  },
	  _getSetter = function _getSetter(target, property) {
	    return _isFunction$1(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
	  },
	  _renderPlain = function _renderPlain(ratio, data) {
	    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1000000) / 1000000, data);
	  },
	  _renderBoolean = function _renderBoolean(ratio, data) {
	    return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
	  },
	  _renderComplexString = function _renderComplexString(ratio, data) {
	    var pt = data._pt,
	      s = "";
	    if (!ratio && data.b) {
	      //b = beginning string
	      s = data.b;
	    } else if (ratio === 1 && data.e) {
	      //e = ending string
	      s = data.e;
	    } else {
	      while (pt) {
	        s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 10000) / 10000) + s; //we use the "p" property for the text inbetween (like a suffix). And in the context of a complex string, the modifier (m) is typically just Math.round(), like for RGB colors.

	        pt = pt._next;
	      }
	      s += data.c; //we use the "c" of the PropTween to store the final chunk of non-numeric text.
	    }

	    data.set(data.t, data.p, s, data);
	  },
	  _renderPropTweens = function _renderPropTweens(ratio, data) {
	    var pt = data._pt;
	    while (pt) {
	      pt.r(ratio, pt.d);
	      pt = pt._next;
	    }
	  },
	  _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
	    var pt = this._pt,
	      next;
	    while (pt) {
	      next = pt._next;
	      pt.p === property && pt.modifier(modifier, tween, target);
	      pt = next;
	    }
	  },
	  _killPropTweensOf = function _killPropTweensOf(property) {
	    var pt = this._pt,
	      hasNonDependentRemaining,
	      next;
	    while (pt) {
	      next = pt._next;
	      if (pt.p === property && !pt.op || pt.op === property) {
	        _removeLinkedListItem(this, pt, "_pt");
	      } else if (!pt.dep) {
	        hasNonDependentRemaining = 1;
	      }
	      pt = next;
	    }
	    return !hasNonDependentRemaining;
	  },
	  _setterWithModifier = function _setterWithModifier(target, property, value, data) {
	    data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
	  },
	  _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
	    var pt = parent._pt,
	      next,
	      pt2,
	      first,
	      last; //sorts the PropTween linked list in order of priority because some plugins need to do their work after ALL of the PropTweens were created (like RoundPropsPlugin and ModifiersPlugin)

	    while (pt) {
	      next = pt._next;
	      pt2 = first;
	      while (pt2 && pt2.pr > pt.pr) {
	        pt2 = pt2._next;
	      }
	      if (pt._prev = pt2 ? pt2._prev : last) {
	        pt._prev._next = pt;
	      } else {
	        first = pt;
	      }
	      if (pt._next = pt2) {
	        pt2._prev = pt;
	      } else {
	        last = pt;
	      }
	      pt = next;
	    }
	    parent._pt = first;
	  }; //PropTween key: t = target, p = prop, r = renderer, d = data, s = start, c = change, op = overwriteProperty (ONLY populated when it's different than p), pr = priority, _next/_prev for the linked list siblings, set = setter, m = modifier, mSet = modifierSetter (the original setter, before a modifier was added)

	var PropTween = /*#__PURE__*/function () {
	  function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
	    this.t = target;
	    this.s = start;
	    this.c = change;
	    this.p = prop;
	    this.r = renderer || _renderPlain;
	    this.d = data || this;
	    this.set = setter || _setterPlain;
	    this.pr = priority || 0;
	    this._next = next;
	    if (next) {
	      next._prev = this;
	    }
	  }
	  var _proto4 = PropTween.prototype;
	  _proto4.modifier = function modifier(func, tween, target) {
	    this.mSet = this.mSet || this.set; //in case it was already set (a PropTween can only have one modifier)

	    this.set = _setterWithModifier;
	    this.m = func;
	    this.mt = target; //modifier target

	    this.tween = tween;
	  };
	  return PropTween;
	}(); //Initialization tasks

	_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (name) {
	  return _reservedProps[name] = 1;
	});
	_globals.TweenMax = _globals.TweenLite = Tween;
	_globals.TimelineLite = _globals.TimelineMax = Timeline;
	_globalTimeline = new Timeline({
	  sortChildren: false,
	  defaults: _defaults$1,
	  autoRemoveChildren: true,
	  id: "root",
	  smoothChildTiming: true
	});
	_config.stringFilter = _colorStringFilter;
	var _media = [],
	  _listeners$1 = {},
	  _emptyArray$1 = [],
	  _lastMediaTime = 0,
	  _contextID = 0,
	  _dispatch$1 = function _dispatch(type) {
	    return (_listeners$1[type] || _emptyArray$1).map(function (f) {
	      return f();
	    });
	  },
	  _onMediaChange = function _onMediaChange() {
	    var time = Date.now(),
	      matches = [];
	    if (time - _lastMediaTime > 2) {
	      _dispatch$1("matchMediaInit");
	      _media.forEach(function (c) {
	        var queries = c.queries,
	          conditions = c.conditions,
	          match,
	          p,
	          anyMatch,
	          toggled;
	        for (p in queries) {
	          match = _win$3.matchMedia(queries[p]).matches; // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.

	          match && (anyMatch = 1);
	          if (match !== conditions[p]) {
	            conditions[p] = match;
	            toggled = 1;
	          }
	        }
	        if (toggled) {
	          c.revert();
	          anyMatch && matches.push(c);
	        }
	      });
	      _dispatch$1("matchMediaRevert");
	      matches.forEach(function (c) {
	        return c.onMatch(c, function (func) {
	          return c.add(null, func);
	        });
	      });
	      _lastMediaTime = time;
	      _dispatch$1("matchMedia");
	    }
	  };
	var Context = /*#__PURE__*/function () {
	  function Context(func, scope) {
	    this.selector = scope && selector(scope);
	    this.data = [];
	    this._r = []; // returned/cleanup functions

	    this.isReverted = false;
	    this.id = _contextID++; // to work around issues that frameworks like Vue cause by making things into Proxies which make it impossible to do something like _media.indexOf(this) because "this" would no longer refer to the Context instance itself - it'd refer to a Proxy! We needed a way to identify the context uniquely

	    func && this.add(func);
	  }
	  var _proto5 = Context.prototype;
	  _proto5.add = function add(name, func, scope) {
	    // possible future addition if we need the ability to add() an animation to a context and for whatever reason cannot create that animation inside of a context.add(() => {...}) function.
	    // if (name && _isFunction(name.revert)) {
	    // 	this.data.push(name);
	    // 	return (name._ctx = this);
	    // }
	    if (_isFunction$1(name)) {
	      scope = func;
	      func = name;
	      name = _isFunction$1;
	    }
	    var self = this,
	      f = function f() {
	        var prev = _context$2,
	          prevSelector = self.selector,
	          result;
	        prev && prev !== self && prev.data.push(self);
	        scope && (self.selector = selector(scope));
	        _context$2 = self;
	        result = func.apply(self, arguments);
	        _isFunction$1(result) && self._r.push(result);
	        _context$2 = prev;
	        self.selector = prevSelector;
	        self.isReverted = false;
	        return result;
	      };
	    self.last = f;
	    return name === _isFunction$1 ? f(self, function (func) {
	      return self.add(null, func);
	    }) : name ? self[name] = f : f;
	  };
	  _proto5.ignore = function ignore(func) {
	    var prev = _context$2;
	    _context$2 = null;
	    func(this);
	    _context$2 = prev;
	  };
	  _proto5.getTweens = function getTweens() {
	    var a = [];
	    this.data.forEach(function (e) {
	      return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
	    });
	    return a;
	  };
	  _proto5.clear = function clear() {
	    this._r.length = this.data.length = 0;
	  };
	  _proto5.kill = function kill(revert, matchMedia) {
	    var _this4 = this;
	    if (revert) {
	      (function () {
	        var tweens = _this4.getTweens(),
	          i = _this4.data.length,
	          t;
	        while (i--) {
	          // Flip plugin tweens are very different in that they should actually be pushed to their end. The plugin replaces the timeline's .revert() method to do exactly that. But we also need to remove any of those nested tweens inside the flip timeline so that they don't get individually reverted.
	          t = _this4.data[i];
	          if (t.data === "isFlip") {
	            t.revert();
	            t.getChildren(true, true, false).forEach(function (tween) {
	              return tweens.splice(tweens.indexOf(tween), 1);
	            });
	          }
	        } // save as an object so that we can cache the globalTime for each tween to optimize performance during the sort

	        tweens.map(function (t) {
	          return {
	            g: t._dur || t._delay || t._sat && !t._sat.vars.immediateRender ? t.globalTime(0) : -Infinity,
	            t: t
	          };
	        }).sort(function (a, b) {
	          return b.g - a.g || -Infinity;
	        }).forEach(function (o) {
	          return o.t.revert(revert);
	        }); // note: all of the _startAt tweens should be reverted in reverse order that they were created, and they'll all have the same globalTime (-1) so the " || -1" in the sort keeps the order properly.

	        i = _this4.data.length;
	        while (i--) {
	          // make sure we loop backwards so that, for example, SplitTexts that were created later on the same element get reverted first
	          t = _this4.data[i];
	          if (t instanceof Timeline) {
	            if (t.data !== "nested") {
	              t.scrollTrigger && t.scrollTrigger.revert();
	              t.kill(); // don't revert() the timeline because that's duplicating efforts since we already reverted all the tweens
	            }
	          } else {
	            !(t instanceof Tween) && t.revert && t.revert(revert);
	          }
	        }
	        _this4._r.forEach(function (f) {
	          return f(revert, _this4);
	        });
	        _this4.isReverted = true;
	      })();
	    } else {
	      this.data.forEach(function (e) {
	        return e.kill && e.kill();
	      });
	    }
	    this.clear();
	    if (matchMedia) {
	      var i = _media.length;
	      while (i--) {
	        // previously, we checked _media.indexOf(this), but some frameworks like Vue enforce Proxy objects that make it impossible to get the proper result that way, so we must use a unique ID number instead.
	        _media[i].id === this.id && _media.splice(i, 1);
	      }
	    }
	  } // killWithCleanup() {
	  // 	this.kill();
	  // 	this._r.forEach(f => f(false, this));
	  // }
	  ;

	  _proto5.revert = function revert(config) {
	    this.kill(config || {});
	  };
	  return Context;
	}();
	var MatchMedia = /*#__PURE__*/function () {
	  function MatchMedia(scope) {
	    this.contexts = [];
	    this.scope = scope;
	    _context$2 && _context$2.data.push(this);
	  }
	  var _proto6 = MatchMedia.prototype;
	  _proto6.add = function add(conditions, func, scope) {
	    _isObject$1(conditions) || (conditions = {
	      matches: conditions
	    });
	    var context = new Context(0, scope || this.scope),
	      cond = context.conditions = {},
	      mq,
	      p,
	      active;
	    _context$2 && !context.selector && (context.selector = _context$2.selector); // in case a context is created inside a context. Like a gsap.matchMedia() that's inside a scoped gsap.context()

	    this.contexts.push(context);
	    func = context.add("onMatch", func);
	    context.queries = conditions;
	    for (p in conditions) {
	      if (p === "all") {
	        active = 1;
	      } else {
	        mq = _win$3.matchMedia(conditions[p]);
	        if (mq) {
	          _media.indexOf(context) < 0 && _media.push(context);
	          (cond[p] = mq.matches) && (active = 1);
	          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
	        }
	      }
	    }
	    active && func(context, function (f) {
	      return context.add(null, f);
	    });
	    return this;
	  } // refresh() {
	  // 	let time = _lastMediaTime,
	  // 		media = _media;
	  // 	_lastMediaTime = -1;
	  // 	_media = this.contexts;
	  // 	_onMediaChange();
	  // 	_lastMediaTime = time;
	  // 	_media = media;
	  // }
	  ;

	  _proto6.revert = function revert(config) {
	    this.kill(config || {});
	  };
	  _proto6.kill = function kill(revert) {
	    this.contexts.forEach(function (c) {
	      return c.kill(revert, true);
	    });
	  };
	  return MatchMedia;
	}();
	/*
	 * --------------------------------------------------------------------------------------
	 * GSAP
	 * --------------------------------------------------------------------------------------
	 */

	var _gsap = {
	  registerPlugin: function registerPlugin() {
	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	    args.forEach(function (config) {
	      return _createPlugin(config);
	    });
	  },
	  timeline: function timeline(vars) {
	    return new Timeline(vars);
	  },
	  getTweensOf: function getTweensOf(targets, onlyActive) {
	    return _globalTimeline.getTweensOf(targets, onlyActive);
	  },
	  getProperty: function getProperty(target, property, unit, uncache) {
	    _isString$1(target) && (target = toArray(target)[0]); //in case selector text or an array is passed in

	    var getter = _getCache(target || {}).get,
	      format = unit ? _passThrough$1 : _numericIfPossible;
	    unit === "native" && (unit = "");
	    return !target ? target : !property ? function (property, unit, uncache) {
	      return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
	    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
	  },
	  quickSetter: function quickSetter(target, property, unit) {
	    target = toArray(target);
	    if (target.length > 1) {
	      var setters = target.map(function (t) {
	          return gsap$2.quickSetter(t, property, unit);
	        }),
	        l = setters.length;
	      return function (value) {
	        var i = l;
	        while (i--) {
	          setters[i](value);
	        }
	      };
	    }
	    target = target[0] || {};
	    var Plugin = _plugins[property],
	      cache = _getCache(target),
	      p = cache.harness && (cache.harness.aliases || {})[property] || property,
	      // in case it's an alias, like "rotate" for "rotation".
	      setter = Plugin ? function (value) {
	        var p = new Plugin();
	        _quickTween._pt = 0;
	        p.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
	        p.render(1, p);
	        _quickTween._pt && _renderPropTweens(1, _quickTween);
	      } : cache.set(target, p);
	    return Plugin ? setter : function (value) {
	      return setter(target, p, unit ? value + unit : value, cache, 1);
	    };
	  },
	  quickTo: function quickTo(target, property, vars) {
	    var _setDefaults2;
	    var tween = gsap$2.to(target, _setDefaults$1((_setDefaults2 = {}, _setDefaults2[property] = "+=0.1", _setDefaults2.paused = true, _setDefaults2.stagger = 0, _setDefaults2), vars || {})),
	      func = function func(value, start, startIsRelative) {
	        return tween.resetTo(property, value, start, startIsRelative);
	      };
	    func.tween = tween;
	    return func;
	  },
	  isTweening: function isTweening(targets) {
	    return _globalTimeline.getTweensOf(targets, true).length > 0;
	  },
	  defaults: function defaults(value) {
	    value && value.ease && (value.ease = _parseEase(value.ease, _defaults$1.ease));
	    return _mergeDeep(_defaults$1, value || {});
	  },
	  config: function config(value) {
	    return _mergeDeep(_config, value || {});
	  },
	  registerEffect: function registerEffect(_ref3) {
	    var name = _ref3.name,
	      effect = _ref3.effect,
	      plugins = _ref3.plugins,
	      defaults = _ref3.defaults,
	      extendTimeline = _ref3.extendTimeline;
	    (plugins || "").split(",").forEach(function (pluginName) {
	      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
	    });
	    _effects[name] = function (targets, vars, tl) {
	      return effect(toArray(targets), _setDefaults$1(vars || {}, defaults), tl);
	    };
	    if (extendTimeline) {
	      Timeline.prototype[name] = function (targets, vars, position) {
	        return this.add(_effects[name](targets, _isObject$1(vars) ? vars : (position = vars) && {}, this), position);
	      };
	    }
	  },
	  registerEase: function registerEase(name, ease) {
	    _easeMap[name] = _parseEase(ease);
	  },
	  parseEase: function parseEase(ease, defaultEase) {
	    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
	  },
	  getById: function getById(id) {
	    return _globalTimeline.getById(id);
	  },
	  exportRoot: function exportRoot(vars, includeDelayedCalls) {
	    if (vars === void 0) {
	      vars = {};
	    }
	    var tl = new Timeline(vars),
	      child,
	      next;
	    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
	    _globalTimeline.remove(tl);
	    tl._dp = 0; //otherwise it'll get re-activated when adding children and be re-introduced into _globalTimeline's linked list (then added to itself).

	    tl._time = tl._tTime = _globalTimeline._time;
	    child = _globalTimeline._first;
	    while (child) {
	      next = child._next;
	      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
	        _addToTimeline(tl, child, child._start - child._delay);
	      }
	      child = next;
	    }
	    _addToTimeline(_globalTimeline, tl, 0);
	    return tl;
	  },
	  context: function context(func, scope) {
	    return func ? new Context(func, scope) : _context$2;
	  },
	  matchMedia: function matchMedia(scope) {
	    return new MatchMedia(scope);
	  },
	  matchMediaRefresh: function matchMediaRefresh() {
	    return _media.forEach(function (c) {
	      var cond = c.conditions,
	        found,
	        p;
	      for (p in cond) {
	        if (cond[p]) {
	          cond[p] = false;
	          found = 1;
	        }
	      }
	      found && c.revert();
	    }) || _onMediaChange();
	  },
	  addEventListener: function addEventListener(type, callback) {
	    var a = _listeners$1[type] || (_listeners$1[type] = []);
	    ~a.indexOf(callback) || a.push(callback);
	  },
	  removeEventListener: function removeEventListener(type, callback) {
	    var a = _listeners$1[type],
	      i = a && a.indexOf(callback);
	    i >= 0 && a.splice(i, 1);
	  },
	  utils: {
	    wrap: wrap,
	    wrapYoyo: wrapYoyo,
	    distribute: distribute,
	    random: random,
	    snap: snap,
	    normalize: normalize,
	    getUnit: getUnit,
	    clamp: clamp,
	    splitColor: splitColor,
	    toArray: toArray,
	    selector: selector,
	    mapRange: mapRange,
	    pipe: pipe,
	    unitize: unitize,
	    interpolate: interpolate,
	    shuffle: shuffle
	  },
	  install: _install,
	  effects: _effects,
	  ticker: _ticker,
	  updateRoot: Timeline.updateRoot,
	  plugins: _plugins,
	  globalTimeline: _globalTimeline,
	  core: {
	    PropTween: PropTween,
	    globals: _addGlobal,
	    Tween: Tween,
	    Timeline: Timeline,
	    Animation: Animation,
	    getCache: _getCache,
	    _removeLinkedListItem: _removeLinkedListItem,
	    reverting: function reverting() {
	      return _reverting$1;
	    },
	    context: function context(toAdd) {
	      if (toAdd && _context$2) {
	        _context$2.data.push(toAdd);
	        toAdd._ctx = _context$2;
	      }
	      return _context$2;
	    },
	    suppressOverwrites: function suppressOverwrites(value) {
	      return _suppressOverwrites$1 = value;
	    }
	  }
	};
	_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function (name) {
	  return _gsap[name] = Tween[name];
	});
	_ticker.add(Timeline.updateRoot);
	_quickTween = _gsap.to({}, {
	  duration: 0
	}); // ---- EXTRA PLUGINS --------------------------------------------------------

	var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
	    var pt = plugin._pt;
	    while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
	      pt = pt._next;
	    }
	    return pt;
	  },
	  _addModifiers = function _addModifiers(tween, modifiers) {
	    var targets = tween._targets,
	      p,
	      i,
	      pt;
	    for (p in modifiers) {
	      i = targets.length;
	      while (i--) {
	        pt = tween._ptLookup[i][p];
	        if (pt && (pt = pt.d)) {
	          if (pt._pt) {
	            // is a plugin
	            pt = _getPluginPropTween(pt, p);
	          }
	          pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
	        }
	      }
	    }
	  },
	  _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
	    return {
	      name: name,
	      rawVars: 1,
	      //don't pre-process function-based values or "random()" strings.
	      init: function init(target, vars, tween) {
	        tween._onInit = function (tween) {
	          var temp, p;
	          if (_isString$1(vars)) {
	            temp = {};
	            _forEachName(vars, function (name) {
	              return temp[name] = 1;
	            }); //if the user passes in a comma-delimited list of property names to roundProps, like "x,y", we round to whole numbers.

	            vars = temp;
	          }
	          if (modifier) {
	            temp = {};
	            for (p in vars) {
	              temp[p] = modifier(vars[p]);
	            }
	            vars = temp;
	          }
	          _addModifiers(tween, vars);
	        };
	      }
	    };
	  }; //register core plugins

	var gsap$2 = _gsap.registerPlugin({
	  name: "attr",
	  init: function init(target, vars, tween, index, targets) {
	    var p, pt, v;
	    this.tween = tween;
	    for (p in vars) {
	      v = target.getAttribute(p) || "";
	      pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
	      pt.op = p;
	      pt.b = v; // record the beginning value so we can revert()

	      this._props.push(p);
	    }
	  },
	  render: function render(ratio, data) {
	    var pt = data._pt;
	    while (pt) {
	      _reverting$1 ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d); // if reverting, go back to the original (pt.b)

	      pt = pt._next;
	    }
	  }
	}, {
	  name: "endArray",
	  init: function init(target, value) {
	    var i = value.length;
	    while (i--) {
	      this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
	    }
	  }
	}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap; //to prevent the core plugins from being dropped via aggressive tree shaking, we must include them in the variable declaration in this way.

	Tween.version = Timeline.version = gsap$2.version = "3.12.7";
	_coreReady = 1;
	_windowExists$2() && _wake();
	_easeMap.Power0;
	  _easeMap.Power1;
	  _easeMap.Power2;
	  _easeMap.Power3;
	  _easeMap.Power4;
	  _easeMap.Linear;
	  _easeMap.Quad;
	  _easeMap.Cubic;
	  _easeMap.Quart;
	  _easeMap.Quint;
	  _easeMap.Strong;
	  _easeMap.Elastic;
	  _easeMap.Back;
	  _easeMap.SteppedEase;
	  _easeMap.Bounce;
	  _easeMap.Sine;
	  _easeMap.Expo;
	  _easeMap.Circ;

	/*!
	 * CSSPlugin 3.12.7
	 * https://gsap.com
	 *
	 * Copyright 2008-2025, GreenSock. All rights reserved.
	 * Subject to the terms at https://gsap.com/standard-license or for
	 * Club GSAP members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/
	var _win$2,
	  _doc$2,
	  _docElement,
	  _pluginInitted,
	  _tempDiv,
	  _recentSetterPlugin,
	  _reverting,
	  _windowExists$1 = function _windowExists() {
	    return typeof window !== "undefined";
	  },
	  _transformProps = {},
	  _RAD2DEG = 180 / Math.PI,
	  _DEG2RAD = Math.PI / 180,
	  _atan2 = Math.atan2,
	  _bigNum = 1e8,
	  _capsExp$1 = /([A-Z])/g,
	  _horizontalExp = /(left|right|width|margin|padding|x)/i,
	  _complexExp = /[\s,\(]\S/,
	  _propertyAliases = {
	    autoAlpha: "opacity,visibility",
	    scale: "scaleX,scaleY",
	    alpha: "opacity"
	  },
	  _renderCSSProp = function _renderCSSProp(ratio, data) {
	    return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
	  },
	  _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
	    return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u, data);
	  },
	  _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
	    return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 10000) / 10000 + data.u : data.b, data);
	  },
	  //if units change, we need a way to render the original unit/value when the tween goes all the way back to the beginning (ratio:0)
	  _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
	    var value = data.s + data.c * ratio;
	    data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
	  },
	  _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
	    return data.set(data.t, data.p, ratio ? data.e : data.b, data);
	  },
	  _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
	    return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
	  },
	  _setterCSSStyle = function _setterCSSStyle(target, property, value) {
	    return target.style[property] = value;
	  },
	  _setterCSSProp = function _setterCSSProp(target, property, value) {
	    return target.style.setProperty(property, value);
	  },
	  _setterTransform = function _setterTransform(target, property, value) {
	    return target._gsap[property] = value;
	  },
	  _setterScale = function _setterScale(target, property, value) {
	    return target._gsap.scaleX = target._gsap.scaleY = value;
	  },
	  _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
	    var cache = target._gsap;
	    cache.scaleX = cache.scaleY = value;
	    cache.renderTransform(ratio, cache);
	  },
	  _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
	    var cache = target._gsap;
	    cache[property] = value;
	    cache.renderTransform(ratio, cache);
	  },
	  _transformProp$1 = "transform",
	  _transformOriginProp = _transformProp$1 + "Origin",
	  _saveStyle = function _saveStyle(property, isNotCSS) {
	    var _this = this;
	    var target = this.target,
	      style = target.style,
	      cache = target._gsap;
	    if (property in _transformProps && style) {
	      this.tfm = this.tfm || {};
	      if (property !== "transform") {
	        property = _propertyAliases[property] || property;
	        ~property.indexOf(",") ? property.split(",").forEach(function (a) {
	          return _this.tfm[a] = _get(target, a);
	        }) : this.tfm[property] = cache.x ? cache[property] : _get(target, property); // note: scale would map to "scaleX,scaleY", thus we loop and apply them both.

	        property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
	      } else {
	        return _propertyAliases.transform.split(",").forEach(function (p) {
	          return _saveStyle.call(_this, p, isNotCSS);
	        });
	      }
	      if (this.props.indexOf(_transformProp$1) >= 0) {
	        return;
	      }
	      if (cache.svg) {
	        this.svgo = target.getAttribute("data-svg-origin");
	        this.props.push(_transformOriginProp, isNotCSS, "");
	      }
	      property = _transformProp$1;
	    }
	    (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
	  },
	  _removeIndependentTransforms = function _removeIndependentTransforms(style) {
	    if (style.translate) {
	      style.removeProperty("translate");
	      style.removeProperty("scale");
	      style.removeProperty("rotate");
	    }
	  },
	  _revertStyle = function _revertStyle() {
	    var props = this.props,
	      target = this.target,
	      style = target.style,
	      cache = target._gsap,
	      i,
	      p;
	    for (i = 0; i < props.length; i += 3) {
	      // stored like this: property, isNotCSS, value
	      if (!props[i + 1]) {
	        props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp$1, "-$1").toLowerCase());
	      } else if (props[i + 1] === 2) {
	        // non-CSS value (function-based)
	        target[props[i]](props[i + 2]);
	      } else {
	        // non-CSS value (not function-based)
	        target[props[i]] = props[i + 2];
	      }
	    }
	    if (this.tfm) {
	      for (p in this.tfm) {
	        cache[p] = this.tfm[p];
	      }
	      if (cache.svg) {
	        cache.renderTransform();
	        target.setAttribute("data-svg-origin", this.svgo || "");
	      }
	      i = _reverting();
	      if ((!i || !i.isStart) && !style[_transformProp$1]) {
	        _removeIndependentTransforms(style);
	        if (cache.zOrigin && style[_transformOriginProp]) {
	          style[_transformOriginProp] += " " + cache.zOrigin + "px"; // since we're uncaching, we must put the zOrigin back into the transformOrigin so that we can pull it out accurately when we parse again. Otherwise, we'd lose the z portion of the origin since we extract it to protect from Safari bugs.

	          cache.zOrigin = 0;
	          cache.renderTransform();
	        }
	        cache.uncache = 1; // if it's a startAt that's being reverted in the _initTween() of the core, we don't need to uncache transforms. This is purely a performance optimization.
	      }
	    }
	  },
	  _getStyleSaver = function _getStyleSaver(target, properties) {
	    var saver = {
	      target: target,
	      props: [],
	      revert: _revertStyle,
	      save: _saveStyle
	    };
	    target._gsap || gsap$2.core.getCache(target); // just make sure there's a _gsap cache defined because we read from it in _saveStyle() and it's more efficient to just check it here once.

	    properties && target.style && target.nodeType && properties.split(",").forEach(function (p) {
	      return saver.save(p);
	    }); // make sure it's a DOM node too.

	    return saver;
	  },
	  _supports3D,
	  _createElement = function _createElement(type, ns) {
	    var e = _doc$2.createElementNS ? _doc$2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$2.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

	    return e && e.style ? e : _doc$2.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://gsap.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
	  },
	  _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
	    var cs = getComputedStyle(target);
	    return cs[property] || cs.getPropertyValue(property.replace(_capsExp$1, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || ""; //css variables may not need caps swapped out for dashes and lowercase.
	  },
	  _prefixes = "O,Moz,ms,Ms,Webkit".split(","),
	  _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
	    var e = element || _tempDiv,
	      s = e.style,
	      i = 5;
	    if (property in s && !preferPrefix) {
	      return property;
	    }
	    property = property.charAt(0).toUpperCase() + property.substr(1);
	    while (i-- && !(_prefixes[i] + property in s)) {}
	    return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
	  },
	  _initCore$1 = function _initCore() {
	    if (_windowExists$1() && window.document) {
	      _win$2 = window;
	      _doc$2 = _win$2.document;
	      _docElement = _doc$2.documentElement;
	      _tempDiv = _createElement("div") || {
	        style: {}
	      };
	      _createElement("div");
	      _transformProp$1 = _checkPropPrefix(_transformProp$1);
	      _transformOriginProp = _transformProp$1 + "Origin";
	      _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"; //make sure to override certain properties that may contaminate measurements, in case the user has overreaching style sheets.

	      _supports3D = !!_checkPropPrefix("perspective");
	      _reverting = gsap$2.core.reverting;
	      _pluginInitted = 1;
	    }
	  },
	  _getReparentedCloneBBox = function _getReparentedCloneBBox(target) {
	    //works around issues in some browsers (like Firefox) that don't correctly report getBBox() on SVG elements inside a <defs> element and/or <mask>. We try creating an SVG, adding it to the documentElement and toss the element in there so that it's definitely part of the rendering tree, then grab the bbox and if it works, we actually swap out the original getBBox() method for our own that does these extra steps whenever getBBox is needed. This helps ensure that performance is optimal (only do all these extra steps when absolutely necessary...most elements don't need it).
	    var owner = target.ownerSVGElement,
	      svg = _createElement("svg", owner && owner.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
	      clone = target.cloneNode(true),
	      bbox;
	    clone.style.display = "block";
	    svg.appendChild(clone);
	    _docElement.appendChild(svg);
	    try {
	      bbox = clone.getBBox();
	    } catch (e) {}
	    svg.removeChild(clone);
	    _docElement.removeChild(svg);
	    return bbox;
	  },
	  _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
	    var i = attributesArray.length;
	    while (i--) {
	      if (target.hasAttribute(attributesArray[i])) {
	        return target.getAttribute(attributesArray[i]);
	      }
	    }
	  },
	  _getBBox = function _getBBox(target) {
	    var bounds, cloned;
	    try {
	      bounds = target.getBBox(); //Firefox throws errors if you try calling getBBox() on an SVG element that's not rendered (like in a <symbol> or <defs>). https://bugzilla.mozilla.org/show_bug.cgi?id=612118
	    } catch (error) {
	      bounds = _getReparentedCloneBBox(target);
	      cloned = 1;
	    }
	    bounds && (bounds.width || bounds.height) || cloned || (bounds = _getReparentedCloneBBox(target)); //some browsers (like Firefox) misreport the bounds if the element has zero width and height (it just assumes it's at x:0, y:0), thus we need to manually grab the position in that case.

	    return bounds && !bounds.width && !bounds.x && !bounds.y ? {
	      x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
	      y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
	      width: 0,
	      height: 0
	    } : bounds;
	  },
	  _isSVG = function _isSVG(e) {
	    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
	  },
	  //reports if the element is an SVG on which getBBox() actually works
	  _removeProperty = function _removeProperty(target, property) {
	    if (property) {
	      var style = target.style,
	        first2Chars;
	      if (property in _transformProps && property !== _transformOriginProp) {
	        property = _transformProp$1;
	      }
	      if (style.removeProperty) {
	        first2Chars = property.substr(0, 2);
	        if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
	          //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
	          property = "-" + property;
	        }
	        style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp$1, "-$1").toLowerCase());
	      } else {
	        //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
	        style.removeAttribute(property);
	      }
	    }
	  },
	  _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
	    var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
	    plugin._pt = pt;
	    pt.b = beginning;
	    pt.e = end;
	    plugin._props.push(property);
	    return pt;
	  },
	  _nonConvertibleUnits = {
	    deg: 1,
	    rad: 1,
	    turn: 1
	  },
	  _nonStandardLayouts = {
	    grid: 1,
	    flex: 1
	  },
	  //takes a single value like 20px and converts it to the unit specified, like "%", returning only the numeric amount.
	  _convertToUnit = function _convertToUnit(target, property, value, unit) {
	    var curValue = parseFloat(value) || 0,
	      curUnit = (value + "").trim().substr((curValue + "").length) || "px",
	      // some browsers leave extra whitespace at the beginning of CSS variables, hence the need to trim()
	      style = _tempDiv.style,
	      horizontal = _horizontalExp.test(property),
	      isRootSVG = target.tagName.toLowerCase() === "svg",
	      measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"),
	      amount = 100,
	      toPixels = unit === "px",
	      toPercent = unit === "%",
	      px,
	      parent,
	      cache,
	      isSVG;
	    if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
	      return curValue;
	    }
	    curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
	    isSVG = target.getCTM && _isSVG(target);
	    if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
	      px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
	      return _round$1(toPercent ? curValue / px * amount : curValue / 100 * px);
	    }
	    style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
	    parent = unit !== "rem" && ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
	    if (isSVG) {
	      parent = (target.ownerSVGElement || {}).parentNode;
	    }
	    if (!parent || parent === _doc$2 || !parent.appendChild) {
	      parent = _doc$2.body;
	    }
	    cache = parent._gsap;
	    if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
	      return _round$1(curValue / cache.width * amount);
	    } else {
	      if (toPercent && (property === "height" || property === "width")) {
	        // if we're dealing with width/height that's inside a container with padding and/or it's a flexbox/grid container, we must apply it to the target itself rather than the _tempDiv in order to ensure complete accuracy, factoring in the parent's padding.
	        var v = target.style[property];
	        target.style[property] = amount + unit;
	        px = target[measureProperty];
	        v ? target.style[property] = v : _removeProperty(target, property);
	      } else {
	        (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
	        parent === target && (style.position = "static"); // like for borderRadius, if it's a % we must have it relative to the target itself but that may not have position: relative or position: absolute in which case it'd go up the chain until it finds its offsetParent (bad). position: static protects against that.

	        parent.appendChild(_tempDiv);
	        px = _tempDiv[measureProperty];
	        parent.removeChild(_tempDiv);
	        style.position = "absolute";
	      }
	      if (horizontal && toPercent) {
	        cache = _getCache(parent);
	        cache.time = _ticker.time;
	        cache.width = parent[measureProperty];
	      }
	    }
	    return _round$1(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
	  },
	  _get = function _get(target, property, unit, uncache) {
	    var value;
	    _pluginInitted || _initCore$1();
	    if (property in _propertyAliases && property !== "transform") {
	      property = _propertyAliases[property];
	      if (~property.indexOf(",")) {
	        property = property.split(",")[0];
	      }
	    }
	    if (_transformProps[property] && property !== "transform") {
	      value = _parseTransform(target, uncache);
	      value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
	    } else {
	      value = target.style[property];
	      if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
	        value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0); // note: some browsers, like Firefox, don't report borderRadius correctly! Instead, it only reports every corner like  borderTopLeftRadius
	      }
	    }

	    return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
	  },
	  _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
	    // note: we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within a plugin too, thus "this" would refer to the plugin.
	    if (!start || start === "none") {
	      // some browsers like Safari actually PREFER the prefixed property and mis-report the unprefixed value like clipPath (BUG). In other words, even though clipPath exists in the style ("clipPath" in target.style) and it's set in the CSS properly (along with -webkit-clip-path), Safari reports clipPath as "none" whereas WebkitClipPath reports accurately like "ellipse(100% 0% at 50% 0%)", so in this case we must SWITCH to using the prefixed property instead. See https://gsap.com/forums/topic/18310-clippath-doesnt-work-on-ios/
	      var p = _checkPropPrefix(prop, target, 1),
	        s = p && _getComputedProperty(target, p, 1);
	      if (s && s !== start) {
	        prop = p;
	        start = s;
	      } else if (prop === "borderColor") {
	        start = _getComputedProperty(target, "borderTopColor"); // Firefox bug: always reports "borderColor" as "", so we must fall back to borderTopColor. See https://gsap.com/forums/topic/24583-how-to-return-colors-that-i-had-after-reverse/
	      }
	    }

	    var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString),
	      index = 0,
	      matchIndex = 0,
	      a,
	      result,
	      startValues,
	      startNum,
	      color,
	      startValue,
	      endValue,
	      endNum,
	      chunk,
	      endUnit,
	      startUnit,
	      endValues;
	    pt.b = start;
	    pt.e = end;
	    start += ""; // ensure values are strings

	    end += "";
	    if (end === "auto") {
	      startValue = target.style[prop];
	      target.style[prop] = end;
	      end = _getComputedProperty(target, prop) || end;
	      startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
	    }
	    a = [start, end];
	    _colorStringFilter(a); // pass an array with the starting and ending values and let the filter do whatever it needs to the values. If colors are found, it returns true and then we must match where the color shows up order-wise because for things like boxShadow, sometimes the browser provides the computed values with the color FIRST, but the user provides it with the color LAST, so flip them if necessary. Same for drop-shadow().

	    start = a[0];
	    end = a[1];
	    startValues = start.match(_numWithUnitExp) || [];
	    endValues = end.match(_numWithUnitExp) || [];
	    if (endValues.length) {
	      while (result = _numWithUnitExp.exec(end)) {
	        endValue = result[0];
	        chunk = end.substring(index, result.index);
	        if (color) {
	          color = (color + 1) % 5;
	        } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
	          color = 1;
	        }
	        if (endValue !== (startValue = startValues[matchIndex++] || "")) {
	          startNum = parseFloat(startValue) || 0;
	          startUnit = startValue.substr((startNum + "").length);
	          endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
	          endNum = parseFloat(endValue);
	          endUnit = endValue.substr((endNum + "").length);
	          index = _numWithUnitExp.lastIndex - endUnit.length;
	          if (!endUnit) {
	            //if something like "perspective:300" is passed in and we must add a unit to the end
	            endUnit = endUnit || _config.units[prop] || startUnit;
	            if (index === end.length) {
	              end += endUnit;
	              pt.e += endUnit;
	            }
	          }
	          if (startUnit !== endUnit) {
	            startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
	          } // these nested PropTweens are handled in a special way - we'll never actually call a render or setter method on them. We'll just loop through them in the parent complex string PropTween's render method.

	          pt._pt = {
	            _next: pt._pt,
	            p: chunk || matchIndex === 1 ? chunk : ",",
	            //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
	            s: startNum,
	            c: endNum - startNum,
	            m: color && color < 4 || prop === "zIndex" ? Math.round : 0
	          };
	        }
	      }
	      pt.c = index < end.length ? end.substring(index, end.length) : ""; //we use the "c" of the PropTween to store the final part of the string (after the last number)
	    } else {
	      pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
	    }
	    _relExp.test(end) && (pt.e = 0); //if the end string contains relative values or dynamic random(...) values, delete the end it so that on the final render we don't actually set it to the string with += or -= characters (forces it to use the calculated value).

	    this._pt = pt; //start the linked list with this new PropTween. Remember, we call _tweenComplexCSSString.call(pluginInstance...) to ensure that it's scoped properly. We may call it from within another plugin too, thus "this" would refer to the plugin.

	    return pt;
	  },
	  _keywordToPercent = {
	    top: "0%",
	    bottom: "100%",
	    left: "0%",
	    right: "100%",
	    center: "50%"
	  },
	  _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
	    var split = value.split(" "),
	      x = split[0],
	      y = split[1] || "50%";
	    if (x === "top" || x === "bottom" || y === "left" || y === "right") {
	      //the user provided them in the wrong order, so flip them
	      value = x;
	      x = y;
	      y = value;
	    }
	    split[0] = _keywordToPercent[x] || x;
	    split[1] = _keywordToPercent[y] || y;
	    return split.join(" ");
	  },
	  _renderClearProps = function _renderClearProps(ratio, data) {
	    if (data.tween && data.tween._time === data.tween._dur) {
	      var target = data.t,
	        style = target.style,
	        props = data.u,
	        cache = target._gsap,
	        prop,
	        clearTransforms,
	        i;
	      if (props === "all" || props === true) {
	        style.cssText = "";
	        clearTransforms = 1;
	      } else {
	        props = props.split(",");
	        i = props.length;
	        while (--i > -1) {
	          prop = props[i];
	          if (_transformProps[prop]) {
	            clearTransforms = 1;
	            prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp$1;
	          }
	          _removeProperty(target, prop);
	        }
	      }
	      if (clearTransforms) {
	        _removeProperty(target, _transformProp$1);
	        if (cache) {
	          cache.svg && target.removeAttribute("transform");
	          style.scale = style.rotate = style.translate = "none";
	          _parseTransform(target, 1); // force all the cached values back to "normal"/identity, otherwise if there's another tween that's already set to render transforms on this element, it could display the wrong values.

	          cache.uncache = 1;
	          _removeIndependentTransforms(style);
	        }
	      }
	    }
	  },
	  // note: specialProps should return 1 if (and only if) they have a non-zero priority. It indicates we need to sort the linked list.
	  _specialProps = {
	    clearProps: function clearProps(plugin, target, property, endValue, tween) {
	      if (tween.data !== "isFromStart") {
	        var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
	        pt.u = endValue;
	        pt.pr = -10;
	        pt.tween = tween;
	        plugin._props.push(property);
	        return 1;
	      }
	    }
	    /* className feature (about 0.4kb gzipped).
	    , className(plugin, target, property, endValue, tween) {
	    	let _renderClassName = (ratio, data) => {
	    			data.css.render(ratio, data.css);
	    			if (!ratio || ratio === 1) {
	    				let inline = data.rmv,
	    					target = data.t,
	    					p;
	    				target.setAttribute("class", ratio ? data.e : data.b);
	    				for (p in inline) {
	    					_removeProperty(target, p);
	    				}
	    			}
	    		},
	    		_getAllStyles = (target) => {
	    			let styles = {},
	    				computed = getComputedStyle(target),
	    				p;
	    			for (p in computed) {
	    				if (isNaN(p) && p !== "cssText" && p !== "length") {
	    					styles[p] = computed[p];
	    				}
	    			}
	    			_setDefaults(styles, _parseTransform(target, 1));
	    			return styles;
	    		},
	    		startClassList = target.getAttribute("class"),
	    		style = target.style,
	    		cssText = style.cssText,
	    		cache = target._gsap,
	    		classPT = cache.classPT,
	    		inlineToRemoveAtEnd = {},
	    		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
	    		changingVars = {},
	    		startVars = _getAllStyles(target),
	    		transformRelated = /(transform|perspective)/i,
	    		endVars, p;
	    	if (classPT) {
	    		classPT.r(1, classPT.d);
	    		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
	    	}
	    	target.setAttribute("class", data.e);
	    	endVars = _getAllStyles(target, true);
	    	target.setAttribute("class", startClassList);
	    	for (p in endVars) {
	    		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
	    			changingVars[p] = endVars[p];
	    			if (!style[p] && style[p] !== "0") {
	    				inlineToRemoveAtEnd[p] = 1;
	    			}
	    		}
	    	}
	    	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
	    	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
	    		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
	    	}
	    	_parseTransform(target, true); //to clear the caching of transforms
	    	data.css = new gsap.plugins.css();
	    	data.css.init(target, changingVars, tween);
	    	plugin._props.push(...data.css._props);
	    	return 1;
	    }
	    */
	  },
	  /*
	   * --------------------------------------------------------------------------------------
	   * TRANSFORMS
	   * --------------------------------------------------------------------------------------
	   */
	  _identity2DMatrix = [1, 0, 0, 1, 0, 0],
	  _rotationalProperties = {},
	  _isNullTransform = function _isNullTransform(value) {
	    return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
	  },
	  _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
	    var matrixString = _getComputedProperty(target, _transformProp$1);
	    return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round$1);
	  },
	  _getMatrix = function _getMatrix(target, force2D) {
	    var cache = target._gsap || _getCache(target),
	      style = target.style,
	      matrix = _getComputedTransformMatrixAsArray(target),
	      parent,
	      nextSibling,
	      temp,
	      addedToDOM;
	    if (cache.svg && target.getAttribute("transform")) {
	      temp = target.transform.baseVal.consolidate().matrix; //ensures that even complex values like "translate(50,60) rotate(135,0,0)" are parsed because it mashes it into a matrix.

	      matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
	      return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
	    } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
	      //note: if offsetParent is null, that means the element isn't in the normal document flow, like if it has display:none or one of its ancestors has display:none). Firefox returns null for getComputedStyle() if the element is in an iframe that has display:none. https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	      //browsers don't report transforms accurately unless the element is in the DOM and has a display value that's not "none". Firefox and Microsoft browsers have a partial bug where they'll report transforms even if display:none BUT not any percentage-based values like translate(-50%, 8px) will be reported as if it's translate(0, 8px).
	      temp = style.display;
	      style.display = "block";
	      parent = target.parentNode;
	      if (!parent || !target.offsetParent && !target.getBoundingClientRect().width) {
	        // note: in 3.3.0 we switched target.offsetParent to _doc.body.contains(target) to avoid [sometimes unnecessary] MutationObserver calls but that wasn't adequate because there are edge cases where nested position: fixed elements need to get reparented to accurately sense transforms. See https://github.com/greensock/GSAP/issues/388 and https://github.com/greensock/GSAP/issues/375. Note: position: fixed elements report a null offsetParent but they could also be invisible because they're in an ancestor with display: none, so we check getBoundingClientRect(). We only want to alter the DOM if we absolutely have to because it can cause iframe content to reload, like a Vimeo video.
	        addedToDOM = 1; //flag

	        nextSibling = target.nextElementSibling;
	        _docElement.appendChild(target); //we must add it to the DOM in order to get values properly
	      }

	      matrix = _getComputedTransformMatrixAsArray(target);
	      temp ? style.display = temp : _removeProperty(target, "display");
	      if (addedToDOM) {
	        nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
	      }
	    }
	    return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
	  },
	  _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
	    var cache = target._gsap,
	      matrix = matrixArray || _getMatrix(target, true),
	      xOriginOld = cache.xOrigin || 0,
	      yOriginOld = cache.yOrigin || 0,
	      xOffsetOld = cache.xOffset || 0,
	      yOffsetOld = cache.yOffset || 0,
	      a = matrix[0],
	      b = matrix[1],
	      c = matrix[2],
	      d = matrix[3],
	      tx = matrix[4],
	      ty = matrix[5],
	      originSplit = origin.split(" "),
	      xOrigin = parseFloat(originSplit[0]) || 0,
	      yOrigin = parseFloat(originSplit[1]) || 0,
	      bounds,
	      determinant,
	      x,
	      y;
	    if (!originIsAbsolute) {
	      bounds = _getBBox(target);
	      xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
	      yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin); // if (!("xOrigin" in cache) && (xOrigin || yOrigin)) { // added in 3.12.3, reverted in 3.12.4; requires more exploration
	      // 	xOrigin -= bounds.x;
	      // 	yOrigin -= bounds.y;
	      // }
	    } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
	      //if it's zero (like if scaleX and scaleY are zero), skip it to avoid errors with dividing by zero.
	      x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
	      y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
	      xOrigin = x;
	      yOrigin = y; // theory: we only had to do this for smoothing and it assumes that the previous one was not originIsAbsolute.
	    }

	    if (smooth || smooth !== false && cache.smooth) {
	      tx = xOrigin - xOriginOld;
	      ty = yOrigin - yOriginOld;
	      cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
	      cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
	    } else {
	      cache.xOffset = cache.yOffset = 0;
	    }
	    cache.xOrigin = xOrigin;
	    cache.yOrigin = yOrigin;
	    cache.smooth = !!smooth;
	    cache.origin = origin;
	    cache.originIsAbsolute = !!originIsAbsolute;
	    target.style[_transformOriginProp] = "0px 0px"; //otherwise, if someone sets  an origin via CSS, it will likely interfere with the SVG transform attribute ones (because remember, we're baking the origin into the matrix() value).

	    if (pluginToAddPropTweensTo) {
	      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
	      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
	      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
	      _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
	    }
	    target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
	  },
	  _parseTransform = function _parseTransform(target, uncache) {
	    var cache = target._gsap || new GSCache(target);
	    if ("x" in cache && !uncache && !cache.uncache) {
	      return cache;
	    }
	    var style = target.style,
	      invertedScaleX = cache.scaleX < 0,
	      px = "px",
	      deg = "deg",
	      cs = getComputedStyle(target),
	      origin = _getComputedProperty(target, _transformOriginProp) || "0",
	      x,
	      y,
	      z,
	      scaleX,
	      scaleY,
	      rotation,
	      rotationX,
	      rotationY,
	      skewX,
	      skewY,
	      perspective,
	      xOrigin,
	      yOrigin,
	      matrix,
	      angle,
	      cos,
	      sin,
	      a,
	      b,
	      c,
	      d,
	      a12,
	      a22,
	      t1,
	      t2,
	      t3,
	      a13,
	      a23,
	      a33,
	      a42,
	      a43,
	      a32;
	    x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
	    scaleX = scaleY = 1;
	    cache.svg = !!(target.getCTM && _isSVG(target));
	    if (cs.translate) {
	      // accommodate independent transforms by combining them into normal ones.
	      if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
	        style[_transformProp$1] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp$1] !== "none" ? cs[_transformProp$1] : "");
	      }
	      style.scale = style.rotate = style.translate = "none";
	    }
	    matrix = _getMatrix(target, cache.svg);
	    if (cache.svg) {
	      if (cache.uncache) {
	        // if cache.uncache is true (and maybe if origin is 0,0), we need to set element.style.transformOrigin = (cache.xOrigin - bbox.x) + "px " + (cache.yOrigin - bbox.y) + "px". Previously we let the data-svg-origin stay instead, but when introducing revert(), it complicated things.
	        t2 = target.getBBox();
	        origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
	        t1 = "";
	      } else {
	        t1 = !uncache && target.getAttribute("data-svg-origin"); //  Remember, to work around browser inconsistencies we always force SVG elements' transformOrigin to 0,0 and offset the translation accordingly.
	      }

	      _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
	    }
	    xOrigin = cache.xOrigin || 0;
	    yOrigin = cache.yOrigin || 0;
	    if (matrix !== _identity2DMatrix) {
	      a = matrix[0]; //a11

	      b = matrix[1]; //a21

	      c = matrix[2]; //a31

	      d = matrix[3]; //a41

	      x = a12 = matrix[4];
	      y = a22 = matrix[5]; //2D matrix

	      if (matrix.length === 6) {
	        scaleX = Math.sqrt(a * a + b * b);
	        scaleY = Math.sqrt(d * d + c * c);
	        rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).

	        skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
	        skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
	        if (cache.svg) {
	          x -= xOrigin - (xOrigin * a + yOrigin * c);
	          y -= yOrigin - (xOrigin * b + yOrigin * d);
	        } //3D matrix
	      } else {
	        a32 = matrix[6];
	        a42 = matrix[7];
	        a13 = matrix[8];
	        a23 = matrix[9];
	        a33 = matrix[10];
	        a43 = matrix[11];
	        x = matrix[12];
	        y = matrix[13];
	        z = matrix[14];
	        angle = _atan2(a32, a33);
	        rotationX = angle * _RAD2DEG; //rotationX

	        if (angle) {
	          cos = Math.cos(-angle);
	          sin = Math.sin(-angle);
	          t1 = a12 * cos + a13 * sin;
	          t2 = a22 * cos + a23 * sin;
	          t3 = a32 * cos + a33 * sin;
	          a13 = a12 * -sin + a13 * cos;
	          a23 = a22 * -sin + a23 * cos;
	          a33 = a32 * -sin + a33 * cos;
	          a43 = a42 * -sin + a43 * cos;
	          a12 = t1;
	          a22 = t2;
	          a32 = t3;
	        } //rotationY

	        angle = _atan2(-c, a33);
	        rotationY = angle * _RAD2DEG;
	        if (angle) {
	          cos = Math.cos(-angle);
	          sin = Math.sin(-angle);
	          t1 = a * cos - a13 * sin;
	          t2 = b * cos - a23 * sin;
	          t3 = c * cos - a33 * sin;
	          a43 = d * sin + a43 * cos;
	          a = t1;
	          b = t2;
	          c = t3;
	        } //rotationZ

	        angle = _atan2(b, a);
	        rotation = angle * _RAD2DEG;
	        if (angle) {
	          cos = Math.cos(angle);
	          sin = Math.sin(angle);
	          t1 = a * cos + b * sin;
	          t2 = a12 * cos + a22 * sin;
	          b = b * cos - a * sin;
	          a22 = a22 * cos - a12 * sin;
	          a = t1;
	          a12 = t2;
	        }
	        if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
	          //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
	          rotationX = rotation = 0;
	          rotationY = 180 - rotationY;
	        }
	        scaleX = _round$1(Math.sqrt(a * a + b * b + c * c));
	        scaleY = _round$1(Math.sqrt(a22 * a22 + a32 * a32));
	        angle = _atan2(a12, a22);
	        skewX = Math.abs(angle) > 0.0002 ? angle * _RAD2DEG : 0;
	        perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
	      }
	      if (cache.svg) {
	        //sense if there are CSS transforms applied on an SVG element in which case we must overwrite them when rendering. The transform attribute is more reliable cross-browser, but we can't just remove the CSS ones because they may be applied in a CSS rule somewhere (not just inline).
	        t1 = target.getAttribute("transform");
	        cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp$1));
	        t1 && target.setAttribute("transform", t1);
	      }
	    }
	    if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
	      if (invertedScaleX) {
	        scaleX *= -1;
	        skewX += rotation <= 0 ? 180 : -180;
	        rotation += rotation <= 0 ? 180 : -180;
	      } else {
	        scaleY *= -1;
	        skewX += skewX <= 0 ? 180 : -180;
	      }
	    }
	    uncache = uncache || cache.uncache;
	    cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
	    cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
	    cache.z = z + px;
	    cache.scaleX = _round$1(scaleX);
	    cache.scaleY = _round$1(scaleY);
	    cache.rotation = _round$1(rotation) + deg;
	    cache.rotationX = _round$1(rotationX) + deg;
	    cache.rotationY = _round$1(rotationY) + deg;
	    cache.skewX = skewX + deg;
	    cache.skewY = skewY + deg;
	    cache.transformPerspective = perspective + px;
	    if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) {
	      style[_transformOriginProp] = _firstTwoOnly(origin);
	    }
	    cache.xOffset = cache.yOffset = 0;
	    cache.force3D = _config.force3D;
	    cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
	    cache.uncache = 0;
	    return cache;
	  },
	  _firstTwoOnly = function _firstTwoOnly(value) {
	    return (value = value.split(" "))[0] + " " + value[1];
	  },
	  //for handling transformOrigin values, stripping out the 3rd dimension
	  _addPxTranslate = function _addPxTranslate(target, start, value) {
	    var unit = getUnit(start);
	    return _round$1(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
	  },
	  _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
	    cache.z = "0px";
	    cache.rotationY = cache.rotationX = "0deg";
	    cache.force3D = 0;
	    _renderCSSTransforms(ratio, cache);
	  },
	  _zeroDeg = "0deg",
	  _zeroPx = "0px",
	  _endParenthesis = ") ",
	  _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
	    var _ref = cache || this,
	      xPercent = _ref.xPercent,
	      yPercent = _ref.yPercent,
	      x = _ref.x,
	      y = _ref.y,
	      z = _ref.z,
	      rotation = _ref.rotation,
	      rotationY = _ref.rotationY,
	      rotationX = _ref.rotationX,
	      skewX = _ref.skewX,
	      skewY = _ref.skewY,
	      scaleX = _ref.scaleX,
	      scaleY = _ref.scaleY,
	      transformPerspective = _ref.transformPerspective,
	      force3D = _ref.force3D,
	      target = _ref.target,
	      zOrigin = _ref.zOrigin,
	      transforms = "",
	      use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true; // Safari has a bug that causes it not to render 3D transform-origin values properly, so we force the z origin to 0, record it in the cache, and then do the math here to offset the translate values accordingly (basically do the 3D transform-origin part manually)

	    if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
	      var angle = parseFloat(rotationY) * _DEG2RAD,
	        a13 = Math.sin(angle),
	        a33 = Math.cos(angle),
	        cos;
	      angle = parseFloat(rotationX) * _DEG2RAD;
	      cos = Math.cos(angle);
	      x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
	      y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
	      z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
	    }
	    if (transformPerspective !== _zeroPx) {
	      transforms += "perspective(" + transformPerspective + _endParenthesis;
	    }
	    if (xPercent || yPercent) {
	      transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
	    }
	    if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) {
	      transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
	    }
	    if (rotation !== _zeroDeg) {
	      transforms += "rotate(" + rotation + _endParenthesis;
	    }
	    if (rotationY !== _zeroDeg) {
	      transforms += "rotateY(" + rotationY + _endParenthesis;
	    }
	    if (rotationX !== _zeroDeg) {
	      transforms += "rotateX(" + rotationX + _endParenthesis;
	    }
	    if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
	      transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
	    }
	    if (scaleX !== 1 || scaleY !== 1) {
	      transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
	    }
	    target.style[_transformProp$1] = transforms || "translate(0, 0)";
	  },
	  _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
	    var _ref2 = cache || this,
	      xPercent = _ref2.xPercent,
	      yPercent = _ref2.yPercent,
	      x = _ref2.x,
	      y = _ref2.y,
	      rotation = _ref2.rotation,
	      skewX = _ref2.skewX,
	      skewY = _ref2.skewY,
	      scaleX = _ref2.scaleX,
	      scaleY = _ref2.scaleY,
	      target = _ref2.target,
	      xOrigin = _ref2.xOrigin,
	      yOrigin = _ref2.yOrigin,
	      xOffset = _ref2.xOffset,
	      yOffset = _ref2.yOffset,
	      forceCSS = _ref2.forceCSS,
	      tx = parseFloat(x),
	      ty = parseFloat(y),
	      a11,
	      a21,
	      a12,
	      a22,
	      temp;
	    rotation = parseFloat(rotation);
	    skewX = parseFloat(skewX);
	    skewY = parseFloat(skewY);
	    if (skewY) {
	      //for performance reasons, we combine all skewing into the skewX and rotation values. Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of 10 degrees.
	      skewY = parseFloat(skewY);
	      skewX += skewY;
	      rotation += skewY;
	    }
	    if (rotation || skewX) {
	      rotation *= _DEG2RAD;
	      skewX *= _DEG2RAD;
	      a11 = Math.cos(rotation) * scaleX;
	      a21 = Math.sin(rotation) * scaleX;
	      a12 = Math.sin(rotation - skewX) * -scaleY;
	      a22 = Math.cos(rotation - skewX) * scaleY;
	      if (skewX) {
	        skewY *= _DEG2RAD;
	        temp = Math.tan(skewX - skewY);
	        temp = Math.sqrt(1 + temp * temp);
	        a12 *= temp;
	        a22 *= temp;
	        if (skewY) {
	          temp = Math.tan(skewY);
	          temp = Math.sqrt(1 + temp * temp);
	          a11 *= temp;
	          a21 *= temp;
	        }
	      }
	      a11 = _round$1(a11);
	      a21 = _round$1(a21);
	      a12 = _round$1(a12);
	      a22 = _round$1(a22);
	    } else {
	      a11 = scaleX;
	      a22 = scaleY;
	      a21 = a12 = 0;
	    }
	    if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
	      tx = _convertToUnit(target, "x", x, "px");
	      ty = _convertToUnit(target, "y", y, "px");
	    }
	    if (xOrigin || yOrigin || xOffset || yOffset) {
	      tx = _round$1(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
	      ty = _round$1(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
	    }
	    if (xPercent || yPercent) {
	      //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the translation to simulate it.
	      temp = target.getBBox();
	      tx = _round$1(tx + xPercent / 100 * temp.width);
	      ty = _round$1(ty + yPercent / 100 * temp.height);
	    }
	    temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
	    target.setAttribute("transform", temp);
	    forceCSS && (target.style[_transformProp$1] = temp); //some browsers prioritize CSS transforms over the transform attribute. When we sense that the user has CSS transforms applied, we must overwrite them this way (otherwise some browser simply won't render the transform attribute changes!)
	  },
	  _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
	    var cap = 360,
	      isString = _isString$1(endValue),
	      endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1),
	      change = endNum - startNum,
	      finalValue = startNum + change + "deg",
	      direction,
	      pt;
	    if (isString) {
	      direction = endValue.split("_")[1];
	      if (direction === "short") {
	        change %= cap;
	        if (change !== change % (cap / 2)) {
	          change += change < 0 ? cap : -cap;
	        }
	      }
	      if (direction === "cw" && change < 0) {
	        change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
	      } else if (direction === "ccw" && change > 0) {
	        change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
	      }
	    }
	    plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
	    pt.e = finalValue;
	    pt.u = "deg";
	    plugin._props.push(property);
	    return pt;
	  },
	  _assign = function _assign(target, source) {
	    // Internet Explorer doesn't have Object.assign(), so we recreate it here.
	    for (var p in source) {
	      target[p] = source[p];
	    }
	    return target;
	  },
	  _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
	    //for handling cases where someone passes in a whole transform string, like transform: "scale(2, 3) rotate(20deg) translateY(30em)"
	    var startCache = _assign({}, target._gsap),
	      exclude = "perspective,force3D,transformOrigin,svgOrigin",
	      style = target.style,
	      endCache,
	      p,
	      startValue,
	      endValue,
	      startNum,
	      endNum,
	      startUnit,
	      endUnit;
	    if (startCache.svg) {
	      startValue = target.getAttribute("transform");
	      target.setAttribute("transform", "");
	      style[_transformProp$1] = transforms;
	      endCache = _parseTransform(target, 1);
	      _removeProperty(target, _transformProp$1);
	      target.setAttribute("transform", startValue);
	    } else {
	      startValue = getComputedStyle(target)[_transformProp$1];
	      style[_transformProp$1] = transforms;
	      endCache = _parseTransform(target, 1);
	      style[_transformProp$1] = startValue;
	    }
	    for (p in _transformProps) {
	      startValue = startCache[p];
	      endValue = endCache[p];
	      if (startValue !== endValue && exclude.indexOf(p) < 0) {
	        //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
	        startUnit = getUnit(startValue);
	        endUnit = getUnit(endValue);
	        startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
	        endNum = parseFloat(endValue);
	        plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
	        plugin._pt.u = endUnit || 0;
	        plugin._props.push(p);
	      }
	    }
	    _assign(endCache, startCache);
	  }; // handle splitting apart padding, margin, borderWidth, and borderRadius into their 4 components. Firefox, for example, won't report borderRadius correctly - it will only do borderTopLeftRadius and the other corners. We also want to handle paddingTop, marginLeft, borderRightWidth, etc.

	_forEachName("padding,margin,Width,Radius", function (name, index) {
	  var t = "Top",
	    r = "Right",
	    b = "Bottom",
	    l = "Left",
	    props = (index < 3 ? [t, r, b, l] : [t + l, t + r, b + r, b + l]).map(function (side) {
	      return index < 2 ? name + side : "border" + side + name;
	    });
	  _specialProps[index > 1 ? "border" + name : name] = function (plugin, target, property, endValue, tween) {
	    var a, vars;
	    if (arguments.length < 4) {
	      // getter, passed target, property, and unit (from _get())
	      a = props.map(function (prop) {
	        return _get(plugin, prop, property);
	      });
	      vars = a.join(" ");
	      return vars.split(a[0]).length === 5 ? a[0] : vars;
	    }
	    a = (endValue + "").split(" ");
	    vars = {};
	    props.forEach(function (prop, i) {
	      return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
	    });
	    plugin.init(target, vars, tween);
	  };
	});
	var CSSPlugin = {
	  name: "css",
	  register: _initCore$1,
	  targetTest: function targetTest(target) {
	    return target.style && target.nodeType;
	  },
	  init: function init(target, vars, tween, index, targets) {
	    var props = this._props,
	      style = target.style,
	      startAt = tween.vars.startAt,
	      startValue,
	      endValue,
	      endNum,
	      startNum,
	      type,
	      specialProp,
	      p,
	      startUnit,
	      endUnit,
	      relative,
	      isTransformRelated,
	      transformPropTween,
	      cache,
	      smooth,
	      hasPriority,
	      inlineProps;
	    _pluginInitted || _initCore$1(); // we may call init() multiple times on the same plugin instance, like when adding special properties, so make sure we don't overwrite the revert data or inlineProps

	    this.styles = this.styles || _getStyleSaver(target);
	    inlineProps = this.styles.props;
	    this.tween = tween;
	    for (p in vars) {
	      if (p === "autoRound") {
	        continue;
	      }
	      endValue = vars[p];
	      if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) {
	        // plugins
	        continue;
	      }
	      type = typeof endValue;
	      specialProp = _specialProps[p];
	      if (type === "function") {
	        endValue = endValue.call(tween, index, target, targets);
	        type = typeof endValue;
	      }
	      if (type === "string" && ~endValue.indexOf("random(")) {
	        endValue = _replaceRandom(endValue);
	      }
	      if (specialProp) {
	        specialProp(this, target, p, endValue, tween) && (hasPriority = 1);
	      } else if (p.substr(0, 2) === "--") {
	        //CSS variable
	        startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
	        endValue += "";
	        _colorExp.lastIndex = 0;
	        if (!_colorExp.test(startValue)) {
	          // colors don't have units
	          startUnit = getUnit(startValue);
	          endUnit = getUnit(endValue);
	        }
	        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
	        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
	        props.push(p);
	        inlineProps.push(p, 0, style[p]);
	      } else if (type !== "undefined") {
	        if (startAt && p in startAt) {
	          // in case someone hard-codes a complex value as the start, like top: "calc(2vh / 2)". Without this, it'd use the computed value (always in px)
	          startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
	          _isString$1(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
	          getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || ""); // for cases when someone passes in a unitless value like {x: 100}; if we try setting translate(100, 0px) it won't work.

	          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p)); // can't work with relative values
	        } else {
	          startValue = _get(target, p);
	        }
	        startNum = parseFloat(startValue);
	        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
	        relative && (endValue = endValue.substr(2));
	        endNum = parseFloat(endValue);
	        if (p in _propertyAliases) {
	          if (p === "autoAlpha") {
	            //special case where we control the visibility along with opacity. We still allow the opacity value to pass through and get tweened.
	            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
	              //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
	              startNum = 0;
	            }
	            inlineProps.push("visibility", 0, style.visibility);
	            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
	          }
	          if (p !== "scale" && p !== "transform") {
	            p = _propertyAliases[p];
	            ~p.indexOf(",") && (p = p.split(",")[0]);
	          }
	        }
	        isTransformRelated = p in _transformProps; //--- TRANSFORM-RELATED ---

	        if (isTransformRelated) {
	          this.styles.save(p);
	          if (!transformPropTween) {
	            cache = target._gsap;
	            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform); // if, for example, gsap.set(... {transform:"translateX(50vw)"}), the _get() call doesn't parse the transform, thus cache.renderTransform won't be set yet so force the parsing of the transform here.

	            smooth = vars.smoothOrigin !== false && cache.smooth;
	            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp$1, 0, 1, cache.renderTransform, cache, 0, -1); //the first time through, create the rendering PropTween so that it runs LAST (in the linked list, we keep adding to the beginning)

	            transformPropTween.dep = 1; //flag it as dependent so that if things get killed/overwritten and this is the only PropTween left, we can safely kill the whole tween.
	          }

	          if (p === "scale") {
	            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
	            this._pt.u = 0;
	            props.push("scaleY", p);
	            p += "X";
	          } else if (p === "transformOrigin") {
	            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
	            endValue = _convertKeywordsToPercentages(endValue); //in case something like "left top" or "bottom right" is passed in. Convert to percentages.

	            if (cache.svg) {
	              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
	            } else {
	              endUnit = parseFloat(endValue.split(" ")[2]) || 0; //handle the zOrigin separately!

	              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
	              _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
	            }
	            continue;
	          } else if (p === "svgOrigin") {
	            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
	            continue;
	          } else if (p in _rotationalProperties) {
	            _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
	            continue;
	          } else if (p === "smoothOrigin") {
	            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
	            continue;
	          } else if (p === "force3D") {
	            cache[p] = endValue;
	            continue;
	          } else if (p === "transform") {
	            _addRawTransformPTs(this, endValue, target);
	            continue;
	          }
	        } else if (!(p in style)) {
	          p = _checkPropPrefix(p) || p;
	        }
	        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
	          startUnit = (startValue + "").substr((startNum + "").length);
	          endNum || (endNum = 0); // protect against NaN

	          endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
	          startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
	          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
	          this._pt.u = endUnit || 0;
	          if (startUnit !== endUnit && endUnit !== "%") {
	            //when the tween goes all the way back to the beginning, we need to revert it to the OLD/ORIGINAL value (with those units). We record that as a "b" (beginning) property and point to a render method that handles that. (performance optimization)
	            this._pt.b = startValue;
	            this._pt.r = _renderCSSPropWithBeginning;
	          }
	        } else if (!(p in style)) {
	          if (p in target) {
	            //maybe it's not a style - it could be a property added directly to an element in which case we'll try to animate that.
	            this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets);
	          } else if (p !== "parseTransform") {
	            _missingPlugin(p, endValue);
	            continue;
	          }
	        } else {
	          _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
	        }
	        isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : typeof target[p] === "function" ? inlineProps.push(p, 2, target[p]()) : inlineProps.push(p, 1, startValue || target[p]));
	        props.push(p);
	      }
	    }
	    hasPriority && _sortPropTweensByPriority(this);
	  },
	  render: function render(ratio, data) {
	    if (data.tween._time || !_reverting()) {
	      var pt = data._pt;
	      while (pt) {
	        pt.r(ratio, pt.d);
	        pt = pt._next;
	      }
	    } else {
	      data.styles.revert();
	    }
	  },
	  get: _get,
	  aliases: _propertyAliases,
	  getSetter: function getSetter(target, property, plugin) {
	    //returns a setter function that accepts target, property, value and applies it accordingly. Remember, properties like "x" aren't as simple as target.style.property = value because they've got to be applied to a proxy object and then merged into a transform string in a renderer.
	    var p = _propertyAliases[property];
	    p && p.indexOf(",") < 0 && (property = p);
	    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
	  },
	  core: {
	    _removeProperty: _removeProperty,
	    _getMatrix: _getMatrix
	  }
	};
	gsap$2.utils.checkPrefix = _checkPropPrefix;
	gsap$2.core.getStyleSaver = _getStyleSaver;
	(function (positionAndScale, rotation, others, aliases) {
	  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function (name) {
	    _transformProps[name] = 1;
	  });
	  _forEachName(rotation, function (name) {
	    _config.units[name] = "deg";
	    _rotationalProperties[name] = 1;
	  });
	  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
	  _forEachName(aliases, function (name) {
	    var split = name.split(":");
	    _propertyAliases[split[1]] = all[split[0]];
	  });
	})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
	_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (name) {
	  _config.units[name] = "px";
	});
	gsap$2.registerPlugin(CSSPlugin);

	var gsapWithCSS = gsap$2.registerPlugin(CSSPlugin) || gsap$2;
	  // to protect from tree shaking
	  gsapWithCSS.core.Tween;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	/*!
	 * Observer 3.12.7
	 * https://gsap.com
	 *
	 * @license Copyright 2008-2025, GreenSock. All rights reserved.
	 * Subject to the terms at https://gsap.com/standard-license or for
	 * Club GSAP members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/

	/* eslint-disable */
	var gsap$1,
	  _coreInitted$1,
	  _win$1,
	  _doc$1,
	  _docEl$1,
	  _body$1,
	  _isTouch,
	  _pointerType,
	  ScrollTrigger$1,
	  _root$1,
	  _normalizer$1,
	  _eventTypes,
	  _context$1,
	  _getGSAP$1 = function _getGSAP() {
	    return gsap$1 || typeof window !== "undefined" && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1;
	  },
	  _startup$1 = 1,
	  _observers = [],
	  _scrollers = [],
	  _proxies = [],
	  _getTime$1 = Date.now,
	  _bridge = function _bridge(name, value) {
	    return value;
	  },
	  _integrate = function _integrate() {
	    var core = ScrollTrigger$1.core,
	      data = core.bridge || {},
	      scrollers = core._scrollers,
	      proxies = core._proxies;
	    scrollers.push.apply(scrollers, _scrollers);
	    proxies.push.apply(proxies, _proxies);
	    _scrollers = scrollers;
	    _proxies = proxies;
	    _bridge = function _bridge(name, value) {
	      return data[name](value);
	    };
	  },
	  _getProxyProp = function _getProxyProp(element, property) {
	    return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
	  },
	  _isViewport$1 = function _isViewport(el) {
	    return !!~_root$1.indexOf(el);
	  },
	  _addListener$1 = function _addListener(element, type, func, passive, capture) {
	    return element.addEventListener(type, func, {
	      passive: passive !== false,
	      capture: !!capture
	    });
	  },
	  _removeListener$1 = function _removeListener(element, type, func, capture) {
	    return element.removeEventListener(type, func, !!capture);
	  },
	  _scrollLeft = "scrollLeft",
	  _scrollTop = "scrollTop",
	  _onScroll$1 = function _onScroll() {
	    return _normalizer$1 && _normalizer$1.isPressed || _scrollers.cache++;
	  },
	  _scrollCacheFunc = function _scrollCacheFunc(f, doNotCache) {
	    var cachingFunc = function cachingFunc(value) {
	      // since reading the scrollTop/scrollLeft/pageOffsetY/pageOffsetX can trigger a layout, this function allows us to cache the value so it only gets read fresh after a "scroll" event fires (or while we're refreshing because that can lengthen the page and alter the scroll position). when "soft" is true, that means don't actually set the scroll, but cache the new value instead (useful in ScrollSmoother)
	      if (value || value === 0) {
	        _startup$1 && (_win$1.history.scrollRestoration = "manual"); // otherwise the new position will get overwritten by the browser onload.

	        var isNormalizing = _normalizer$1 && _normalizer$1.isPressed;
	        value = cachingFunc.v = Math.round(value) || (_normalizer$1 && _normalizer$1.iOS ? 1 : 0); //TODO: iOS Bug: if you allow it to go to 0, Safari can start to report super strange (wildly inaccurate) touch positions!

	        f(value);
	        cachingFunc.cacheID = _scrollers.cache;
	        isNormalizing && _bridge("ss", value); // set scroll (notify ScrollTrigger so it can dispatch a "scrollStart" event if necessary
	      } else if (doNotCache || _scrollers.cache !== cachingFunc.cacheID || _bridge("ref")) {
	        cachingFunc.cacheID = _scrollers.cache;
	        cachingFunc.v = f();
	      }
	      return cachingFunc.v + cachingFunc.offset;
	    };
	    cachingFunc.offset = 0;
	    return f && cachingFunc;
	  },
	  _horizontal = {
	    s: _scrollLeft,
	    p: "left",
	    p2: "Left",
	    os: "right",
	    os2: "Right",
	    d: "width",
	    d2: "Width",
	    a: "x",
	    sc: _scrollCacheFunc(function (value) {
	      return arguments.length ? _win$1.scrollTo(value, _vertical.sc()) : _win$1.pageXOffset || _doc$1[_scrollLeft] || _docEl$1[_scrollLeft] || _body$1[_scrollLeft] || 0;
	    })
	  },
	  _vertical = {
	    s: _scrollTop,
	    p: "top",
	    p2: "Top",
	    os: "bottom",
	    os2: "Bottom",
	    d: "height",
	    d2: "Height",
	    a: "y",
	    op: _horizontal,
	    sc: _scrollCacheFunc(function (value) {
	      return arguments.length ? _win$1.scrollTo(_horizontal.sc(), value) : _win$1.pageYOffset || _doc$1[_scrollTop] || _docEl$1[_scrollTop] || _body$1[_scrollTop] || 0;
	    })
	  },
	  _getTarget = function _getTarget(t, self) {
	    return (self && self._ctx && self._ctx.selector || gsap$1.utils.toArray)(t)[0] || (typeof t === "string" && gsap$1.config().nullTargetWarn !== false ? console.warn("Element not found:", t) : null);
	  },
	  _getScrollFunc = function _getScrollFunc(element, _ref) {
	    var s = _ref.s,
	      sc = _ref.sc;
	    // we store the scroller functions in an alternating sequenced Array like [element, verticalScrollFunc, horizontalScrollFunc, ...] so that we can minimize memory, maximize performance, and we also record the last position as a ".rec" property in order to revert to that after refreshing to ensure things don't shift around.
	    _isViewport$1(element) && (element = _doc$1.scrollingElement || _docEl$1);
	    var i = _scrollers.indexOf(element),
	      offset = sc === _vertical.sc ? 1 : 2;
	    !~i && (i = _scrollers.push(element) - 1);
	    _scrollers[i + offset] || _addListener$1(element, "scroll", _onScroll$1); // clear the cache when a scroll occurs

	    var prev = _scrollers[i + offset],
	      func = prev || (_scrollers[i + offset] = _scrollCacheFunc(_getProxyProp(element, s), true) || (_isViewport$1(element) ? sc : _scrollCacheFunc(function (value) {
	        return arguments.length ? element[s] = value : element[s];
	      })));
	    func.target = element;
	    prev || (func.smooth = gsap$1.getProperty(element, "scrollBehavior") === "smooth"); // only set it the first time (don't reset every time a scrollFunc is requested because perhaps it happens during a refresh() when it's disabled in ScrollTrigger.

	    return func;
	  },
	  _getVelocityProp = function _getVelocityProp(value, minTimeRefresh, useDelta) {
	    var v1 = value,
	      v2 = value,
	      t1 = _getTime$1(),
	      t2 = t1,
	      min = minTimeRefresh || 50,
	      dropToZeroTime = Math.max(500, min * 3),
	      update = function update(value, force) {
	        var t = _getTime$1();
	        if (force || t - t1 > min) {
	          v2 = v1;
	          v1 = value;
	          t2 = t1;
	          t1 = t;
	        } else if (useDelta) {
	          v1 += value;
	        } else {
	          // not totally necessary, but makes it a bit more accurate by adjusting the v1 value according to the new slope. This way we're not just ignoring the incoming data. Removing for now because it doesn't seem to make much practical difference and it's probably not worth the kb.
	          v1 = v2 + (value - v2) / (t - t2) * (t1 - t2);
	        }
	      },
	      reset = function reset() {
	        v2 = v1 = useDelta ? 0 : v1;
	        t2 = t1 = 0;
	      },
	      getVelocity = function getVelocity(latestValue) {
	        var tOld = t2,
	          vOld = v2,
	          t = _getTime$1();
	        (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
	        return t1 === t2 || t - t2 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t : t1) - tOld) * 1000;
	      };
	    return {
	      update: update,
	      reset: reset,
	      getVelocity: getVelocity
	    };
	  },
	  _getEvent = function _getEvent(e, preventDefault) {
	    preventDefault && !e._gsapAllow && e.preventDefault();
	    return e.changedTouches ? e.changedTouches[0] : e;
	  },
	  _getAbsoluteMax = function _getAbsoluteMax(a) {
	    var max = Math.max.apply(Math, a),
	      min = Math.min.apply(Math, a);
	    return Math.abs(max) >= Math.abs(min) ? max : min;
	  },
	  _setScrollTrigger = function _setScrollTrigger() {
	    ScrollTrigger$1 = gsap$1.core.globals().ScrollTrigger;
	    ScrollTrigger$1 && ScrollTrigger$1.core && _integrate();
	  },
	  _initCore = function _initCore(core) {
	    gsap$1 = core || _getGSAP$1();
	    if (!_coreInitted$1 && gsap$1 && typeof document !== "undefined" && document.body) {
	      _win$1 = window;
	      _doc$1 = document;
	      _docEl$1 = _doc$1.documentElement;
	      _body$1 = _doc$1.body;
	      _root$1 = [_win$1, _doc$1, _docEl$1, _body$1];
	      gsap$1.utils.clamp;
	      _context$1 = gsap$1.core.context || function () {};
	      _pointerType = "onpointerenter" in _body$1 ? "pointer" : "mouse"; // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

	      _isTouch = Observer.isTouch = _win$1.matchMedia && _win$1.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win$1 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
	      _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl$1 ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl$1) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
	      setTimeout(function () {
	        return _startup$1 = 0;
	      }, 500);
	      _setScrollTrigger();
	      _coreInitted$1 = 1;
	    }
	    return _coreInitted$1;
	  };
	_horizontal.op = _vertical;
	_scrollers.cache = 0;
	var Observer = /*#__PURE__*/function () {
	  function Observer(vars) {
	    this.init(vars);
	  }
	  var _proto = Observer.prototype;
	  _proto.init = function init(vars) {
	    _coreInitted$1 || _initCore(gsap$1) || console.warn("Please gsap.registerPlugin(Observer)");
	    ScrollTrigger$1 || _setScrollTrigger();
	    var tolerance = vars.tolerance,
	      dragMinimum = vars.dragMinimum,
	      type = vars.type,
	      target = vars.target,
	      lineHeight = vars.lineHeight,
	      debounce = vars.debounce,
	      preventDefault = vars.preventDefault,
	      onStop = vars.onStop,
	      onStopDelay = vars.onStopDelay,
	      ignore = vars.ignore,
	      wheelSpeed = vars.wheelSpeed,
	      event = vars.event,
	      onDragStart = vars.onDragStart,
	      onDragEnd = vars.onDragEnd,
	      onDrag = vars.onDrag,
	      onPress = vars.onPress,
	      onRelease = vars.onRelease,
	      onRight = vars.onRight,
	      onLeft = vars.onLeft,
	      onUp = vars.onUp,
	      onDown = vars.onDown,
	      onChangeX = vars.onChangeX,
	      onChangeY = vars.onChangeY,
	      onChange = vars.onChange,
	      onToggleX = vars.onToggleX,
	      onToggleY = vars.onToggleY,
	      onHover = vars.onHover,
	      onHoverEnd = vars.onHoverEnd,
	      onMove = vars.onMove,
	      ignoreCheck = vars.ignoreCheck,
	      isNormalizer = vars.isNormalizer,
	      onGestureStart = vars.onGestureStart,
	      onGestureEnd = vars.onGestureEnd,
	      onWheel = vars.onWheel,
	      onEnable = vars.onEnable,
	      onDisable = vars.onDisable,
	      onClick = vars.onClick,
	      scrollSpeed = vars.scrollSpeed,
	      capture = vars.capture,
	      allowClicks = vars.allowClicks,
	      lockAxis = vars.lockAxis,
	      onLockAxis = vars.onLockAxis;
	    this.target = target = _getTarget(target) || _docEl$1;
	    this.vars = vars;
	    ignore && (ignore = gsap$1.utils.toArray(ignore));
	    tolerance = tolerance || 1e-9;
	    dragMinimum = dragMinimum || 0;
	    wheelSpeed = wheelSpeed || 1;
	    scrollSpeed = scrollSpeed || 1;
	    type = type || "wheel,touch,pointer";
	    debounce = debounce !== false;
	    lineHeight || (lineHeight = parseFloat(_win$1.getComputedStyle(_body$1).lineHeight) || 22); // note: browser may report "normal", so default to 22.

	    var id,
	      onStopDelayedCall,
	      dragged,
	      moved,
	      wheeled,
	      locked,
	      axis,
	      self = this,
	      prevDeltaX = 0,
	      prevDeltaY = 0,
	      passive = vars.passive || !preventDefault && vars.passive !== false,
	      scrollFuncX = _getScrollFunc(target, _horizontal),
	      scrollFuncY = _getScrollFunc(target, _vertical),
	      scrollX = scrollFuncX(),
	      scrollY = scrollFuncY(),
	      limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown",
	      // for devices that accommodate mouse events and touch events, we need to distinguish.
	      isViewport = _isViewport$1(target),
	      ownerDoc = target.ownerDocument || _doc$1,
	      deltaX = [0, 0, 0],
	      // wheel, scroll, pointer/touch
	      deltaY = [0, 0, 0],
	      onClickTime = 0,
	      clickCapture = function clickCapture() {
	        return onClickTime = _getTime$1();
	      },
	      _ignoreCheck = function _ignoreCheck(e, isPointerOrTouch) {
	        return (self.event = e) && ignore && ~ignore.indexOf(e.target) || isPointerOrTouch && limitToTouch && e.pointerType !== "touch" || ignoreCheck && ignoreCheck(e, isPointerOrTouch);
	      },
	      onStopFunc = function onStopFunc() {
	        self._vx.reset();
	        self._vy.reset();
	        onStopDelayedCall.pause();
	        onStop && onStop(self);
	      },
	      update = function update() {
	        var dx = self.deltaX = _getAbsoluteMax(deltaX),
	          dy = self.deltaY = _getAbsoluteMax(deltaY),
	          changedX = Math.abs(dx) >= tolerance,
	          changedY = Math.abs(dy) >= tolerance;
	        onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY); // in ScrollTrigger.normalizeScroll(), we need to know if it was touch/pointer so we need access to the deltaX/deltaY Arrays before we clear them out.

	        if (changedX) {
	          onRight && self.deltaX > 0 && onRight(self);
	          onLeft && self.deltaX < 0 && onLeft(self);
	          onChangeX && onChangeX(self);
	          onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
	          prevDeltaX = self.deltaX;
	          deltaX[0] = deltaX[1] = deltaX[2] = 0;
	        }
	        if (changedY) {
	          onDown && self.deltaY > 0 && onDown(self);
	          onUp && self.deltaY < 0 && onUp(self);
	          onChangeY && onChangeY(self);
	          onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
	          prevDeltaY = self.deltaY;
	          deltaY[0] = deltaY[1] = deltaY[2] = 0;
	        }
	        if (moved || dragged) {
	          onMove && onMove(self);
	          if (dragged) {
	            onDragStart && dragged === 1 && onDragStart(self);
	            onDrag && onDrag(self);
	            dragged = 0;
	          }
	          moved = false;
	        }
	        locked && !(locked = false) && onLockAxis && onLockAxis(self);
	        if (wheeled) {
	          onWheel(self);
	          wheeled = false;
	        }
	        id = 0;
	      },
	      onDelta = function onDelta(x, y, index) {
	        deltaX[index] += x;
	        deltaY[index] += y;
	        self._vx.update(x);
	        self._vy.update(y);
	        debounce ? id || (id = requestAnimationFrame(update)) : update();
	      },
	      onTouchOrPointerDelta = function onTouchOrPointerDelta(x, y) {
	        if (lockAxis && !axis) {
	          self.axis = axis = Math.abs(x) > Math.abs(y) ? "x" : "y";
	          locked = true;
	        }
	        if (axis !== "y") {
	          deltaX[2] += x;
	          self._vx.update(x, true); // update the velocity as frequently as possible instead of in the debounced function so that very quick touch-scrolls (flicks) feel natural. If it's the mouse/touch/pointer, force it so that we get snappy/accurate momentum scroll.
	        }

	        if (axis !== "x") {
	          deltaY[2] += y;
	          self._vy.update(y, true);
	        }
	        debounce ? id || (id = requestAnimationFrame(update)) : update();
	      },
	      _onDrag = function _onDrag(e) {
	        if (_ignoreCheck(e, 1)) {
	          return;
	        }
	        e = _getEvent(e, preventDefault);
	        var x = e.clientX,
	          y = e.clientY,
	          dx = x - self.x,
	          dy = y - self.y,
	          isDragging = self.isDragging;
	        self.x = x;
	        self.y = y;
	        if (isDragging || (dx || dy) && (Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y) >= dragMinimum)) {
	          dragged = isDragging ? 2 : 1; // dragged: 0 = not dragging, 1 = first drag, 2 = normal drag

	          isDragging || (self.isDragging = true);
	          onTouchOrPointerDelta(dx, dy);
	        }
	      },
	      _onPress = self.onPress = function (e) {
	        if (_ignoreCheck(e, 1) || e && e.button) {
	          return;
	        }
	        self.axis = axis = null;
	        onStopDelayedCall.pause();
	        self.isPressed = true;
	        e = _getEvent(e); // note: may need to preventDefault(?) Won't side-scroll on iOS Safari if we do, though.

	        prevDeltaX = prevDeltaY = 0;
	        self.startX = self.x = e.clientX;
	        self.startY = self.y = e.clientY;
	        self._vx.reset(); // otherwise the t2 may be stale if the user touches and flicks super fast and releases in less than 2 requestAnimationFrame ticks, causing velocity to be 0.

	        self._vy.reset();
	        _addListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, passive, true);
	        self.deltaX = self.deltaY = 0;
	        onPress && onPress(self);
	      },
	      _onRelease = self.onRelease = function (e) {
	        if (_ignoreCheck(e, 1)) {
	          return;
	        }
	        _removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
	        var isTrackingDrag = !isNaN(self.y - self.startY),
	          wasDragging = self.isDragging,
	          isDragNotClick = wasDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3),
	          // some touch devices need some wiggle room in terms of sensing clicks - the finger may move a few pixels.
	          eventData = _getEvent(e);
	        if (!isDragNotClick && isTrackingDrag) {
	          self._vx.reset();
	          self._vy.reset(); //if (preventDefault && allowClicks && self.isPressed) { // check isPressed because in a rare edge case, the inputObserver in ScrollTrigger may stopPropagation() on the press/drag, so the onRelease may get fired without the onPress/onDrag ever getting called, thus it could trigger a click to occur on a link after scroll-dragging it.

	          if (preventDefault && allowClicks) {
	            gsap$1.delayedCall(0.08, function () {
	              // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
	              if (_getTime$1() - onClickTime > 300 && !e.defaultPrevented) {
	                if (e.target.click) {
	                  //some browsers (like mobile Safari) don't properly trigger the click event
	                  e.target.click();
	                } else if (ownerDoc.createEvent) {
	                  var syntheticEvent = ownerDoc.createEvent("MouseEvents");
	                  syntheticEvent.initMouseEvent("click", true, true, _win$1, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
	                  e.target.dispatchEvent(syntheticEvent);
	                }
	              }
	            });
	          }
	        }
	        self.isDragging = self.isGesturing = self.isPressed = false;
	        onStop && wasDragging && !isNormalizer && onStopDelayedCall.restart(true);
	        dragged && update(); // in case debouncing, we don't want onDrag to fire AFTER onDragEnd().

	        onDragEnd && wasDragging && onDragEnd(self);
	        onRelease && onRelease(self, isDragNotClick);
	      },
	      _onGestureStart = function _onGestureStart(e) {
	        return e.touches && e.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e, self.isDragging);
	      },
	      _onGestureEnd = function _onGestureEnd() {
	        return (self.isGesturing = false) || onGestureEnd(self);
	      },
	      onScroll = function onScroll(e) {
	        if (_ignoreCheck(e)) {
	          return;
	        }
	        var x = scrollFuncX(),
	          y = scrollFuncY();
	        onDelta((x - scrollX) * scrollSpeed, (y - scrollY) * scrollSpeed, 1);
	        scrollX = x;
	        scrollY = y;
	        onStop && onStopDelayedCall.restart(true);
	      },
	      _onWheel = function _onWheel(e) {
	        if (_ignoreCheck(e)) {
	          return;
	        }
	        e = _getEvent(e, preventDefault);
	        onWheel && (wheeled = true);
	        var multiplier = (e.deltaMode === 1 ? lineHeight : e.deltaMode === 2 ? _win$1.innerHeight : 1) * wheelSpeed;
	        onDelta(e.deltaX * multiplier, e.deltaY * multiplier, 0);
	        onStop && !isNormalizer && onStopDelayedCall.restart(true);
	      },
	      _onMove = function _onMove(e) {
	        if (_ignoreCheck(e)) {
	          return;
	        }
	        var x = e.clientX,
	          y = e.clientY,
	          dx = x - self.x,
	          dy = y - self.y;
	        self.x = x;
	        self.y = y;
	        moved = true;
	        onStop && onStopDelayedCall.restart(true);
	        (dx || dy) && onTouchOrPointerDelta(dx, dy);
	      },
	      _onHover = function _onHover(e) {
	        self.event = e;
	        onHover(self);
	      },
	      _onHoverEnd = function _onHoverEnd(e) {
	        self.event = e;
	        onHoverEnd(self);
	      },
	      _onClick = function _onClick(e) {
	        return _ignoreCheck(e) || _getEvent(e, preventDefault) && onClick(self);
	      };
	    onStopDelayedCall = self._dc = gsap$1.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
	    self.deltaX = self.deltaY = 0;
	    self._vx = _getVelocityProp(0, 50, true);
	    self._vy = _getVelocityProp(0, 50, true);
	    self.scrollX = scrollFuncX;
	    self.scrollY = scrollFuncY;
	    self.isDragging = self.isGesturing = self.isPressed = false;
	    _context$1(this);
	    self.enable = function (e) {
	      if (!self.isEnabled) {
	        _addListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);
	        type.indexOf("scroll") >= 0 && _addListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, passive, capture);
	        type.indexOf("wheel") >= 0 && _addListener$1(target, "wheel", _onWheel, passive, capture);
	        if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
	          _addListener$1(target, _eventTypes[0], _onPress, passive, capture);
	          _addListener$1(ownerDoc, _eventTypes[2], _onRelease);
	          _addListener$1(ownerDoc, _eventTypes[3], _onRelease);
	          allowClicks && _addListener$1(target, "click", clickCapture, true, true);
	          onClick && _addListener$1(target, "click", _onClick);
	          onGestureStart && _addListener$1(ownerDoc, "gesturestart", _onGestureStart);
	          onGestureEnd && _addListener$1(ownerDoc, "gestureend", _onGestureEnd);
	          onHover && _addListener$1(target, _pointerType + "enter", _onHover);
	          onHoverEnd && _addListener$1(target, _pointerType + "leave", _onHoverEnd);
	          onMove && _addListener$1(target, _pointerType + "move", _onMove);
	        }
	        self.isEnabled = true;
	        self.isDragging = self.isGesturing = self.isPressed = moved = dragged = false;
	        self._vx.reset();
	        self._vy.reset();
	        scrollX = scrollFuncX();
	        scrollY = scrollFuncY();
	        e && e.type && _onPress(e);
	        onEnable && onEnable(self);
	      }
	      return self;
	    };
	    self.disable = function () {
	      if (self.isEnabled) {
	        // only remove the _onScroll listener if there aren't any others that rely on the functionality.
	        _observers.filter(function (o) {
	          return o !== self && _isViewport$1(o.target);
	        }).length || _removeListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);
	        if (self.isPressed) {
	          self._vx.reset();
	          self._vy.reset();
	          _removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
	        }
	        _removeListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
	        _removeListener$1(target, "wheel", _onWheel, capture);
	        _removeListener$1(target, _eventTypes[0], _onPress, capture);
	        _removeListener$1(ownerDoc, _eventTypes[2], _onRelease);
	        _removeListener$1(ownerDoc, _eventTypes[3], _onRelease);
	        _removeListener$1(target, "click", clickCapture, true);
	        _removeListener$1(target, "click", _onClick);
	        _removeListener$1(ownerDoc, "gesturestart", _onGestureStart);
	        _removeListener$1(ownerDoc, "gestureend", _onGestureEnd);
	        _removeListener$1(target, _pointerType + "enter", _onHover);
	        _removeListener$1(target, _pointerType + "leave", _onHoverEnd);
	        _removeListener$1(target, _pointerType + "move", _onMove);
	        self.isEnabled = self.isPressed = self.isDragging = false;
	        onDisable && onDisable(self);
	      }
	    };
	    self.kill = self.revert = function () {
	      self.disable();
	      var i = _observers.indexOf(self);
	      i >= 0 && _observers.splice(i, 1);
	      _normalizer$1 === self && (_normalizer$1 = 0);
	    };
	    _observers.push(self);
	    isNormalizer && _isViewport$1(target) && (_normalizer$1 = self);
	    self.enable(event);
	  };
	  _createClass(Observer, [{
	    key: "velocityX",
	    get: function get() {
	      return this._vx.getVelocity();
	    }
	  }, {
	    key: "velocityY",
	    get: function get() {
	      return this._vy.getVelocity();
	    }
	  }]);
	  return Observer;
	}();
	Observer.version = "3.12.7";
	Observer.create = function (vars) {
	  return new Observer(vars);
	};
	Observer.register = _initCore;
	Observer.getAll = function () {
	  return _observers.slice();
	};
	Observer.getById = function (id) {
	  return _observers.filter(function (o) {
	    return o.vars.id === id;
	  })[0];
	};
	_getGSAP$1() && gsap$1.registerPlugin(Observer);

	/*!
	 * ScrollTrigger 3.12.7
	 * https://gsap.com
	 *
	 * @license Copyright 2008-2025, GreenSock. All rights reserved.
	 * Subject to the terms at https://gsap.com/standard-license or for
	 * Club GSAP members, the agreement issued with that membership.
	 * @author: Jack Doyle, jack@greensock.com
	*/
	var gsap,
	  _coreInitted,
	  _win,
	  _doc,
	  _docEl,
	  _body,
	  _root,
	  _resizeDelay,
	  _toArray,
	  _clamp,
	  _time2,
	  _syncInterval,
	  _refreshing,
	  _pointerIsDown,
	  _transformProp,
	  _i,
	  _prevWidth,
	  _prevHeight,
	  _autoRefresh,
	  _sort,
	  _suppressOverwrites,
	  _ignoreResize,
	  _normalizer,
	  _ignoreMobileResize,
	  _baseScreenHeight,
	  _baseScreenWidth,
	  _fixIOSBug,
	  _context,
	  _scrollRestoration,
	  _div100vh,
	  _100vh,
	  _isReverted,
	  _clampingMax,
	  _limitCallbacks,
	  // if true, we'll only trigger callbacks if the active state toggles, so if you scroll immediately past both the start and end positions of a ScrollTrigger (thus inactive to inactive), neither its onEnter nor onLeave will be called. This is useful during startup.
	  _startup = 1,
	  _getTime = Date.now,
	  _time1 = _getTime(),
	  _lastScrollTime = 0,
	  _enabled = 0,
	  _parseClamp = function _parseClamp(value, type, self) {
	    var clamp = _isString(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
	    self["_" + type + "Clamp"] = clamp;
	    return clamp ? value.substr(6, value.length - 7) : value;
	  },
	  _keepClamp = function _keepClamp(value, clamp) {
	    return clamp && (!_isString(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
	  },
	  _rafBugFix = function _rafBugFix() {
	    return _enabled && requestAnimationFrame(_rafBugFix);
	  },
	  // in some browsers (like Firefox), screen repaints weren't consistent unless we had SOMETHING queued up in requestAnimationFrame()! So this just creates a super simple loop to keep it alive and smooth out repaints.
	  _pointerDownHandler = function _pointerDownHandler() {
	    return _pointerIsDown = 1;
	  },
	  _pointerUpHandler = function _pointerUpHandler() {
	    return _pointerIsDown = 0;
	  },
	  _passThrough = function _passThrough(v) {
	    return v;
	  },
	  _round = function _round(value) {
	    return Math.round(value * 100000) / 100000 || 0;
	  },
	  _windowExists = function _windowExists() {
	    return typeof window !== "undefined";
	  },
	  _getGSAP = function _getGSAP() {
	    return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
	  },
	  _isViewport = function _isViewport(e) {
	    return !!~_root.indexOf(e);
	  },
	  _getViewportDimension = function _getViewportDimension(dimensionProperty) {
	    return (dimensionProperty === "Height" ? _100vh : _win["inner" + dimensionProperty]) || _docEl["client" + dimensionProperty] || _body["client" + dimensionProperty];
	  },
	  _getBoundsFunc = function _getBoundsFunc(element) {
	    return _getProxyProp(element, "getBoundingClientRect") || (_isViewport(element) ? function () {
	      _winOffsets.width = _win.innerWidth;
	      _winOffsets.height = _100vh;
	      return _winOffsets;
	    } : function () {
	      return _getBounds(element);
	    });
	  },
	  _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref) {
	    var d = _ref.d,
	      d2 = _ref.d2,
	      a = _ref.a;
	    return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function () {
	      return a()[d];
	    } : function () {
	      return (isViewport ? _getViewportDimension(d2) : scroller["client" + d2]) || 0;
	    };
	  },
	  _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
	    return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function () {
	      return _winOffsets;
	    };
	  },
	  _maxScroll = function _maxScroll(element, _ref2) {
	    var s = _ref2.s,
	      d2 = _ref2.d2,
	      d = _ref2.d,
	      a = _ref2.a;
	    return Math.max(0, (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport(element) ? (_docEl[s] || _body[s]) - _getViewportDimension(d2) : element[s] - element["offset" + d2]);
	  },
	  _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
	    for (var i = 0; i < _autoRefresh.length; i += 3) {
	      (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
	    }
	  },
	  _isString = function _isString(value) {
	    return typeof value === "string";
	  },
	  _isFunction = function _isFunction(value) {
	    return typeof value === "function";
	  },
	  _isNumber = function _isNumber(value) {
	    return typeof value === "number";
	  },
	  _isObject = function _isObject(value) {
	    return typeof value === "object";
	  },
	  _endAnimation = function _endAnimation(animation, reversed, pause) {
	    return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
	  },
	  _callback = function _callback(self, func) {
	    if (self.enabled) {
	      var result = self._ctx ? self._ctx.add(function () {
	        return func(self);
	      }) : func(self);
	      result && result.totalTime && (self.callbackAnimation = result);
	    }
	  },
	  _abs = Math.abs,
	  _left = "left",
	  _top = "top",
	  _right = "right",
	  _bottom = "bottom",
	  _width = "width",
	  _height = "height",
	  _Right = "Right",
	  _Left = "Left",
	  _Top = "Top",
	  _Bottom = "Bottom",
	  _padding = "padding",
	  _margin = "margin",
	  _Width = "Width",
	  _Height = "Height",
	  _px = "px",
	  _getComputedStyle = function _getComputedStyle(element) {
	    return _win.getComputedStyle(element);
	  },
	  _makePositionable = function _makePositionable(element) {
	    // if the element already has position: absolute or fixed, leave that, otherwise make it position: relative
	    var position = _getComputedStyle(element).position;
	    element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
	  },
	  _setDefaults = function _setDefaults(obj, defaults) {
	    for (var p in defaults) {
	      p in obj || (obj[p] = defaults[p]);
	    }
	    return obj;
	  },
	  _getBounds = function _getBounds(element, withoutTransforms) {
	    var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap.to(element, {
	        x: 0,
	        y: 0,
	        xPercent: 0,
	        yPercent: 0,
	        rotation: 0,
	        rotationX: 0,
	        rotationY: 0,
	        scale: 1,
	        skewX: 0,
	        skewY: 0
	      }).progress(1),
	      bounds = element.getBoundingClientRect();
	    tween && tween.progress(0).kill();
	    return bounds;
	  },
	  _getSize = function _getSize(element, _ref3) {
	    var d2 = _ref3.d2;
	    return element["offset" + d2] || element["client" + d2] || 0;
	  },
	  _getLabelRatioArray = function _getLabelRatioArray(timeline) {
	    var a = [],
	      labels = timeline.labels,
	      duration = timeline.duration(),
	      p;
	    for (p in labels) {
	      a.push(labels[p] / duration);
	    }
	    return a;
	  },
	  _getClosestLabel = function _getClosestLabel(animation) {
	    return function (value) {
	      return gsap.utils.snap(_getLabelRatioArray(animation), value);
	    };
	  },
	  _snapDirectional = function _snapDirectional(snapIncrementOrArray) {
	    var snap = gsap.utils.snap(snapIncrementOrArray),
	      a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function (a, b) {
	        return a - b;
	      });
	    return a ? function (value, direction, threshold) {
	      if (threshold === void 0) {
	        threshold = 1e-3;
	      }
	      var i;
	      if (!direction) {
	        return snap(value);
	      }
	      if (direction > 0) {
	        value -= threshold; // to avoid rounding errors. If we're too strict, it might snap forward, then immediately again, and again.

	        for (i = 0; i < a.length; i++) {
	          if (a[i] >= value) {
	            return a[i];
	          }
	        }
	        return a[i - 1];
	      } else {
	        i = a.length;
	        value += threshold;
	        while (i--) {
	          if (a[i] <= value) {
	            return a[i];
	          }
	        }
	      }
	      return a[0];
	    } : function (value, direction, threshold) {
	      if (threshold === void 0) {
	        threshold = 1e-3;
	      }
	      var snapped = snap(value);
	      return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
	    };
	  },
	  _getLabelAtDirection = function _getLabelAtDirection(timeline) {
	    return function (value, st) {
	      return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
	    };
	  },
	  _multiListener = function _multiListener(func, element, types, callback) {
	    return types.split(",").forEach(function (type) {
	      return func(element, type, callback);
	    });
	  },
	  _addListener = function _addListener(element, type, func, nonPassive, capture) {
	    return element.addEventListener(type, func, {
	      passive: !nonPassive,
	      capture: !!capture
	    });
	  },
	  _removeListener = function _removeListener(element, type, func, capture) {
	    return element.removeEventListener(type, func, !!capture);
	  },
	  _wheelListener = function _wheelListener(func, el, scrollFunc) {
	    scrollFunc = scrollFunc && scrollFunc.wheelHandler;
	    if (scrollFunc) {
	      func(el, "wheel", scrollFunc);
	      func(el, "touchmove", scrollFunc);
	    }
	  },
	  _markerDefaults = {
	    startColor: "green",
	    endColor: "red",
	    indent: 0,
	    fontSize: "16px",
	    fontWeight: "normal"
	  },
	  _defaults = {
	    toggleActions: "play",
	    anticipatePin: 0
	  },
	  _keywords = {
	    top: 0,
	    left: 0,
	    center: 0.5,
	    bottom: 1,
	    right: 1
	  },
	  _offsetToPx = function _offsetToPx(value, size) {
	    if (_isString(value)) {
	      var eqIndex = value.indexOf("="),
	        relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
	      if (~eqIndex) {
	        value.indexOf("%") > eqIndex && (relative *= size / 100);
	        value = value.substr(0, eqIndex - 1);
	      }
	      value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
	    }
	    return value;
	  },
	  _createMarker = function _createMarker(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
	    var startColor = _ref4.startColor,
	      endColor = _ref4.endColor,
	      fontSize = _ref4.fontSize,
	      indent = _ref4.indent,
	      fontWeight = _ref4.fontWeight;
	    var e = _doc.createElement("div"),
	      useFixedPosition = _isViewport(container) || _getProxyProp(container, "pinType") === "fixed",
	      isScroller = type.indexOf("scroller") !== -1,
	      parent = useFixedPosition ? _body : container,
	      isStart = type.indexOf("start") !== -1,
	      color = isStart ? startColor : endColor,
	      css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
	    css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
	    (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
	    matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
	    e._isStart = isStart;
	    e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
	    e.style.cssText = css;
	    e.innerText = name || name === 0 ? type + "-" + name : type;
	    parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
	    e._offset = e["offset" + direction.op.d2];
	    _positionMarker(e, 0, direction, isStart);
	    return e;
	  },
	  _positionMarker = function _positionMarker(marker, start, direction, flipped) {
	    var vars = {
	        display: "block"
	      },
	      side = direction[flipped ? "os2" : "p2"],
	      oppositeSide = direction[flipped ? "p2" : "os2"];
	    marker._isFlipped = flipped;
	    vars[direction.a + "Percent"] = flipped ? -100 : 0;
	    vars[direction.a] = flipped ? "1px" : 0;
	    vars["border" + side + _Width] = 1;
	    vars["border" + oppositeSide + _Width] = 0;
	    vars[direction.p] = start + "px";
	    gsap.set(marker, vars);
	  },
	  _triggers = [],
	  _ids = {},
	  _rafID,
	  _sync = function _sync() {
	    return _getTime() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
	  },
	  _onScroll = function _onScroll() {
	    // previously, we tried to optimize performance by batching/deferring to the next requestAnimationFrame(), but discovered that Safari has a few bugs that make this unworkable (especially on iOS). See https://codepen.io/GreenSock/pen/16c435b12ef09c38125204818e7b45fc?editors=0010 and https://codepen.io/GreenSock/pen/JjOxYpQ/3dd65ccec5a60f1d862c355d84d14562?editors=0010 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503?editors=0010
	    if (!_normalizer || !_normalizer.isPressed || _normalizer.startX > _body.clientWidth) {
	      // if the user is dragging the scrollbar, allow it.
	      _scrollers.cache++;
	      if (_normalizer) {
	        _rafID || (_rafID = requestAnimationFrame(_updateAll));
	      } else {
	        _updateAll(); // Safari in particular (on desktop) NEEDS the immediate update rather than waiting for a requestAnimationFrame() whereas iOS seems to benefit from waiting for the requestAnimationFrame() tick, at least when normalizing. See https://codepen.io/GreenSock/pen/qBYozqO?editors=0110
	      }

	      _lastScrollTime || _dispatch("scrollStart");
	      _lastScrollTime = _getTime();
	    }
	  },
	  _setBaseDimensions = function _setBaseDimensions() {
	    _baseScreenWidth = _win.innerWidth;
	    _baseScreenHeight = _win.innerHeight;
	  },
	  _onResize = function _onResize(force) {
	    _scrollers.cache++;
	    (force === true || !_refreshing && !_ignoreResize && !_doc.fullscreenElement && !_doc.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win.innerWidth || Math.abs(_win.innerHeight - _baseScreenHeight) > _win.innerHeight * 0.25)) && _resizeDelay.restart(true);
	  },
	  // ignore resizes triggered by refresh()
	  _listeners = {},
	  _emptyArray = [],
	  _softRefresh = function _softRefresh() {
	    return _removeListener(ScrollTrigger, "scrollEnd", _softRefresh) || _refreshAll(true);
	  },
	  _dispatch = function _dispatch(type) {
	    return _listeners[type] && _listeners[type].map(function (f) {
	      return f();
	    }) || _emptyArray;
	  },
	  _savedStyles = [],
	  // when ScrollTrigger.saveStyles() is called, the inline styles are recorded in this Array in a sequential format like [element, cssText, gsCache, media]. This keeps it very memory-efficient and fast to iterate through.
	  _revertRecorded = function _revertRecorded(media) {
	    for (var i = 0; i < _savedStyles.length; i += 5) {
	      if (!media || _savedStyles[i + 4] && _savedStyles[i + 4].query === media) {
	        _savedStyles[i].style.cssText = _savedStyles[i + 1];
	        _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
	        _savedStyles[i + 3].uncache = 1;
	      }
	    }
	  },
	  _revertAll = function _revertAll(kill, media) {
	    var trigger;
	    for (_i = 0; _i < _triggers.length; _i++) {
	      trigger = _triggers[_i];
	      if (trigger && (!media || trigger._ctx === media)) {
	        if (kill) {
	          trigger.kill(1);
	        } else {
	          trigger.revert(true, true);
	        }
	      }
	    }
	    _isReverted = true;
	    media && _revertRecorded(media);
	    media || _dispatch("revert");
	  },
	  _clearScrollMemory = function _clearScrollMemory(scrollRestoration, force) {
	    // zero-out all the recorded scroll positions. Don't use _triggers because if, for example, .matchMedia() is used to create some ScrollTriggers and then the user resizes and it removes ALL ScrollTriggers, and then go back to a size where there are ScrollTriggers, it would have kept the position(s) saved from the initial state.
	    _scrollers.cache++;
	    (force || !_refreshingAll) && _scrollers.forEach(function (obj) {
	      return _isFunction(obj) && obj.cacheID++ && (obj.rec = 0);
	    });
	    _isString(scrollRestoration) && (_win.history.scrollRestoration = _scrollRestoration = scrollRestoration);
	  },
	  _refreshingAll,
	  _refreshID = 0,
	  _queueRefreshID,
	  _queueRefreshAll = function _queueRefreshAll() {
	    // we don't want to call _refreshAll() every time we create a new ScrollTrigger (for performance reasons) - it's better to batch them. Some frameworks dynamically load content and we can't rely on the window's "load" or "DOMContentLoaded" events to trigger it.
	    if (_queueRefreshID !== _refreshID) {
	      var id = _queueRefreshID = _refreshID;
	      requestAnimationFrame(function () {
	        return id === _refreshID && _refreshAll(true);
	      });
	    }
	  },
	  _refresh100vh = function _refresh100vh() {
	    _body.appendChild(_div100vh);
	    _100vh = !_normalizer && _div100vh.offsetHeight || _win.innerHeight;
	    _body.removeChild(_div100vh);
	  },
	  _hideAllMarkers = function _hideAllMarkers(hide) {
	    return _toArray(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function (el) {
	      return el.style.display = hide ? "none" : "block";
	    });
	  },
	  _refreshAll = function _refreshAll(force, skipRevert) {
	    _docEl = _doc.documentElement; // some frameworks like Astro may cache the <body> and replace it during routing, so we'll just re-record the _docEl and _body for safety (otherwise, the markers may not get added properly).

	    _body = _doc.body;
	    _root = [_win, _doc, _docEl, _body];
	    if (_lastScrollTime && !force && !_isReverted) {
	      _addListener(ScrollTrigger, "scrollEnd", _softRefresh);
	      return;
	    }
	    _refresh100vh();
	    _refreshingAll = ScrollTrigger.isRefreshing = true;
	    _scrollers.forEach(function (obj) {
	      return _isFunction(obj) && ++obj.cacheID && (obj.rec = obj());
	    }); // force the clearing of the cache because some browsers take a little while to dispatch the "scroll" event and the user may have changed the scroll position and then called ScrollTrigger.refresh() right away

	    var refreshInits = _dispatch("refreshInit");
	    _sort && ScrollTrigger.sort();
	    skipRevert || _revertAll();
	    _scrollers.forEach(function (obj) {
	      if (_isFunction(obj)) {
	        obj.smooth && (obj.target.style.scrollBehavior = "auto"); // smooth scrolling interferes

	        obj(0);
	      }
	    });
	    _triggers.slice(0).forEach(function (t) {
	      return t.refresh();
	    }); // don't loop with _i because during a refresh() someone could call ScrollTrigger.update() which would iterate through _i resulting in a skip.

	    _isReverted = false;
	    _triggers.forEach(function (t) {
	      // nested pins (pinnedContainer) with pinSpacing may expand the container, so we must accommodate that here.
	      if (t._subPinOffset && t.pin) {
	        var prop = t.vars.horizontal ? "offsetWidth" : "offsetHeight",
	          original = t.pin[prop];
	        t.revert(true, 1);
	        t.adjustPinSpacing(t.pin[prop] - original);
	        t.refresh();
	      }
	    });
	    _clampingMax = 1; // pinSpacing might be propping a page open, thus when we .setPositions() to clamp a ScrollTrigger's end we should leave the pinSpacing alone. That's what this flag is for.

	    _hideAllMarkers(true);
	    _triggers.forEach(function (t) {
	      // the scroller's max scroll position may change after all the ScrollTriggers refreshed (like pinning could push it down), so we need to loop back and correct any with end: "max". Same for anything with a clamped end
	      var max = _maxScroll(t.scroller, t._dir),
	        endClamp = t.vars.end === "max" || t._endClamp && t.end > max,
	        startClamp = t._startClamp && t.start >= max;
	      (endClamp || startClamp) && t.setPositions(startClamp ? max - 1 : t.start, endClamp ? Math.max(startClamp ? max : t.start + 1, max) : t.end, true);
	    });
	    _hideAllMarkers(false);
	    _clampingMax = 0;
	    refreshInits.forEach(function (result) {
	      return result && result.render && result.render(-1);
	    }); // if the onRefreshInit() returns an animation (typically a gsap.set()), revert it. This makes it easy to put things in a certain spot before refreshing for measurement purposes, and then put things back.

	    _scrollers.forEach(function (obj) {
	      if (_isFunction(obj)) {
	        obj.smooth && requestAnimationFrame(function () {
	          return obj.target.style.scrollBehavior = "smooth";
	        });
	        obj.rec && obj(obj.rec);
	      }
	    });
	    _clearScrollMemory(_scrollRestoration, 1);
	    _resizeDelay.pause();
	    _refreshID++;
	    _refreshingAll = 2;
	    _updateAll(2);
	    _triggers.forEach(function (t) {
	      return _isFunction(t.vars.onRefresh) && t.vars.onRefresh(t);
	    });
	    _refreshingAll = ScrollTrigger.isRefreshing = false;
	    _dispatch("refresh");
	  },
	  _lastScroll = 0,
	  _direction = 1,
	  _primary,
	  _updateAll = function _updateAll(force) {
	    if (force === 2 || !_refreshingAll && !_isReverted) {
	      // _isReverted could be true if, for example, a matchMedia() is in the process of executing. We don't want to update during the time everything is reverted.
	      ScrollTrigger.isUpdating = true;
	      _primary && _primary.update(0); // ScrollSmoother uses refreshPriority -9999 to become the primary that gets updated before all others because it affects the scroll position.

	      var l = _triggers.length,
	        time = _getTime(),
	        recordVelocity = time - _time1 >= 50,
	        scroll = l && _triggers[0].scroll();
	      _direction = _lastScroll > scroll ? -1 : 1;
	      _refreshingAll || (_lastScroll = scroll);
	      if (recordVelocity) {
	        if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
	          _lastScrollTime = 0;
	          _dispatch("scrollEnd");
	        }
	        _time2 = _time1;
	        _time1 = time;
	      }
	      if (_direction < 0) {
	        _i = l;
	        while (_i-- > 0) {
	          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
	        }
	        _direction = 1;
	      } else {
	        for (_i = 0; _i < l; _i++) {
	          _triggers[_i] && _triggers[_i].update(0, recordVelocity);
	        }
	      }
	      ScrollTrigger.isUpdating = false;
	    }
	    _rafID = 0;
	  },
	  _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
	  _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]),
	  _swapPinOut = function _swapPinOut(pin, spacer, state) {
	    _setState(state);
	    var cache = pin._gsap;
	    if (cache.spacerIsNative) {
	      _setState(cache.spacerState);
	    } else if (pin._gsap.swappedIn) {
	      var parent = spacer.parentNode;
	      if (parent) {
	        parent.insertBefore(pin, spacer);
	        parent.removeChild(spacer);
	      }
	    }
	    pin._gsap.swappedIn = false;
	  },
	  _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
	    if (!pin._gsap.swappedIn) {
	      var i = _propNamesToCopy.length,
	        spacerStyle = spacer.style,
	        pinStyle = pin.style,
	        p;
	      while (i--) {
	        p = _propNamesToCopy[i];
	        spacerStyle[p] = cs[p];
	      }
	      spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
	      cs.display === "inline" && (spacerStyle.display = "inline-block");
	      pinStyle[_bottom] = pinStyle[_right] = "auto";
	      spacerStyle.flexBasis = cs.flexBasis || "auto";
	      spacerStyle.overflow = "visible";
	      spacerStyle.boxSizing = "border-box";
	      spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
	      spacerStyle[_height] = _getSize(pin, _vertical) + _px;
	      spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
	      _setState(spacerState);
	      pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
	      pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
	      pinStyle[_padding] = cs[_padding];
	      if (pin.parentNode !== spacer) {
	        pin.parentNode.insertBefore(spacer, pin);
	        spacer.appendChild(pin);
	      }
	      pin._gsap.swappedIn = true;
	    }
	  },
	  _capsExp = /([A-Z])/g,
	  _setState = function _setState(state) {
	    if (state) {
	      var style = state.t.style,
	        l = state.length,
	        i = 0,
	        p,
	        value;
	      (state.t._gsap || gsap.core.getCache(state.t)).uncache = 1; // otherwise transforms may be off

	      for (; i < l; i += 2) {
	        value = state[i + 1];
	        p = state[i];
	        if (value) {
	          style[p] = value;
	        } else if (style[p]) {
	          style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
	        }
	      }
	    }
	  },
	  _getState = function _getState(element) {
	    // returns an Array with alternating values like [property, value, property, value] and a "t" property pointing to the target (element). Makes it fast and cheap.
	    var l = _stateProps.length,
	      style = element.style,
	      state = [],
	      i = 0;
	    for (; i < l; i++) {
	      state.push(_stateProps[i], style[_stateProps[i]]);
	    }
	    state.t = element;
	    return state;
	  },
	  _copyState = function _copyState(state, override, omitOffsets) {
	    var result = [],
	      l = state.length,
	      i = omitOffsets ? 8 : 0,
	      // skip top, left, right, bottom if omitOffsets is true
	      p;
	    for (; i < l; i += 2) {
	      p = state[i];
	      result.push(p, p in override ? override[p] : state[i + 1]);
	    }
	    result.t = state.t;
	    return result;
	  },
	  _winOffsets = {
	    left: 0,
	    top: 0
	  },
	  // // potential future feature (?) Allow users to calculate where a trigger hits (scroll position) like getScrollPosition("#id", "top bottom")
	  // _getScrollPosition = (trigger, position, {scroller, containerAnimation, horizontal}) => {
	  // 	scroller = _getTarget(scroller || _win);
	  // 	let direction = horizontal ? _horizontal : _vertical,
	  // 		isViewport = _isViewport(scroller);
	  // 	_getSizeFunc(scroller, isViewport, direction);
	  // 	return _parsePosition(position, _getTarget(trigger), _getSizeFunc(scroller, isViewport, direction)(), direction, _getScrollFunc(scroller, direction)(), 0, 0, 0, _getOffsetsFunc(scroller, isViewport)(), isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, 0, containerAnimation ? containerAnimation.duration() : _maxScroll(scroller), containerAnimation);
	  // },
	  _parsePosition = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
	    _isFunction(value) && (value = value(self));
	    if (_isString(value) && value.substr(0, 3) === "max") {
	      value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
	    }
	    var time = containerAnimation ? containerAnimation.time() : 0,
	      p1,
	      p2,
	      element;
	    containerAnimation && containerAnimation.seek(0);
	    isNaN(value) || (value = +value); // convert a string number like "45" to an actual number

	    if (!_isNumber(value)) {
	      _isFunction(trigger) && (trigger = trigger(self));
	      var offsets = (value || "0").split(" "),
	        bounds,
	        localOffset,
	        globalOffset,
	        display;
	      element = _getTarget(trigger, self) || _body;
	      bounds = _getBounds(element) || {};
	      if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
	        // if display is "none", it won't report getBoundingClientRect() properly
	        display = element.style.display;
	        element.style.display = "block";
	        bounds = _getBounds(element);
	        display ? element.style.display = display : element.style.removeProperty("display");
	      }
	      localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
	      globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
	      value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
	      markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
	      scrollerSize -= scrollerSize - globalOffset; // adjust for the marker
	    } else {
	      containerAnimation && (value = gsap.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
	      markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
	    }
	    if (clampZeroProp) {
	      self[clampZeroProp] = value || -0.001;
	      value < 0 && (value = 0);
	    }
	    if (marker) {
	      var position = value + scrollerSize,
	        isStart = marker._isStart;
	      p1 = "scroll" + direction.d2;
	      _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body[p1], _docEl[p1]) : marker.parentNode[p1]) <= position + 1);
	      if (useFixedPosition) {
	        scrollerBounds = _getBounds(markerScroller);
	        useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
	      }
	    }
	    if (containerAnimation && element) {
	      p1 = _getBounds(element);
	      containerAnimation.seek(scrollerMax);
	      p2 = _getBounds(element);
	      containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
	      value = value / containerAnimation._caScrollDist * scrollerMax;
	    }
	    containerAnimation && containerAnimation.seek(time);
	    return containerAnimation ? value : Math.round(value);
	  },
	  _prefixExp = /(webkit|moz|length|cssText|inset)/i,
	  _reparent = function _reparent(element, parent, top, left) {
	    if (element.parentNode !== parent) {
	      var style = element.style,
	        p,
	        cs;
	      if (parent === _body) {
	        element._stOrig = style.cssText; // record original inline styles so we can revert them later

	        cs = _getComputedStyle(element);
	        for (p in cs) {
	          // must copy all relevant styles to ensure that nothing changes visually when we reparent to the <body>. Skip the vendor prefixed ones.
	          if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
	            style[p] = cs[p];
	          }
	        }
	        style.top = top;
	        style.left = left;
	      } else {
	        style.cssText = element._stOrig;
	      }
	      gsap.core.getCache(element).uncache = 1;
	      parent.appendChild(element);
	    }
	  },
	  _interruptionTracker = function _interruptionTracker(getValueFunc, initialValue, onInterrupt) {
	    var last1 = initialValue,
	      last2 = last1;
	    return function (value) {
	      var current = Math.round(getValueFunc()); // round because in some [very uncommon] Windows environments, scroll can get reported with decimals even though it was set without.

	      if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
	        // if the user scrolls, kill the tween. iOS Safari intermittently misreports the scroll position, it may be the most recently-set one or the one before that! When Safari is zoomed (CMD-+), it often misreports as 1 pixel off too! So if we set the scroll position to 125, for example, it'll actually report it as 124.
	        value = current;
	        onInterrupt && onInterrupt();
	      }
	      last2 = last1;
	      last1 = Math.round(value);
	      return last1;
	    };
	  },
	  _shiftMarker = function _shiftMarker(marker, direction, value) {
	    var vars = {};
	    vars[direction.p] = "+=" + value;
	    gsap.set(marker, vars);
	  },
	  // _mergeAnimations = animations => {
	  // 	let tl = gsap.timeline({smoothChildTiming: true}).startTime(Math.min(...animations.map(a => a.globalTime(0))));
	  // 	animations.forEach(a => {let time = a.totalTime(); tl.add(a); a.totalTime(time); });
	  // 	tl.smoothChildTiming = false;
	  // 	return tl;
	  // },
	  // returns a function that can be used to tween the scroll position in the direction provided, and when doing so it'll add a .tween property to the FUNCTION itself, and remove it when the tween completes or gets killed. This gives us a way to have multiple ScrollTriggers use a central function for any given scroller and see if there's a scroll tween running (which would affect if/how things get updated)
	  _getTweenCreator = function _getTweenCreator(scroller, direction) {
	    var getScroll = _getScrollFunc(scroller, direction),
	      prop = "_scroll" + direction.p2,
	      // add a tweenable property to the scroller that's a getter/setter function, like _scrollTop or _scrollLeft. This way, if someone does gsap.killTweensOf(scroller) it'll kill the scroll tween.
	      getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
	        var tween = getTween.tween,
	          onComplete = vars.onComplete,
	          modifiers = {};
	        initialValue = initialValue || getScroll();
	        var checkForInterruption = _interruptionTracker(getScroll, initialValue, function () {
	          tween.kill();
	          getTween.tween = 0;
	        });
	        change2 = change1 && change2 || 0; // if change1 is 0, we set that to the difference and ignore change2. Otherwise, there would be a compound effect.

	        change1 = change1 || scrollTo - initialValue;
	        tween && tween.kill();
	        vars[prop] = scrollTo;
	        vars.inherit = false;
	        vars.modifiers = modifiers;
	        modifiers[prop] = function () {
	          return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
	        };
	        vars.onUpdate = function () {
	          _scrollers.cache++;
	          getTween.tween && _updateAll(); // if it was interrupted/killed, like in a context.revert(), don't force an updateAll()
	        };

	        vars.onComplete = function () {
	          getTween.tween = 0;
	          onComplete && onComplete.call(tween);
	        };
	        tween = getTween.tween = gsap.to(scroller, vars);
	        return tween;
	      };
	    scroller[prop] = getScroll;
	    getScroll.wheelHandler = function () {
	      return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
	    };
	    _addListener(scroller, "wheel", getScroll.wheelHandler); // Windows machines handle mousewheel scrolling in chunks (like "3 lines per scroll") meaning the typical strategy for cancelling the scroll isn't as sensitive. It's much more likely to match one of the previous 2 scroll event positions. So we kill any snapping as soon as there's a wheel event.

	    ScrollTrigger.isTouch && _addListener(scroller, "touchmove", getScroll.wheelHandler);
	    return getTween;
	  };
	var ScrollTrigger = /*#__PURE__*/function () {
	  function ScrollTrigger(vars, animation) {
	    _coreInitted || ScrollTrigger.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
	    _context(this);
	    this.init(vars, animation);
	  }
	  var _proto = ScrollTrigger.prototype;
	  _proto.init = function init(vars, animation) {
	    this.progress = this.start = 0;
	    this.vars && this.kill(true, true); // in case it's being initted again

	    if (!_enabled) {
	      this.update = this.refresh = this.kill = _passThrough;
	      return;
	    }
	    vars = _setDefaults(_isString(vars) || _isNumber(vars) || vars.nodeType ? {
	      trigger: vars
	    } : vars, _defaults);
	    var _vars = vars,
	      onUpdate = _vars.onUpdate,
	      toggleClass = _vars.toggleClass,
	      id = _vars.id,
	      onToggle = _vars.onToggle,
	      onRefresh = _vars.onRefresh,
	      scrub = _vars.scrub,
	      trigger = _vars.trigger,
	      pin = _vars.pin,
	      pinSpacing = _vars.pinSpacing,
	      invalidateOnRefresh = _vars.invalidateOnRefresh,
	      anticipatePin = _vars.anticipatePin,
	      onScrubComplete = _vars.onScrubComplete,
	      onSnapComplete = _vars.onSnapComplete,
	      once = _vars.once,
	      snap = _vars.snap,
	      pinReparent = _vars.pinReparent,
	      pinSpacer = _vars.pinSpacer,
	      containerAnimation = _vars.containerAnimation,
	      fastScrollEnd = _vars.fastScrollEnd,
	      preventOverlaps = _vars.preventOverlaps,
	      direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical,
	      isToggle = !scrub && scrub !== 0,
	      scroller = _getTarget(vars.scroller || _win),
	      scrollerCache = gsap.core.getCache(scroller),
	      isViewport = _isViewport(scroller),
	      useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed",
	      callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack],
	      toggleActions = isToggle && vars.toggleActions.split(" "),
	      markers = "markers" in vars ? vars.markers : _defaults.markers,
	      borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0,
	      self = this,
	      onRefreshInit = vars.onRefreshInit && function () {
	        return vars.onRefreshInit(self);
	      },
	      getScrollerSize = _getSizeFunc(scroller, isViewport, direction),
	      getScrollerOffsets = _getOffsetsFunc(scroller, isViewport),
	      lastSnap = 0,
	      lastRefresh = 0,
	      prevProgress = 0,
	      scrollFunc = _getScrollFunc(scroller, direction),
	      tweenTo,
	      pinCache,
	      snapFunc,
	      scroll1,
	      scroll2,
	      start,
	      end,
	      markerStart,
	      markerEnd,
	      markerStartTrigger,
	      markerEndTrigger,
	      markerVars,
	      executingOnRefresh,
	      change,
	      pinOriginalState,
	      pinActiveState,
	      pinState,
	      spacer,
	      offset,
	      pinGetter,
	      pinSetter,
	      pinStart,
	      pinChange,
	      spacingStart,
	      spacerState,
	      markerStartSetter,
	      pinMoves,
	      markerEndSetter,
	      cs,
	      snap1,
	      snap2,
	      scrubTween,
	      scrubSmooth,
	      snapDurClamp,
	      snapDelayedCall,
	      prevScroll,
	      prevAnimProgress,
	      caMarkerSetter,
	      customRevertReturn; // for the sake of efficiency, _startClamp/_endClamp serve like a truthy value indicating that clamping was enabled on the start/end, and ALSO store the actual pre-clamped numeric value. We tap into that in ScrollSmoother for speed effects. So for example, if start="clamp(top bottom)" results in a start of -100 naturally, it would get clamped to 0 but -100 would be stored in _startClamp.

	    self._startClamp = self._endClamp = false;
	    self._dir = direction;
	    anticipatePin *= 45;
	    self.scroller = scroller;
	    self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
	    scroll1 = scrollFunc();
	    self.vars = vars;
	    animation = animation || vars.animation;
	    if ("refreshPriority" in vars) {
	      _sort = 1;
	      vars.refreshPriority === -9999 && (_primary = self); // used by ScrollSmoother
	    }

	    scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
	      top: _getTweenCreator(scroller, _vertical),
	      left: _getTweenCreator(scroller, _horizontal)
	    };
	    self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
	    self.scrubDuration = function (value) {
	      scrubSmooth = _isNumber(value) && value;
	      if (!scrubSmooth) {
	        scrubTween && scrubTween.progress(1).kill();
	        scrubTween = 0;
	      } else {
	        scrubTween ? scrubTween.duration(value) : scrubTween = gsap.to(animation, {
	          ease: "expo",
	          totalProgress: "+=0",
	          inherit: false,
	          duration: scrubSmooth,
	          paused: true,
	          onComplete: function onComplete() {
	            return onScrubComplete && onScrubComplete(self);
	          }
	        });
	      }
	    };
	    if (animation) {
	      animation.vars.lazy = false;
	      animation._initted && !self.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true); // special case: if this ScrollTrigger gets re-initted, a from() tween with a stagger could get initted initially and then reverted on the re-init which means it'll need to get rendered again here to properly display things. Otherwise, See https://gsap.com/forums/topic/36777-scrollsmoother-splittext-nextjs/ and https://codepen.io/GreenSock/pen/eYPyPpd?editors=0010

	      self.animation = animation.pause();
	      animation.scrollTrigger = self;
	      self.scrubDuration(scrub);
	      snap1 = 0;
	      id || (id = animation.vars.id);
	    }
	    if (snap) {
	      // TODO: potential idea: use legitimate CSS scroll snapping by pushing invisible elements into the DOM that serve as snap positions, and toggle the document.scrollingElement.style.scrollSnapType onToggle. See https://codepen.io/GreenSock/pen/JjLrgWM for a quick proof of concept.
	      if (!_isObject(snap) || snap.push) {
	        snap = {
	          snapTo: snap
	        };
	      }
	      "scrollBehavior" in _body.style && gsap.set(isViewport ? [_body, _docEl] : scroller, {
	        scrollBehavior: "auto"
	      }); // smooth scrolling doesn't work with snap.

	      _scrollers.forEach(function (o) {
	        return _isFunction(o) && o.target === (isViewport ? _doc.scrollingElement || _docEl : scroller) && (o.smooth = false);
	      }); // note: set smooth to false on both the vertical and horizontal scroll getters/setters

	      snapFunc = _isFunction(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getClosestLabel(animation) : snap.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap.directional !== false ? function (value, st) {
	        return _snapDirectional(snap.snapTo)(value, _getTime() - lastRefresh < 500 ? 0 : st.direction);
	      } : gsap.utils.snap(snap.snapTo);
	      snapDurClamp = snap.duration || {
	        min: 0.1,
	        max: 2
	      };
	      snapDurClamp = _isObject(snapDurClamp) ? _clamp(snapDurClamp.min, snapDurClamp.max) : _clamp(snapDurClamp, snapDurClamp);
	      snapDelayedCall = gsap.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function () {
	        var scroll = scrollFunc(),
	          refreshedRecently = _getTime() - lastRefresh < 500,
	          tween = tweenTo.tween;
	        if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
	          var progress = (scroll - start) / change,
	            totalProgress = animation && !isToggle ? animation.totalProgress() : progress,
	            velocity = refreshedRecently ? 0 : (totalProgress - snap2) / (_getTime() - _time2) * 1000 || 0,
	            change1 = gsap.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185),
	            naturalEnd = progress + (snap.inertia === false ? 0 : change1),
	            endValue,
	            endScroll,
	            _snap = snap,
	            onStart = _snap.onStart,
	            _onInterrupt = _snap.onInterrupt,
	            _onComplete = _snap.onComplete;
	          endValue = snapFunc(naturalEnd, self);
	          _isNumber(endValue) || (endValue = naturalEnd); // in case the function didn't return a number, fall back to using the naturalEnd

	          endScroll = Math.max(0, Math.round(start + endValue * change));
	          if (scroll <= end && scroll >= start && endScroll !== scroll) {
	            if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
	              // there's an overlapping snap! So we must figure out which one is closer and let that tween live.
	              return;
	            }
	            if (snap.inertia === false) {
	              change1 = endValue - progress;
	            }
	            tweenTo(endScroll, {
	              duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
	              ease: snap.ease || "power3",
	              data: _abs(endScroll - scroll),
	              // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
	              onInterrupt: function onInterrupt() {
	                return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
	              },
	              onComplete: function onComplete() {
	                self.update();
	                lastSnap = scrollFunc();
	                if (animation && !isToggle) {
	                  // the resolution of the scrollbar is limited, so we should correct the scrubbed animation's playhead at the end to match EXACTLY where it was supposed to snap
	                  scrubTween ? scrubTween.resetTo("totalProgress", endValue, animation._tTime / animation._tDur) : animation.progress(endValue);
	                }
	                snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
	                onSnapComplete && onSnapComplete(self);
	                _onComplete && _onComplete(self);
	              }
	            }, scroll, change1 * change, endScroll - scroll - change1 * change);
	            onStart && onStart(self, tweenTo.tween);
	          }
	        } else if (self.isActive && lastSnap !== scroll) {
	          snapDelayedCall.restart(true);
	        }
	      }).pause();
	    }
	    id && (_ids[id] = self);
	    trigger = self.trigger = _getTarget(trigger || pin !== true && pin); // if a trigger has some kind of scroll-related effect applied that could contaminate the "y" or "x" position (like a ScrollSmoother effect), we needed a way to temporarily revert it, so we use the stRevert property of the gsCache. It can return another function that we'll call at the end so it can return to its normal state.

	    customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
	    customRevertReturn && (customRevertReturn = customRevertReturn(self));
	    pin = pin === true ? trigger : _getTarget(pin);
	    _isString(toggleClass) && (toggleClass = {
	      targets: trigger,
	      className: toggleClass
	    });
	    if (pin) {
	      pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding); // if the parent is display: flex, don't apply pinSpacing by default. We should check that pin.parentNode is an element (not shadow dom window)

	      self.pin = pin;
	      pinCache = gsap.core.getCache(pin);
	      if (!pinCache.spacer) {
	        // record the spacer and pinOriginalState on the cache in case someone tries pinning the same element with MULTIPLE ScrollTriggers - we don't want to have multiple spacers or record the "original" pin state after it has already been affected by another ScrollTrigger.
	        if (pinSpacer) {
	          pinSpacer = _getTarget(pinSpacer);
	          pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement); // for React & Angular

	          pinCache.spacerIsNative = !!pinSpacer;
	          pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
	        }
	        pinCache.spacer = spacer = pinSpacer || _doc.createElement("div");
	        spacer.classList.add("pin-spacer");
	        id && spacer.classList.add("pin-spacer-" + id);
	        pinCache.pinState = pinOriginalState = _getState(pin);
	      } else {
	        pinOriginalState = pinCache.pinState;
	      }
	      vars.force3D !== false && gsap.set(pin, {
	        force3D: true
	      });
	      self.spacer = spacer = pinCache.spacer;
	      cs = _getComputedStyle(pin);
	      spacingStart = cs[pinSpacing + direction.os2];
	      pinGetter = gsap.getProperty(pin);
	      pinSetter = gsap.quickSetter(pin, direction.a, _px); // pin.firstChild && !_maxScroll(pin, direction) && (pin.style.overflow = "hidden"); // protects from collapsing margins, but can have unintended consequences as demonstrated here: https://codepen.io/GreenSock/pen/1e42c7a73bfa409d2cf1e184e7a4248d so it was removed in favor of just telling people to set up their CSS to avoid the collapsing margins (overflow: hidden | auto is just one option. Another is border-top: 1px solid transparent).

	      _swapPinIn(pin, spacer, cs);
	      pinState = _getState(pin);
	    }
	    if (markers) {
	      markerVars = _isObject(markers) ? _setDefaults(markers, _markerDefaults) : _markerDefaults;
	      markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
	      markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
	      offset = markerStartTrigger["offset" + direction.op.d2];
	      var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
	      markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
	      markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
	      containerAnimation && (caMarkerSetter = gsap.quickSetter([markerStart, markerEnd], direction.a, _px));
	      if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
	        _makePositionable(isViewport ? _body : scroller);
	        gsap.set([markerStartTrigger, markerEndTrigger], {
	          force3D: true
	        });
	        markerStartSetter = gsap.quickSetter(markerStartTrigger, direction.a, _px);
	        markerEndSetter = gsap.quickSetter(markerEndTrigger, direction.a, _px);
	      }
	    }
	    if (containerAnimation) {
	      var oldOnUpdate = containerAnimation.vars.onUpdate,
	        oldParams = containerAnimation.vars.onUpdateParams;
	      containerAnimation.eventCallback("onUpdate", function () {
	        self.update(0, 0, 1);
	        oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
	      });
	    }
	    self.previous = function () {
	      return _triggers[_triggers.indexOf(self) - 1];
	    };
	    self.next = function () {
	      return _triggers[_triggers.indexOf(self) + 1];
	    };
	    self.revert = function (revert, temp) {
	      if (!temp) {
	        return self.kill(true);
	      } // for compatibility with gsap.context() and gsap.matchMedia() which call revert()

	      var r = revert !== false || !self.enabled,
	        prevRefreshing = _refreshing;
	      if (r !== self.isReverted) {
	        if (r) {
	          prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0); // record the scroll so we can revert later (repositioning/pinning things can affect scroll position). In the static refresh() method, we first record all the scroll positions as a reference.

	          prevProgress = self.progress;
	          prevAnimProgress = animation && animation.progress();
	        }
	        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
	          return m.style.display = r ? "none" : "block";
	        });
	        if (r) {
	          _refreshing = self;
	          self.update(r); // make sure the pin is back in its original position so that all the measurements are correct. do this BEFORE swapping the pin out
	        }

	        if (pin && (!pinReparent || !self.isActive)) {
	          if (r) {
	            _swapPinOut(pin, spacer, pinOriginalState);
	          } else {
	            _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
	          }
	        }
	        r || self.update(r); // when we're restoring, the update should run AFTER swapping the pin into its pin-spacer.

	        _refreshing = prevRefreshing; // restore. We set it to true during the update() so that things fire properly in there.

	        self.isReverted = r;
	      }
	    };
	    self.refresh = function (soft, force, position, pinOffset) {
	      // position is typically only defined if it's coming from setPositions() - it's a way to skip the normal parsing. pinOffset is also only from setPositions() and is mostly related to fancy stuff we need to do in ScrollSmoother with effects
	      if ((_refreshing || !self.enabled) && !force) {
	        return;
	      }
	      if (pin && soft && _lastScrollTime) {
	        _addListener(ScrollTrigger, "scrollEnd", _softRefresh);
	        return;
	      }
	      !_refreshingAll && onRefreshInit && onRefreshInit(self);
	      _refreshing = self;
	      if (tweenTo.tween && !position) {
	        // we skip this if a position is passed in because typically that's from .setPositions() and it's best to allow in-progress snapping to continue.
	        tweenTo.tween.kill();
	        tweenTo.tween = 0;
	      }
	      scrubTween && scrubTween.pause();
	      invalidateOnRefresh && animation && animation.revert({
	        kill: false
	      }).invalidate();
	      self.isReverted || self.revert(true, true);
	      self._subPinOffset = false; // we'll set this to true in the sub-pins if we find any

	      var size = getScrollerSize(),
	        scrollerBounds = getScrollerOffsets(),
	        max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction),
	        isFirstRefresh = change <= 0.01,
	        offset = 0,
	        otherPinOffset = pinOffset || 0,
	        parsedEnd = _isObject(position) ? position.end : vars.end,
	        parsedEndTrigger = vars.endTrigger || trigger,
	        parsedStart = _isObject(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"),
	        pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self),
	        triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0,
	        i = triggerIndex,
	        cs,
	        bounds,
	        scroll,
	        isVertical,
	        override,
	        curTrigger,
	        curPin,
	        oppositeScroll,
	        initted,
	        revertedPins,
	        forcedOverflow,
	        markerStartOffset,
	        markerEndOffset;
	      if (markers && _isObject(position)) {
	        // if we alter the start/end positions with .setPositions(), it generally feeds in absolute NUMBERS which don't convey information about where to line up the markers, so to keep it intuitive, we record how far the trigger positions shift after applying the new numbers and then offset by that much in the opposite direction. We do the same to the associated trigger markers too of course.
	        markerStartOffset = gsap.getProperty(markerStartTrigger, direction.p);
	        markerEndOffset = gsap.getProperty(markerEndTrigger, direction.p);
	      }
	      while (i-- > 0) {
	        // user might try to pin the same element more than once, so we must find any prior triggers with the same pin, revert them, and determine how long they're pinning so that we can offset things appropriately. Make sure we revert from last to first so that things "rewind" properly.
	        curTrigger = _triggers[i];
	        curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self); // if it's a timeline-based trigger that hasn't been fully initialized yet because it's waiting for 1 tick, just force the refresh() here, otherwise if it contains a pin that's supposed to affect other ScrollTriggers further down the page, they won't be adjusted properly.

	        curPin = curTrigger.pin;
	        if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
	          revertedPins || (revertedPins = []);
	          revertedPins.unshift(curTrigger); // we'll revert from first to last to make sure things reach their end state properly

	          curTrigger.revert(true, true);
	        }
	        if (curTrigger !== _triggers[i]) {
	          // in case it got removed.
	          triggerIndex--;
	          i--;
	        }
	      }
	      _isFunction(parsedStart) && (parsedStart = parsedStart(self));
	      parsedStart = _parseClamp(parsedStart, "start", self);
	      start = _parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._startClamp && "_startClamp") || (pin ? -0.001 : 0);
	      _isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));
	      if (_isString(parsedEnd) && !parsedEnd.indexOf("+=")) {
	        if (~parsedEnd.indexOf(" ")) {
	          parsedEnd = (_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
	        } else {
	          offset = _offsetToPx(parsedEnd.substr(2), size);
	          parsedEnd = _isString(parsedStart) ? parsedStart : (containerAnimation ? gsap.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset; // _parsePosition won't factor in the offset if the start is a number, so do it here.

	          parsedEndTrigger = trigger;
	        }
	      }
	      parsedEnd = _parseClamp(parsedEnd, "end", self);
	      end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._endClamp && "_endClamp")) || -0.001;
	      offset = 0;
	      i = triggerIndex;
	      while (i--) {
	        curTrigger = _triggers[i];
	        curPin = curTrigger.pin;
	        if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
	          cs = curTrigger.end - (self._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);
	          if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) {
	            // numeric start values shouldn't be offset at all - treat them as absolute
	            offset += cs * (1 - curTrigger.progress);
	          }
	          curPin === pin && (otherPinOffset += cs);
	        }
	      }
	      start += offset;
	      end += offset;
	      self._startClamp && (self._startClamp += offset);
	      if (self._endClamp && !_refreshingAll) {
	        self._endClamp = end || -0.001;
	        end = Math.min(end, _maxScroll(scroller, direction));
	      }
	      change = end - start || (start -= 0.01) && 0.001;
	      if (isFirstRefresh) {
	        // on the very first refresh(), the prevProgress couldn't have been accurate yet because the start/end were never calculated, so we set it here. Before 3.11.5, it could lead to an inaccurate scroll position restoration with snapping.
	        prevProgress = gsap.utils.clamp(0, 1, gsap.utils.normalize(start, end, prevScroll));
	      }
	      self._pinPush = otherPinOffset;
	      if (markerStart && offset) {
	        // offset the markers if necessary
	        cs = {};
	        cs[direction.a] = "+=" + offset;
	        pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
	        gsap.set([markerStart, markerEnd], cs);
	      }
	      if (pin && !(_clampingMax && self.end >= _maxScroll(scroller, direction))) {
	        cs = _getComputedStyle(pin);
	        isVertical = direction === _vertical;
	        scroll = scrollFunc(); // recalculate because the triggers can affect the scroll

	        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
	        if (!max && end > 1) {
	          // makes sure the scroller has a scrollbar, otherwise if something has width: 100%, for example, it would be too big (exclude the scrollbar). See https://gsap.com/forums/topic/25182-scrolltrigger-width-of-page-increase-where-markers-are-set-to-false/
	          forcedOverflow = (isViewport ? _doc.scrollingElement || _docEl : scroller).style;
	          forcedOverflow = {
	            style: forcedOverflow,
	            value: forcedOverflow["overflow" + direction.a.toUpperCase()]
	          };
	          if (isViewport && _getComputedStyle(_body)["overflow" + direction.a.toUpperCase()] !== "scroll") {
	            // avoid an extra scrollbar if BOTH <html> and <body> have overflow set to "scroll"
	            forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
	          }
	        }
	        _swapPinIn(pin, spacer, cs);
	        pinState = _getState(pin); // transforms will interfere with the top/left/right/bottom placement, so remove them temporarily. getBoundingClientRect() factors in transforms.

	        bounds = _getBounds(pin, true);
	        oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
	        if (pinSpacing) {
	          spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
	          spacerState.t = spacer;
	          i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
	          if (i) {
	            spacerState.push(direction.d, i + _px); // for box-sizing: border-box (must include padding).

	            spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
	          }
	          _setState(spacerState);
	          if (pinnedContainer) {
	            // in ScrollTrigger.refresh(), we need to re-evaluate the pinContainer's size because this pinSpacing may stretch it out, but we can't just add the exact distance because depending on layout, it may not push things down or it may only do so partially.
	            _triggers.forEach(function (t) {
	              if (t.pin === pinnedContainer && t.vars.pinSpacing !== false) {
	                t._subPinOffset = true;
	              }
	            });
	          }
	          useFixedPosition && scrollFunc(prevScroll);
	        } else {
	          i = _getSize(pin, direction);
	          i && spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i + _px);
	        }
	        if (useFixedPosition) {
	          override = {
	            top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
	            left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
	            boxSizing: "border-box",
	            position: "fixed"
	          };
	          override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
	          override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
	          override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
	          override[_padding] = cs[_padding];
	          override[_padding + _Top] = cs[_padding + _Top];
	          override[_padding + _Right] = cs[_padding + _Right];
	          override[_padding + _Bottom] = cs[_padding + _Bottom];
	          override[_padding + _Left] = cs[_padding + _Left];
	          pinActiveState = _copyState(pinOriginalState, override, pinReparent);
	          _refreshingAll && scrollFunc(0);
	        }
	        if (animation) {
	          // the animation might be affecting the transform, so we must jump to the end, check the value, and compensate accordingly. Otherwise, when it becomes unpinned, the pinSetter() will get set to a value that doesn't include whatever the animation did.
	          initted = animation._initted; // if not, we must invalidate() after this step, otherwise it could lock in starting values prematurely.

	          _suppressOverwrites(1);
	          animation.render(animation.duration(), true, true);
	          pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
	          pinMoves = Math.abs(change - pinChange) > 1;
	          useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2); // transform is the last property/value set in the state Array. Since the animation is controlling that, we should omit it.

	          animation.render(0, true, true);
	          initted || animation.invalidate(true);
	          animation.parent || animation.totalTime(animation.totalTime()); // if, for example, a toggleAction called play() and then refresh() happens and when we render(1) above, it would cause the animation to complete and get removed from its parent, so this makes sure it gets put back in.

	          _suppressOverwrites(0);
	        } else {
	          pinChange = change;
	        }
	        forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
	      } else if (trigger && scrollFunc() && !containerAnimation) {
	        // it may be INSIDE a pinned element, so walk up the tree and look for any elements with _pinOffset to compensate because anything with pinSpacing that's already scrolled would throw off the measurements in getBoundingClientRect()
	        bounds = trigger.parentNode;
	        while (bounds && bounds !== _body) {
	          if (bounds._pinOffset) {
	            start -= bounds._pinOffset;
	            end -= bounds._pinOffset;
	          }
	          bounds = bounds.parentNode;
	        }
	      }
	      revertedPins && revertedPins.forEach(function (t) {
	        return t.revert(false, true);
	      });
	      self.start = start;
	      self.end = end;
	      scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc(); // reset velocity

	      if (!containerAnimation && !_refreshingAll) {
	        scroll1 < prevScroll && scrollFunc(prevScroll);
	        self.scroll.rec = 0;
	      }
	      self.revert(false, true);
	      lastRefresh = _getTime();
	      if (snapDelayedCall) {
	        lastSnap = -1; // just so snapping gets re-enabled, clear out any recorded last value
	        // self.isActive && scrollFunc(start + change * prevProgress); // previously this line was here to ensure that when snapping kicks in, it's from the previous progress but in some cases that's not desirable, like an all-page ScrollTrigger when new content gets added to the page, that'd totally change the progress.

	        snapDelayedCall.restart(true);
	      }
	      _refreshing = 0;
	      animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true); // must force a re-render because if saveStyles() was used on the target(s), the styles could have been wiped out during the refresh().

	      if (isFirstRefresh || prevProgress !== self.progress || containerAnimation || invalidateOnRefresh || animation && !animation._initted) {
	        // ensures that the direction is set properly (when refreshing, progress is set back to 0 initially, then back again to wherever it needs to be) and that callbacks are triggered.
	        animation && !isToggle && animation.totalProgress(containerAnimation && start < -0.001 && !prevProgress ? gsap.utils.normalize(start, end, 0) : prevProgress, true); // to avoid issues where animation callbacks like onStart aren't triggered.

	        self.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
	      }
	      pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
	      scrubTween && scrubTween.invalidate();
	      if (!isNaN(markerStartOffset)) {
	        // numbers were passed in for the position which are absolute, so instead of just putting the markers at the very bottom of the viewport, we figure out how far they shifted down (it's safe to assume they were originally positioned in closer relation to the trigger element with values like "top", "center", a percentage or whatever, so we offset that much in the opposite direction to basically revert them to the relative position thy were at previously.
	        markerStartOffset -= gsap.getProperty(markerStartTrigger, direction.p);
	        markerEndOffset -= gsap.getProperty(markerEndTrigger, direction.p);
	        _shiftMarker(markerStartTrigger, direction, markerStartOffset);
	        _shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));
	        _shiftMarker(markerEndTrigger, direction, markerEndOffset);
	        _shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
	      }
	      isFirstRefresh && !_refreshingAll && self.update(); // edge case - when you reload a page when it's already scrolled down, some browsers fire a "scroll" event before DOMContentLoaded, triggering an updateAll(). If we don't update the self.progress as part of refresh(), then when it happens next, it may record prevProgress as 0 when it really shouldn't, potentially causing a callback in an animation to fire again.

	      if (onRefresh && !_refreshingAll && !executingOnRefresh) {
	        // when refreshing all, we do extra work to correct pinnedContainer sizes and ensure things don't exceed the maxScroll, so we should do all the refreshes at the end after all that work so that the start/end values are corrected.
	        executingOnRefresh = true;
	        onRefresh(self);
	        executingOnRefresh = false;
	      }
	    };
	    self.getVelocity = function () {
	      return (scrollFunc() - scroll2) / (_getTime() - _time2) * 1000 || 0;
	    };
	    self.endAnimation = function () {
	      _endAnimation(self.callbackAnimation);
	      if (animation) {
	        scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
	      }
	    };
	    self.labelToScroll = function (label) {
	      return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
	    };
	    self.getTrailing = function (name) {
	      var i = _triggers.indexOf(self),
	        a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);
	      return (_isString(name) ? a.filter(function (t) {
	        return t.vars.preventOverlaps === name;
	      }) : a).filter(function (t) {
	        return self.direction > 0 ? t.end <= start : t.start >= end;
	      });
	    };
	    self.update = function (reset, recordVelocity, forceFake) {
	      if (containerAnimation && !forceFake && !reset) {
	        return;
	      }
	      var scroll = _refreshingAll === true ? prevScroll : self.scroll(),
	        p = reset ? 0 : (scroll - start) / change,
	        clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0,
	        prevProgress = self.progress,
	        isActive,
	        wasActive,
	        toggleState,
	        action,
	        stateChanged,
	        toggled,
	        isAtMax,
	        isTakingAction;
	      if (recordVelocity) {
	        scroll2 = scroll1;
	        scroll1 = containerAnimation ? scrollFunc() : scroll;
	        if (snap) {
	          snap2 = snap1;
	          snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
	        }
	      } // anticipate the pinning a few ticks ahead of time based on velocity to avoid a visual glitch due to the fact that most browsers do scrolling on a separate thread (not synced with requestAnimationFrame).

	      if (anticipatePin && pin && !_refreshing && !_startup && _lastScrollTime) {
	        if (!clipped && start < scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin) {
	          clipped = 0.0001;
	        } else if (clipped === 1 && end > scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin) {
	          clipped = 0.9999;
	        }
	      }
	      if (clipped !== prevProgress && self.enabled) {
	        isActive = self.isActive = !!clipped && clipped < 1;
	        wasActive = !!prevProgress && prevProgress < 1;
	        toggled = isActive !== wasActive;
	        stateChanged = toggled || !!clipped !== !!prevProgress; // could go from start all the way to end, thus it didn't toggle but it did change state in a sense (may need to fire a callback)

	        self.direction = clipped > prevProgress ? 1 : -1;
	        self.progress = clipped;
	        if (stateChanged && !_refreshing) {
	          toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3; // 0 = enter, 1 = leave, 2 = enterBack, 3 = leaveBack (we prioritize the FIRST encounter, thus if you scroll really fast past the onEnter and onLeave in one tick, it'd prioritize onEnter.

	          if (isToggle) {
	            action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState]; // if it didn't toggle, that means it shot right past and since we prioritize the "enter" action, we should switch to the "leave" in this case (but only if one is defined)

	            isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
	          }
	        }
	        preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function (t) {
	          return t.endAnimation();
	        }));
	        if (!isToggle) {
	          if (scrubTween && !_refreshing && !_startup) {
	            scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start); // if there's a scrub on both the container animation and this one (or a ScrollSmoother), the update order would cause this one not to have rendered yet, so it wouldn't make any progress before we .restart() it heading toward the new progress so it'd appear stuck thus we force a render here.

	            if (scrubTween.resetTo) {
	              scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
	            } else {
	              // legacy support (courtesy), before 3.10.0
	              scrubTween.vars.totalProgress = clipped;
	              scrubTween.invalidate().restart();
	            }
	          } else if (animation) {
	            animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
	          }
	        }
	        if (pin) {
	          reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
	          if (!useFixedPosition) {
	            pinSetter(_round(pinStart + pinChange * clipped));
	          } else if (stateChanged) {
	            isAtMax = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction); // if it's at the VERY end of the page, don't switch away from position: fixed because it's pointless and it could cause a brief flash when the user scrolls back up (when it gets pinned again)

	            if (pinReparent) {
	              if (!reset && (isActive || isAtMax)) {
	                var bounds = _getBounds(pin, true),
	                  _offset = scroll - start;
	                _reparent(pin, _body, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
	              } else {
	                _reparent(pin, spacer);
	              }
	            }
	            _setState(isActive || isAtMax ? pinActiveState : pinState);
	            pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
	          }
	        }
	        snap && !tweenTo.tween && !_refreshing && !_startup && snapDelayedCall.restart(true);
	        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function (el) {
	          return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
	        }); // classes could affect positioning, so do it even if reset or refreshing is true.

	        onUpdate && !isToggle && !reset && onUpdate(self);
	        if (stateChanged && !_refreshing) {
	          if (isToggle) {
	            if (isTakingAction) {
	              if (action === "complete") {
	                animation.pause().totalProgress(1);
	              } else if (action === "reset") {
	                animation.restart(true).pause();
	              } else if (action === "restart") {
	                animation.restart(true);
	              } else {
	                animation[action]();
	              }
	            }
	            onUpdate && onUpdate(self);
	          }
	          if (toggled || !_limitCallbacks) {
	            // on startup, the page could be scrolled and we don't want to fire callbacks that didn't toggle. For example onEnter shouldn't fire if the ScrollTrigger isn't actually entered.
	            onToggle && toggled && _callback(self, onToggle);
	            callbacks[toggleState] && _callback(self, callbacks[toggleState]);
	            once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0); // a callback shouldn't be called again if once is true.

	            if (!toggled) {
	              // it's possible to go completely past, like from before the start to after the end (or vice-versa) in which case BOTH callbacks should be fired in that order
	              toggleState = clipped === 1 ? 1 : 3;
	              callbacks[toggleState] && _callback(self, callbacks[toggleState]);
	            }
	          }
	          if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber(fastScrollEnd) ? fastScrollEnd : 2500)) {
	            _endAnimation(self.callbackAnimation);
	            scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
	          }
	        } else if (isToggle && onUpdate && !_refreshing) {
	          onUpdate(self);
	        }
	      } // update absolutely-positioned markers (only if the scroller isn't the viewport)

	      if (markerEndSetter) {
	        var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
	        markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
	        markerEndSetter(n);
	      }
	      caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
	    };
	    self.enable = function (reset, refresh) {
	      if (!self.enabled) {
	        self.enabled = true;
	        _addListener(scroller, "resize", _onResize);
	        isViewport || _addListener(scroller, "scroll", _onScroll);
	        onRefreshInit && _addListener(ScrollTrigger, "refreshInit", onRefreshInit);
	        if (reset !== false) {
	          self.progress = prevProgress = 0;
	          scroll1 = scroll2 = lastSnap = scrollFunc();
	        }
	        refresh !== false && self.refresh();
	      }
	    };
	    self.getTween = function (snap) {
	      return snap && tweenTo ? tweenTo.tween : scrubTween;
	    };
	    self.setPositions = function (newStart, newEnd, keepClamp, pinOffset) {
	      // doesn't persist after refresh()! Intended to be a way to override values that were set during refresh(), like you could set it in onRefresh()
	      if (containerAnimation) {
	        // convert ratios into scroll positions. Remember, start/end values on ScrollTriggers that have a containerAnimation refer to the time (in seconds), NOT scroll positions.
	        var st = containerAnimation.scrollTrigger,
	          duration = containerAnimation.duration(),
	          _change = st.end - st.start;
	        newStart = st.start + _change * newStart / duration;
	        newEnd = st.start + _change * newEnd / duration;
	      }
	      self.refresh(false, false, {
	        start: _keepClamp(newStart, keepClamp && !!self._startClamp),
	        end: _keepClamp(newEnd, keepClamp && !!self._endClamp)
	      }, pinOffset);
	      self.update();
	    };
	    self.adjustPinSpacing = function (amount) {
	      if (spacerState && amount) {
	        var i = spacerState.indexOf(direction.d) + 1;
	        spacerState[i] = parseFloat(spacerState[i]) + amount + _px;
	        spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
	        _setState(spacerState);
	      }
	    };
	    self.disable = function (reset, allowAnimation) {
	      if (self.enabled) {
	        reset !== false && self.revert(true, true);
	        self.enabled = self.isActive = false;
	        allowAnimation || scrubTween && scrubTween.pause();
	        prevScroll = 0;
	        pinCache && (pinCache.uncache = 1);
	        onRefreshInit && _removeListener(ScrollTrigger, "refreshInit", onRefreshInit);
	        if (snapDelayedCall) {
	          snapDelayedCall.pause();
	          tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
	        }
	        if (!isViewport) {
	          var i = _triggers.length;
	          while (i--) {
	            if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
	              return; //don't remove the listeners if there are still other triggers referencing it.
	            }
	          }

	          _removeListener(scroller, "resize", _onResize);
	          isViewport || _removeListener(scroller, "scroll", _onScroll);
	        }
	      }
	    };
	    self.kill = function (revert, allowAnimation) {
	      self.disable(revert, allowAnimation);
	      scrubTween && !allowAnimation && scrubTween.kill();
	      id && delete _ids[id];
	      var i = _triggers.indexOf(self);
	      i >= 0 && _triggers.splice(i, 1);
	      i === _i && _direction > 0 && _i--; // if we're in the middle of a refresh() or update(), splicing would cause skips in the index, so adjust...
	      // if no other ScrollTrigger instances of the same scroller are found, wipe out any recorded scroll position. Otherwise, in a single page application, for example, it could maintain scroll position when it really shouldn't.

	      i = 0;
	      _triggers.forEach(function (t) {
	        return t.scroller === self.scroller && (i = 1);
	      });
	      i || _refreshingAll || (self.scroll.rec = 0);
	      if (animation) {
	        animation.scrollTrigger = null;
	        revert && animation.revert({
	          kill: false
	        });
	        allowAnimation || animation.kill();
	      }
	      markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
	        return m.parentNode && m.parentNode.removeChild(m);
	      });
	      _primary === self && (_primary = 0);
	      if (pin) {
	        pinCache && (pinCache.uncache = 1);
	        i = 0;
	        _triggers.forEach(function (t) {
	          return t.pin === pin && i++;
	        });
	        i || (pinCache.spacer = 0); // if there aren't any more ScrollTriggers with the same pin, remove the spacer, otherwise it could be contaminated with old/stale values if the user re-creates a ScrollTrigger for the same element.
	      }

	      vars.onKill && vars.onKill(self);
	    };
	    _triggers.push(self);
	    self.enable(false, false);
	    customRevertReturn && customRevertReturn(self);
	    if (animation && animation.add && !change) {
	      // if the animation is a timeline, it may not have been populated yet, so it wouldn't render at the proper place on the first refresh(), thus we should schedule one for the next tick. If "change" is defined, we know it must be re-enabling, thus we can refresh() right away.
	      var updateFunc = self.update; // some browsers may fire a scroll event BEFORE a tick elapses and/or the DOMContentLoaded fires. So there's a chance update() will be called BEFORE a refresh() has happened on a Timeline-attached ScrollTrigger which means the start/end won't be calculated yet. We don't want to add conditional logic inside the update() method (like check to see if end is defined and if not, force a refresh()) because that's a function that gets hit a LOT (performance). So we swap out the real update() method for this one that'll re-attach it the first time it gets called and of course forces a refresh().

	      self.update = function () {
	        self.update = updateFunc;
	        _scrollers.cache++; // otherwise a cached scroll position may get used in the refresh() in a very rare scenario, like if ScrollTriggers are created inside a DOMContentLoaded event and the queued requestAnimationFrame() fires beforehand. See https://gsap.com/community/forums/topic/41267-scrolltrigger-breaks-on-refresh-when-using-domcontentloaded/

	        start || end || self.refresh();
	      };
	      gsap.delayedCall(0.01, self.update);
	      change = 0.01;
	      start = end = 0;
	    } else {
	      self.refresh();
	    }
	    pin && _queueRefreshAll(); // pinning could affect the positions of other things, so make sure we queue a full refresh()
	  };

	  ScrollTrigger.register = function register(core) {
	    if (!_coreInitted) {
	      gsap = core || _getGSAP();
	      _windowExists() && window.document && ScrollTrigger.enable();
	      _coreInitted = _enabled;
	    }
	    return _coreInitted;
	  };
	  ScrollTrigger.defaults = function defaults(config) {
	    if (config) {
	      for (var p in config) {
	        _defaults[p] = config[p];
	      }
	    }
	    return _defaults;
	  };
	  ScrollTrigger.disable = function disable(reset, kill) {
	    _enabled = 0;
	    _triggers.forEach(function (trigger) {
	      return trigger[kill ? "kill" : "disable"](reset);
	    });
	    _removeListener(_win, "wheel", _onScroll);
	    _removeListener(_doc, "scroll", _onScroll);
	    clearInterval(_syncInterval);
	    _removeListener(_doc, "touchcancel", _passThrough);
	    _removeListener(_body, "touchstart", _passThrough);
	    _multiListener(_removeListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
	    _multiListener(_removeListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);
	    _resizeDelay.kill();
	    _iterateAutoRefresh(_removeListener);
	    for (var i = 0; i < _scrollers.length; i += 3) {
	      _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 1]);
	      _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 2]);
	    }
	  };
	  ScrollTrigger.enable = function enable() {
	    _win = window;
	    _doc = document;
	    _docEl = _doc.documentElement;
	    _body = _doc.body;
	    if (gsap) {
	      _toArray = gsap.utils.toArray;
	      _clamp = gsap.utils.clamp;
	      _context = gsap.core.context || _passThrough;
	      _suppressOverwrites = gsap.core.suppressOverwrites || _passThrough;
	      _scrollRestoration = _win.history.scrollRestoration || "auto";
	      _lastScroll = _win.pageYOffset || 0;
	      gsap.core.globals("ScrollTrigger", ScrollTrigger); // must register the global manually because in Internet Explorer, functions (classes) don't have a "name" property.

	      if (_body) {
	        _enabled = 1;
	        _div100vh = document.createElement("div"); // to solve mobile browser address bar show/hide resizing, we shouldn't rely on window.innerHeight. Instead, use a <div> with its height set to 100vh and measure that since that's what the scrolling is based on anyway and it's not affected by address bar showing/hiding.

	        _div100vh.style.height = "100vh";
	        _div100vh.style.position = "absolute";
	        _refresh100vh();
	        _rafBugFix();
	        Observer.register(gsap); // isTouch is 0 if no touch, 1 if ONLY touch, and 2 if it can accommodate touch but also other types like mouse/pointer.

	        ScrollTrigger.isTouch = Observer.isTouch;
	        _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent); // since 2017, iOS has had a bug that causes event.clientX/Y to be inaccurate when a scroll occurs, thus we must alternate ignoring every other touchmove event to work around it. See https://bugs.webkit.org/show_bug.cgi?id=181954 and https://codepen.io/GreenSock/pen/ExbrPNa/087cef197dc35445a0951e8935c41503

	        _ignoreMobileResize = Observer.isTouch === 1;
	        _addListener(_win, "wheel", _onScroll); // mostly for 3rd party smooth scrolling libraries.

	        _root = [_win, _doc, _docEl, _body];
	        if (gsap.matchMedia) {
	          ScrollTrigger.matchMedia = function (vars) {
	            var mm = gsap.matchMedia(),
	              p;
	            for (p in vars) {
	              mm.add(p, vars[p]);
	            }
	            return mm;
	          };
	          gsap.addEventListener("matchMediaInit", function () {
	            return _revertAll();
	          });
	          gsap.addEventListener("matchMediaRevert", function () {
	            return _revertRecorded();
	          });
	          gsap.addEventListener("matchMedia", function () {
	            _refreshAll(0, 1);
	            _dispatch("matchMedia");
	          });
	          gsap.matchMedia().add("(orientation: portrait)", function () {
	            // when orientation changes, we should take new base measurements for the ignoreMobileResize feature.
	            _setBaseDimensions();
	            return _setBaseDimensions;
	          });
	        } else {
	          console.warn("Requires GSAP 3.11.0 or later");
	        }
	        _setBaseDimensions();
	        _addListener(_doc, "scroll", _onScroll); // some browsers (like Chrome), the window stops dispatching scroll events on the window if you scroll really fast, but it's consistent on the document!

	        var bodyHasStyle = _body.hasAttribute("style"),
	          bodyStyle = _body.style,
	          border = bodyStyle.borderTopStyle,
	          AnimationProto = gsap.core.Animation.prototype,
	          bounds,
	          i;
	        AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
	          value: function value() {
	            return this.time(-0.01, true);
	          }
	        }); // only for backwards compatibility (Animation.revert() was added after 3.10.4)

	        bodyStyle.borderTopStyle = "solid"; // works around an issue where a margin of a child element could throw off the bounds of the _body, making it seem like there's a margin when there actually isn't. The border ensures that the bounds are accurate.

	        bounds = _getBounds(_body);
	        _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0; // accommodate the offset of the <body> caused by margins and/or padding

	        _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
	        border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
	        if (!bodyHasStyle) {
	          // SSR frameworks like Next.js complain if this attribute gets added.
	          _body.setAttribute("style", ""); // it's not enough to just removeAttribute() - we must first set it to empty, otherwise Next.js complains.

	          _body.removeAttribute("style");
	        } // TODO: (?) maybe move to leveraging the velocity mechanism in Observer and skip intervals.

	        _syncInterval = setInterval(_sync, 250);
	        gsap.delayedCall(0.5, function () {
	          return _startup = 0;
	        });
	        _addListener(_doc, "touchcancel", _passThrough); // some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document.

	        _addListener(_body, "touchstart", _passThrough); //works around Safari bug: https://gsap.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/

	        _multiListener(_addListener, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
	        _multiListener(_addListener, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);
	        _transformProp = gsap.utils.checkPrefix("transform");
	        _stateProps.push(_transformProp);
	        _coreInitted = _getTime();
	        _resizeDelay = gsap.delayedCall(0.2, _refreshAll).pause();
	        _autoRefresh = [_doc, "visibilitychange", function () {
	          var w = _win.innerWidth,
	            h = _win.innerHeight;
	          if (_doc.hidden) {
	            _prevWidth = w;
	            _prevHeight = h;
	          } else if (_prevWidth !== w || _prevHeight !== h) {
	            _onResize();
	          }
	        }, _doc, "DOMContentLoaded", _refreshAll, _win, "load", _refreshAll, _win, "resize", _onResize];
	        _iterateAutoRefresh(_addListener);
	        _triggers.forEach(function (trigger) {
	          return trigger.enable(0, 1);
	        });
	        for (i = 0; i < _scrollers.length; i += 3) {
	          _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 1]);
	          _wheelListener(_removeListener, _scrollers[i], _scrollers[i + 2]);
	        }
	      }
	    }
	  };
	  ScrollTrigger.config = function config(vars) {
	    "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
	    var ms = vars.syncInterval;
	    ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
	    "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger.isTouch === 1 && vars.ignoreMobileResize);
	    if ("autoRefreshEvents" in vars) {
	      _iterateAutoRefresh(_removeListener) || _iterateAutoRefresh(_addListener, vars.autoRefreshEvents || "none");
	      _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
	    }
	  };
	  ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
	    var t = _getTarget(target),
	      i = _scrollers.indexOf(t),
	      isViewport = _isViewport(t);
	    if (~i) {
	      _scrollers.splice(i, isViewport ? 6 : 2);
	    }
	    if (vars) {
	      isViewport ? _proxies.unshift(_win, vars, _body, vars, _docEl, vars) : _proxies.unshift(t, vars);
	    }
	  };
	  ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
	    _triggers.forEach(function (t) {
	      return t._ctx && t._ctx.query === query && t._ctx.kill(true, true);
	    });
	  };
	  ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
	    var bounds = (_isString(element) ? _getTarget(element) : element).getBoundingClientRect(),
	      offset = bounds[horizontal ? _width : _height] * ratio || 0;
	    return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win.innerHeight;
	  };
	  ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
	    _isString(element) && (element = _getTarget(element));
	    var bounds = element.getBoundingClientRect(),
	      size = bounds[horizontal ? _width : _height],
	      offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
	    return horizontal ? (bounds.left + offset) / _win.innerWidth : (bounds.top + offset) / _win.innerHeight;
	  };
	  ScrollTrigger.killAll = function killAll(allowListeners) {
	    _triggers.slice(0).forEach(function (t) {
	      return t.vars.id !== "ScrollSmoother" && t.kill();
	    });
	    if (allowListeners !== true) {
	      var listeners = _listeners.killAll || [];
	      _listeners = {};
	      listeners.forEach(function (f) {
	        return f();
	      });
	    }
	  };
	  return ScrollTrigger;
	}();
	ScrollTrigger.version = "3.12.7";
	ScrollTrigger.saveStyles = function (targets) {
	  return targets ? _toArray(targets).forEach(function (target) {
	    // saved styles are recorded in a consecutive alternating Array, like [element, cssText, transform attribute, cache, matchMedia, ...]
	    if (target && target.style) {
	      var i = _savedStyles.indexOf(target);
	      i >= 0 && _savedStyles.splice(i, 5);
	      _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap.core.getCache(target), _context());
	    }
	  }) : _savedStyles;
	};
	ScrollTrigger.revert = function (soft, media) {
	  return _revertAll(!soft, media);
	};
	ScrollTrigger.create = function (vars, animation) {
	  return new ScrollTrigger(vars, animation);
	};
	ScrollTrigger.refresh = function (safe) {
	  return safe ? _onResize(true) : (_coreInitted || ScrollTrigger.register()) && _refreshAll(true);
	};
	ScrollTrigger.update = function (force) {
	  return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
	};
	ScrollTrigger.clearScrollMemory = _clearScrollMemory;
	ScrollTrigger.maxScroll = function (element, horizontal) {
	  return _maxScroll(element, horizontal ? _horizontal : _vertical);
	};
	ScrollTrigger.getScrollFunc = function (element, horizontal) {
	  return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
	};
	ScrollTrigger.getById = function (id) {
	  return _ids[id];
	};
	ScrollTrigger.getAll = function () {
	  return _triggers.filter(function (t) {
	    return t.vars.id !== "ScrollSmoother";
	  });
	}; // it's common for people to ScrollTrigger.getAll(t => t.kill()) on page routes, for example, and we don't want it to ruin smooth scrolling by killing the main ScrollSmoother one.

	ScrollTrigger.isScrolling = function () {
	  return !!_lastScrollTime;
	};
	ScrollTrigger.snapDirectional = _snapDirectional;
	ScrollTrigger.addEventListener = function (type, callback) {
	  var a = _listeners[type] || (_listeners[type] = []);
	  ~a.indexOf(callback) || a.push(callback);
	};
	ScrollTrigger.removeEventListener = function (type, callback) {
	  var a = _listeners[type],
	    i = a && a.indexOf(callback);
	  i >= 0 && a.splice(i, 1);
	};
	ScrollTrigger.batch = function (targets, vars) {
	  var result = [],
	    varsCopy = {},
	    interval = vars.interval || 0.016,
	    batchMax = vars.batchMax || 1e9,
	    proxyCallback = function proxyCallback(type, callback) {
	      var elements = [],
	        triggers = [],
	        delay = gsap.delayedCall(interval, function () {
	          callback(elements, triggers);
	          elements = [];
	          triggers = [];
	        }).pause();
	      return function (self) {
	        elements.length || delay.restart(true);
	        elements.push(self.trigger);
	        triggers.push(self);
	        batchMax <= elements.length && delay.progress(1);
	      };
	    },
	    p;
	  for (p in vars) {
	    varsCopy[p] = p.substr(0, 2) === "on" && _isFunction(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
	  }
	  if (_isFunction(batchMax)) {
	    batchMax = batchMax();
	    _addListener(ScrollTrigger, "refresh", function () {
	      return batchMax = vars.batchMax();
	    });
	  }
	  _toArray(targets).forEach(function (target) {
	    var config = {};
	    for (p in varsCopy) {
	      config[p] = varsCopy[p];
	    }
	    config.trigger = target;
	    result.push(ScrollTrigger.create(config));
	  });
	  return result;
	}; // to reduce file size. clamps the scroll and also returns a duration multiplier so that if the scroll gets chopped shorter, the duration gets curtailed as well (otherwise if you're very close to the top of the page, for example, and swipe up really fast, it'll suddenly slow down and take a long time to reach the top).

	var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier(scrollFunc, current, end, max) {
	    current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
	    return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
	  },
	  _allowNativePanning = function _allowNativePanning(target, direction) {
	    if (direction === true) {
	      target.style.removeProperty("touch-action");
	    } else {
	      target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none"; // note: Firefox doesn't support it pinch-zoom properly, at least in addition to a pan-x or pan-y.
	    }

	    target === _docEl && _allowNativePanning(_body, direction);
	  },
	  _overflow = {
	    auto: 1,
	    scroll: 1
	  },
	  _nestedScroll = function _nestedScroll(_ref5) {
	    var event = _ref5.event,
	      target = _ref5.target,
	      axis = _ref5.axis;
	    var node = (event.changedTouches ? event.changedTouches[0] : event).target,
	      cache = node._gsap || gsap.core.getCache(node),
	      time = _getTime(),
	      cs;
	    if (!cache._isScrollT || time - cache._isScrollT > 2000) {
	      // cache for 2 seconds to improve performance.
	      while (node && node !== _body && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
	        node = node.parentNode;
	      }
	      cache._isScroll = node && node !== target && !_isViewport(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
	      cache._isScrollT = time;
	    }
	    if (cache._isScroll || axis === "x") {
	      event.stopPropagation();
	      event._gsapAllow = true;
	    }
	  },
	  // capture events on scrollable elements INSIDE the <body> and allow those by calling stopPropagation() when we find a scrollable ancestor
	  _inputObserver = function _inputObserver(target, type, inputs, nested) {
	    return Observer.create({
	      target: target,
	      capture: true,
	      debounce: false,
	      lockAxis: true,
	      type: type,
	      onWheel: nested = nested && _nestedScroll,
	      onPress: nested,
	      onDrag: nested,
	      onScroll: nested,
	      onEnable: function onEnable() {
	        return inputs && _addListener(_doc, Observer.eventTypes[0], _captureInputs, false, true);
	      },
	      onDisable: function onDisable() {
	        return _removeListener(_doc, Observer.eventTypes[0], _captureInputs, true);
	      }
	    });
	  },
	  _inputExp = /(input|label|select|textarea)/i,
	  _inputIsFocused,
	  _captureInputs = function _captureInputs(e) {
	    var isInput = _inputExp.test(e.target.tagName);
	    if (isInput || _inputIsFocused) {
	      e._gsapAllow = true;
	      _inputIsFocused = isInput;
	    }
	  },
	  _getScrollNormalizer = function _getScrollNormalizer(vars) {
	    _isObject(vars) || (vars = {});
	    vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
	    vars.type || (vars.type = "wheel,touch");
	    vars.debounce = !!vars.debounce;
	    vars.id = vars.id || "normalizer";
	    var _vars2 = vars,
	      normalizeScrollX = _vars2.normalizeScrollX,
	      momentum = _vars2.momentum,
	      allowNestedScroll = _vars2.allowNestedScroll,
	      onRelease = _vars2.onRelease,
	      self,
	      maxY,
	      target = _getTarget(vars.target) || _docEl,
	      smoother = gsap.core.globals().ScrollSmoother,
	      smootherInstance = smoother && smoother.get(),
	      content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()),
	      scrollFuncY = _getScrollFunc(target, _vertical),
	      scrollFuncX = _getScrollFunc(target, _horizontal),
	      scale = 1,
	      initialScale = (Observer.isTouch && _win.visualViewport ? _win.visualViewport.scale * _win.visualViewport.width : _win.outerWidth) / _win.innerWidth,
	      wheelRefresh = 0,
	      resolveMomentumDuration = _isFunction(momentum) ? function () {
	        return momentum(self);
	      } : function () {
	        return momentum || 2.8;
	      },
	      lastRefreshID,
	      skipTouchMove,
	      inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll),
	      resumeTouchMove = function resumeTouchMove() {
	        return skipTouchMove = false;
	      },
	      scrollClampX = _passThrough,
	      scrollClampY = _passThrough,
	      updateClamps = function updateClamps() {
	        maxY = _maxScroll(target, _vertical);
	        scrollClampY = _clamp(_fixIOSBug ? 1 : 0, maxY);
	        normalizeScrollX && (scrollClampX = _clamp(0, _maxScroll(target, _horizontal)));
	        lastRefreshID = _refreshID;
	      },
	      removeContentOffset = function removeContentOffset() {
	        content._gsap.y = _round(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
	        content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
	        scrollFuncY.offset = scrollFuncY.cacheID = 0;
	      },
	      ignoreDrag = function ignoreDrag() {
	        if (skipTouchMove) {
	          requestAnimationFrame(resumeTouchMove);
	          var offset = _round(self.deltaY / 2),
	            scroll = scrollClampY(scrollFuncY.v - offset);
	          if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
	            scrollFuncY.offset = scroll - scrollFuncY.v;
	            var y = _round((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
	            content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y + ", 0, 1)";
	            content._gsap.y = y + "px";
	            scrollFuncY.cacheID = _scrollers.cache;
	            _updateAll();
	          }
	          return true;
	        }
	        scrollFuncY.offset && removeContentOffset();
	        skipTouchMove = true;
	      },
	      tween,
	      startScrollX,
	      startScrollY,
	      onStopDelayedCall,
	      onResize = function onResize() {
	        // if the window resizes, like on an iPhone which Apple FORCES the address bar to show/hide even if we event.preventDefault(), it may be scrolling too far now that the address bar is showing, so we must dynamically adjust the momentum tween.
	        updateClamps();
	        if (tween.isActive() && tween.vars.scrollY > maxY) {
	          scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
	        }
	      };
	    content && gsap.set(content, {
	      y: "+=0"
	    }); // to ensure there's a cache (element._gsap)

	    vars.ignoreCheck = function (e) {
	      return _fixIOSBug && e.type === "touchmove" && ignoreDrag() || scale > 1.05 && e.type !== "touchstart" || self.isGesturing || e.touches && e.touches.length > 1;
	    };
	    vars.onPress = function () {
	      skipTouchMove = false;
	      var prevScale = scale;
	      scale = _round((_win.visualViewport && _win.visualViewport.scale || 1) / initialScale);
	      tween.pause();
	      prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
	      startScrollX = scrollFuncX();
	      startScrollY = scrollFuncY();
	      updateClamps();
	      lastRefreshID = _refreshID;
	    };
	    vars.onRelease = vars.onGestureStart = function (self, wasDragging) {
	      scrollFuncY.offset && removeContentOffset();
	      if (!wasDragging) {
	        onStopDelayedCall.restart(true);
	      } else {
	        _scrollers.cache++; // make sure we're pulling the non-cached value
	        // alternate algorithm: durX = Math.min(6, Math.abs(self.velocityX / 800)),	dur = Math.max(durX, Math.min(6, Math.abs(self.velocityY / 800))); dur = dur * (0.4 + (1 - _power4In(dur / 6)) * 0.6)) * (momentumSpeed || 1)

	        var dur = resolveMomentumDuration(),
	          currentScroll,
	          endScroll;
	        if (normalizeScrollX) {
	          currentScroll = scrollFuncX();
	          endScroll = currentScroll + dur * 0.05 * -self.velocityX / 0.227; // the constant .227 is from power4(0.05). velocity is inverted because scrolling goes in the opposite direction.

	          dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
	          tween.vars.scrollX = scrollClampX(endScroll);
	        }
	        currentScroll = scrollFuncY();
	        endScroll = currentScroll + dur * 0.05 * -self.velocityY / 0.227; // the constant .227 is from power4(0.05)

	        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
	        tween.vars.scrollY = scrollClampY(endScroll);
	        tween.invalidate().duration(dur).play(0.01);
	        if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
	          // iOS bug: it'll show the address bar but NOT fire the window "resize" event until the animation is done but we must protect against overshoot so we leverage an onUpdate to do so.
	          gsap.to({}, {
	            onUpdate: onResize,
	            duration: dur
	          });
	        }
	      }
	      onRelease && onRelease(self);
	    };
	    vars.onWheel = function () {
	      tween._ts && tween.pause();
	      if (_getTime() - wheelRefresh > 1000) {
	        // after 1 second, refresh the clamps otherwise that'll only happen when ScrollTrigger.refresh() is called or for touch-scrolling.
	        lastRefreshID = 0;
	        wheelRefresh = _getTime();
	      }
	    };
	    vars.onChange = function (self, dx, dy, xArray, yArray) {
	      _refreshID !== lastRefreshID && updateClamps();
	      dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self.startX - self.x) : scrollFuncX() + dx - xArray[1])); // for more precision, we track pointer/touch movement from the start, otherwise it'll drift.

	      if (dy) {
	        scrollFuncY.offset && removeContentOffset();
	        var isTouch = yArray[2] === dy,
	          y = isTouch ? startScrollY + self.startY - self.y : scrollFuncY() + dy - yArray[1],
	          yClamped = scrollClampY(y);
	        isTouch && y !== yClamped && (startScrollY += yClamped - y);
	        scrollFuncY(yClamped);
	      }
	      (dy || dx) && _updateAll();
	    };
	    vars.onEnable = function () {
	      _allowNativePanning(target, normalizeScrollX ? false : "x");
	      ScrollTrigger.addEventListener("refresh", onResize);
	      _addListener(_win, "resize", onResize);
	      if (scrollFuncY.smooth) {
	        scrollFuncY.target.style.scrollBehavior = "auto";
	        scrollFuncY.smooth = scrollFuncX.smooth = false;
	      }
	      inputObserver.enable();
	    };
	    vars.onDisable = function () {
	      _allowNativePanning(target, true);
	      _removeListener(_win, "resize", onResize);
	      ScrollTrigger.removeEventListener("refresh", onResize);
	      inputObserver.kill();
	    };
	    vars.lockAxis = vars.lockAxis !== false;
	    self = new Observer(vars);
	    self.iOS = _fixIOSBug; // used in the Observer getCachedScroll() function to work around an iOS bug that wreaks havoc with TouchEvent.clientY if we allow scroll to go all the way back to 0.

	    _fixIOSBug && !scrollFuncY() && scrollFuncY(1); // iOS bug causes event.clientY values to freak out (wildly inaccurate) if the scroll position is exactly 0.

	    _fixIOSBug && gsap.ticker.add(_passThrough); // prevent the ticker from sleeping

	    onStopDelayedCall = self._dc;
	    tween = gsap.to(self, {
	      ease: "power4",
	      paused: true,
	      inherit: false,
	      scrollX: normalizeScrollX ? "+=0.1" : "+=0",
	      scrollY: "+=0.1",
	      modifiers: {
	        scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function () {
	          return tween.pause();
	        })
	      },
	      onUpdate: _updateAll,
	      onComplete: onStopDelayedCall.vars.onComplete
	    }); // we need the modifier to sense if the scroll position is altered outside of the momentum tween (like with a scrollTo tween) so we can pause() it to prevent conflicts.

	    return self;
	  };
	ScrollTrigger.sort = function (func) {
	  if (_isFunction(func)) {
	    return _triggers.sort(func);
	  }
	  var scroll = _win.pageYOffset || 0;
	  ScrollTrigger.getAll().forEach(function (t) {
	    return t._sortY = t.trigger ? scroll + t.trigger.getBoundingClientRect().top : t.start + _win.innerHeight;
	  });
	  return _triggers.sort(func || function (a, b) {
	    return (a.vars.refreshPriority || 0) * -1e6 + (a.vars.containerAnimation ? 1e6 : a._sortY) - ((b.vars.containerAnimation ? 1e6 : b._sortY) + (b.vars.refreshPriority || 0) * -1e6);
	  }); // anything with a containerAnimation should refresh last.
	};

	ScrollTrigger.observe = function (vars) {
	  return new Observer(vars);
	};
	ScrollTrigger.normalizeScroll = function (vars) {
	  if (typeof vars === "undefined") {
	    return _normalizer;
	  }
	  if (vars === true && _normalizer) {
	    return _normalizer.enable();
	  }
	  if (vars === false) {
	    _normalizer && _normalizer.kill();
	    _normalizer = vars;
	    return;
	  }
	  var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
	  _normalizer && _normalizer.target === normalizer.target && _normalizer.kill();
	  _isViewport(normalizer.target) && (_normalizer = normalizer);
	  return normalizer;
	};
	ScrollTrigger.core = {
	  // smaller file size way to leverage in ScrollSmoother and Observer
	  _getVelocityProp: _getVelocityProp,
	  _inputObserver: _inputObserver,
	  _scrollers: _scrollers,
	  _proxies: _proxies,
	  bridge: {
	    // when normalizeScroll sets the scroll position (ss = setScroll)
	    ss: function ss() {
	      _lastScrollTime || _dispatch("scrollStart");
	      _lastScrollTime = _getTime();
	    },
	    // a way to get the _refreshing value in Observer
	    ref: function ref() {
	      return _refreshing;
	    }
	  }
	};
	_getGSAP() && gsap.registerPlugin(ScrollTrigger);

	gsapWithCSS.registerPlugin(ScrollTrigger);
	jQuery(document).ready(function ($) {
	  $(function () {
	    $('[data-bs-toggle="popover"]').popover().click(function (e) {
	      // e.preventDefault();
	    });
	  });
	  var body = $('body');
	  var navbarClasses = $('#main-nav').attr('class');
	  var navbarClassesBeforeOffcanvas = navbarClasses;

	  // // switch to dark navbar on offcanvas show
	  $('#main-nav .offcanvas').on('show.bs.offcanvas', function () {
	    navbarClassesBeforeOffcanvas = $('#main-nav').attr('class');
	    $('#main-nav').removeClass('navbar-light').addClass('navbar-dark');
	  });

	  // // switch to light navbar on offcanvas hide
	  $('#main-nav .offcanvas').on('hide.bs.offcanvas', function () {
	    $('#main-nav').removeClass('navbar-dark').addClass(navbarClassesBeforeOffcanvas);
	  });
	  jQuery(window).scroll(function () {
	    var scroll = $(window).scrollTop();
	    if (scroll >= 25) {
	      body.addClass("scrolled");
	      $('#main-nav').removeClass('navbar-dark').addClass('navbar-light bg-white');
	    } else {
	      body.removeClass("scrolled");
	      $('#main-nav').removeClass('navbar-light bg-white').addClass(navbarClasses);
	    }
	    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
	      body.addClass("near-bottom");
	    } else {
	      body.removeClass("near-bottom");
	    }
	  });
	  $('#navbarNavDropdown').on('show.bs.collapse', function () {
	    body.addClass('menu-open');
	  });
	  $('#navbarNavOffcanvas').on('show.bs.offcanvas', function () {
	    body.addClass('menu-open');
	  });
	  $('#navbarNavDropdown').on('hide.bs.collapse', function () {
	    body.removeClass('menu-open');
	  });
	  $('#navbarNavOffcanvas').on('hide.bs.offcanvas', function () {
	    body.removeClass('menu-open');
	  });
	});

	/* Carruseles */
	const prevArrow = '<button class="slick-prev slick-prev-custom" arial-label="Previous" type="button"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 40C8.9543 40 -2.7141e-06 31.0457 -1.74846e-06 20C-7.8281e-07 8.9543 8.95431 -2.7141e-06 20 -1.74846e-06C31.0457 -7.8281e-07 40 8.9543 40 20C40 31.0457 31.0457 40 20 40ZM16.1206 13.5198C15.7554 13.1055 15.1632 13.1055 14.798 13.5198L9.58704 19.4308C9.22182 19.8451 9.22182 20.5168 9.58704 20.931L14.798 26.8421C15.1632 27.2563 15.7554 27.2563 16.1206 26.8421C16.4858 26.4278 16.4858 25.7561 16.1206 25.3418L12.4912 21.2248L29.6865 21.2248C30.2388 21.2248 30.6865 20.7771 30.6865 20.2248C30.6865 19.6725 30.2388 19.2248 29.6865 19.2248L12.4138 19.2248L16.1206 15.02C16.4858 14.6057 16.4858 13.934 16.1206 13.5198Z" fill="var(--bs-secondary)"/></svg></button>';
	const nextArrow = '<button class="slick-next slick-next-custom" arial-label="Next" type="button"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 3.49691e-06C31.0457 5.4282e-06 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.9543 40 1.56562e-06 31.0457 3.49691e-06 20C5.4282e-06 8.95431 8.95431 1.56562e-06 20 3.49691e-06ZM23.8794 26.4802C24.2446 26.8945 24.8368 26.8945 25.202 26.4802L30.413 20.5692C30.7782 20.1549 30.7782 19.4833 30.413 19.069L25.202 13.1579C24.8368 12.7437 24.2446 12.7437 23.8794 13.1579C23.5142 13.5722 23.5142 14.2439 23.8794 14.6582L27.5088 18.7752L10.3135 18.7752C9.7612 18.7752 9.31348 19.2229 9.31348 19.7752C9.31348 20.3275 9.76119 20.7752 10.3135 20.7752L27.5862 20.7752L23.8794 24.98C23.5142 25.3943 23.5142 26.066 23.8794 26.4802Z" fill="var(--bs-secondary)"/></svg></button>';
	jQuery('.slick-slider-default').slick({
	  dots: false,
	  arrows: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: false,
	  adaptiveHeight: true,
	  prevArrow: prevArrow,
	  nextArrow: nextArrow
	});
	jQuery('.slick-carousel, .wp-block-group.is-style-slick-carousel > .wp-block-group__inner-container, .wp-block-gallery.is-style-slick-carousel').slick({
	  dots: true,
	  arrows: true,
	  infinite: false,
	  speed: 300,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  autoplay: false,
	  prevArrow: prevArrow,
	  nextArrow: nextArrow,
	  responsive: [{
	    breakpoint: 992,
	    settings: {
	      slidesToShow: 3,
	      slidesToScroll: 1
	    }
	  }, {
	    breakpoint: 576,
	    settings: {
	      slidesToShow: 2,
	      slidesToScroll: 2
	    }
	  }, {
	    breakpoint: 480,
	    settings: {
	      slidesToShow: 1,
	      slidesToScroll: 1
	    }
	  }
	  // You can unslick at a given breakpoint now by adding:
	  // settings: "unslick"
	  // instead of a settings object
	  ]
	});

	jQuery('.slick-carousel-two-items').slick({
	  dots: true,
	  arrows: true,
	  infinite: false,
	  speed: 300,
	  slidesToShow: 2,
	  slidesToScroll: 1,
	  autoplay: false,
	  prevArrow: prevArrow,
	  nextArrow: nextArrow,
	  responsive: [{
	    breakpoint: 480,
	    settings: {
	      slidesToShow: 1,
	      slidesToScroll: 1
	    }
	  }
	  // You can unslick at a given breakpoint now by adding:
	  // settings: "unslick"
	  // instead of a settings object
	  ]
	});

	jQuery('.wp-block-group.is-layout-flex.is-style-slick-carousel-logos, .wp-block-group.is-style-slick-carousel-logos > .wp-block-group__inner-container, .wp-block-gallery.is-style-slick-carousel-logos').slick({
	  dots: false,
	  arrows: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 6,
	  slidesToScroll: 6,
	  autoplay: true,
	  prevArrow: prevArrow,
	  nextArrow: nextArrow,
	  responsive: [{
	    breakpoint: 992,
	    settings: {
	      slidesToShow: 4,
	      slidesToScroll: 4
	    }
	  }, {
	    breakpoint: 782,
	    settings: {
	      slidesToShow: 3,
	      slidesToScroll: 3
	    }
	  }, {
	    breakpoint: 600,
	    settings: {
	      slidesToShow: 2,
	      slidesToScroll: 2
	    }
	  }

	  // You can unslick at a given breakpoint now by adding:
	  // settings: "unslick"
	  // instead of a settings object
	  ]
	});

	jQuery('.wp-block-buttons.is-style-carousel').slick({
	  dots: false,
	  arrows: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 3,
	  slidesToScroll: 3,
	  autoplay: true,
	  prevArrow: prevArrow,
	  nextArrow: nextArrow,
	  responsive: [{
	    breakpoint: 992,
	    settings: {
	      slidesToShow: 2,
	      slidesToScroll: 2
	    }
	  }, {
	    breakpoint: 600,
	    settings: {
	      slidesToShow: 1,
	      slidesToScroll: 1
	    }
	  }

	  // You can unslick at a given breakpoint now by adding:
	  // settings: "unslick"
	  // instead of a settings object
	  ]
	});

	// Animación hero
	jQuery('#hero .wp-block-cover__inner-container, .caso-de-exito-compacto-text').each(function (index) {
	  gsapWithCSS.from(this, {
	    autoAlpha: 0,
	    y: 50,
	    rotation: 2,
	    duration: 1,
	    scrollTrigger: {
	      trigger: this,
	      start: "top 90%",
	      toggleActions: "play none none none"
	    }
	  });
	});

	// Animación media-text
	jQuery('.wp-block-media-text__media').each(function () {
	  gsapWithCSS.from(this, {
	    autoAlpha: 0,
	    x: -100,
	    scrollTrigger: {
	      trigger: this,
	      start: "top 90%",
	      toggleActions: "play none none none"
	    }
	  });
	});

	// Animación en lote para grids, productos, etc.
	ScrollTrigger.batch(".is-layout-grid > *, .product-category, li.product, .subcategory > .card-body, .is-style-list-grid > li", {
	  onEnter: elements => {
	    gsapWithCSS.from(elements, {
	      autoAlpha: 0,
	      y: 60,
	      stagger: 0.1
	    });
	  },
	  once: true
	});
	jQuery('#main-nav .offcanvas').on('show.bs.offcanvas', function () {
	  const menuItems = document.querySelectorAll('#main-menu > .menu-item');
	  gsapWithCSS.from(menuItems, {
	    x: -30,
	    autoAlpha: 0,
	    stagger: 0.1,
	    duration: 0.3,
	    ease: "power2.out",
	    delay: 0.2
	  });
	});

	exports.Alert = alert;
	exports.Button = button;
	exports.Carousel = carousel;
	exports.Collapse = collapse;
	exports.Dropdown = dropdown;
	exports.Modal = modal;
	exports.Offcanvas = offcanvas;
	exports.Popover = popover;
	exports.Scrollspy = scrollspy;
	exports.Tab = tab;
	exports.Toast = toast;
	exports.Tooltip = tooltip;

}));
//# sourceMappingURL=child-theme.js.map
