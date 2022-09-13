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
        tile_data: (...args) => async (item, { app }) => {
          const tileData = await app.service('tile').find({
            query: { id: item.tile_id },
            paginate: false
          });
          item.tile_data = tileData[0].data;
        },
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
