import assert from 'assert';
import app from '../../src/app';

describe('\'Game\' service', () => {
  it('registered the service', () => {
    const service = app.service('game');

    assert.ok(service, 'Registered the service');
  });
});
