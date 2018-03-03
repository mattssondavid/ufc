const setSubState = subStateName => subStateSetter => state => {
    let newSubState = subStateSetter(state[subStateName]);
    return Object.assign({}, state, {[subStateName] : newSubState});
};
const getSubState = subStateName => subStateGetter => state => {
    return subStateGetter(state[subStateName]);
};
export const init = () => ({
    goldmines: {},
    money: {}
});
const setAmount = (amount, player) => state => ({...state, [player]: amount});
const getAmount = player => state => state[player] || 0;
export const setMoneyForPlayer = (amount, player) => {
    return setSubState('money')(setAmount(amount, player));
};
export const getMoneyForPlayer = player => {
    return getSubState('money')(getAmount(player));
};
export const getNumberOfGoldminesForPlayer = player => {
    return getSubState('goldmines')(getAmount(player));
};
export const setNumberOfGoldminesForPlayer = (amount, player) => {
    return setSubState('goldmines')(setAmount(amount, player));
};