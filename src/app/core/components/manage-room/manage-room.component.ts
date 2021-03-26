import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerInfoService } from '../../state/player-info.service';
import { PlayerInfoQuery } from '../../state/player-info.query';
import { BaseDirective } from '../../base-objects/base.directive';
import { RoomService } from '../../services/room.service';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Component({
  selector: 'hmo-manage-room',
  templateUrl: './manage-room.component.html',
  styleUrls: ['./manage-room.component.scss']
})
export class ManageRoomComponent extends BaseDirective implements OnInit {

  roomId$: Observable<string | undefined>;
  name: string;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private playerInfoQuery: PlayerInfoQuery,
    private playerInfoService: PlayerInfoService
  ) {
    super();
    this.name = this.playerInfoQuery.getName();

    this.roomId$ = this.activatedRoute.queryParamMap.pipe(
      map( query => query.get('r') as string),
      shareReplay()
    );
  }

  ngOnInit(): void {
  }

  createRoom(): Observable<boolean> {
    return this.roomService.createRoom(this.name).pipe(
      switchMap( roomId => this.goToRoom(roomId))
    );
  }

  joinRoom(roomId: string): Observable<boolean> {
    return this.goToRoom(roomId);
  }

  goToRoom(roomId: string): Observable<boolean> {
    this.playerInfoService.setName(this.name);
    return fromPromise(this.router.navigate(['game', roomId]));
  }
}
