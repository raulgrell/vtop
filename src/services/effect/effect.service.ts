// Initializes the `Effect` service on path `/effect`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Effect } from './effect.class';
import createModel from './effect.model';
import hooks from './effect.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'effect': Effect & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/effect', new Effect(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('effect');

  service.hooks(hooks);
}
