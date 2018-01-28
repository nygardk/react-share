import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import shareCountFactory from './utils/shareCountFactory';

function getLinkedinShareCount(shareUrl, callback) {
  const url = 'https://www.linkedin.com/countserv/count/share';

  return jsonp(url + objectToGetParams({
    url: shareUrl,
    format: 'jsonp',
  }), (err, data) => {
    callback(data ? data.count : undefined);
  });
}

export default shareCountFactory(getLinkedinShareCount);
