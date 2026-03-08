import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useIsMounted } from '../hooks/useIsMounted';

type ShareCountContainerProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>;

type SocialMediaShareCountProps = ShareCountContainerProps & {
  children?: (shareCount: number) => React.ReactNode;
  getCount: (url: string, callback: (shareCount?: number) => void) => void;
  url: string;
};

type ShareCountProps = Omit<SocialMediaShareCountProps, 'getCount'>;

export function SocialMediaShareCount({
  children = (shareCount: number) => shareCount,
  className,
  getCount,
  url,
  ...rest
}: SocialMediaShareCountProps) {
  const isMounted = useIsMounted();
  const [count, setCount] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getCount(url, count => {
      if (isMounted()) {
        setCount(count);
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <span className={cx('react-share__ShareCount', className)} {...rest}>
      {!isLoading && count !== undefined && children(count)}
    </span>
  );
}

export default function createShareCount(getCount: SocialMediaShareCountProps['getCount']) {
  const ShareCount = (props: ShareCountProps) => (
    <SocialMediaShareCount getCount={getCount} {...props} />
  );

  ShareCount.displayName = `ShareCount(${getCount.name})`;

  return ShareCount;
}
