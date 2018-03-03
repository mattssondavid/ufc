import {
    init,
    setMoneyForPlayer,
    getMoneyForPlayer
} from './Model';
import chai from 'chai';
import tap from 'tap';
const mocha = tap.mocha;
const expect = chai.expect;

mocha.describe('Init model', () => {
    mocha.it('does not crash', () => {
        init();
    });
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