const board = JXG.JSXGraph.initBoard("jxgbox", {
boundingbox: [-1, 6, 8, -1],
axis:false
});

const A = board.create("point",[1,1],{name:"A"});
const B = board.create("point",[6,1],{name:"B"});
const C = board.create("point",[7,4],{name:"C"});
const D = board.create("point",[2,4],{name:"D"});

board.create("polygon",[A,B,C,D]);
board.create("line",[A,C],{dash:2});
board.create("line",[B,D],{dash:2});
