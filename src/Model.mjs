const setSubState = (name, setter) => state => ({
    ...state,
    [name]: setter(state[name])
});
const getSubState = (name, getter) => state => getter(state[name]);
const defaultTo = def => a => a || def;

export const init = () => ({
    goldmines: {},
    money: {}
});
export const setMoneyForPlayer = (amount, player) => {
    return setSubState('money', setSubState(player, () => amount));
};
export const getMoneyForPlayer = player => {
    return getSubState('money', getSubState(player,  defaultTo(0)));
};
export const getNumberOfGoldminesForPlayer = player => {
    return getSubState('goldmines', getSubState(player, defaultTo(0)));
};
export const setNumberOfGoldminesForPlayer = (amount, player) => {
    return setSubState('goldmines', setSubState(player, () => amount));
};