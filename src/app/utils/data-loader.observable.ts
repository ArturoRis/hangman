import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

export class DataLoaderObservable<D> extends Observable<D>{
  loading = false;
  constructor(
    loader: Observable<D>
  ) {
    super(obs => {
      this.loading = true;
      return loader.pipe(
        finalize( () => this.loading = false)
      ).subscribe(
        data => obs.next(data),
        err => obs.error(err),
        () => obs.complete()
      );
    });
  }
}
