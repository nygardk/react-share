import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function threadsLink(url: string, { title }: { title?: string }) {
  assert(url, 'threads.url');

  return (
    'https://threads.net/intent/post' +
    objectToGetParams({
      url,
      text: title,
    })
  );
}

const ThreadsShareButton = createShareButton<{
  title?: string;
  via?: string;
  hashtags?: string[];
  related?: string[];
}>(
  'threads',
  threadsLink,
  props => ({
    title: props.title,
  }),
  {
    windowWidth: 550,
    windowHeight: 600,
  },
);

export default ThreadsShareButton;
