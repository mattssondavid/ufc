import * as FPAction from "./Action";
import * as FPMA from "./ModelActions";
const Action = runAction => ({
    runAction,
    map: fun => Action(FPAction.map(fun)(runAction)),
    flatMap: scope => Action(FPAction.flatMap(runAction, v => scope(v).runAction))
});

Action.pure = v => Action(FPAction.pure(v));

const action =
    Action(FPMA.giveMoneyToPlayer(10, 'neppord')).flatMap(() =>
    Action(FPMA.getMoneyForPlayer('neppord'))).flatMap(money =>
    Action(FPMA.setMoneyForPlayer(money + 40, 'neppord'))).flatMap(() =>
    Action(FPMA.getMoneyForPlayer('neppord')));
const {value} = action.runAction({});
console.log(value);
