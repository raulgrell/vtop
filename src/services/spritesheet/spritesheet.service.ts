// Initializes the `Spritesheet` service on path `/spritesheet`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Spritesheet } from './spritesheet.class';
import createModel from './spritesheet.model';
import hooks from './spritesheet.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'spritesheet': Spritesheet & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/spritesheet', new Spritesheet(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('spritesheet');

  service.hooks(hooks);
}
