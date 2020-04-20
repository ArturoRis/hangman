import * as io from 'socket.io-client';
import { ReplaySubject } from 'rxjs';

export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage<R = string>(type: string, payload: any, callback?: (response: SocketResponse<R>) => void) {
    this.socket.emit(type, payload, callback);
  }

  getMessages$(type) {
    const obs$ = new ReplaySubject();
    this.socket.on(type, (message) => {
      obs$.next(message);
    });
    return obs$.asObservable();
  }
}

export interface SocketResponse<T = string> {
  ok: boolean;
  data: T;
}
