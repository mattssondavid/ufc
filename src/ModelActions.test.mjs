import chai from 'chai';
import tap from 'tap';
const mocha = tap.mocha;
const expect = chai.expect;

import {
    addGoldminesForPlayer,
    getGoldminesForPlayer,
    giveMoneyToPlayer,
    giveMoneyToPlayerPerGoldmine
} from "./ModelActions";
import {getMoneyForPlayer, init} from "./Model";
import {doAction} from "./Action";

mocha.describe('giveMoneyToPlayer', () => {
    mocha.it('gives money to player when it has 0', () => {
        const {state} = giveMoneyToPlayer(100, 'neppord')(init());
        expect(getMoneyForPlayer('neppord')(state)).to.equal(100);
    });
    mocha.it('gives money to player when it has 100', () => {
        let action = doAction(function* (){
            yield giveMoneyToPlayer(100, 'neppord');
            return giveMoneyToPlayer(100, 'neppord')
        });
        const {state} = action(init());
        expect(getMoneyForPlayer('neppord')(state)).to.equal(200);
    });
});

mocha.describe('addGoldminesForPlayer', () => {
   mocha.it('adds goldmines for player', function () {
       const action = doAction(function* () {
           yield addGoldminesForPlayer(100, 'neppord');
           return getGoldminesForPlayer('neppord');
       });
       const {value} = action(init());
       expect(value).to.equal(100);
   });
});

mocha.describe('giveMoneyToPlayerPerGoldmine', () =>{
    mocha.it('it gives no money when player has no goldmines', () => {
       const action = doAction(function* () {
           yield giveMoneyToPlayerPerGoldmine(100, 'neppord');
       });
       const {state} = action(init());
       expect(getMoneyForPlayer('neppord')(state)).to.equal(0);
    });

    mocha.it('it gives the amount of money when player has one goldmines', () => {
        const action = doAction(function* () {
            yield addGoldminesForPlayer(1, 'neppord');
            yield giveMoneyToPlayerPerGoldmine(100, 'neppord');
        });
        const {state} = action(init());
        expect(getMoneyForPlayer('neppord')(state)).to.equal(100);
    });
    mocha.it('it gives the money when player has money and goldmines', () => {
        const action = doAction(function* () {
            yield addGoldminesForPlayer(1, 'neppord');
            yield giveMoneyToPlayer(100, 'neppord');
            yield giveMoneyToPlayerPerGoldmine(100, 'neppord');
        });
        const {state} = action(init());
        expect(getMoneyForPlayer('neppord')(state)).to.equal(200);
    });
    mocha.it('it gives the amount of money twice when player has two goldmines', () => {
        const action = doAction(function* () {
            yield addGoldminesForPlayer(2, 'neppord');
            yield giveMoneyToPlayerPerGoldmine(100, 'neppord');
        });
        const {state} = action(init());
        expect(getMoneyForPlayer('neppord')(state)).to.equal(200);
    })
});