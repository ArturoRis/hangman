import * as io from 'socket.io-client';
import { ReplaySubject } from 'rxjs';

export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage<R = string>(type: string, payload: any, callback?: (response: SocketResponse<R>) => void) {
    console.log('sending', type, payload);
    if (callback) {
      this.socket.emit(type, payload, callback);
    } else {
      this.socket.emit(type, payload);
    }
  }

  getMessages$<R = string>(type) {
    const obs$ = new ReplaySubject<SocketResponse<R>>();
    this.socket.on(type, (message) => {
      console.log('received', type, message);
      obs$.next(message);
    });
    return obs$.asObservable();
  }

  getId() {
    return this.socket.id;
  }
}

export interface SocketResponse<T = string> {
  ok: boolean;
  data: T;
}
