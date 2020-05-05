import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PlayerInfoStore, PlayerInfoState } from './player-info.store';

@Injectable({ providedIn: 'root' })
export class PlayerInfoQuery extends Query<PlayerInfoState> {

  constructor(protected store: PlayerInfoStore) {
    super(store);
  }

  getState(): PlayerInfoState {
    return this.store.getValue();
  }

  getId(): string {
    return this.getState().id;
  }

  getName(): string {
    return this.getState().name;
  }
}
