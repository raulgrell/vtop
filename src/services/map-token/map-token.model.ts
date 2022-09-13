import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { BaseModel } from '../../models';

const tableName = "map_token";

class MapToken extends BaseModel {
  static get tableName(): string {
    return tableName;
  }
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        map_id: { type: 'integer' },
        unit_id: { type: 'integer' },
        token_id: { type: 'integer' },
        x: { type: 'integer' },
        y: { type: 'integer' },
        data: { type: 'object' },
        meta: { type: 'object' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    };
  }
}

export default function (app: Application): typeof MapToken {
  const db: Knex = app.get('knex');
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('map_id');
        table.integer('unit_id');
        table.integer('token_id');
        table.integer('x');
        table.integer('y');
        table.json('data');
        table.json('meta');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        // Constraints
        table.foreign('map_id', 'fk_token_map').references('id').inTable('map');
        table.foreign('unit_id', 'fk_token_unit').references('id').inTable('unit');
        table.foreign('token_id', 'fk_token_token').references('id').inTable('token');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return MapToken;
}
