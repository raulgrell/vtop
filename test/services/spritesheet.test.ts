import assert from 'assert';
import app from '../../src/app';

describe('\'Spritesheet\' service', () => {
  it('registered the service', () => {
    const service = app.service('spritesheet');

    assert.ok(service, 'Registered the service');
  });
});
