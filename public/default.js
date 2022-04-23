let board; //  the ui
let game; // the logic

window.onload = function () {
    initGame();
};

 // setup my socket client
 var socket = io();



let initGame = function() {
   let cfg = {
       draggable: true,
       position: 'start',
       onDrop: handleMove,
   };
   
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};

// tells the logic where the ui come from and where it go
let handleMove = function(source, target ) {
    let move = game.move({from: source, to: target});
    
    if (move === null)  {
        return 'snapback';
    }
    else {
        socket.emit('move' , move)
    }    
};  

socket.on('move', function (msg) {
    game.move(msg);
    board.position(game.fen()); // fen is the board layout
});