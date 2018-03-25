import {
    actionResult,
    actionMap,
    getState,
    putState,
    event,
    eventQueue,
    emptyEventQueue,
    pureAction,
    addEvent
} from './Event';

import chai from 'chai';
import tap from 'tap';
const mocha = tap.mocha;
const expect = chai.expect;
mocha.describe("actionResult", () => {
    let value = 'VALUE';
    let state = 'STATE';
    let queue = 'QUEUE';
    let er = actionResult(state, queue, value);
    mocha.it('have a state, a queue and a value', () => {
        expect(er.value).to.equal(value);
        expect(er.state).to.equal(state);
        expect(er.queue).to.equal(queue);
    });
    mocha.it('maps over the value', () => {
        let toUpperAction = actionMap(s => s.toUpperCase());
        let helloWorld = pureAction("hello world!");
        let mappedEr = toUpperAction(helloWorld)(state);
        expect(mappedEr.value).to.equal("HELLO WORLD!");
        expect(mappedEr.state).to.equal(state);
        expect(mappedEr.queue).to.equal(emptyEventQueue);
    });
    mocha.describe('getState', () => {
        mocha.it('sets value to the current state', () => {
            let stateEr = getState(er.state);
            expect(stateEr.value).to.equal(state);
            expect(stateEr.state).to.equal(state);
            expect(stateEr.queue).to.equal(emptyEventQueue);
        });
    });
    mocha.describe('putState', () => {
        mocha.it('puts value to the current state', () => {
            let stateEr = putState(er.value)(er.state);
            expect(stateEr.value).to.equal(undefined);
            expect(stateEr.state).to.equal(value);
            expect(stateEr.queue).to.equal(emptyEventQueue);
        });
    });
    mocha.describe('addEvent', () => {
        mocha.it('writes a eventQueue with the event to the result', () => {
            let e = event(10, pureAction("hello World"));
            let er = addEvent(e)(state);
            expect(er.state).to.equal(state);
            expect(er.value).to.equal(undefined);
            expect(er.queue.size).to.equal(1);
            expect(er.queue.peek()).to.equal(e);
        })
    })
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
ToDo: The rest of the events (bind for action)
ToDo: Be able to flatten a actionResult (bind/flat-map)

ToDo: Implement a while that pop:s events from the eventQueue. Similar code that
handles the event queue that state-handling has to be implemented
*/