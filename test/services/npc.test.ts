import assert from 'assert';
import app from '../../src/app';

describe('\'NPC\' service', () => {
  it('registered the service', () => {
    const service = app.service('npc');

    assert.ok(service, 'Registered the service');
  });
});
