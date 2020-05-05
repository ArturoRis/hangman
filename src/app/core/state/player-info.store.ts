import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface PlayerInfoState {
  id: string;
  name: string;
}

function generateRandomName() {
  return Math.random().toString(20).substr(2, Math.floor(Math.random() * 4) + 4);
}

export function createInitialState(): PlayerInfoState {
  return {
    name: localStorage.getItem('hmo-name') || generateRandomName(),
    id: ''
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'player-info'})
export class PlayerInfoStore extends Store<PlayerInfoState> {

  constructor() {
    super(createInitialState());
  }

  updateName(name: string) {
    localStorage.setItem('hmo-name', name);
    this.update({name});
  }

  updateId(id: string) {
    this.update({id});
  }
}

