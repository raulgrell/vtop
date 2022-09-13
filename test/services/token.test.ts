import assert from 'assert';
import app from '../../src/app';

describe('\'token\' service', () => {
  it('registered the service', () => {
    const service = app.service('token');

    assert.ok(service, 'Registered the service');
  });
});
