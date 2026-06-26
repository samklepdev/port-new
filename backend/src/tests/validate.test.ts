import { strict as assert } from 'assert';
import { optionalEnum, optionalString, requiredEmail, requiredString, requiredUuid } from '../middleware/validate';

assert.equal(requiredString('email')(''), 'email is required');
assert.equal(requiredString('name')('  '), 'name is required');
assert.equal(requiredString('name')('foo'), null);
assert.equal(requiredEmail('email')('not-an-email'), 'email must be a valid email');
assert.equal(requiredEmail('email')('test@example.com'), null);
assert.equal(optionalString('note')(123), 'note must be a string');
assert.equal(optionalString('note')(undefined), null);
assert.equal(optionalEnum('status', ['draft', 'published'])('invalid'), 'status must be one of draft,published');
assert.equal(optionalEnum('status', ['draft', 'published'])('draft'), null);
assert.equal(requiredUuid('id')('not-uuid'), 'id must be a valid UUID');
assert.equal(requiredUuid('id')('123e4567-e89b-12d3-a456-426614174000'), null);
