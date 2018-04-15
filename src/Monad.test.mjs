import chai from 'chai'
import tap from 'tap'
const mocha = tap.mocha
const expect = chai.expect

import {Identity} from './Monad'

mocha.describe('Identity', () => {
    mocha.it('only acts as container of one value', function () {
        const identity = Identity(10)
        expect(identity.value).to.equal(10)
    })
    mocha.it('return', function () {
        const identity = Identity.return(10)
        expect(identity.value).to.equal(10)
    })
    mocha.it('maps', function () {
        const identity = Identity(5).map(v => v * 2)
        expect(identity.value).to.equal(10)
    })
    mocha.it('applies', function () {
        const identity = Identity(a => b => a + b)
            .ap(Identity(4))
            .ap(Identity(6))
        expect(identity.value).to.equal(10)
    })
    mocha.it('flattens', function () {
        const identity = Identity(Identity(10)).flatten()
        expect(identity.value).to.equal(10)
    })
    mocha.it('flattMaps', function () {
        const identity = Identity(10)
            .flatMap(Identity.return)
        expect(identity.value).to.equal(10)
    })
    mocha.it('do stuff', function () {
        const identity = Identity(6).do(function* (x) {
            const y = yield Identity.return(x + 3)
            return Identity.return(y + 1)
        })
        expect(identity.value).to.equal(10)
    })
})