import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import shareCountFactory from './utils/shareCountFactory';

function getPinterestShareCount(shareUrl, callback) {
  const url = 'https://api.pinterest.com/v1/urls/count.json';

  return jsonp(url + objectToGetParams({
    url: shareUrl,
  }), (err, data) => {
    callback(data ? data.count : undefined);
  });
}

export default shareCountFactory(getPinterestShareCount);
