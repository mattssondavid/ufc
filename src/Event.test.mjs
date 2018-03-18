import {
    eventResult,
    eventMap,
    getState,
    putState,
} from './Event';

import chai from 'chai';
import tap from 'tap';
const mocha = tap.mocha;
const expect = chai.expect;
mocha.describe("eventResult", () => {
    let value = 'VALUE';
    let state = 'STATE';
    let queue = 'QUEUE';
    let er = eventResult(state, queue, value);
    mocha.it('have a state, a queue and a value', () => {
        expect(er.value).to.equal(value);
        expect(er.state).to.equal(state);
        expect(er.queue).to.equal(queue);
    });
    mocha.it('maps over the value', () => {
        let mappedEr = eventMap(s => s.toLowerCase())(er);
        expect(mappedEr.value).to.equal(value.toLowerCase());
        expect(mappedEr.state).to.equal(state);
        expect(mappedEr.queue).to.equal(queue);
    });
    mocha.describe('getState', () => {
        mocha.it('sets value to the current state', () => {
            let stateEr = getState(er);
            expect(stateEr.value).to.equal(state);
            expect(stateEr.state).to.equal(state);
            expect(stateEr.queue).to.equal(queue);
        });
    });
    mocha.describe('putState', () => {
        mocha.it('puts value to the current state', () => {
            let stateEr = putState(er);
            expect(stateEr.value).to.equal(value);
            expect(stateEr.queue).to.equal(queue);
            expect(stateEr.state).to.equal(value);
        });
    });
});