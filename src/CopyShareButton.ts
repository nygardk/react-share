import copyToClipboard from './utils/clipboard';
import createShareButton from './hocs/createShareButton';

type Options = {
  onCopySuccess?: object;
};

function copiedLink(url: string) {
  return url;
}

const CopyShareButton = createShareButton<Options>('copy', copiedLink, () => ({}), {
  openShareDialogOnClick: false,
  onClick: (_, link: string) => {
    return copyToClipboard({ value: link });
  },
});

export default CopyShareButton;
