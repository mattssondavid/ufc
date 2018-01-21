
class App extends HTMLElement {
    constructor() {
        super();
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
