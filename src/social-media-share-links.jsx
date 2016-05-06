/* eslint-disable prefer-template */
import assert from 'assert';

import { objectToGetParams } from './utils';

export function email(subject, body) {
  assert(subject, 'email.subject');
  assert(body, 'email.body');

  return 'mailto:' + objectToGetParams({ subject, body });
}

export function twitter(url, text, via, hashtags = []) {
  assert(url, 'twitter.url');
  assert(text, 'twitter.text');
  assert(Array.isArray(hashtags), 'twitter.hashtags is not an array');

  return 'https://twitter.com/share' + objectToGetParams({
    url,
    text,
    via,
    hashtags: hashtags.join(','),
  });
}

export function facebook(url) {
  assert(url, 'facebook.url');

  return 'https://facebook.com/sharer.php' + objectToGetParams({ u: url });
}

export function googlePlus(url) {
  assert(url, 'googlePlus.url');

  return 'https://plus.google.com/share' + objectToGetParams({ url });
}

export function linkedin(url, title) {
  assert(url, 'linkedin.url');
  assert(title, 'linkedin.title');

  return 'https://linkedin.com/shareArticle' + objectToGetParams({ url, title });
}

export function pinterest(url, media, description) {
  assert(url, 'pinterest.url');
  assert(media, 'pinterest.media');

  return 'https://pinterest.com/pin/create/button/' + objectToGetParams({
    url,
    media,
    description,
  });
}
