import jsonp from 'jsonp';

import shareCountFactory from './utils/shareCountFactory';

function getFacebookShareCount(shareUrl, callback, accessToken) {
  const endpoint = `https://graph.facebook.com/?id=${shareUrl}&fields=engagement&access_token=${accessToken}`;

  jsonp(endpoint, (err, data) => {
    callback(!err && data && data.engagement && data.engagement.share_count
      ? data.engagement.share_count
      : undefined);
  });
}

export default shareCountFactory(getFacebookShareCount);
