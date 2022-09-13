// Initializes the `Map` service on path `/map`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Map } from './map.class';
import createModel from './map.model';
import hooks from './map.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'map': Map & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/map', new Map(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('map');

  service.hooks(hooks);
}
