export const init = () => ({});
export const setMoneyForPlayer = (amount, player) => state => {
    let newState = {
        [player]: amount
    };
    return Object.assign({}, state, newState);
};
export const getMoneyForPlayer = player => state => {
    return state[player];
};