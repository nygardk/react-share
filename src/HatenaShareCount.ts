import jsonp from 'jsonp';

import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';

function getHatenaShareCount(shareUrl: string, callback: (shareCount?: number) => void) {
  const url = 'https://bookmark.hatenaapis.com/count/entry';

  jsonp(
    url +
      objectToGetParams({
        url: shareUrl,
      }),
    (err, data) => {
      callback(data ?? undefined);
    },
  );
}

/**
 * @deprecated Share counts are deprecated and will be removed in v6.
 */
const HatenaShareCount = createShareCount(getHatenaShareCount);

export default HatenaShareCount;
