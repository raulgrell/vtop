import assert from 'assert';
import app from '../../src/app';

describe('\'MapAction\' service', () => {
  it('registered the service', () => {
    const service = app.service('map-action');

    assert.ok(service, 'Registered the service');
  });
});
