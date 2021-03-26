import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { IdTokenProvider } from './id-token.provider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VersionTokenProvider } from './version.provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools,
    FontAwesomeModule
  ],
  providers: [
    {
      useClass: HashLocationStrategy,
      provide: LocationStrategy
    },
    IdTokenProvider,
    VersionTokenProvider
    // { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
