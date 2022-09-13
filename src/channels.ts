import '@feathersjs/transport-commons';
import { HookContext } from '@feathersjs/feathers';
import { Application } from './declarations';

export default function (app: Application): void {
  if (typeof app.channel !== 'function') return;

  app.on('connection', (connection: any): void => {
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult: any, { connection }: any): void => {
    console.log(authResult);
    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);
      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);

      if (connection.user.isAdmin) {
        app.channel('admins').join(connection);
      }
    }
  });

  app.publish((data: any, hook: HookContext) => {
    return app.channel('authenticated');
  });
}
