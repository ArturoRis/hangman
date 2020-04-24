import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3000)
export class WebsocketGateway implements OnGatewayDisconnect {

  @WebSocketServer()
  private server: Server;

  private rooms: Map<string, Room> = new Map();
  private usersConnected: { [id: string]: Room } = {};

  @SubscribeMessage('create-room')
  createRoom(client: Socket) {
    console.log('create-room', client.id);
    const roomId = Math.random() + '';
    const room = new Room(roomId);
    room.addPlayer(client.id);
    client.join(roomId);
    this.usersConnected[client.id] = room;
    this.rooms.set(roomId, room);
    return new SocketResponse(true, roomId);
  }

  @SubscribeMessage('join-room')
  join(client: Socket, roomIdToJoin: string) {
    console.log('join-room', client.id, roomIdToJoin);
    const room = this.rooms.get(roomIdToJoin);
    if (room) {
      if (!room.isPresent(client.id)) {
        room.addPlayer(client.id);
        client.join(room.id);
        this.usersConnected[client.id] = room;
        this.server.to(room.id).emit('player-join', new SocketResponse(true, client.id));
      }
      return new SocketResponse(true, room);
    } else {
      return new SocketResponse(false, roomIdToJoin + ' non trovato');
    }
  }

  @SubscribeMessage('init-game')
  initGame(client: Socket) {
    const room = this.usersConnected[client.id];
    this.server.to(room.id).emit('go-to-start', new SocketResponse(true, undefined));
  }

  @SubscribeMessage('get-state')
  getState(client: Socket) {
    const room = this.usersConnected[client.id];
    return new SocketResponse(true, room);
  }

  @SubscribeMessage('get-current-turn')
  startGame(client: Socket) {
    console.log('start-game', client.id);
    const room = this.usersConnected[client.id];
    return new SocketResponse(true, room.getCurrentTurn());
  }

  @SubscribeMessage('set-word')
  setWord(client: Socket, word: string) {
    console.log('set-word', client.id, word);
    const room = this.usersConnected[client.id];
    room.setWord(word);
    this.server.to(room.id).emit('set-word', new SocketResponse(true, word));
    this.server.to(room.id).emit('new-turn', new SocketResponse(true, room.getNextTurn()))
  }

  @SubscribeMessage('new-guess')
  newGuess(client: Socket, guess: string) {
    console.log('new-guess', client.id, guess);
    const room = this.usersConnected[client.id];
    room.addGuess(guess);

    const finishState = room.isGameFinished();
    this.server.to(room.id).emit('new-guess', new SocketResponse(true, guess));
    if (!finishState) {
      this.server.to(room.id).emit('new-turn', new SocketResponse(true, room.getNextTurn()))
    } else {
      this.server.to(room.id).emit('finish-game', new SocketResponse(true, {
        isWin: finishState === 'win',
        who: client.id
      }))
    }
  }

  @SubscribeMessage('restart-game')
  restartGame(client: Socket) {
    const room = this.usersConnected[client.id];
    room.resetGame();
    this.server.to(room.id).emit('restart-game', new SocketResponse(true, room));
  }

  handleDisconnect(client: Socket): any {
    const room = this.usersConnected[client.id];
    if (room) {
      room.removePlayer(client.id);
      client.to(room.id).emit('player-leave', new SocketResponse(true, client.id));
    }
  }
}

class SocketResponse<R = string> {
  constructor(
    public ok: boolean,
    public data: R
  ) {
  }
}

class Room {
  public players: string[] = [];

  private currentTurn;
  private lettersInfo: any[];
  private guesses: string[] = [];
  private errors: number = 0;

  constructor(
    public id: string
  ) {
  }

  resetGame() {
    this.currentTurn = undefined;
    this.lettersInfo = undefined;
    this.guesses = [];
    this.errors = 0;
  }

  isPresent(user: string) {
    return !!this.players.find(p => p === user);
  }

  addPlayer(user: string) {
    if (!this.isPresent(user)) {
      this.players.push(user);
    }
  }

  removePlayer(user: string) {
    this.players = this.players.filter(p => p !== user);
  }

  getNextTurn() {
    if (!this.currentTurn) {
      this.currentTurn = this.players[0];
    } else {
      let currIndex = this.players.findIndex(p => p === this.currentTurn);
      currIndex = (currIndex + 1) % this.players.length;
      this.currentTurn = this.players[currIndex];
    }
    return this.currentTurn;
  }

  setWord(word: string) {
    this.lettersInfo = [];
    for (const c of word.toUpperCase()) {
      this.lettersInfo.push({
        letter: c === ' ' ? undefined : c,
        isGuessed: false
      });
    }
  }

  addGuess(guess: string) {
    this.guesses.push(guess);

    const letterInfo = this.lettersInfo.filter( l => l.letter === guess);
    if (!letterInfo || !letterInfo.length) {
      this.errors += 1;
    } else {
      letterInfo.forEach( l => l.isGuessed = true);
    }
  }

  getCurrentTurn() {
    if (!this.currentTurn) {
      this.getNextTurn();
    }
    return this.currentTurn;
  }

  isGameFinished() {
    if (this.lettersInfo.every( l => l.isGuessed)) {
      return 'win'
    }

    if (this.errors > 5) {
      return 'lose';
    }

    return null;
  }
}
