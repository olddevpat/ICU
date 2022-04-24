
let board; //  the ui
let game; // the logic

window.onload = function () {
    initGame();
};

 // setup my socket client
 const socket = io();



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

// Speech recognition

$( document ).ready(function() {
let speechRecognition = window.webkitSpeechRecognition;
let recognition = new speechRecognition();
let instructions = $('.instructions');
let content = '';

recognition.continuous = true;

recognition.onstart = function() {
    socket.emit('voice_on',"Voice Recognition is on" )
}
socket.on('update_all', function (data) {
    instructions.text(data);
})

recognition.onspeechend = function () {
    instructions.text('No activity');
}

recognition.onerror = function () {
    instructions.text('try again');
}

recognition.onresult = function (event) {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript

    content = transcript;
    console.log(content);

    socket.emit('voice', content);
     
}

socket.on('subtitle', function (data) {
    $('#textbox').html(data);
})

$('#start').click( function (e) {
    if(content.length) {
        content += '';  
    }
    recognition.start();
    console.log('you click start');
})

textbox.on('input', function () {
    content = $(this).val();
})
});
