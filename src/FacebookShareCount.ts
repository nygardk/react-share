import jsonp from 'jsonp';

import createShareCount from './hocs/createShareCount';

function getFacebookShareCount(shareUrl: string, callback: (shareCount?: number) => void) {
  const endpoint = `https://graph.facebook.com/?id=${shareUrl}&fields=og_object{engagement}`;

  jsonp(endpoint, (err, data) => {
    callback(
      !err && data && data.og_object && data.og_object.engagement
        ? data.og_object.engagement.count
        : undefined,
    );
  });
}

/**
 * @deprecated Share counts are deprecated and will be removed in v6.
 */
const FacebookShareCount = createShareCount(getFacebookShareCount);

export default FacebookShareCount;
