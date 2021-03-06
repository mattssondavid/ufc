import {
    event,
    emptyEventQueue,
    eventQueue
} from "./Event";

// action is a function
// state -> result
// result :: (state, queue, value)

export const result =
    (state, queue, value) => ({state, queue, value});

export const pure =
    value => state => result(
        state,
        emptyEventQueue,
        value
    );
export const map =
    fun => action => state => {
        const er = action(state);
        return result(
            er.state,
            er.queue,
            fun(er.value)
        );
    };
export const flatMap =
    (action, actionConstructor) => state => {
        const ar = action(state);
        const newAction = actionConstructor(ar.value);
        const ar2 = newAction(ar.state);
        return result(
            ar2.state,
            ar.queue.merge(ar2.queue),
            ar2.value
        );
    };

export const addEvent =
    event => state => result(
        state,
        eventQueue(event),
        undefined
    );

export const repeatAction =
    (start, interval, action) => doAction(function*() {
        const nextStart = start + interval;
        yield addEvent(event(start, action));
        return addEvent(event(
            nextStart,
            repeatAction(nextStart, interval, action)
        ));
    });

export const getState =
    state => result(
        state,
        emptyEventQueue,
        state
    );

export const putState =
    value => () => result(
        value,
        emptyEventQueue,
        undefined
    );

export const modifyState =
    f => state => result(
        f(state),
        emptyEventQueue,
        undefined
    );

export const doAction =
    gen => state => doHelper(gen())()(state);

const doHelper = iterator => value => {
    const {value: action, done} = iterator.next(value);
    if (done) {
        if (action) return action;
        else return pure(value);
    } else {
        return flatMap(action, doHelper(iterator));
    }
};