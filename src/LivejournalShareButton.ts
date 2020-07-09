import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

function livejournalLink(
  url: string,
  { title, description }: { title?: string; description?: string },
) {
  assert(url, 'livejournal.url');

  return (
    'https://www.livejournal.com/update.bml' +
    objectToGetParams({
      subject: title,
      event: description,
    })
  );
}

const LivejournalShareButton = createShareButton<{ title?: string; description?: string }>(
  'livejournal',
  livejournalLink,
  props => ({
    title: props.title,
    description: props.description,
  }),
  {
    windowWidth: 660,
    windowHeight: 460,
  },
);

export default LivejournalShareButton;
