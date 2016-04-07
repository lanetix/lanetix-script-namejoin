module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.handler = handler;

	var _api = __webpack_require__(1);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function handler(event, _ref) {
	  var succeed = _ref.succeed;
	  var fail = _ref.fail;

	  console.log('event: ' + JSON.stringify(event, null, 2));
	  var _event$record = event.record;
	  var id = _event$record.id;
	  var apiName = _event$record.apiName;
	  var priorState = event.priorState;
	  var changeSet = event.changeSet;

	  var request = (0, _api2.default)(event);
	  var done = function done(e, res) {
	    return e ? fail(e) : succeed(res);
	  };
	  var finalState = _extends({}, priorState, changeSet);

	  if (changeSet.first_name || changeSet.first_name) {
	    console.log('No name change, exiting.');
	    return;
	  }

	  var name = finalState.first_name && finalState.last_name ? finalState.first_name + ' ' + finalState.last_name : finalState.first_name ? finalState.first_name : finalState.last_name ? finalState.last_name : 'Unnamed Contact';

	  console.log('Changing name from "' + priorState.name + '" to "' + name + '" with post to /v1/records/' + apiName + '/' + id + '.');

	  request({
	    method: 'PATCH',
	    path: '/v1/records/' + apiName + '/' + id,
	    body: { name: name }
	  }, function (res) {
	    console.log('res', res);
	    done(null, res);
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = API;

	var _https = __webpack_require__(2);

	var _https2 = _interopRequireDefault(_https);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function API(_ref) {
	  var jwt = _ref.jwt;

	  var defaults = {
	    hostname: 'gateway.lanetix.com',
	    headers: {
	      'Accept': 'application/json',
	      'Authorization': 'Bearer ' + jwt,
	      'Content-Type': 'application/json'
	    }
	  };
	  return function request(opts, cb) {
	    return _https2.default.request(_extends({}, defaults, opts), function (res) {
	      var body = '';
	      res.setEncoding('utf8');
	      res.on('data', function (d) {
	        return body += d;
	      });
	      res.on('end', function () {
	        if (res.statusCode >= 200 && res.statusCode < 400) {
	          cb(null, parseJSON(body));
	        } else {
	          var error = new Error('HTTP Response: ' + res.statusCode);
	          error.response = res;
	          error.response.body = parseJSON(body);
	          cb(error);
	        }
	      });
	    }).on('error', cb).end(opts.body && JSON.stringify(opts.body));
	  };
	}

	function parseJSON(body) {
	  try {
	    return JSON.parse(body);
	  } catch (e) {
	    return body;
	  }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ }
/******/ ]);
