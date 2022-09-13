// Initializes the `Spriteinfo` service on path `/spriteinfo`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Spriteinfo } from './spriteinfo.class';
import createModel from './spriteinfo.model';
import hooks from './spriteinfo.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'spriteinfo': Spriteinfo & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/spriteinfo', new Spriteinfo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('spriteinfo');

  service.hooks(hooks);
}
