import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameQuery } from '../../state/game.query';
import { BaseComponent } from '../../../core/base-objects/base-component';

@Component({
  selector: 'hmo-room-title',
  templateUrl: './room-title.component.html',
  styleUrls: ['./room-title.component.scss']
})
export class RoomTitleComponent extends BaseComponent implements OnInit {

  roomId: Observable<string>;
  tooltiptext = 'Clicca per copiare il link';

  constructor(
    private gameQuery: GameQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.roomId = this.gameQuery.getId$();
  }

  async getLink() {
    const toCopy = location.href;
    await navigator.clipboard.writeText(toCopy);
    const oldTooltip = this.tooltiptext;
    this.tooltiptext = 'Link copiato!';
    setTimeout(() => this.tooltiptext = oldTooltip, 2000);
  }
}
