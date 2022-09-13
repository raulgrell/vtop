import assert from 'assert';
import app from '../../src/app';

describe('\'MapToken\' service', () => {
  it('registered the service', () => {
    const service = app.service('map-token');

    assert.ok(service, 'Registered the service');
  });
});
