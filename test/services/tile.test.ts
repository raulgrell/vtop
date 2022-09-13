import assert from 'assert';
import app from '../../src/app';

describe('\'Tile\' service', () => {
  it('registered the service', () => {
    const service = app.service('tile');

    assert.ok(service, 'Registered the service');
  });
});
