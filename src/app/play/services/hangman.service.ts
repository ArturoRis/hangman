import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HangmanError } from '../components/hangman/hangman.component';

@Injectable()
export class HangmanService {

  private channel = new Subject<HangmanError>();
  constructor() { }

  sendError(error: HangmanError) {
    this.channel.next(error);
  }

  getErrors$() {
    return this.channel.asObservable();
  }
}
