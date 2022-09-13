import { HookContext } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
import {
  fastJoin,
} from 'feathers-hooks-common';
// Don't remove this comment. It's needed to format import lines nicely.

import { Dice } from "dice-typescript";

const dice = new Dice();
const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [(context: HookContext) => {
      if (context.data.data.type == "roll") {
        context.data.data.result = dice.roll(context.data.data.dice);
      }
      return context;
    }],
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
