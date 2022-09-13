// Initializes the `Tile` service on path `/tile`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Tile } from './tile.class';
import createModel from './tile.model';
import hooks from './tile.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'tile': Tile & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/tile', new Tile(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('tile');

  service.hooks(hooks);
}
