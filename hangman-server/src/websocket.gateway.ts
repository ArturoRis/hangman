import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(3000, {namespace: 'events'})
export class WebsocketGateway implements OnGatewayDisconnect {

  private rooms: Map<string, Room> = new Map();
  private usersConnected: {[id: string]: Room} = {};

  @SubscribeMessage('create-room')
  createRoom(client: Socket) {
    console.log('create-room', client.id);
    const roomId = Math.random() + '';
    const room = new Room(roomId);
    room.addPlayer(client.id);
    this.usersConnected[client.id] = room;
    this.rooms.set(roomId, room);
    return new SocketResponse(true, roomId);
  }

  @SubscribeMessage('join-room')
  join(client: Socket, roomIdToJoin: string) {
    console.log('join-room', client.id);
    const room = this.rooms.get(roomIdToJoin);
    if (room) {
      room.addPlayer(client.id);
      this.usersConnected[client.id] = room;
      return new SocketResponse(true, room.id);
    } else {
      return new SocketResponse(false, roomIdToJoin + ' non trovato');
    }
  }

  handleDisconnect(client: Socket): any {
    const room = this.usersConnected[client.id];
    room.removePlayer(client.id);
    client.to(room.id).emit('player-leave', new SocketResponse(true, client.id));
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
  public players: string[];

  constructor(
    public id: string
  ) {
  }

  addPlayer(user: string) {
    if (this.players.find(p => p === user)) {
      this.players.push(user);
    }
  }

  removePlayer(user: string) {
    this.players = this.players.filter(p => p !== user);
  }

  sendToRoom(client: Socket) {
    this.players.forEach( p => client);
  }
}
