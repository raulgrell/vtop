import assert from 'assert';
import app from '../../src/app';

describe('\'Char\' service', () => {
  it('registered the service', () => {
    const service = app.service('char');

    assert.ok(service, 'Registered the service');
  });
});
