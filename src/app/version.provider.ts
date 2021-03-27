import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';
import { version as packageVersion } from '../../package.json';

export const VERSION_TOKEN = new InjectionToken('version');

let version = packageVersion;
if (!environment.production) {
  version += '-dev';
}

export const VersionTokenProvider = {
  useValue: version,
  provide: VERSION_TOKEN
};
