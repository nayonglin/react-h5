
import "@babel/polyfill";

// import assign from 'core-js/library/fn/Reflect/set'
import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/sass/common.scss';
import App from './App';
// window.Set = function () {};
// import VConsole from 'vconsole'
// var vConsole = new VConsole();
if(!Object.prototype.__defineGetter__) {
    Object.prototype.__defineGetter__ = function(name, func) {
        Object.defineProperty(name, func);
    }
  }
ReactDOM.render(<App />, document.getElementById('root'));

