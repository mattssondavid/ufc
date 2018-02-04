'use strict';
class App extends HTMLElement {
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

    static get observedAttributes() {
        return [
            'disabled',
        ];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log(`Attribute ${attrName} change from ${oldVal} to ${newVal}`);
    }
}

customElements.define('app-main', App);
