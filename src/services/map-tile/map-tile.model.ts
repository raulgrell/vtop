import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { BaseModel } from '../../models';

class MapTile extends BaseModel {
  static get tableName(): string {
    return 'map_tile';
  }
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        map_id: { type: 'integer' },
        tile_id: { type: 'integer' },
        x: { type: 'integer' },
        y: { type: 'integer' },
        data: { type: 'object' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    };
  }
}

export default function (app: Application): typeof MapTile {
  const db: Knex = app.get('knex');
  const tableName = 'map_tile';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('map_id');
        table.integer('tile_id');
        table.integer('x');
        table.integer('y');
        table.json('data');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        // Constraints
        table.foreign('map_id').references('id').inTable('map');
        table.foreign('tile_id').references('id').inTable('tile');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return MapTile;
}
