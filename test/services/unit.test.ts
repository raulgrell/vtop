import assert from 'assert';
import app from '../../src/app';

describe('\'PC\' service', () => {
  it('registered the service', () => {
    const service = app.service('pc');

    assert.ok(service, 'Registered the service');
  });
});
