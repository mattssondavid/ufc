import chai from 'chai';
import tap from 'tap';
const mocha = tap.mocha;
const expect = chai.expect;

import {
    event,
    emptyEventQueue
} from './Event';
import {
    map,
    result,
    addEvent,
    doAction,
    flatMap,
    getState,
    modifyState,
    pure,
    putState, repeatAction
} from "./Action";
import {init} from "./Model";

mocha.describe("result", () => {
    mocha.it('maps over the value', () => {
        const toUpperAction = map(s => s.toUpperCase());
        const helloWorld = pure("hello world!");
        const mappedEr = toUpperAction(helloWorld)('STATE');
        expect(mappedEr.value).to.equal("HELLO WORLD!");
        expect(mappedEr.state).to.equal('STATE');
        expect(mappedEr.queue).to.equal(emptyEventQueue);
    });
});

mocha.describe('flatMap', () =>{
    mocha.it('gives the value to the next action constructor', () => {
        const action = flatMap(
            pure('Hello World'),
            s => pure(s + '!')
        );
        const ar = action('STATE');
        expect(ar.value).to.equal('Hello World!');
    });
    mocha.it('passes the state around correctly', () => {
        const action = flatMap(
            putState('Hello World'),
            () => flatMap(
                getState,
                s => putState(s + '!')
            )
        );
        const ar = action('Goodbye World');
        expect(ar.state).to.equal('Hello World!');
    });
    mocha.it('merges events from actions', () => {
        const eventAction = pure('Hello World!');
        const action = flatMap(
            addEvent(event(20, eventAction)),
            () => addEvent(event(30, eventAction))
        );
        const ar = action('STATE');
        expect(ar.queue.size).to.equal(2);
    });
});

mocha.describe('getState', () => {
    mocha.it('sets value to the current state', () => {
        const stateEr = getState('STATE');
        expect(stateEr.value).to.equal('STATE');
        expect(stateEr.state).to.equal('STATE');
        expect(stateEr.queue).to.equal(emptyEventQueue);
    });
});

mocha.describe('putState', () => {
    mocha.it('puts value to the current state', () => {
        const stateEr = putState('VALUE')('STATE');
        expect(stateEr.value).to.equal(undefined);
        expect(stateEr.state).to.equal('VALUE');
        expect(stateEr.queue).to.equal(emptyEventQueue);
    });
});

mocha.describe('modifyState', () => {
    mocha.it('takes a function that modifies the state', () => {
        const action = modifyState(s => s + 1);
        const stateEr = action(10);
        expect(stateEr.value).to.equal(undefined);
        expect(stateEr.state).to.equal(11);
        expect(stateEr.queue).to.equal(emptyEventQueue);
    });
});

mocha.describe('addEvent', () => {
    mocha.it('writes a eventQueue with the event to the result', () => {
        const e = event(10, pure("hello World"));
        const action = addEvent(e);
        const er = action(1);
        expect(er.state).to.equal(1);
        expect(er.value).to.equal(undefined);
        expect(er.queue.size).to.equal(1);
        expect(er.queue.peek()).to.equal(e);
    })
});

mocha.describe('doAction', () => {
    mocha.it('chains actions into one', () => {
        const action = doAction(function* () {
            const state = yield getState;
            return putState(state + 1);
        });
        const ar = action(11);
        expect(ar.state).to.equal(12);
    });
    mocha.it('can be used multiple times', () => {
        const action = doAction(function* () {
            const state = yield getState;
            return putState(state + 1);
        });
        expect(action(11).state).to.equal(12);
        expect(action(11).state).to.equal(12);
    });
    mocha.it('forwards state last', () => {
        const action = doAction(function* () {
            return putState(10);
        });
        const {state} = action(init());
        expect(state).to.equal(10)
    });
    mocha.it('forwards state', () => {
        const addOne = modifyState(s => s + 1);
        const action = doAction(function* () {
            yield addOne;
            yield addOne;
            return addOne;
        });
        const {state} = action(1);
        expect(state).to.equal(4)
    });
    mocha.it('forward value', () => {
        const action = doAction(function* () {
            return pure(10);
        });
        const {value} = action(init());
        expect(value).to.equal(10)
    })
});

mocha.describe('repeatAction', () => {
    mocha.it('adds 2 events on the queue', function () {
        const action = repeatAction(0, 0, pure(1));
        const {queue} = action(init());
        expect(queue.size).to.equal(2);
    });
    mocha.it('adds one event at start time with the action', () => {
        const innerAction = pure(1);
        const action = repeatAction(10, 20, innerAction);
        const {queue} = action(init());
        const event = queue.peek();
        expect(event.time).to.equal(10);
        expect(event.action).to.equal(innerAction);
    });
    mocha.it('adds one event at start time + interval that adds more events', () => {
        const innerAction = pure(1);
        const action = repeatAction(10, 20, innerAction);
        const {queue} = action(init());
        const event = queue.pop().peek();
        expect(event.time).to.equal(30);
        const {queue: secondQueue} = event.action(init());
        expect(secondQueue.size).to.equal(2);
        const nextEvent = secondQueue.peek();
        expect(nextEvent.time).to.equal(30);
        expect(nextEvent.action).to.equal(innerAction);
    });
});