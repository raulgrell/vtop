// Initializes the `MapTile` service on path `/map-tile`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { MapTile } from './map-tile.class';
import createModel from './map-tile.model';
import hooks from './map-tile.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'map-tile': MapTile & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/map-tile', new MapTile(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('map-tile');

  service.hooks(hooks);
}
