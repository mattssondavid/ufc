module.exports = {
    init: () => ({}),
    setMoneyForPlayer: (amount, player) => state => {
        let newState = {
            [player]: amount
        };
        return Object.assign({}, state, newState);
    },
    getMoneyForPlayer: player => state => {
        return state[player];
    }
};