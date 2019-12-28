import React from 'react';

import ShareButton, { Props as ShareButtonProps } from '../ShareButton';

function createShareButton<OptionProps extends {}, LinkOptions = OptionProps>(
  network: string,
  link: (url: string, options: LinkOptions) => string,
  optsMap: (props: OptionProps) => LinkOptions,
  defaultProps: Partial<ShareButtonProps<LinkOptions> & OptionProps>,
) {
  const CreatedButton: React.FC<Omit<
    ShareButtonProps<LinkOptions>,
    'networkName' | 'networkLink' | 'opts'
  > &
    OptionProps> = props => (
    <ShareButton<LinkOptions>
      {...defaultProps}
      {...props}
      networkName={network}
      networkLink={link}
      opts={optsMap(props)}
    />
  );

  return CreatedButton;
}

export default createShareButton;
