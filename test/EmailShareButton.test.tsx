import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { EmailShareButton, buildEmailShareUrl } from '../src/EmailShareButton';

describe('EmailShareButton', () => {
  it('navigates to a mailto link instead of opening a popup', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);

    const hrefState = { value: 'https://example.test/' };
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        get href() {
          return hrefState.value;
        },
        set href(value: string) {
          hrefState.value = value;
        },
      },
    });

    render(
      <EmailShareButton body="Body" subject="Subject" url="https://example.com">
        Share by email
      </EmailShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share by email' }));

    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefState.value).toBe('mailto:?subject=Subject&body=Body%0Ahttps%3A%2F%2Fexample.com');
  });

  it('uses the shared url as the body when no body is provided', () => {
    const hrefState = { value: 'https://example.test/' };
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        get href() {
          return hrefState.value;
        },
        set href(value: string) {
          hrefState.value = value;
        },
      },
    });

    render(
      <EmailShareButton subject="Subject" url="https://example.com">
        Share by email
      </EmailShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share by email' }));

    expect(hrefState.value).toBe('mailto:?subject=Subject&body=https%3A%2F%2Fexample.com');
  });

  it('adds one or more recipients to the mailto link', () => {
    expect(
      buildEmailShareUrl('https://example.com', { subject: 'Hi', to: 'you@example.com' }),
    ).toBe('mailto:you@example.com?subject=Hi&body=https%3A%2F%2Fexample.com');
    expect(
      buildEmailShareUrl('https://example.com', { to: ['a@example.com', 'b@example.com'] }),
    ).toBe('mailto:a@example.com,b@example.com?body=https%3A%2F%2Fexample.com');
  });

  it('ignores an empty recipient', () => {
    expect(buildEmailShareUrl('https://example.com', { to: [] })).toBe(
      'mailto:?body=https%3A%2F%2Fexample.com',
    );
  });

  it('passes the `to` prop through to the mailto link', () => {
    const hrefState = { value: 'https://example.test/' };
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        get href() {
          return hrefState.value;
        },
        set href(value: string) {
          hrefState.value = value;
        },
      },
    });

    render(
      <EmailShareButton to="you@example.com" url="https://example.com">
        Share by email
      </EmailShareButton>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Share by email' }));

    expect(hrefState.value).toBe('mailto:you@example.com?body=https%3A%2F%2Fexample.com');
  });
});
