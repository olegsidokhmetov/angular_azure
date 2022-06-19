import { ClickerAPIConfig } from '@pipeline-example/data-access/clicker-api';

export interface ENV_INTERFACE {
  production: boolean;
  clickerAPI: ClickerAPIConfig;
}

export const environment: ENV_INTERFACE = {
  production: false,

  clickerAPI: {
    rootUrl: new URL('localhost:3333'),
    useLocal: false,
  },
};
