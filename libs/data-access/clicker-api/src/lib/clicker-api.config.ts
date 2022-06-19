import { InjectionToken } from '@angular/core';

export interface ClickerAPIConfig {
  rootUrl: URL | string;

  useLocal?: boolean;
}

export const CLICKER_API_CONFIG = new InjectionToken<ClickerAPIConfig>(
  'clicker-api config'
);
