// Initializes the `PCAction` service on path `/unit-action`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UnitAction } from './unit-action.class';
import createModel from './unit-action.model';
import hooks from './unit-action.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'unit-action': UnitAction & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/unit-action', new UnitAction(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('unit-action');

  service.hooks(hooks);
}
