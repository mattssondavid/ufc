import {
    doAction,
    getState,
    modifyState,
    pure
} from './Action';
import * as Model from './Model';

export const addGoldminesForPlayer =
    (amount, player) => modifyState(state => {
       const goldmines = Model.getGoldminesForPlayer(player)(state);
       return Model.setGoldminesForPlayer(amount + goldmines, player)(state);
    });

export const getGoldminesForPlayer =
    player => doAction(function* (){
        const state = yield getState;
        const goldmines = Model.getGoldminesForPlayer(player)(state);
        return pure(goldmines);
    });

export const getMoneyForPlayer =
    player => doAction(function* () {
        const state = yield getState;
        const money = Model.getMoneyForPlayer(player)(state);
        return pure(money)
    });

export const setMoneyForPlayer =
    (amount, player) =>
        modifyState(Model.setMoneyForPlayer(amount, player));

export const giveMoneyToPlayer =
    (amount, player) => doAction(function* () {
        const money = yield getMoneyForPlayer(player);
        const newMoney = money + amount;
        return setMoneyForPlayer(newMoney, player)
    });

export const giveMoneyToPlayerPerGoldmine =
    (amount, player) => doAction(function* () {
        const goldmines = yield getGoldminesForPlayer(player);
        return giveMoneyToPlayer(goldmines * amount, player)
    });