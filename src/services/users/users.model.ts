import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { BaseModel } from '../../models';

class User extends BaseModel {
  static get tableName(): string {
    return 'users';
  }
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['email'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        token: { type: 'string' },
        data: { type: 'object' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    };
  }
  static get relationMappings() {
    const World = require('../world/world.model');
    const Unit = require('../unit/unit.model');
    const WorldUser = require('../world-user/world-user.model');
    return {
      worlds: {
        relation: Model.ManyToManyRelation,
        modelClass: World,
        join: {
          from: 'user.id',
          through: {
            modelClass: WorldUser,
            from: 'world_user.user_id',
            to: 'world_user.world_id'
          },
          to: 'world.id'
        }
      },
      units: {
        relation: Model.HasManyRelation,
        modelClass: Unit,
        join: {
          from: 'user.id',
          to: 'unit.user_id'
        }
      }
    };
  }
}

export default function (app: Application): typeof User {
  const db: Knex = app.get('knex');
  const tableName = 'users';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments();
        table.string('email').unique();
        table.string('password');
        table.string('token');
        table.json('data');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return User;
}
