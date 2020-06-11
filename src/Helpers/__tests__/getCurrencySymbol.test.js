// @ts-nocheck
import getFullNameFromEmail from '../getFullNameFromEmail';

describe('getFullNameFromEmail()', () => {
  it('if email is undefined', () => {
    const fullName = getFullNameFromEmail();

    expect(fullName).toBe('');
  });

  it('if email is name.surname@domain', () => {
    const fullName = getFullNameFromEmail('test.test@bostongene.com');

    expect(fullName).toBe('Test Test');
  });

  it('if email is name@domain', () => {
    const fullName = getFullNameFromEmail('test-test@bostongene.com');

    expect(fullName).toBe('Test-test');
  });
});
