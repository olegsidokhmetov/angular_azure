import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from './layout/layout.module';
import { ClickerApiModule } from '@pipeline-example/data-access/clicker-api';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

console.log(environment);

@NgModule({
  imports: [
    // Angular-Modules
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,

    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clickboard',
      },
      {
        path: 'clickboard',
        loadChildren: () =>
          import('@pipeline-example/features/clicker-ui').then(
            (m) => m.FeaturesClickerUiModule
          ),
      },
    ]),

    // UI-Modules
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,

    // App-Module
    LayoutModule,
    AppLayoutModule,

    // API-Modules
    ClickerApiModule.forRoot(environment.clickerAPI),
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
