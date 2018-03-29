import Persistence from 'persistence-js';

let Heap = Persistence.Heap;

// action is a function
// state -> result
// result :: (state, queue, value)




















export let event =
    (time, action) => ({time: time, action: action});

let compareEvents =
    (a, b) => Math.sign(a.time - b.time);

export let eventQueue = e =>
    new Heap([e], false, compareEvents);

export let emptyEventQueue =
    new Heap([], false, compareEvents);