import assert from 'assert';
import app from '../../src/app';

describe('\'Effect\' service', () => {
  it('registered the service', () => {
    const service = app.service('effect');

    assert.ok(service, 'Registered the service');
  });
});
