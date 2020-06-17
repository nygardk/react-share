import assert from 'assert';

import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function hatenaLink(url: string, { title }: { title?: string }) {
  assert(url, 'hatena.url');

  return (
    'https://b.hatena.ne.jp/add?mode=confirm' +
    objectToGetParams({
      url,
      title,
    })
  );
}

const HatenaShareButton = createShareButton<{ title?: string }>(
  'hatena',
  hatenaLink,
  props => ({
    title: props.title,
  }),
  {
    windowWidth: 660,
    windowHeight: 460,
    windowPosition: 'windowCenter',
  },
);

export default HatenaShareButton;
