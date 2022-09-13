import assert from 'assert';
import app from '../../src/app';

describe('\'PCAction\' service', () => {
  it('registered the service', () => {
    const service = app.service('pc-action');

    assert.ok(service, 'Registered the service');
  });
});
