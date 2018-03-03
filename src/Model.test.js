const model = require('./Model');
const init = model.init;
const setMoneyForPlayer = model.setMoneyForPlayer;
const getMoneyForPlayer = model.getMoneyForPlayer;
const expect = require('chai').expect;
const mocha = require('tap').mocha;

mocha.describe('Model', function () {
    mocha.it('should not crash', function () {
        init();
    });
    mocha.it('should find money that got set for player with same name', () => {
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
    mocha.it('should find money for the correct player name', () => {
        {
            let state1 = init();
            let state2 = setMoneyForPlayer(200, 'John Doe')(state1);
            let state3 = setMoneyForPlayer(300, 'Joanne Doe')(state2);
            let money = getMoneyForPlayer('John Doe')(state3);
            expect(money).to.equal(200);
        }
    });
    mocha.it('should use the last value', function () {

        let state1 = init();
        let state2 = setMoneyForPlayer(200, 'John Doe')(state1);
        let state3 = setMoneyForPlayer(300, 'John Doe')(state2);
        let money = getMoneyForPlayer('John Doe')(state3);
        expect(money).to.equal(300);
    });
    mocha.it('should not modify old state', function () {

        let state1 = init();
        let state2 = setMoneyForPlayer(200, 'John Doe')(state1);
        setMoneyForPlayer(300, 'John Doe')(state2);
        let money = getMoneyForPlayer('John Doe')(state2);
        expect(money).to.equal(200);
    });
});