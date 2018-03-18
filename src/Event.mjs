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