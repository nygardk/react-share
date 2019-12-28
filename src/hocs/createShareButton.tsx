import React, { Ref, forwardRef } from 'react';

import ShareButton, { Props as ShareButtonProps } from '../ShareButton';

function createShareButton<OptionProps extends {}, LinkOptions = OptionProps>(
  networkName: string,
  link: (url: string, options: LinkOptions) => string,
  optsMap: (props: OptionProps) => LinkOptions,
  defaultProps: Partial<ShareButtonProps<LinkOptions> & OptionProps>,
) {
  type Props = Omit<
    ShareButtonProps<LinkOptions>,
    'forwardedRef' | 'networkName' | 'networkLink' | 'opts'
  > &
    OptionProps;

  function CreatedButton(props: Props, ref: Ref<HTMLButtonElement>) {
    return (
      <ShareButton<LinkOptions>
        {...defaultProps}
        {...props}
        forwardedRef={ref}
        networkName={networkName}
        networkLink={link}
        opts={optsMap(props)}
      />
    );
  }

  CreatedButton.displayName = `ShareButton-${networkName}`;

  return forwardRef(CreatedButton);
}

export default createShareButton;
