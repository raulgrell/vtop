import {
  AuthenticationBaseStrategy, AuthenticationResult, AuthenticationService
} from '@feathersjs/authentication';

import { NotAuthenticated } from '@feathersjs/errors';

import { Application } from '../declarations';

class ApiKeyStrategy extends AuthenticationBaseStrategy {
  async authenticate(authentication: AuthenticationResult) {
    const { token } = authentication;

    const config = this.authentication!.configuration[this.name!];

    const match = config.allowedKeys.includes(token);
    if (!match) throw new NotAuthenticated('Incorrect API Key');

    return {
      apiKey: true
    }
  }
}

export default function (app: Application) {
  const authentication = new AuthenticationService(app);
  // ... authentication service setup
  authentication.register('apiKey', new ApiKeyStrategy());
}
