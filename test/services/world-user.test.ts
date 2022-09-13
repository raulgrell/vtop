import assert from 'assert';
import app from '../../src/app';

describe('\'WorldUser\' service', () => {
  it('registered the service', () => {
    const service = app.service('world-user');

    assert.ok(service, 'Registered the service');
  });
});
