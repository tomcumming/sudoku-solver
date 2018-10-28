!function(t){var e={};function s(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(i,n,function(e){return t[e]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=0)}([function(t,e,s){"use strict";s.r(e);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const i=new WeakMap,n=t=>"function"==typeof t&&i.has(t),r=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(t,e,s=null)=>{let i=e;for(;i!==s;){const e=i.nextSibling;t.removeChild(i),i=e}},a={},l=`{{lit-${String(Math.random()).slice(2)}}}`,c=`\x3c!--${l}--\x3e`,d=new RegExp(`${l}|${c}`),h=(()=>{const t=document.createElement("div");return t.setAttribute("style","{{bad value}}"),"{{bad value}}"!==t.getAttribute("style")})();class u{constructor(t,e){this.parts=[],this.element=e;let s=-1,i=0;const n=[],r=e=>{const o=e.content,a=document.createTreeWalker(o,133,null,!1);let c,u;for(;a.nextNode();){s++,c=u;const e=u=a.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let r=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(l)>=0&&r++;for(;r-- >0;){const n=t.strings[i],r=m.exec(n)[2],o=h&&"style"===r?"style$":/^[a-zA-Z-]*$/.test(r)?r:r.toLowerCase(),a=e.getAttribute(o).split(d);this.parts.push({type:"attribute",index:s,name:r,strings:a}),e.removeAttribute(o),i+=a.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3===e.nodeType){const t=e.nodeValue;if(t.indexOf(l)<0)continue;const r=e.parentNode,o=t.split(d),a=o.length-1;i+=a;for(let t=0;t<a;t++)r.insertBefore(""===o[t]?f():document.createTextNode(o[t]),e),this.parts.push({type:"node",index:s++});r.insertBefore(""===o[a]?f():document.createTextNode(o[a]),e),n.push(e)}else if(8===e.nodeType)if(e.nodeValue===l){const t=e.parentNode,r=e.previousSibling;null===r||r!==c||r.nodeType!==Node.TEXT_NODE?t.insertBefore(f(),e):s--,this.parts.push({type:"node",index:s++}),n.push(e),null===e.nextSibling?t.insertBefore(f(),e):s--,u=c,i++}else{let t=-1;for(;-1!==(t=e.nodeValue.indexOf(l,t+1));)this.parts.push({type:"node",index:-1})}}};r(e);for(const t of n)t.parentNode.removeChild(t)}}const p=t=>-1!==t.index,f=()=>document.createComment(""),m=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class v{constructor(t,e,s){this._parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this._parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=r?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let s=0,i=0;const n=t=>{const r=document.createTreeWalker(t,133,null,!1);let o=r.nextNode();for(;s<e.length&&null!==o;){const t=e[s];if(p(t))if(i===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(o),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(o,t.name,t.strings,this.options));s++}else i++,"TEMPLATE"===o.nodeName&&n(o.content),o=r.nextNode();else this._parts.push(void 0),s++}};return n(t),r&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class g{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="",s=!0;for(let i=0;i<t;i++){const t=this.strings[i];e+=t;const n=t.lastIndexOf(">");!(s=(n>-1||s)&&-1===t.indexOf("<",n+1))&&h&&(e=e.replace(m,(t,e,s,i)=>"style"===s?`${e}style$${i}`:t)),e+=s?c:l}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const y=t=>null===t||!("object"==typeof t||"function"==typeof t);class _{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new b(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)s+="string"==typeof e?e:String(e);else s+="string"==typeof t?t:String(t)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===a||y(t)&&t===this.value||(this.value=t,n(t)||(this.committer.dirty=!0))}commit(){for(;n(this.value);){const t=this.value;this.value=a,t(this)}this.value!==a&&this.committer.commit()}}class w{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(f()),this.endNode=t.appendChild(f())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=f()),t._insert(this.endNode=f())}insertAfterPart(t){t._insert(this.startNode=f()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;n(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}const t=this._pendingValue;t!==a&&(y(t)?t!==this.value&&this._commitText(t):t instanceof g?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):void 0!==t.then?this._commitPromise(t):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&e.nodeType===Node.TEXT_NODE?e.textContent=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value&&this.value.template===e)this.value.update(t.values);else{const s=new v(e,t.processor,this.options),i=s._clone();s.update(t.values),this._commitNode(i),this.value=s}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)void 0===(s=e[i])&&(s=new w(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}_commitPromise(t){this.value=t,t.then(e=>{this.value===t&&(this.setValue(e),this.commit())})}clear(t=this.startNode){o(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this._pendingValue=t}commit(){for(;n(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}if(this._pendingValue===a)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=a}}class P extends _{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new S(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class S extends b{}let N=!1;try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class T{constructor(t,e,s){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s}setValue(t){this._pendingValue=t}commit(){for(;n(this._pendingValue);){const t=this._pendingValue;this._pendingValue=a,t(this)}if(this._pendingValue===a)return;const t=this._pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),i=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this,this._options),this._options=C(t),i&&this.element.addEventListener(this.eventName,this,this._options),this.value=t,this._pendingValue=a}handleEvent(t){("function"==typeof this.value?this.value:"function"==typeof this.value.handleEvent?this.value.handleEvent:()=>null).call(this.eventContext||this.element,t)}}const C=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const E=new class{handleAttributeExpressions(t,e,s,i){const n=e[0];return"."===n?new P(t,e.slice(1),s).parts:"@"===n?[new T(t,e.slice(1),i.eventContext)]:"?"===n?[new x(t,e.slice(1),s)]:new _(t,e,s).parts}handleTextExpression(t){return new w(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function O(t){let e=V.get(t.type);void 0===e&&(e=new Map,V.set(t.type,e));let s=e.get(t.strings);return void 0===s&&(s=new u(t,t.getTemplateElement()),e.set(t.strings,s)),s}const V=new Map,A=new WeakMap,M=(t,...e)=>new g(t,e,"html",E),k=NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT|NodeFilter.SHOW_TEXT;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function $(t,e){const{element:{content:s},parts:i}=t,n=document.createTreeWalker(s,k,null,!1);let r=j(i),o=i[r],a=-1,l=0;const c=[];let d=null;for(;n.nextNode();){a++;const t=n.currentNode;for(t.previousSibling===d&&(d=null),e.has(t)&&(c.push(t),null===d&&(d=t)),null!==d&&l++;void 0!==o&&o.index===a;)o.index=null!==d?-1:o.index-l,o=i[r=j(i,r)]}c.forEach(t=>t.parentNode.removeChild(t))}const z=t=>{let e=t.nodeType===Node.DOCUMENT_FRAGMENT_NODE?0:1;const s=document.createTreeWalker(t,k,null,!1);for(;s.nextNode();)e++;return e},j=(t,e=-1)=>{for(let s=e+1;s<t.length;s++){const e=t[s];if(p(e))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const R=(t,e)=>`${t}--${e}`;let F=!0;void 0===window.ShadyCSS?F=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected.Please update to at least @webcomponents/webcomponentsjs@2.0.2 and@webcomponents/shadycss@1.3.1."),F=!1);const I=["html","svg"],U=new Set,q=(t,e,s)=>{U.add(s);const i=t.querySelectorAll("style");if(0===i.length)return;const n=document.createElement("style");for(let t=0;t<i.length;t++){const e=i[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}if((t=>{I.forEach(e=>{const s=V.get(R(e,t));void 0!==s&&s.forEach(t=>{const{element:{content:e}}=t,s=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{s.add(t)}),$(t,s)})})})(s),function(t,e,s=null){const{element:{content:i},parts:n}=t;if(null===s||void 0===s)return void i.appendChild(e);const r=document.createTreeWalker(i,k,null,!1);let o=j(n),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===s&&(a=z(e),s.parentNode.insertBefore(e,s));-1!==o&&n[o].index===l;){if(a>0){for(;-1!==o;)n[o].index+=a,o=j(n,o);return}o=j(n,o)}}(e,n,e.element.content.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,s),window.ShadyCSS.nativeShadow){const s=e.element.content.querySelector("style");t.insertBefore(s.cloneNode(!0),t.firstChild)}else{e.element.content.insertBefore(n,e.element.content.firstChild);const t=new Set;t.add(n),$(e,t)}},L=t=>null!==t,B=t=>t?"":null,D=(t,e)=>e!==t&&(e==e||t==t),W={attribute:!0,type:String,reflect:!1,hasChanged:D},H=new Promise(t=>t(!0)),X=1,G=4,K=8;class Z extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=H,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this._finalize();const t=[];for(const[e,s]of this._classProperties){const i=this._attributeNameForProperty(e,s);void 0!==i&&(this._attributeToPropertyMap.set(i,e),t.push(i))}return t}static createProperty(t,e=W){if(!this.hasOwnProperty("_classProperties")){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}if(this._classProperties.set(t,e),this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[s]},set(i){const n=this[t];this[s]=i,this._requestPropertyUpdate(t,n,e)},configurable:!0,enumerable:!0})}static _finalize(){if(this.hasOwnProperty("_finalized")&&this._finalized)return;const t=Object.getPrototypeOf(this);"function"==typeof t._finalize&&t._finalize(),this._finalized=!0,this._attributeToPropertyMap=new Map;const e=this.properties,s=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const t of s)this.createProperty(t,e[t])}static _attributeNameForProperty(t,e){const s=void 0!==e&&e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=D){return s(t,e)}static _propertyValueFromAttribute(t,e){const s=e&&e.type;if(void 0===s)return t;const i=s===Boolean?L:"function"==typeof s?s:s.fromAttribute;return i?i(t):t}static _propertyValueToAttribute(t,e){if(void 0===e||void 0===e.reflect)return;return(e.type===Boolean?B:e.type&&e.type.toAttribute||String)(t)}initialize(){this.renderRoot=this.createRenderRoot(),this._saveInstanceProperties()}_saveInstanceProperties(){for(const[t]of this.constructor._classProperties)if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}_applyInstanceProperties(){for(const[t,e]of this._instanceProperties)this[t]=e;this._instanceProperties=void 0}createRenderRoot(){return this.attachShadow({mode:"open"})}connectedCallback(){this._updateState&X?void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this):this.requestUpdate()}disconnectedCallback(){}attributeChangedCallback(t,e,s){e!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,e,s=W){const i=this.constructor,n=i._propertyValueToAttribute(e,s);if(void 0!==n){const e=i._attributeNameForProperty(t,s);void 0!==e&&(this._updateState=this._updateState|K,null===n?this.removeAttribute(e):this.setAttribute(e,n),this._updateState=this._updateState&~K)}}_attributeToProperty(t,e){if(!(this._updateState&K)){const s=this.constructor,i=s._attributeToPropertyMap.get(t);if(void 0!==i){const t=s._classProperties.get(i);this[i]=s._propertyValueFromAttribute(e,t)}}}requestUpdate(t,e){if(void 0!==t){const s=this.constructor._classProperties.get(t)||W;return this._requestPropertyUpdate(t,e,s)}return this._invalidate()}_requestPropertyUpdate(t,e,s){return this.constructor._valueHasChanged(this[t],e,s.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0===s.reflect&&(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,s)),this._invalidate()):this.updateComplete}async _invalidate(){if(!this._hasRequestedUpdate){let t;this._updateState=this._updateState|G;const e=this._updatePromise;this._updatePromise=new Promise(e=>t=e),await e,this._validate(),t(!this._hasRequestedUpdate)}return this.updateComplete}get _hasRequestedUpdate(){return this._updateState&G}_validate(){if(this._instanceProperties&&this._applyInstanceProperties(),this.shouldUpdate(this._changedProperties)){const t=this._changedProperties;this.update(t),this._markUpdated(),this._updateState&X||(this._updateState=this._updateState|X,this.firstUpdated(t)),this.updated(t)}else this._markUpdated()}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~G}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){if(void 0!==this._reflectingProperties&&this._reflectingProperties.size>0){for(const[t,e]of this._reflectingProperties)this._propertyToAttribute(t,this[t],e);this._reflectingProperties=void 0}}updated(t){}firstUpdated(t){}}Z._attributeToPropertyMap=new Map,Z._finalized=!0,Z._classProperties=new Map,Z.properties={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const J=t=>e=>(window.customElements.define(t,e),e),Q=t=>(e,s)=>{e.constructor.createProperty(s,t)};Y((t,e)=>t.querySelector(e)),Y((t,e)=>t.querySelectorAll(e));function Y(t){return e=>(s,i)=>{Object.defineProperty(s,i,{get(){return t(this.renderRoot,e)},enumerable:!0,configurable:!0})}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class tt extends Z{update(t){super.update(t);const e=this.render();e instanceof g&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this})}render(){}}function et(t,e){return 9*e+t}function st(t){let e=[];for(let s=0;s<81;s+=1)e.push(t(s));return e}function it(t,e,s,i){function n(n){return e.length>n?e[n]:void 0!==s[n]?s[n]:n===t?i:void 0}const r=n(t);if(void 0===r)return!0;const o=Math.floor(t/9),a=t%9;for(let e=9*o;e<9*o+9;e+=1)if(e!==t&&n(e)===r)return!1;for(let e=a;e<81;e+=9)if(e!==t&&n(e)===r)return!1;for(let e=0;e<3;e+=1)for(let s=0;s<3;s+=1){const i=3*Math.floor(o/3)*9+3*Math.floor(a/3)+s+9*e;if(i!==t&&n(i)===r)return!1}return!0}tt.render=((t,e,s)=>{const i=s.scopeName,n=A.has(e);if(((t,e,s)=>{let i=A.get(e);void 0===i&&(o(e,e.firstChild),A.set(e,i=new w(Object.assign({templateFactory:O},s))),i.appendInto(e)),i.setValue(t),i.commit()})(t,e,Object.assign({templateFactory:(t=>e=>{const s=R(e.type,t);let i=V.get(s);void 0===i&&(i=new Map,V.set(s,i));let n=i.get(e.strings);if(void 0===n){const s=e.getTemplateElement();F&&window.ShadyCSS.prepareTemplateDom(s,t),n=new u(e,s),i.set(e.strings,n)}return n})(i)},s)),e instanceof ShadowRoot&&F&&t instanceof g){if(!U.has(i)){const t=A.get(e).value;q(e,t.template,i)}n||window.ShadyCSS.styleElement(e.host)}});var nt=function(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o};const rt=M`
<style>
    :host {
        --cell-size: 10vmin;
    }

    :host {
        font-family: 'sans-serif';
    }

    :host .wrapper {
        background-color: darkgray;
        text-align: center;
        border-radius: 1vmin;
        padding: 1vmin;

        box-shadow: black 0 0.5vmin 2vmin;
    }

    :host .wrapper > h2 {
        font-size: 5vmin;
        margin: 1vmin;
        color: white;
        text-shadow: black 0 0 2vmin;
    }

    :host .wrapper button.clear-grid {
        font-size: 4vmin;
        width: 100%;
        margin-top: 1vmin;
    }
</style>
`;let ot=class extends tt{constructor(){super(...arguments),this.state={invalids:st(()=>!1),constraints:st(()=>void 0)},this.onCellChange=(t=>{const e=this.state.constraints.slice();e[t.index]=t.value,this.setConstraints(e)}),this.onClear=(t=>this.setConstraints(st(()=>void 0)))}setConstraints(t){const e=function(t){let e=[];for(let s=0;s<81;s+=1)e.push(!it(s,[],t));return e}(t);let s;e.every(t=>!t)&&(s=function*t(e,s=[]){if(81===s.length&&(yield s),void 0!==e[s.length])yield*t(e,s.concat(e[s.length]));else for(const i of[1,2,3,4,5,6,7,8,9])it(s.length,s,e,i)&&(yield*t(e,s.concat(i)))}(t).next().value),this.state={invalids:e,constraints:t,solution:s}}render(){return M`
            ${rt}
            <div class="wrapper">
                <h2>Sudoku Solver!</h2>
                <sudoku-grid
                    .invalids="${this.state.invalids}"
                    .constraints="${this.state.constraints}"
                    .solution="${this.state.solution}"
                    @cellchange="${this.onCellChange}"
                >
                </sudoku-grid>

                <button
                    class="clear-grid"
                    @click="${this.onClear}"
                >
                    Clear Grid
                </button>

            </div>
        `}};nt([Q()],ot.prototype,"state",void 0),ot=nt([J("sudoku-solver")],ot);var at=function(t,e,s,i){var n,r=arguments.length,o=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,s,o):n(e,s))||o);return r>3&&o&&Object.defineProperty(e,s,o),o};const lt=M`
<style>
    :host {
        --border-size: 1px; // calc(var(--cell-size) * 0.05);
    }

    :host .grid {
        display: flex;
        flex-direction: column;
        border: var(--border-size) solid black;
    }

    :host .row {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
    }

    :host .row[data-group-end] {
        border-bottom: var(--border-size) solid black;
    }

    :host .cell {
        width: var(--cell-size);
        height: var(--cell-size);
        border-left: var(--border-size) solid black;
        border-top: var(--border-size) solid black;

        background: white;
    }

    :host .cell[data-group-end] {
        border-right: var(--border-size) solid black;
    }

    :host .cell input[data-invalid] {
        background: pink;
    }

    :host .cell input {
        border: 0;
        width: var(--cell-size);
        height: var(--cell-size);
        text-align: center;
        font-size: calc(var(--cell-size) * 0.8);
    }
</style>
`;let ct=class extends tt{constructor(){super(...arguments),this.onInput=(t=>{const e=t.currentTarget;this.changedCell(e,e.value)}),this.onKeyDown=(t=>{t.preventDefault();const e=t.currentTarget;e.blur();parseInt(t.key);this.changedCell(e,t.key)})}changedCell(t,e){const s=parseInt(e),i=s>0&&s<10?s:void 0,n=et(Number(t.getAttribute("data-col")),Number(t.getAttribute("data-row")));this.dispatchEvent(new class extends Event{constructor(t,e){super("cellchange"),this.index=t,this.value=e}}(n,i))}render(){const t=[0,1,2,3,4,5,6,7,8].map(t=>{const e=[0,1,2,3,4,5,6,7,8].map(e=>{const s=void 0===this.constraints?void 0:this.constraints[et(e,t)],i=void 0!==this.solution?this.solution[et(e,t)].toString():"",n=void 0!==this.invalids&&this.invalids[et(e,t)];return M`
                            <div
                                class="cell"
                                ?data-group-end="${e%3==2}"
                            >
                                <input
                                    type="number"
                                    min="1"
                                    max="9"
                                    data-row="${t}"
                                    data-col="${e}"
                                    ?data-invalid="${n}"
                                    @input="${this.onInput}"
                                    @keydown="${this.onKeyDown}"
                                    .value="${void 0===s?"":s}"
                                    placeholder="${i}"
                                    />
                            </div>
                        `});return M`
                    <div
                        class="row"
                        ?data-group-end="${t%3==2}"
                    >
                        ${e}
                    </div>
                `});return M`
            ${lt}
            <div class="grid">
                ${t}
            </div class="grid">
        `}};at([Q()],ct.prototype,"invalids",void 0),at([Q()],ct.prototype,"constraints",void 0),at([Q()],ct.prototype,"solution",void 0),ct=at([J("sudoku-grid")],ct)}]);