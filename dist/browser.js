!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Emitter=t()}(this,function(){"use strict";function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function e(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},s=Object.keys(e);for(i=0;i<s.length;i++)n=s[i],0<=t.indexOf(n)||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],0<=t.indexOf(n)||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=Date.now(),s=function(){function h(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=t.bubbles,i=void 0!==n&&n,r=t.cancelable,s=void 0!==r&&r,o=t.composed,c=void 0!==o&&o,u=t.target,a=void 0===u?null:u,l=d(t,["bubbles","cancelable","composed","target"]);f(this,h),v(this,"timeStamp",Date.now()-p),v(this,"defaultPrevented",!1),v(this,"cancelBubble",!1),v(this,"returnValue",!0),v(this,"isTrusted",!0),v(this,"eventPhase",0),v(this,"srcElement",null),v(this,"stopped",!1),Object.assign(this,l),this.type=e,this.bubbles=i,this.cancelable=s,this.composed=c,this.target=a,this.currentTarget=a}return e(h,[{key:"preventDefault",value:function(){this.cancelable&&(this.defaultPrevented=!0)}},{key:"stopPropagation",value:function(){this.cancelBubble=!0}},{key:"stopImmediatePropagation",value:function(){this.stopped=!0}}]),h}();return function(){function n(e){var t=this;f(this,n),v(this,"listeners",{}),v(this,"synced",new Map),v(this,"delegate",function(e){return t.dispatchEvent(e,e.target)}),v(this,"mixin",Object.getOwnPropertyDescriptors({addEventListener:this.addEventListener.bind(this),removeEventListener:this.removeEventListener.bind(this),dispatchEvent:this.dispatchEvent.bind(this),on:this.on.bind(this),off:this.off.bind(this),once:this.once.bind(this),emit:this.emit.bind(this),sync:this.sync.bind(this),unsync:this.unsync.bind(this)})),this.target=e||this}return e(n,[{key:"addEventListener",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2];e in this.listeners||(this.listeners[e]=[]),this.listeners[e].push(this.constructor.listener(n,t))}},{key:"removeEventListener",value:function(e,i){var t=2<arguments.length&&void 0!==arguments[2]&&arguments[2];if(e in this.listeners){i=this.constructor.listener(t,i);var n=this.listeners[e].findIndex(function(e){var t=e.subject,n=e.capture;return t===i.subject&&n===i.capture});-1!==n&&this.listeners[e].splice(n,1),0===this.listeners[e].length&&delete this.listeners[e]}}},{key:"dispatchEvent",value:function(i){var r=this,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;if(i.type in this.listeners){var t=[];this.listeners[i.type].some(function(e){return e.once&&t.push(e),e.subject.handleEvent?e.subject.handleEvent(i):e.subject.call(r,i),i.stopped}),t.forEach(function(e){var t=e.subject,n=d(e,["subject"]);r.removeEventListener(i.type,t,n)})}if(e&&this.synced.has(e)){var n=this.synced.get(e);i.type in n&&n[i.type].once&&delete n[i.type]}return!i.defaultPrevented}},{key:"on",value:function(e,t){var n=this,i=2<arguments.length&&void 0!==arguments[2]&&arguments[2];return this.constructor.types(e).forEach(function(e){n.addEventListener(e,t,i)}),this.target}},{key:"off",value:function(e,t){var n=this,i=2<arguments.length&&void 0!==arguments[2]&&arguments[2];return this.constructor.types(e).forEach(function(e){n.removeEventListener(e,t,i)}),this.target}},{key:"once",value:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2];return this.on(e,t,function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(e){v(t,e,n[e])})}return t}({},this.constructor.listener(n),{once:!0}))}},{key:"emit",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=new s(e,t);return n.target=n.currentTarget=this.target,this.dispatchEvent(n),this.target}},{key:"sync",value:function(e,t){var n=this,i=2<arguments.length&&void 0!==arguments[2]&&arguments[2],r=this.constructor.types(e);if(console.log(r),r.length){this.synced.has(t)||this.synced.set(t,{});var s=this.synced.get(t),o=this.constructor.listener(i);r.forEach(function(e){e in s&&t.removeEventListener(e,n.delegate,s[e]),t.addEventListener(e,n.delegate,i),s[e]=o})}return this.target}},{key:"unsync",value:function(e,t){var n=this,i=2<arguments.length&&void 0!==arguments[2]&&arguments[2];if(this.synced.has(t)){var r=this.synced.get(t),s=this.constructor.listener(i);this.constructor.types(e).forEach(function(e){e in r&&r[e].capture===s.capture&&(t.removeEventListener(e,n.delegate,i),delete r[e])})}return this.target}},{key:"mix",value:function(e){return Object.defineProperties(e,this.mixin)}}],[{key:"listener",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;null!==e&&"object"===i(e)||(e={capture:!!e});var n={once:e.once||!1,passive:e.passive||!1,capture:e.capture||!1};return t&&(n.subject=t),n}},{key:"types",value:function(e){return e.trim().replace(/\s+/," ").split(" ").filter(function(e,t,n){return n.indexOf(e)===t})}},{key:"mix",value:function(e){return new this(e).mix(e)}}]),n}()});