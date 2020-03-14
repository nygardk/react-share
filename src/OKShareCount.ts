import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';

declare global {
  interface Window {
    OK: {
      Share: {
        count: (index: number, _count: number) => void;
      };
      callbacks: ((count?: number) => void)[];
    };
    ODKL: {
      updateCount: (a: any, b: any) => void;
    };
  }
}

function getOKShareCount(shareUrl: string, callback: (shareCount?: number) => void) {
  if (!window.OK) {
    window.OK = {
      Share: {
        count: function count(index, _count) {
          window.OK.callbacks[index](_count);
        },
      },
      callbacks: [],
    };
  }

  const url = 'https://connect.ok.ru/dk';
  const index = window.OK.callbacks.length;

  window.ODKL = {
    updateCount(a, b) {
      const callbackIndex = parseInt(a.replace('react-share-', ''), 10);
      window.OK.callbacks[callbackIndex](b);
    },
  };
  window.OK.callbacks.push(callback);

  return jsonp(
    url +
      objectToGetParams({
        'st.cmd': 'extLike',
        uid: `react-share-${index}`,
        ref: shareUrl,
      }),
  );
}

export default createShareCount(getOKShareCount);
