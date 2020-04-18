import { Observable, Subject } from 'rxjs';

export abstract class BaseChannelService<E> {
  private channel = new Subject<E>();

  protected sendEvent(event: E) {
    this.channel.next(event);
  }

  protected getChannel$(): Observable<E> {
    return this.channel.asObservable();
  }
}
