import jsonp from 'jsonp';

import createShareCount from './hocs/createShareCount';

function getRedditShareCount(shareUrl: string, callback: (shareCount?: number) => void) {
  const endpoint = `https://www.reddit.com/api/info.json?limit=1&url=${shareUrl}`;

  jsonp(endpoint, { param: 'jsonp' }, (err, response) => {
    callback(
      !err &&
        response &&
        response.data &&
        response.data.children.length > 0 &&
        response.data.children[0].data.score
        ? response.data.children[0].data.score
        : undefined,
    );
  });
}

export default createShareCount(getRedditShareCount);
