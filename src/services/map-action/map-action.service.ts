// Initializes the `MapAction` service on path `/map-action`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { MapAction } from './map-action.class';
import createModel from './map-action.model';
import hooks from './map-action.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'map-action': MapAction & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/map-action', new MapAction(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('map-action');

  service.hooks(hooks);
}
