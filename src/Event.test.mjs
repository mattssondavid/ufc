import chai from 'chai';
import tap from 'tap';
const mocha = tap.mocha;
const expect = chai.expect;

import {
    event,
    eventQueue,
    emptyEventQueue
} from './Event';

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