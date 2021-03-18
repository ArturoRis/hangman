import { Inject, Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ID_TOKEN } from '../../id-token.provider';

export interface PlayerInfoState {
  id: string;
  name: string;
}

function generateRandomName(): string {
  return Math.random().toString(20).substr(2, Math.floor(Math.random() * 4) + 4);
}

export function createInitialState(id: string): PlayerInfoState {
  return {
    name: localStorage.getItem('hmo-name') || generateRandomName(),
    id
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'player-info'})
export class PlayerInfoStore extends Store<PlayerInfoState> {

  constructor(
    @Inject(ID_TOKEN) readonly id: string,
  ) {
    super(createInitialState(id));
  }

  updateName(name: string): void {
    localStorage.setItem('hmo-name', name);
    this.update({name});
  }
}

