import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import XShareButton from './XShareButton';

type TwitterShareButtonProps = ComponentPropsWithoutRef<typeof XShareButton>;

/** @deprecated Use XShareButton instead. */
const TwitterShareButton = forwardRef<HTMLButtonElement, TwitterShareButtonProps>((props, ref) => (
  <XShareButton {...props} ref={ref} />
));

TwitterShareButton.displayName = 'TwitterShareButton';

export default TwitterShareButton;
