// Initializes the `template` service on path `/template`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Template } from './template.class';
import createModel from './template.model';
import hooks from './template.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'template': Template & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/template', new Template(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('template');

  service.hooks(hooks);
}
