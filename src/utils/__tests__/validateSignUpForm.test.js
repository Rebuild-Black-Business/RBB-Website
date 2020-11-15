import { validateSignUpForm } from '../validateSignUpForm';

describe('validateSignUpForm', () => {
  describe('website field', () => {
    it('should be required', () => {
      const data = {
        website: null,
      };

      expect(validateSignUpForm(data)).toMatchObject({
        website: 'This field is required.',
      });
    });

    it('should allow mailto: links', () => {
      const data = {
        website: 'mailto:example@example.com',
      };

      expect(validateSignUpForm(data)).toMatchObject({});
    });
    it('should allow https: links', () => {
      const data = {
        website: 'https://example.com',
      };

      expect(validateSignUpForm(data)).toMatchObject({});
    });

    it('should allow http: links', () => {
      const data = {
        website: 'http://example.com',
      };

      expect(validateSignUpForm(data)).toMatchObject({});
    });

    it('should not links without protocol', () => {
      const data = {
        website: 'www.example.com',
      };

      expect(validateSignUpForm(data)).toMatchObject({
        website: 'Please enter the full URL including http:// or https://',
      });
    });
  });
});
