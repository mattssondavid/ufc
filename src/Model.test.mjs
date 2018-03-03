import {
    init,
    setMoneyForPlayer,
    getMoneyForPlayer,
    getNumberOfGoldminesForPlayer,
    setNumberOfGoldminesForPlayer
} from './Model';
import chai from 'chai';
import tap from 'tap';
const mocha = tap.mocha;
const expect = chai.expect;

mocha.describe('Model', () => {
    mocha.it('does not crash during creation', () => {
        init();
    });
    mocha.it('contains both money and number of goldmines', () => {
        {
            let state1 = init();
            let state2 = setMoneyForPlayer(1, 'John Doe')(state1);
            let state3 = setNumberOfGoldminesForPlayer(2, 'John Doe')(state2);
            let money = getMoneyForPlayer('John Doe')(state3);
            expect(money).to.equal(1);
        }
        {
            let state1 = init();
            let state2 = setMoneyForPlayer(3, 'John Doe')(state1);
            let state3 = setNumberOfGoldminesForPlayer(2, 'John Doe')(state2);
            let money = getMoneyForPlayer('John Doe')(state3);
            expect(money).to.equal(3);
        }
    });
    /*mocha.it('can get amount of goldmines from player one and money from player two', () => {
        let state1 = init();
        let state2 = setMoneyForPlayer(1, 'John Doe')(state1);
        let state3 = setMoneyForPlayer(2, 'Joanne Doe')(state2);
        setNumberOfGoldminesForPlayer(3, 'John Doe')(state3);
        let money = getMoneyForPlayer('Joanne Doe')(state3);
        let mines = getNumberOfGoldminesForPlayer('John Doe')(state3);
        expect(money).to.equal(2);
        expect(mines).to.equal(3);
    });*/
});
mocha.describe('moneyForPlayer', () => {
    mocha.it('finds money that got set for player with same name', () => {
        {
            let state1 = init();
            let state2 = setMoneyForPlayer(100, 'John Doe')(state1);
            let money = getMoneyForPlayer('John Doe')(state2);
            expect(money).to.equal(100);
        }
        {
            let state1 = init();
            let state2 = setMoneyForPlayer(200, 'John Doe')(state1);
            let money = getMoneyForPlayer('John Doe')(state2);
            expect(money).to.equal(200);
        }
    });
    mocha.it('finds money for the correct player name', () => {
        {
            let state1 = init();
            let state2 = setMoneyForPlayer(200, 'John Doe')(state1);
            let state3 = setMoneyForPlayer(300, 'Joanne Doe')(state2);
            let money = getMoneyForPlayer('John Doe')(state3);
            expect(money).to.equal(200);
        }
    });
    mocha.it('finds the last value', () => {
        let state1 = init();
        let state2 = setMoneyForPlayer(200, 'John Doe')(state1);
        let state3 = setMoneyForPlayer(300, 'John Doe')(state2);
        let money = getMoneyForPlayer('John Doe')(state3);
        expect(money).to.equal(300);
    });
    mocha.it('does not modify old state', () => {
        let state1 = init();
        let state2 = setMoneyForPlayer(200, 'John Doe')(state1);
        setMoneyForPlayer(300, 'John Doe')(state2);
        let money = getMoneyForPlayer('John Doe')(state2);
        expect(money).to.equal(200);
    });
});

mocha.describe('goldminesForPlayer', () => {
    mocha.it('finds the number of goldmines for a player', () => {
        let state = init();
        let numberOfGoldmines = getNumberOfGoldminesForPlayer('John Doe')(state);
        expect(numberOfGoldmines).to.equal(0);
    });
    mocha.it('finds the number for of goldmines for player after it has been set', () => {
        let state1 = init();
        let state2 = setNumberOfGoldminesForPlayer(1, 'John Doe')(state1);
        let numberOfMines = getNumberOfGoldminesForPlayer('John Doe')(state2);
        expect(numberOfMines).to.equal(1);
    });
});