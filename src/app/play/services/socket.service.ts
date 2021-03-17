import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { ID_TOKEN } from '../../id-token.provider';

@Injectable({providedIn: 'root'})
export class SocketService {
  private socket;

  constructor(
    @Inject(ID_TOKEN) private readonly id: string
  ) {

    const socketUrl = environment.socketUrl;

    this.socket = io(socketUrl, {query: {id: this.id}});
  }

  sendMessage<R = string>(type: string, payload: any, callback?: (response: SocketResponse<R>) => void) {
    console.log('sending', type, payload);
    if (callback) {
      this.socket.emit(type, {id: this.id, payload}, callback);
    } else {
      this.socket.emit(type, {id: this.id, payload});
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
}

export interface SocketResponse<T = string> {
  ok: boolean;
  data: T;
}
