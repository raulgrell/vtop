// Initializes the `token` service on path `/token`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Token } from './token.class';
import createModel from './token.model';
import hooks from './token.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'token': Token & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/token', new Token(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('token');

  service.hooks(hooks);
}
