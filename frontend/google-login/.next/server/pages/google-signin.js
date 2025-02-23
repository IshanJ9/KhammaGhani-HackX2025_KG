"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/google-signin";
exports.ids = ["pages/google-signin"];
exports.modules = {

/***/ "./pages/google-signin.js":
/*!********************************!*\
  !*** ./pages/google-signin.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ \"next-auth/react\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst SignInPage = ()=>{\n    const { data: session , status  } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (!(status === \"loading\") && !session) void (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.signIn)(\"google\");\n        if (session) window.close();\n    }, [\n        session,\n        status\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            width: \"100vw\",\n            height: \"100vh\",\n            position: \"absolute\",\n            left: 0,\n            top: 0,\n            background: \"white\"\n        }\n    }, void 0, false, {\n        fileName: \"D:\\\\HackX\\\\frontend\\\\google-login\\\\pages\\\\google-signin.js\",\n        lineNumber: 13,\n        columnNumber: 9\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SignInPage);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9nb29nbGUtc2lnbmluLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFxRDtBQUNuQjtBQUVsQyxNQUFNRyxVQUFVLEdBQUcsSUFBTTtJQUNyQixNQUFNLEVBQUVDLElBQUksRUFBRUMsT0FBTyxHQUFFQyxNQUFNLEdBQUUsR0FBR0wsMkRBQVUsRUFBRTtJQUU5Q0MsZ0RBQVMsQ0FBQyxJQUFNO1FBQ1osSUFBSSxDQUFDLENBQUNJLE1BQU0sS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDRCxPQUFPLEVBQUUsS0FBS0wsdURBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvRCxJQUFJSyxPQUFPLEVBQUVFLE1BQU0sQ0FBQ0MsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQyxFQUFFO1FBQUNILE9BQU87UUFBRUMsTUFBTTtLQUFDLENBQUMsQ0FBQztJQUV0QixxQkFDSSw4REFBQ0csS0FBRztRQUNBQyxLQUFLLEVBQUU7WUFDSEMsS0FBSyxFQUFFLE9BQU87WUFDZEMsTUFBTSxFQUFFLE9BQU87WUFDZkMsUUFBUSxFQUFFLFVBQVU7WUFDcEJDLElBQUksRUFBRSxDQUFDO1lBQ1BDLEdBQUcsRUFBRSxDQUFDO1lBQ05DLFVBQVUsRUFBRSxPQUFPO1NBQ3RCOzs7OztpQkFDRSxDQUNUO0FBQ04sQ0FBQztBQUVELGlFQUFlYixVQUFVLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0YXV0aC1nb29nbGUtcG9wdXAtbG9naW4vLi9wYWdlcy9nb29nbGUtc2lnbmluLmpzPzZjYzAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2lnbkluLCB1c2VTZXNzaW9uIH0gZnJvbSBcIm5leHQtYXV0aC9yZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IFNpZ25JblBhZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCB7IGRhdGE6IHNlc3Npb24sIHN0YXR1cyB9ID0gdXNlU2Vzc2lvbigpO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCEoc3RhdHVzID09PSBcImxvYWRpbmdcIikgJiYgIXNlc3Npb24pIHZvaWQgc2lnbkluKFwiZ29vZ2xlXCIpO1xyXG4gICAgICAgIGlmIChzZXNzaW9uKSB3aW5kb3cuY2xvc2UoKTtcclxuICAgIH0sIFtzZXNzaW9uLCBzdGF0dXNdKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMHZ3XCIsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTAwdmhcIixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXHJcbiAgICAgICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWduSW5QYWdlOyJdLCJuYW1lcyI6WyJzaWduSW4iLCJ1c2VTZXNzaW9uIiwidXNlRWZmZWN0IiwiU2lnbkluUGFnZSIsImRhdGEiLCJzZXNzaW9uIiwic3RhdHVzIiwid2luZG93IiwiY2xvc2UiLCJkaXYiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwicG9zaXRpb24iLCJsZWZ0IiwidG9wIiwiYmFja2dyb3VuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/google-signin.js\n");

/***/ }),

/***/ "next-auth/react":
/*!**********************************!*\
  !*** external "next-auth/react" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/google-signin.js"));
module.exports = __webpack_exports__;

})();