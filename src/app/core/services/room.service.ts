import { Inject, Injectable } from '@angular/core';
import { ID_TOKEN } from '../../id-token.provider';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    @Inject(ID_TOKEN) private readonly id: string,
    private httpClient: HttpClient
  ) { }

  joinRoom(roomId: string, playerName: string): Observable<void> {
    const url = `${environment.apiUrl}/game/rooms/${roomId}/players`;
    const dto = {
      name: playerName
    };
    return this.httpClient.post<void>( url, dto);
  }

  createRoom(name: string): Observable<string> {
    const url = `${environment.apiUrl}/game/rooms`;
    const dto = {
      name
    };
    return this.httpClient.post<{id: string}>( url, dto).pipe(
      map( room => room.id)
    );
  }

  leaveRoom(roomId: string): Observable<void> {
    const url = `${environment.apiUrl}/game/rooms/${roomId}/players/${this.id}`;
    return this.httpClient.delete<void>( url);
  }
}
