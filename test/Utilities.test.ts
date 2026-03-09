import { describe, expect, it } from 'vitest';

import assert from '../src/utils/assert';
import objectToGetParams from '../src/utils/objectToGetParams';

describe('utilities', () => {
  it('encodes query parameters and skips nullish values', () => {
    expect(
      objectToGetParams({
        empty: null,
        page: 2,
        q: 'react share',
        unused: undefined,
      }),
    ).toBe('?page=2&q=react%20share');
  });

  it('returns an empty string when there are no defined params', () => {
    expect(
      objectToGetParams({
        onlyNull: null,
        onlyUndefined: undefined,
      }),
    ).toBe('');
  });

  it('throws a named assertion error when the value is falsy', () => {
    expect(() => assert('', 'example.message')).toThrowError('example.message');

    try {
      assert('', 'example.message');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).name).toBe('AssertionError');
    }
  });

  it('does not throw when the value is truthy', () => {
    expect(() => assert('ok', 'example.message')).not.toThrow();
  });
});
