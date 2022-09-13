import { JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { BaseModel } from '../../models';

class WorldEvent extends BaseModel {
  static get tableName(): string {
    return 'world_event';
  }
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['data'],
      properties: {
        world_id: { type: 'integer' },
        user_id: { type: 'integer' },
        data: { type: 'object' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    };
  }
}

export default function (app: Application): typeof WorldEvent {
  const db: Knex = app.get('knex');
  const tableName = 'world_event';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('world_id');
        table.integer('user_id');
        table.json('data');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');

        // Constraints
        table.foreign('user_id', 'fk_world_user').references('id').inTable('users');
        table.foreign('world_id', 'fk_user_world').references('id').inTable('world');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return WorldEvent;
}
