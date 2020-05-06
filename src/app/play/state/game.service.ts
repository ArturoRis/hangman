import { Injectable, OnDestroy } from '@angular/core';
import { GameState, GameStore, GuessInfo, LetterInfo, PlayerInfo, Status } from './game.store';
import { SocketService } from '../../core/services/socket.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class GameService implements OnDestroy {

  private sub = new Subscription();

  constructor(
    private gameStore: GameStore,
    private socketService: SocketService,
    private router: Router
  ) {

    this.sub.add(
      this.socketService.getMessages$<{ player: PlayerInfo, master?: string }>('player-leave').pipe(
        tap(({data: {player, master}}) => {
          this.gameStore.removePlayer(player);
          if (master) {
            this.gameStore.updateMaster(master);
          }
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<PlayerInfo>('player-join').pipe(
        tap(({data: player}) => {
          this.gameStore.addPlayer(player);
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<GameState>('go-to-start').pipe(
        tap(({data: state}) => {
          this.gameStore.update(state);
          this.router.navigate(['game', state.id, 'play']);
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<Status>('finish-game').pipe(
        tap(({data: status}) => {
          this.gameStore.updateStatus(status);
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<LetterInfo[]>('set-word').pipe(
        tap(({data: currentWord}) => {
          this.gameStore.updateCurrentWord(currentWord);
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<GameState>('restart-game').pipe(
        tap(({data: state}) => {
          this.gameStore.update({...state, newGuess: null});
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<GuessInfo>('new-guess').pipe(
        tap(({data: guessInfo}) => {
          this.gameStore.addGuess(guessInfo);
        })
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$('new-turn').pipe(
        tap(({data: currentTurn}) => this.gameStore.updateTurn(currentTurn))
      ).subscribe()
    );

    this.sub.add(
      this.socketService.getMessages$<string[]>('new-word-guesses').pipe(
        tap(({data: wordGuesses}) => this.gameStore.updateWordGuesses(wordGuesses))
      ).subscribe()
    );
  }

  setWord(word: string) {
    this.socketService.sendMessage('set-word', word);
  }

  startGame(state: GameState) {
    this.gameStore.update(state);
  }

  restartGame() {
    this.socketService.sendMessage('restart-game', undefined);
  }

  sendLetter(key: string) {
    this.socketService.sendMessage('new-guess', key);
  }

  sendWordGuess(wordGuess: string) {
    this.socketService.sendMessage('new-word-guess', wordGuess);
  }

  initGame() {
    this.socketService.sendMessage('init-game', undefined);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
