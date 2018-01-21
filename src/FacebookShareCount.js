import jsonp from 'jsonp';

import shareCountFactory from './utils/shareCountFactory';

function getFacebookShareCount(shareUrl, callback) {
  const endpoint = `https://graph.facebook.com/?id=${shareUrl}`;

  jsonp(endpoint, (err, data) => {
    callback(!err && data && data.share && data.share.share_count
      ? data.share.share_count
      : undefined);
  });
}

export default shareCountFactory(getFacebookShareCount);
