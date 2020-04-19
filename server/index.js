let express = require('express');
let app = express();

let http = require('http');
let server = new http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

const nicknames = [];

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('set-nickname', nickname => {
    console.log('nickname received', nickname);
    let ans;
    if(!nicknames.find( nick => nick === nickname)) {
      nicknames.push(nickname);
      ans = { ok: true };
    } else {
      ans = { ok: false };
    }
    socket.emit('set-nickname', ans)
  })
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
