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
        action_data: (...args) => async (action, { app }) => {
          const actionData = await app.service('action').find({
            query: { id: action.action_id },
            paginate: false
          });
          action.action_data = actionData[0].data;
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
