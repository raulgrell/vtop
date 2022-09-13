import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { BaseModel } from '../../models';

class Unit extends BaseModel {
  static get tableName(): string {
    return 'unit';
  }
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        user_id: { type: 'integer' },
        data: { type: 'object' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    };
  }
  static get relationMappings() {
    const User = require('../users/users.model');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'unit.user_id',
          to: 'users.id'
        }
      }
    };
  }
}

export default function (app: Application): typeof Unit {
  const db: Knex = app.get('knex');
  const tableName = 'unit';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('user_id');
        table.json('data');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        // Constraints
        table.foreign('user_id', 'fk_unit_user').references('id').inTable('user');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return Unit;
}
