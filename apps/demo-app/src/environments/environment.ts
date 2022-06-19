// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { ClickerAPIConfig } from '@pipeline-example/data-access/clicker-api';

export interface ENV_INTERFACE {
  production: boolean;
  clickerAPI: ClickerAPIConfig;
}

export const environment: ENV_INTERFACE = {
  production: false,

  clickerAPI: {
    rootUrl: new URL('localhost:4300'),
    useLocal: true
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
