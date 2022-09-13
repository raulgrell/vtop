import * as authentication from '@feathersjs/authentication';
import {
  fastJoin,
} from 'feathers-hooks-common';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [fastJoin({
      joins: {
        unit_data: (...args) => async (token, { app }) => {
          const unitData = await app.service('unit').find({
            query: { id: token.unit_id },
            paginate: false
          });
          token.unit_data = unitData[0].data;
        }
      }
    })],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
