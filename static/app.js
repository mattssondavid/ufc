'use strict';

import customElements from './CustomElements.js';

class App extends HTMLElement {
    static get observedAttributes() {
        return [
            'disabled',
        ];
    }

    constructor() {
        super();
        console.log('constructor');
    }

    connectedCallback() {
        console.log('Added to DOM');
        this.innerHTML = '<p>Hello world!</p>';
    }

    disconnectedCallback() {
        console.log('Removed from DOM');
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(`Attribute ${attrName} change from ${oldVal} to ${newVal}`);
    }
}

customElements.define('app-main', App);
