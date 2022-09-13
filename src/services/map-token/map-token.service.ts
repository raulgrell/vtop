// Initializes the `MapToken` service on path `/map-token`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { MapToken } from './map-token.class';
import createModel from './map-token.model';
import hooks from './map-token.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'map-token': MapToken & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/map-token', new MapToken(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('map-token');

  service.hooks(hooks);
}
