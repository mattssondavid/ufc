
class RouterRoute extends HTMLElement
{
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();
    }

    connectedCallback() {

    }

    disconnectedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {
    }
}
window.customElements.define('router-route', RouterRoute);

export default RouterRoute;
