import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable()
export class PlayerInfoService {
  private id: string;
  private name: string;

  constructor(
    private socketService: SocketService
  ) {
    this.name = localStorage.getItem('hmo-name');
  }

  setName(name: string) {
    this.name = name;
    localStorage.setItem('hmo-name', name);
  }

  getName() {
    if (!this.name) {
      this.setName(this.generateRandomName());
    }
    return this.name;
  }

  private generateRandomName() {
    return Math.random().toString(20).substr(2, Math.floor(Math.random() * 4) + 4);
  }

  getId() {
    if (!this.id) {
      this.id = this.socketService.getId();
    }
    return this.id;
  }
}
