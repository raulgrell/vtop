import assert from 'assert';
import app from '../../src/app';

describe('\'Map\' service', () => {
  it('registered the service', () => {
    const service = app.service('map');

    assert.ok(service, 'Registered the service');
  });
});
