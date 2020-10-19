import jsonp from 'jsonp';

import createShareCount from './hocs/createShareCount';

function getFacebookShareCount(shareUrl: string, accessToken: string, callback: (shareCount?: number) => void) {
  const endpoint = `https://graph.facebook.com/?id=${shareUrl}&fields=engagement&access_token=${accessToken}`;
  
  jsonp(endpoint, (err, data) => {
    callback(
      !err && data && data.engagement
        ? data.engagement.share_count
        : undefined,
    );
  });
}

export default createShareCount(getFacebookShareCount);
