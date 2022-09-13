import assert from 'assert';
import app from '../../src/app';

describe('\'template\' service', () => {
  it('registered the service', () => {
    const service = app.service('template');

    assert.ok(service, 'Registered the service');
  });
});
