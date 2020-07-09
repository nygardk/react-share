import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';

type Options = {
  /** The url-encoded title value that you wish you use. */
  title?: string;
  /** The url-encoded description that you wish you use. */
  summary?: string;
  /** The url-encoded source of the content (e.g. your website or application name) */
  source?: string;
};

function linkedinLink(url: string, { title, summary, source }: Options) {
  assert(url, 'linkedin.url');

  return (
    'https://linkedin.com/shareArticle' +
    objectToGetParams({ url, mini: 'true', title, summary, source })
  );
}

const LinkedinShareButton = createShareButton<Options>(
  'linkedin',
  linkedinLink,
  ({ title, summary, source }) => ({ title, summary, source }),
  {
    windowWidth: 750,
    windowHeight: 600,
  },
);

export default LinkedinShareButton;
