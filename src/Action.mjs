import {
    emptyEventQueue,
    eventQueue
} from "./Event";

export let actionResult =
    (state, queue, value) => ({
        state: state,
        queue: queue,
        value: value
    });
export let pureAction =
    value => state => actionResult(
        state,
        emptyEventQueue,
        value
    );
export let actionMap =
    fun => action => state => {
        let er = action(state);
        return actionResult(
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
        return actionResult(
            ar2.state,
            ar.queue.merge(ar2.queue),
            ar2.value
        );
    };
export let addEvent =
    event => state => actionResult(
        state,
        eventQueue(event),
        undefined
    );
export let getState =
    state => actionResult(
        state,
        emptyEventQueue,
        state
    );
export let putState =
    value => () => actionResult(
        value,
        emptyEventQueue,
        undefined
    );
export let modifyState =
    f => state => actionResult(
        f(state),
        emptyEventQueue,
        undefined
    );
export let doAction = gen => doActionHelper(gen())();
let doActionHelper = iterator => value => {
    let {value: action, done} = iterator.next(value);
    if (done) {
        if (action) return action;
        else return pureAction(value);
    } else {
        return flatMap(action, doActionHelper(iterator));
    }
};