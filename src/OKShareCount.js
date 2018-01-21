import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import shareCountFactory from './utils/shareCountFactory';

function getOKShareCount(shareUrl, callback) {
  if (!window.OK) {
    window.OK = {
      Share: {
        count: function count(index, _count) {
          return window.OK.callbacks[index](_count);
        },
      },
      callbacks: [],
    };
  }

  const url = 'https://connect.ok.ru/dk';
  const index = window.OK.callbacks.length;

  window.ODKL = { updateCount(a, b) { window.OK.callbacks[index](b); } };
  window.OK.callbacks.push(callback);

  return jsonp(url + (0, objectToGetParams)({
    'st.cmd': 'extLike',
    uid: 'odklcnt0',
    ref: shareUrl,
  }));
}

export default shareCountFactory(getOKShareCount);
