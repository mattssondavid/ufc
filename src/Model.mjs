const modifySubState = name => setter => state => ({
    ...state,
    [name]: setter(state[name])
});
const getSubState = name => getter => state => getter(state[name]);
const modifyMoneyState = modifySubState('money');
const getMoneyState = getSubState('money');
const modifyGoldminesState = modifySubState('goldmines');
const getGoldminesState = getSubState('goldmines');
const defaultTo = def => a => a || def;
const _const = c => v => c;

export const init = () => ({});
export const setMoneyForPlayer = (amount, player) => {
    return modifySubState(player)(
        s => modifyMoneyState(_const(amount))(s || {})
    );
};
export const setNumberOfGoldminesForPlayer = (amount, player) => {
    return modifySubState(player)(
        s => modifyGoldminesState(_const(amount))(s || {})
    );
};

export const getMoneyForPlayer = player => {
    return getSubState(player)(
        s => getMoneyState(defaultTo(0))(s || {})
    );
};
export const getNumberOfGoldminesForPlayer = player => {
    return getSubState(player)(
        s => getGoldminesState(defaultTo(0))(s || {})
    );
};