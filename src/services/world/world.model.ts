import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { BaseModel } from '../../models';

class World extends BaseModel {
  static get tableName(): string {
    return 'world';
  }
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        data: { type: 'object' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    };
  }
  static get relationMappings() {
    const WorldUser = require('../world-user/world-user.model');
    const Map = require('../map/map.model');
    const User = require('../users/user.model');
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'world.id',
          through: {
            modelClass: WorldUser,
            from: 'world_user.world_id',
            to: 'world_user.user_id'
          },
          to: 'users.id'
        }
      },
      maps: {
        relation: Model.HasManyRelation,
        modelClass: Map,
        join: {
          from: 'world.id',
          to: 'map.world_id'
        }
      }
    };
  }
}

export default function (app: Application): typeof World {
  const db: Knex = app.get('knex');
  const tableName = 'world';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name').unique();
        table.json('data');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return World;
}
