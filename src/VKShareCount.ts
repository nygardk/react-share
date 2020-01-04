import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';

declare global {
  interface Window {
    VK: {
      Share: {
        count: (index: number, count: number) => void;
      };
      callbacks: ((count?: number) => void)[];
    };
  }
}

function getVKShareCount(shareUrl: string, callback: (shareCount?: number) => void) {
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

  return jsonp(
    url +
      objectToGetParams({
        act: 'count',
        index,
        url: shareUrl,
      }),
  );
}

export default createShareCount(getVKShareCount);
