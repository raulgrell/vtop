import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { BaseModel } from '../../models';

class MapAction extends BaseModel {
  static get tableName(): string {
    return 'map_action';
  }
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        map_id: { type: 'string' },
        action_id: { type: 'string' },
        data: { type: 'object' },  
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    };
  }
  static get relationMappings() {
    const Map = require('../map/map.model');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Map,
        join: {
          from: 'unit.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

export default function (app: Application): typeof MapAction {
  const db: Knex = app.get('knex');
  const tableName = 'map_action';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name');
        table.integer('map_id');
        table.integer('action_id');
        table.json('data');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        // Constraints
        table.foreign('map_id').references('id').inTable('map');
        table.foreign('action_id').references('id').inTable('action');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return MapAction;
}
