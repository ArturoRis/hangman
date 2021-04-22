import { Component, Injectable, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

export interface SimpleModalConf {
  template: TemplateRef<{}>;
}

export interface SimpleModalHandler {
  close(): void;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private simpleModalBus$ = new Subject<ModalConf>();

  modalConf$ = this.simpleModalBus$.asObservable();

  open(conf: SimpleModalConf, getHandler: (h: SimpleModalHandler) => void): void {
    this.simpleModalBus$.next({
      ...conf,
      setHandler: getHandler
    });
  }
}

export interface ModalConf extends SimpleModalConf {
  setHandler(handler: SimpleModalHandler): void;
}

@Component({
  selector: 'hmo-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit, OnDestroy {
  openModal = false;
  conf?: SimpleModalConf;

  private sub: Subscription;
  constructor(
    private modalService: ModalService
  ) {
    this.sub = modalService.modalConf$.subscribe(
      conf => {
        this.conf = conf;
        conf.setHandler({
          close: () => this.close()
        });
        this.open();
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  open(): void {
    this.openModal = true;
  }

  close(): void {
    this.conf = undefined;
    this.openModal = false;
  }
}
