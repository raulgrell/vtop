import assert from 'assert';
import app from '../../src/app';

describe('\'Action\' service', () => {
  it('registered the service', () => {
    const service = app.service('action');

    assert.ok(service, 'Registered the service');
  });
});
