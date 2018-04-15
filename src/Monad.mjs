
// f :: M a -> (a -> M b) -> M b
// it :: Gen (M a)
// first :: M a
const reduce = f => it => first => {
    const wrapper = v => {
        const {value} = it.next(v)
        return value;
    }
    let next = f(first)(wrapper)
    let preNext
    while (next !== undefined) {
        preNext = next
        next = f(next)(wrapper)
    }
    return preNext
}

export const Identity = value => ({
    value,
    map: f => Identity(f(value)),
    ap: other => Identity(value(other.value)),
    flatten: () => value,
    flatMap: scope => scope(value),
    do: gen => {
        const f = m => next => m.flatMap(next)
        return reduce(f)(gen(value))(Identity.return(value))
    }
})
Identity.return = v => Identity(v)