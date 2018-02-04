'use strict';

class RouterLocation extends HTMLElement
{
    static get observedAttributes() {
        return [];
    }

    constructor() {
        super();

        this._bodyObserver = undefined;

        // Bind event listeners callbacks
        this._onHistoryPopState = this._onHistoryPopState.bind(this);

        // Remove element from the accessable DOM tree
        this.style.display = 'none';
        this.style.visibility = 'hidden';
    }

    connectedCallback() {
        this._startBodyObserver();
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._stopBodyObserver();
        this._removeEventListners();
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
    }

    _startBodyObserver() {
        if (this._bodyObserver === undefined) {
            this._bodyObserver = new MutationObserver((mutationsList) => {
                console.log(mutationsList);
                console.log(window.location);
            });
        } else {
            this._bodyObserver.disconnect();
        }
        const bodyNode = document.getElementsByTagName('body').item(0); // Node|null
        const observerConfig = {
            childList: true
        };
        this._bodyObserver.observe(bodyNode, observerConfig);
    }

    _stopBodyObserver() {
        this._bodyObserver.disconnect();
    }

    _onHistoryPopState(evt) {
        const currentState = window.history.currentState;
        const eventState = evt.state;
        console.log(currentState);
        console.log(eventState);
        console.log(window.location);
    }

    _addEventListeners() {
        this._addPopStateListener();
    }

    _removeEventListners() {
        this._removePopStateListener();
    }

    _addPopStateListener() {
        window.addEventListener('popstate', this._onHistoryPopState, false);
    }

    _removePopStateListener() {
        window.removeEventListener('popstate', this._onHistoryPopState, false);
    }
}
window.customElements.define('router-location', RouterLocation);

export default RouterLocation;
