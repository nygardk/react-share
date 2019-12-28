import jsonp from 'jsonp';

import createShareCount from './utils/createShareCount';

function getFacebookShareCount(shareUrl: string, callback: (shareCount?: number) => void) {
  const endpoint = `https://graph.facebook.com/?id=${shareUrl}`;

  jsonp(endpoint, (err, data) => {
    callback(
      !err && data && data.share && data.share.share_count ? data.share.share_count : undefined,
    );
  });
}

export default createShareCount(getFacebookShareCount);
