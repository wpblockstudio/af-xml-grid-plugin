import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./src/blocks/af-xml-grid/view.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");

(0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("af/xml-grid", {
  state: {
    allItems: [],
    items: [],
    visibleCount: 0,
    pageSize: 12,
    imageSize: null,
    isLoaded: false,
    hasMore: false,
    containerEl: null
  },
  callbacks: {
    revealCards() {
      const state = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("af/xml-grid").state;
      const container = state.containerEl;
      if (!container) return;
      requestAnimationFrame(() => {
        const newCards = container.querySelectorAll(".af-loop-card:not(.--visible)");
        newCards.forEach((card, i) => {
          card.style.setProperty('--delay', `${i * 100}ms`);
        });
        setTimeout(() => {
          newCards.forEach((card, i) => {
            card.classList.add("--visible");
          });
        }, 100);
      });
    }
  },
  actions: {
    async fetchFeed(context) {
      const {
        state,
        callbacks
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("af/xml-grid");
      const {
        feed,
        maxItems = 12,
        dateFormat,
        imageSize = null
      } = context;
      if (!feed) return;
      const params = new URLSearchParams(Object.fromEntries(Object.entries({
        feed,
        dateFormat,
        imageSize
      }).filter(([_, v]) => v != null && v !== "")));
      try {
        const response = await fetch(`/wp-json/af/v1/xml-feed?${params.toString()}`);
        const allItems = await response.json();
        state.allItems = allItems;
        state.pageSize = parseInt(maxItems, 10);
        state.visibleCount = state.pageSize;
        state.items = allItems.slice(0, state.visibleCount);
        state.imageSize = imageSize;
        state.hasMore = state.visibleCount < allItems.length;
        state.isLoaded = true;
        callbacks.revealCards();
      } catch (err) {
        console.error("Feed fetch error:", err);
      }
    },
    loadMore() {
      const {
        state,
        callbacks
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("af/xml-grid");
      state.visibleCount = Math.min(state.visibleCount + state.pageSize, state.allItems.length);
      state.items = state.allItems.slice(0, state.visibleCount);
      state.hasMore = state.visibleCount < state.allItems.length;
      callbacks.revealCards();
    },
    async init() {
      const {
        actions,
        state
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("af/xml-grid");
      const context = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const {
        ref: element
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      state.containerEl = element;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            actions.fetchFeed(context);
          }
        });
      }, {
        root: null,
        threshold: 0
      });
      observer.observe(element);
    }
  }
});
})();


//# sourceMappingURL=view.js.map