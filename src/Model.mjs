const modifySubState =
    name => setter => state => ({
        ...state,
        [name]: setter(state[name])
    });
const getSubState =
    name => getter => state => getter(state[name]);
const modifyMoneyState = modifySubState('money');
const getMoneyState = getSubState('money');
const modifyGoldminesState = modifySubState('goldmines');
const getGoldminesState = getSubState('goldmines');
const defaultTo = _default => a => a || _default;
const _const = constant => _ => constant;

export const init = () => ({});
export const setMoneyForPlayer =
    (amount, player) => modifySubState(player)(
        s => modifyMoneyState(_const(amount))(s || {})
    );
export const setNumberOfGoldminesForPlayer =
    (amount, player) => modifySubState(player)(
        s => modifyGoldminesState(_const(amount))(s || {})
    );

export const getMoneyForPlayer =
    player => getSubState(player)(
        s => getMoneyState(defaultTo(0))(s || {})
    );
export const getNumberOfGoldminesForPlayer =
    player => getSubState(player)(
        s => getGoldminesState(defaultTo(0))(s || {})
    );