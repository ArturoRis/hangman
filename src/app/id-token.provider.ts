import { guid } from '@datorama/akita';
import { InjectionToken } from '@angular/core';

export const ID_TOKEN = new InjectionToken('id-token');

let id = sessionStorage.getItem('hmo-id');
if (!id) {
  id = guid();
  sessionStorage.setItem('hmo-id', id);
}

export const IdTokenProvider = {
  useValue: id,
  provide: ID_TOKEN
};
