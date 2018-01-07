import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import shareCountFactory from './utils/shareCountFactory';

function getTumblrShareCount(shareUrl, callback) {
  const endpoint = 'http://api.tumblr.com/v2/share/stats';

  return jsonp(endpoint + objectToGetParams({
    url: shareUrl,
  }), (err, data) => {
    callback(data ? data.note_count : undefined);
  });
}

export default shareCountFactory(getTumblrShareCount);
