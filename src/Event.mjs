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

export let getState = er => eventResult(er.state, er.queue, er.state);
export let putState = er => eventResult(er.value, er.queue, er.value);
export let event = (time, action) => ({time: time, action: action});

export let eventQueue = e =>
    new Heap([e], false, (a, b) => Math.sign(a.time - b.time));