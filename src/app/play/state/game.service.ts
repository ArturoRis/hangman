import { Inject, Injectable, OnDestroy } from '@angular/core';
import { GameState, GameStore, GuessInfo, LetterInfo, PlayerInfo, Status } from './game.store';
import { SocketService } from '../services/socket.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class GameService implements OnDestroy {

  private sub = new Subscription();
  private baseUrl = environment.apiUrl;
  private roomId: string;

  constructor(
    private gameStore: GameStore,
    private socketService: SocketService,
    private httpClient: HttpClient,
    private router: Router
  ) {

    const socketMessagesHandlers: Observable<any>[] = [
      this.socketService.getMessages$<{ player: PlayerInfo, master?: string }>('player-leave').pipe(
        tap(({data: {player, master}}) => {
          this.gameStore.removePlayer(player);
          if (master) {
            this.gameStore.updateMaster(master);
          }
        })
      ),
      this.socketService.getMessages$<PlayerInfo>('player-join').pipe(
        tap(({data: player}) => {
          this.gameStore.addPlayer(player);
        })
      ),
      this.socketService.getMessages$<GameState>('go-to-start').pipe(
        tap(({data: state}) => {
          this.gameStore.update(state);
          this.router.navigate(['game', state.id, 'play']);
        })
      ),
      this.socketService.getMessages$<Status>('finish-game').pipe(
        tap(({data: status}) => {
          this.gameStore.updateStatus(status);
        })
      ),
      this.socketService.getMessages$<LetterInfo[]>('set-word').pipe(
        tap(({data: currentWord}) => {
          this.gameStore.updateCurrentWord(currentWord);
        })
      ),
      this.socketService.getMessages$<GameState>('restart-game').pipe(
        tap(({data: state}) => {
          this.gameStore.update({...state, newGuess: null});
        })
      ),
      this.socketService.getMessages$<GuessInfo>('new-guess').pipe(
        tap(({data: guessInfo}) => {
          this.gameStore.addGuess(guessInfo);
        })
      ),
      this.socketService.getMessages$('new-turn').pipe(
        tap(({data: currentTurn}) => this.gameStore.updateTurn(currentTurn))
      ),
      this.socketService.getMessages$<string>('new-word-guesses').pipe(
        tap(({data: wordGuess}) => this.gameStore.updateWordGuesses(wordGuess))
      ),
      this.socketService.getMessages$<PlayerInfo>('update-player').pipe(
        tap(({data: player}) => this.gameStore.updatePlayer(player))
      ),
      this.socketService.getMessages$<string>('new-master').pipe(
        tap(({data: newMaster}) => this.gameStore.updateMaster(newMaster))
      )
    ];

    socketMessagesHandlers.forEach( obs => this.sub.add(obs.subscribe()));
  }

  private createUrl(url: string): string {
    return `${this.baseUrl}/${url}`;
  }

  private startGame(state: GameState) {
    this.gameStore.update(state);
  }

  setWord(word: string) {
    const url = this.createUrl(`game/rooms/${this.roomId}/word`);
    return this.httpClient.post(url, {word}, { responseType: 'text' });
  }

  sendLetter(key: string) {
    const url = this.createUrl(`game/rooms/${this.roomId}/guesses`);
    return this.httpClient.post(url, {letter: key});
  }

  sendWordGuess(wordGuess: string) {
    const url = this.createUrl(`game/rooms/${this.roomId}/word-guesses`);
    const dto = {
      word: wordGuess
    };
    return this.httpClient.post(url, dto);
  }

  initGame() {
    const url = this.createUrl(`game/rooms/${this.roomId}/init-game`);
    return this.httpClient.put<void>(url, undefined);
  }

  restartGame() {
    const url = this.createUrl(`game/rooms/${this.roomId}/restart-game`);
    return this.httpClient.put<void>(url, undefined);
  }

  getState(roomId: string): Observable<GameState> {
    const url = this.createUrl(`game/rooms/${roomId}`);
    this.roomId = roomId;
    return this.httpClient.get<GameState>(url).pipe(
      tap( (state) => this.startGame(state))
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
