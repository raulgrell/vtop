// Initializes the `Feature` service on path `/feature`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Feature } from './feature.class';
import createModel from './feature.model';
import hooks from './feature.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'feature': Feature & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/feature', new Feature(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('feature');

  service.hooks(hooks);
}
