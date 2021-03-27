import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export interface DataLoader<D, E = any> {
  loading: boolean;
  data?: D;
  error?: E;
}

export class DataLoaderObservable<D, E = any> extends Observable<D> implements DataLoader<D, E>{
  loading = false;
  data?: D;
  error?: E;
  constructor(
    loader: Observable<D>
  ) {
    super(obs => {
      this.loading = true;
      this.data = undefined;
      this.error = undefined;
      return loader.pipe(
        finalize( () => this.loading = false)
      ).subscribe(
        data => {
          this.data = data;
          obs.next(data);
        },
        error => {
          this.error = error;
          obs.error(error);
        },
        () => obs.complete()
      );
    });
  }
}

export function dataLoaderFromObservable<D, E = any>(obs: Observable<D>): DataLoaderObservable<D, E> {
  return new DataLoaderObservable<D, E>(obs);
}
