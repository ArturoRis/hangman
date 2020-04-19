import { Observable, ReplaySubject } from 'rxjs';

export abstract class BaseChannelService<E> {
  protected channel = new ReplaySubject<E>();

  protected sendEvent(event: E) {
    this.channel.next(event);
  }

  protected getChannel$(): Observable<E> {
    return this.channel.asObservable();
  }
}
