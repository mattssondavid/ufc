import Persistence from 'persistence-js';
let Heap = Persistence.Heap;
export let eventResult = (state, queue, value) => ({
    state: state,
    queue: queue,
    value: value
});

export let eventMap = fun => er => eventResult(
    er.state,
    er.queue,
    fun(er.value)
);

export let getState =
    state => eventResult(
        state,
        emptyEventQueue,
        state
    );

export let putState =
    value => _ => eventResult(
        value,
        emptyEventQueue,
        undefined
    );

export let event = (time, action) => ({time: time, action: action});

let compareEvents = (a, b) => Math.sign(a.time - b.time);
export let eventQueue = e =>
    new Heap([e], false, compareEvents);
export let emptyEventQueue =
    new Heap([], false, compareEvents);