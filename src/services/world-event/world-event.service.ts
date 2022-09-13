// Initializes the `WorldEvent` service on path `/world-event`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { WorldEvent } from './world-event.class';
import createModel from './world-event.model';
import hooks from './world-event.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'world-event': WorldEvent & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/world-event', new WorldEvent(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('world-event');

  service.hooks(hooks);
}
