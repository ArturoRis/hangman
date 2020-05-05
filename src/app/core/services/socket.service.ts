import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class SocketService {
  private socket;

  constructor() {
    if (environment.production) {
      this.socket = io('https://hmo-hangman-online.herokuapp.com');
    } else {
      this.socket = io(location.protocol + '//' + location.hostname + ':' + 3000);
    }
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
    return new Observable<SocketResponse<R>>(obs$ => {

      const listener = (message) => {
        console.log('received', type, message);
        obs$.next(message);
      };

      this.socket.on(type, listener);

      return () => this.socket.off(type, listener);
    });
  }

  getId() {
    return this.socket.id;
  }
}

export interface SocketResponse<T = string> {
  ok: boolean;
  data: T;
}
