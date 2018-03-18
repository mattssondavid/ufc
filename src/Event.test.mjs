import {
    eventResult,
    eventMap,
    getState,
    putState,
    event,
    eventQueue
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

mocha.describe('Event', () => {
    mocha.it('have a time and action', () => {
        let time = 'TIME';
        let action = 'ACTION';
        let e = event(time, action);
        expect(e.time).to.equal(time);
        expect(e.action).to.equal(action);
    });
});

mocha.describe('eventQueue', () => {
    mocha.it('creates a min heap with events', function () {
        let event1 = event(10, () => null);
        let event2 = event(12, () => null);
        let q = eventQueue(event1).merge(eventQueue(event2));
        expect(q.peek()).to.equal(event1);
    });
});
/*
ToDo: The rest of the events (bind for event)
ToDo: Be able to flatten a eventResult (bind/flat-map)

ToDo: Implement a while that pop:s events from the eventQueue. Similar code that
handles the event queue that state-handling has to be implemented
*/