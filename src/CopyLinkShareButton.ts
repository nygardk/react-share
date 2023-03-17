import copyToClipboard from './utils/clipboard';
import createShareButton from './hocs/createShareButton';

type Options = {
  onCopySuccess?: () => void;
};

function copiedLink(url: string) {
  return url;
}

const CopyLinkShareButton = createShareButton<Options>(
  'copy',
  copiedLink,
  ({ onCopySuccess }) => ({ onCopySuccess }),
  {
    openShareDialogOnClick: false,
    onClick: async (_, link: string, options: Options) => {
      await copyToClipboard({ value: link });
      options.onCopySuccess?.();
    },
  },
);

export default CopyLinkShareButton;
