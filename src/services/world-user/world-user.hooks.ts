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
        user_data: (...args) => async (user, { app }) => {
          const userData = await app.service('users').find({
            query: { id: user.user_id },
            paginate: false
          });
          user.user_data = userData[0].data;
        },
        world_data: (...args) => async (user, { app }) => {
          const worldData = await app.service('world').find({
            query: { id: user.world_id },
            paginate: false
          });
          user.world_data = worldData[0].data;
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
