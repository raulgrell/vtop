// Initializes the `PC` service on path `/unit`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Unit } from './unit.class';
import createModel from './unit.model';
import hooks from './unit.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'unit': Unit & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/unit', new Unit(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('unit');

  service.hooks(hooks);
}
