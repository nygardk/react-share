import React, { useEffect, useState, useCallback } from 'react';
import cx from 'classnames';

declare global {
  interface Window {
    Kakao: any;
  }
}

type KakaoShareButtonProps = {
  kakaoJsKey: string; // kakao app javascript key
  webUrl: string;
  mobileWebUrl?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  className?: string;
  buttonTitle?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  children: React.ReactNode;
};

export const KakaoShareButton: React.FC<KakaoShareButtonProps> = ({
  kakaoJsKey,
  webUrl,
  mobileWebUrl = webUrl,
  title,
  description = 'description',
  imageUrl = '',
  className = '',
  buttonTitle = 'Shared On Kakao',
  style = {},
  disabled = false,
  children,
}) => {
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  const loadKakaoSDK = useCallback(() => {
    if (typeof window !== 'undefined' && !window.Kakao) {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;

      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          try {
            window.Kakao.init(kakaoJsKey);
            setIsKakaoLoaded(true);
          } catch (error) {
            console.error('Init Kakao SDK failed : ', error);
          }
        }
      };
      script.onerror = () => {
        console.error('Load Kakao SDK failed');
      };
      document.body.appendChild(script);
    } else if (window.Kakao && window.Kakao.isInitialized()) {
      setIsKakaoLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadKakaoSDK();
  }, [loadKakaoSDK]);

  const handleClick = () => {
    if (disabled) return;
    if (typeof window !== 'undefined' && !window.Kakao) {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoJsKey);
        }
      };
      document.body.appendChild(script);
    }

    if (isKakaoLoaded && window.Kakao.isInitialized()) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl,
          link: {
            mobileWebUrl,
            webUrl,
          },
        },
        buttons: [
          {
            title: buttonTitle,
            link: {
              mobileWebUrl,
              webUrl,
            },
          },
        ],
      });
    } else {
      console.error('Kakao SDK is not loaded yet.');
    }
  };

  const buttonClassName = cx(
    'react-share__ShareButton',
    { 'react-share__ShareButton--disabled': disabled },
    className,
  );

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    font: 'inherit',
    color: 'inherit',
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...style,
  };

  return React.createElement(
    'button',
    {
      className: buttonClassName,
      style: buttonStyle,
      onClick: handleClick,
      disabled: isKakaoLoaded ? disabled : true,
    },
    children,
  );
};

export default KakaoShareButton;
