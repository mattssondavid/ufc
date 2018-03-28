import {
    actionResult,
    actionMap,
    getState,
    putState,
    modifyState,
    doAction,
    event,
    eventQueue,
    emptyEventQueue,
    pureAction,
    addEvent,
    flatMap
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
    mocha.describe('flatMap', () =>{
        mocha.it('gives the value to the next action constructor', () => {
            let action = flatMap(
                pureAction('Hello World'),
                s => pureAction(s + '!')
            );
            let ar = action(state);
            expect(ar.value).to.equal('Hello World!');
        });
        mocha.it('passes the state around correctly', () => {
            let action = flatMap(
                putState('Hello World'),
                () => flatMap(
                    getState,
                    s => putState(s + '!')
                )
            );
            let ar = action('Goodbye World');
            expect(ar.state).to.equal('Hello World!');
        });
        mocha.it('merges events from actions', () => {
            let eventAction = pureAction('Hello World!');
            let action = flatMap(
                addEvent(event(20, eventAction)),
                () => addEvent(event(30, eventAction))
            );
            let ar = action(state);
            expect(ar.queue.size).to.equal(2);
        });
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
    mocha.describe('modifyState', () => {
        mocha.it('takes a function that modifies the state', () => {
            let stateEr = modifyState(s => s + 1)(10);
            expect(stateEr.value).to.equal(undefined);
            expect(stateEr.state).to.equal(11);
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

    mocha.describe('doAction', () => {
        mocha.it('chains actions into one', () => {
            let action = doAction(function* () {
                let state = yield getState;
                return putState(state + 1);
            });
            let ar = action(11);
            expect(ar.state).to.equal(12);
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
    mocha.it('can merge empty queues', () => {
        expect(
            emptyEventQueue.merge(emptyEventQueue).size
        ).to.equal(0)
    });
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