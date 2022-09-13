import assert from 'assert';
import app from '../../src/app';

describe('\'World\' service', () => {
  it('registered the service', () => {
    const service = app.service('world');

    assert.ok(service, 'Registered the service');
  });
});
