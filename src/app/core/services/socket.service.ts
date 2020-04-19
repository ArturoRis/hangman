import * as io from 'socket.io-client';
import { Observable, ReplaySubject } from 'rxjs';

export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage(type: string, payload: any) {
    this.socket.emit(type, payload);
  }

  getMessages$(type) {
    const obs$ = new ReplaySubject();
    this.socket.on(type, (message) => {
      obs$.next(message);
    });
    return obs$.asObservable();
  }
}
