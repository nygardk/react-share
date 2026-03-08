import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';

function getTumblrShareCount(shareUrl: string, callback: (shareCount?: number) => void) {
  const endpoint = 'https://api.tumblr.com/v2/share/stats';

  return jsonp(
    endpoint +
      objectToGetParams({
        url: shareUrl,
      }),
    (err, data) => {
      callback(!err && data && data.response ? data.response.note_count : undefined);
    },
  );
}

/**
 * @deprecated Share counts are deprecated and will be removed in v6.
 */
const TumblrShareCount = createShareCount(getTumblrShareCount);

export default TumblrShareCount;
