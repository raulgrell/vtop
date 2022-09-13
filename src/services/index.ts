import { Application } from '../declarations';
import users from './users/users.service';
import map from './map/map.service';
import mapToken from './map-token/map-token.service';
import unit from './unit/unit.service';
import tile from './tile/tile.service';
import mapTile from './map-tile/map-tile.service';
import unitAction from './unit-action/unit-action.service';
import mapAction from './map-action/map-action.service';
import world from './world/world.service';
import token from './token/token.service';
import action from './action/action.service';
import effect from './effect/effect.service';
import feature from './feature/feature.service';
import game from './game/game.service';
import worldEvent from './world-event/world-event.service';
import worldUser from './world-user/world-user.service';
import template from './template/template.service';
import spritesheet from './spritesheet/spritesheet.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);

  app.configure(spritesheet);
  app.configure(action);
  app.configure(effect);
  app.configure(feature);
  app.configure(token);
  app.configure(tile);
  app.configure(world);
  app.configure(map);
  app.configure(unit);
  app.configure(template);
  app.configure(worldEvent);
  app.configure(worldUser);
  app.configure(mapTile);
  app.configure(mapToken);
  app.configure(mapAction);
  app.configure(unitAction);
  app.configure(game);

  app.use('/info', {
    async find() {
      return {
        services: Object.keys(app.services)
      };
    }
  });
}
