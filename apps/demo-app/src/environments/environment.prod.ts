import { ClickerAPIConfig } from '@pipeline-example/data-access/clicker-api';

export interface ENV_INTERFACE {
  production: boolean;
  clickerAPI: ClickerAPIConfig;
}

export const environment: ENV_INTERFACE = {
  production: true,

  clickerAPI: {
    rootUrl: new URL('localhost:4300'),
    useLocal: false,
  },
};
