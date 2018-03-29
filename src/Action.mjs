import {
    emptyEventQueue,
    eventQueue
} from "./Event";

export let result =
    (state, queue, value) => ({
        state: state,
        queue: queue,
        value: value
    });

export let pure =
    value => state => result(
        state,
        emptyEventQueue,
        value
    );
export let map =
    fun => action => state => {
        let er = action(state);
        return result(
            er.state,
            er.queue,
            fun(er.value)
        );
    };
export let flatMap =
    (action, actionConstructor) => state => {
        let ar = action(state);
        let newAction = actionConstructor(ar.value);
        let ar2 = newAction(ar.state);
        return result(
            ar2.state,
            ar.queue.merge(ar2.queue),
            ar2.value
        );
    };

export let addEvent =
    event => state => result(
        state,
        eventQueue(event),
        undefined
    );

export let getState =
    state => result(
        state,
        emptyEventQueue,
        state
    );

export let putState =
    value => () => result(
        value,
        emptyEventQueue,
        undefined
    );

export let modifyState =
    f => state => result(
        f(state),
        emptyEventQueue,
        undefined
    );

export let doAction = gen => doHelper(gen())();

let doHelper = iterator => value => {
    let {value: action, done} = iterator.next(value);
    if (done) {
        if (action) return action;
        else return pure(value);
    } else {
        return flatMap(action, doHelper(iterator));
    }
};