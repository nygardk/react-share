import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';

declare global {
  interface Window {
    VK: {
      Share?: {
        count: (index: number, count: number) => void;
      };
      callbacks?: ((count?: number) => void)[];
    };
  }
}

function getVKShareCount(shareUrl: string, callback: (shareCount?: number) => void) {
  if (!window.VK) window.VK = {};
  window.VK.Share = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    count: (index, count) => window.VK.callbacks![index](count),
  };
  window.VK.callbacks = [];

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
