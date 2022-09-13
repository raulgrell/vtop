import { Model, JSONSchema } from 'objection';
import { Knex } from 'knex';
import { Application } from '../../declarations';
import { BaseModel } from '../../models';

class UnitAction extends BaseModel {
  static get tableName(): string {
    return 'unit_action';
  }
  static get jsonSchema(): JSONSchema {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
        unit_id: { type: 'string' },
        data: { type: 'object' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      }
    };
  }
}

export default function (app: Application): typeof UnitAction {
  const db: Knex = app.get('knex');
  const tableName = 'unit_action';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name');
        table.integer('unit_id');
        table.json('data');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
        // Constraints
        table.foreign('unit_id', 'fk_action_unit').references('id').inTable('unit');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return UnitAction;
}
