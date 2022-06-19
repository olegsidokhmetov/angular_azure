import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClickerAPI } from './clicker-api.facade';
import { ClickerAPIConfig, CLICKER_API_CONFIG } from './clicker-api.config';
import {
  ClickerAPIService,
  ClickerAPILocalService,
  ClickerAPIRemoteService,
} from './services';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [{ provide: ClickerAPI, useClass: ClickerAPI }],
})
export class ClickerApiModule {
  static forRoot(
    config: ClickerAPIConfig
  ): ModuleWithProviders<ClickerApiModule> {
    const providers: Provider[] = [
      { provide: 'CLICKER_API_CONFIG', useValue: config },
    ];

    if (config.useLocal === true) {
      providers.push({
        provide: ClickerAPIService,
        useClass: ClickerAPILocalService,
      });
    } else {
      providers.push({
        provide: ClickerAPIService,
        useClass: ClickerAPIRemoteService,
      });
    }
    return {
      ngModule: ClickerApiModule,
      providers: providers,
    };
  }

  static forChild(): ModuleWithProviders<ClickerApiModule> {
    return {
      ngModule: ClickerApiModule,
    };
  }
}
