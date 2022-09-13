import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { BaseModel } from '../../models';

class Map extends BaseModel {
  static get tableName(): string {
    return 'map';
  }
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        world_id: { type: 'integer' },
        data: { type: 'object' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    };
  }
  static get relationMappings() {
    const World = require('./world.model');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: World,
        join: {
          from: 'map.world_id',
          to: 'world.id'
        }
      }
    };
  }
}

export default function (app: Application): typeof Map {
  const db: Knex = app.get('knex');
  const tableName = 'map';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name');
        table.integer('world_id');
        table.json('data');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return Map;
}
