import assert from 'assert';
import app from '../../src/app';

describe('\'MapTile\' service', () => {
  it('registered the service', () => {
    const service = app.service('map-tile');

    assert.ok(service, 'Registered the service');
  });
});
