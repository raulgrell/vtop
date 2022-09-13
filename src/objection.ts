import { Model } from 'objection';
import knex from 'knex';
import { Application } from './declarations';

export default function (app: Application): void {
  const { client, connection } = app.get('pg');
  const db = knex({ client, connection, useNullAsDefault: false, searchPath: ['vtop'] });

  Model.knex(db);

  app.set('knex', db);
}
