// Initializes the `World` service on path `/world`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { World } from './world.class';
import createModel from './world.model';
import hooks from './world.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'world': World & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/world', new World(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('world');

  service.hooks(hooks);
}
