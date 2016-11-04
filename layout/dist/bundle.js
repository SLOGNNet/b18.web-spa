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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

throw new Error("Module parse failed: D:\\project\\web-spa\\layout\\assets\\sass\\main.scss Unexpected character '@' (1:0)\nYou may need an appropriate loader to handle this file type.\n| @import \"base.scss\";\n| \n| ");

/***/ },
/* 1 */
/***/ function(module, exports) {

// click on notification icon
document.getElementById("main-notify").onclick = function(){
	if(this.children[1].style.display == "block")
		this.children[1].style.display = "none"; 
	else
		this.children[1].style.display = "block"; 
};


// click on pane switch
var ul = document.getElementById('pane-switch-group'),
	li = ul.getElementsByTagName("li");

ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
      if(e.target.className != "active") {
      	e.target.className = "active";
      } else {
      	e.target.className = "";
      }     
  } 
});

function hideMainMenu(){
	document.getElementById("sidebar-menu").style.marginLeft = "-120px";
	document.getElementById("main-content").style.marginLeft = "0";
}
function showMainMenu(){
	document.getElementById("sidebar-menu").style.marginLeft = "0";
	document.getElementById("main-content").style.marginLeft = "120px";
}

/* click on switch pane */

var pane1 = document.getElementById("toggle-first"),
	pane2 = document.getElementById("toggle-second"),
	pane3 = document.getElementById("toggle-third"),
	pane4 = document.getElementById("toggle-fourth"),
	block1 = document.getElementById("pane-1"),
	block2 = document.getElementById("pane-2"),
	block3 = document.getElementById("pane-3");


pane1.onclick = function(e){
	if(e.target.className != "active"){
		console.log("hide");
		hideMainMenu();
	} else {
		console.log("show");
		showMainMenu();
	}
}

document.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(event) {
	if(pane1.className != "active"){
		return;
	}else if(pane1.className == "active"){
        if (event.clientX <= 50) {
        	showMainMenu();
        } else if(event.clientX >= 50){
        	hideMainMenu();
        }
	}
}




function removeElement(element){
	element.style.display = "none";
};

function addFlexElement(element){
	element.style.display = "flex";
};

// click on pane switch 2
pane2.addEventListener("click", function(e){
	if(e.target.className == "active"){
		removeElement(block1);
	} else{
		addFlexElement(block1);
	}
});

// click on pane switch 3
pane3.addEventListener("click", function(e){
	if(e.target.className == "active"){
		removeElement(block2);
	} else{
		addFlexElement(block2);
	}
});

// click on pane switch 4
pane4.addEventListener("click", function(e){
	if(e.target.className == "active"){
		removeElement(block3);
	} else{
		addFlexElement(block3);
	}
});

/* mobile version */

document.getElementById("mobile-switch").onclick = function(e){
	if(block1.style.display != "none"){
		block1.style.display = "none";
		block2.style.display = "flex";
	} else{
		block2.style.display = "none";
		block1.style.display = "flex";
	}
}

document.getElementById("mobile-menu-btn").onclick = function(e){
	if(e.target.className == "glyphicon glyphicon-align-justify"){
		document.getElementById("sidebar-menu").style.marginLeft = "0";
		e.target.className = "glyphicon glyphicon-chevron-left";
} else{
		document.getElementById("sidebar-menu").style.marginLeft = "-100vw";
		e.target.className = "glyphicon glyphicon-align-justify";
}

}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_sass_main_scss__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_sass_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_sass_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_scripts_ui_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_scripts_ui_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_scripts_ui_js__);




/***/ }
/******/ ]);