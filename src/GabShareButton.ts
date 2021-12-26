import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function gabLink(url: string, { title }: { title?: string }) {
  assert(url, 'gab.url');

  return (
    'https://gab.com/compose' +
    objectToGetParams({
      url,
      text: title,
    })
  );
}

const GabShareButton = createShareButton<{ title?: string }>(
  'gab',
  gabLink,
  props => ({
    title: props.title,
  }),
  {
    windowWidth: 660,
    windowHeight: 640,
    windowPosition: 'windowCenter',
  },
);

export default GabShareButton;
