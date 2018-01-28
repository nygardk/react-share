import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import shareCountFactory from './utils/shareCountFactory';

function getVKShareCount(shareUrl, callback) {
  if (!window.VK) {
    window.VK = {
      Share: {
        count: (index, count) => window.VK.callbacks[index](count),
      },
      callbacks: [],
    };
  }

  const url = 'https://vk.com/share.php';
  const index = window.VK.callbacks.length;

  window.VK.callbacks.push(callback);

  return jsonp(url + objectToGetParams({
    act: 'count',
    index,
    url: shareUrl,
  }));
}

export default shareCountFactory(getVKShareCount);
