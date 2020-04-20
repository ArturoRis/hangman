let express = require('express');
let app = express();

let http = require('http');
let server = new http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

const nicknames = [];
let curr = -1;

function getNextTurn() {
  curr = (curr + 1) % nicknames.length;
  return nicknames[curr].name;
}

function emitNewTurn(soc){
  soc.emit('new-turn', { ok: true, data: getNextTurn()});
}

class Room

io.on('connection', (socket) => {
  console.log('user connected');
  const id = socket.handshake.headers.cookie
    .split('; ')
    .map( c => c.split('='))
    .find( c => c[0] === 'io')[1];

  socket.on('get-nickname', () => {
    console.log('get-nickname');
    const nick = nicknames.find( nick => nick.id === id);
    socket.emit('get-nickname', {ok: !!nick, data: nick && nick.name})
  });

  socket.on('set-nickname', nickname => {
    console.log('nickname received', nickname);
    let ans;
    if(!nicknames.find( nick => nick.name === nickname)) {
      let oldNick = nicknames.find( nick => nick.id === id);
      if(oldNick){
        oldNick.name = nickname
      } else {
        nicknames.push({name: nickname, id: id});
      }
      ans = { ok: true };
    } else {
      ans = { ok: false };
    }
    socket.emit('set-nickname', ans)
  });

  socket.on('start-game', () => {
    console.log('start-game');
    io.emit('start-game', {ok: true});
    curr = -1;
    emitNewTurn(io);
  });

  socket.on('set-word', (word) => {
    console.log('set-word', word);
    io.emit('set-word', {ok: true, data: word});
    emitNewTurn(io);
  });

  socket.on('new-guess', (letter) => {
    console.log('new-guess', letter);
    io.emit('new-guess', {ok: true, data: letter});
    emitNewTurn(io);
  });

  socket.on('finish-game', (win) => {
    console.log('finish-game', win);
    io.emit('finish-game', {ok:true, data: win});
  })
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
