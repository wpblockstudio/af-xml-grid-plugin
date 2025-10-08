/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/af-xml-grid/index.js":
/*!*****************************************!*\
  !*** ./src/blocks/af-xml-grid/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/af-xml-grid/style.scss");








const FEED_OPTIONS = [{
  label: 'Select',
  value: ''
}, {
  label: 'Wired',
  value: 'wired'
}];
const DATE_FORMAT_OPTIONS = [{
  label: 'Select',
  value: ''
}, {
  label: 'October 8, 2025',
  value: 'F j, Y'
}, {
  label: '2025-10-08',
  value: 'Y-m-d'
}, {
  label: '10/08/2025',
  value: 'm/d/Y'
}, {
  label: '08/10/2025',
  value: 'd/m/Y'
}, {
  label: 'Oct 8, 2025',
  value: 'M j, Y'
}, {
  label: 'Wed, Oct 8, 2025',
  value: 'D, M j, Y'
}, {
  label: 'Wednesday, October 8, 2025',
  value: 'l, F j, Y'
}, {
  label: '5:30 PM',
  value: 'g:i A'
}, {
  label: '17:30',
  value: 'H:i'
}, {
  label: 'October 8, 2025 5:30 PM',
  value: 'F j, Y g:i A'
}];
const IMAGE_SIZE_OPTIONS = [{
  label: 'Select',
  value: ''
}, {
  label: 'Thumbnail',
  value: 180
}, {
  label: 'Small',
  value: 320
}, {
  label: 'Medium',
  value: 480
}, {
  label: 'Large',
  value: 800
}];
const blockClassNames = attributes => {
  var _settings$instanceId;
  const {
    settings = {}
  } = attributes;
  return ['af-xml-grid', (_settings$instanceId = settings?.instanceId) !== null && _settings$instanceId !== void 0 ? _settings$instanceId : null, !!settings?.centered ? '--centered' : null].filter(Boolean).join(' ');
};
const buildCssProps = settings => {
  const {
    breakpointSmall = 'xs',
    breakpointLarge = 'normal',
    itemsMobile,
    itemsSmall,
    itemsLarge = 3
  } = settings;

  // Base CSS props (not breakpoint-specific)
  const cssProps = {
    '--columns': itemsLarge
  };

  // Responsive breakpoints
  const responsive = {};
  if (itemsMobile) {
    responsive[breakpointSmall] = {
      '--columns': itemsMobile !== null && itemsMobile !== void 0 ? itemsMobile : 1
    };
  }
  if (itemsSmall) {
    responsive[breakpointLarge] = {
      '--columns': itemsSmall !== null && itemsSmall !== void 0 ? itemsSmall : 2
    };
  }
  return {
    base: cssProps,
    responsive
  };
};
const resolvePresetVar = value => {
  if (typeof value === 'string' && value.startsWith('var:preset|')) {
    // turn "var:preset|spacing|50" → "var(--wp--preset--spacing--50)"
    const parts = value.replace('var:preset|', '').split('|');
    return `var(--wp--preset--${parts.join('--')})`;
  }
  return value;
};
const Style = ({
  settings,
  breakpoints
}) => {
  if (!settings?.css?.responsive || !breakpoints || !settings?.instanceId) return null;
  const selector = `.${settings.instanceId}`;
  const rules = Object.entries(settings.css.responsive).map(([bpKey, vars]) => {
    const varsStr = Object.entries(vars).map(([key, val]) => `${key}:${val};`).join('');
    return `@media(max-width:${breakpoints[bpKey]?.size - 1}px){.af-xml-grid${selector} {${varsStr}}}`;
  }).join('');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", null, rules);
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('af/xml-grid', {
  edit: ({
    attributes,
    setAttributes
  }) => {
    const {
      settings = {}
    } = attributes;
    const {
      feed,
      itemsMobile,
      itemsSmall,
      itemsLarge,
      breakpointSmall,
      breakpointLarge,
      maxItems,
      dateFormat,
      buttonLabel,
      imageSize,
      centered
    } = settings;
    const breakpoints = window?.AF?.breakpoints || {};
    const breakpointsOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
      return [{
        label: 'Select',
        value: ''
      }, ...Object.entries(breakpoints).map(([key, value]) => {
        var _value$label;
        return {
          label: (_value$label = value?.label) !== null && _value$label !== void 0 ? _value$label : key,
          value: key
        };
      })];
    }, [breakpoints]);
    const instanceId = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_6__.useInstanceId)(Object, 'af-xml-grid');
    const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)({
      className: blockClassNames(attributes),
      style: Object.fromEntries(Object.entries({
        '--column-gap': resolvePresetVar(attributes?.style?.spacing?.blockGap?.left),
        '--row-gap': resolvePresetVar(attributes?.style?.spacing?.blockGap?.top)
      }).filter(([_, v]) => v !== undefined))
    });
    const innerBlocksProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useInnerBlocksProps)(blockProps, {});
    const updateSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)((newValue = {}) => {
      const newSettings = {
        ...settings,
        ...newValue
      };

      // Only set if something actually changed
      if (!(0,lodash__WEBPACK_IMPORTED_MODULE_5__.isEqual)(settings, newSettings)) {
        newSettings.css = buildCssProps(newSettings);
        newSettings.instanceId = instanceId;
        setAttributes({
          settings: newSettings
        });
      }
    }, [settings, setAttributes]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalGrid, {
      columns: 1,
      columnGap: 10,
      rowGap: 10
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      key: 'feed',
      label: 'Feed',
      value: feed,
      onChange: newValue => updateSettings({
        feed: newValue
      }),
      options: FEED_OPTIONS,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalGrid, {
      columns: 3,
      columnGap: 10,
      rowGap: 10
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalNumberControl, {
      key: 'itemsMobile',
      label: "Mobile",
      value: itemsMobile,
      onChange: newValue => updateSettings({
        itemsMobile: newValue
      }),
      min: 1,
      max: 4,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalNumberControl, {
      key: 'itemsSmall',
      label: "Small",
      value: itemsSmall,
      onChange: newValue => updateSettings({
        itemsSmall: newValue
      }),
      min: 2,
      max: 6,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalNumberControl, {
      key: 'itemsLarge',
      label: "Large",
      value: itemsLarge,
      onChange: newValue => updateSettings({
        itemsLarge: newValue
      }),
      min: 2,
      max: 6,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalGrid, {
      columns: 2,
      columnGap: 10,
      rowGap: 10
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      key: 'breakpointSmall',
      label: "Breakpoint Sm",
      value: breakpointSmall,
      onChange: newValue => updateSettings({
        breakpointSmall: newValue
      }),
      options: breakpointsOptions,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      key: 'breakpointLarge',
      label: "Breakpoint Lg",
      value: breakpointLarge,
      onChange: newValue => updateSettings({
        breakpointLarge: newValue
      }),
      options: breakpointsOptions,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalNumberControl, {
      key: 'maxItems',
      label: "Max Items",
      value: maxItems,
      onChange: newValue => updateSettings({
        maxItems: newValue
      }),
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      key: "dateFormat",
      label: "Date Format",
      value: dateFormat,
      options: DATE_FORMAT_OPTIONS,
      onChange: newValue => updateSettings({
        dateFormat: newValue
      }),
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      key: 'imageSize',
      label: "Image Size",
      value: imageSize,
      onChange: newValue => updateSettings({
        imageSize: newValue
      }),
      options: IMAGE_SIZE_OPTIONS,
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      key: 'buttonLabel',
      label: 'Button Label',
      value: buttonLabel,
      onChange: newValue => updateSettings({
        buttonLabel: newValue
      }),
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalGrid, {
      columns: 2,
      columnGap: 10,
      rowGap: 10,
      style: {
        marginTop: '15px'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
      key: 'centered',
      label: 'Centered',
      checked: !!centered,
      onChange: newValue => updateSettings({
        centered: newValue
      }),
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true
    }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...innerBlocksProps
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Style, {
      settings: settings,
      breakpoints: breakpoints
    }));
  },
  save: ({
    attributes
  }) => {
    const {
      settings = {}
    } = attributes;
    const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save({
      className: blockClassNames(attributes),
      'data-wp-interactive': 'af/xml-grid',
      'data-wp-context': JSON.stringify({
        feed: settings?.feed || '',
        dateFormat: settings?.dateFormat || '',
        maxItems: settings?.maxItems || 12,
        imageSize: settings?.imageSize
      }),
      'data-wp-init': 'actions.init',
      style: Object.fromEntries(Object.entries({
        '--column-gap': resolvePresetVar(attributes?.style?.spacing?.blockGap?.left),
        '--row-gap': resolvePresetVar(attributes?.style?.spacing?.blockGap?.top),
        'column-gap': resolvePresetVar(attributes?.style?.spacing?.blockGap?.left),
        'row-gap': resolvePresetVar(attributes?.style?.spacing?.blockGap?.top)
      }).filter(([_, v]) => v !== undefined))
    });

    /*
    * Return
    * - Block wrapper
    * --- Card template
    * --- Pagination button
    * */

    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("template", {
      "data-wp-each--item": 'state.items',
      "data-wp-each-key": 'context.item.guid'
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: 'af-xml-grid__footer',
      "data-wp-class--hidden": "!state.hasMore"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      class: "wp-element-button",
      "data-wp-on--click": "actions.loadMore"
    }, "Load more")));
  }
});

/***/ }),

/***/ "./src/blocks/af-xml-grid/style.scss":
/*!*******************************************!*\
  !*** ./src/blocks/af-xml-grid/style.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["lodash"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"af-xml-grid/index": 0,
/******/ 			"af-xml-grid/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkaf_xml_grid"] = globalThis["webpackChunkaf_xml_grid"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["af-xml-grid/style-index"], () => (__webpack_require__("./src/blocks/af-xml-grid/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map