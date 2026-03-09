export type WindowPosition = 'windowCenter' | 'screenCenter';

export type ShareWindowOptions = {
  height?: number;
  onClose?: (dialog: Window | null) => void;
  position?: WindowPosition;
  width?: number;
};

const getBoxPositionOnWindowCenter = (width: number, height: number) => ({
  left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
  top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
});

const getBoxPositionOnScreenCenter = (width: number, height: number) => ({
  top: (window.screen.height - height) / 2,
  left: (window.screen.width - width) / 2,
});

export function openShareWindow(
  url: string,
  {
    height = 400,
    onClose,
    position = 'windowCenter',
    width = 550,
  }: ShareWindowOptions = {},
) {
  const config: { [key: string]: string | number } = {
    height,
    width,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
    ...(position === 'windowCenter'
      ? getBoxPositionOnWindowCenter(width, height)
      : getBoxPositionOnScreenCenter(width, height)),
  };

  const shareDialog = window.open(
    url,
    '',
    Object.keys(config)
      .map(key => `${key}=${config[key]}`)
      .join(', '),
  );

  if (onClose) {
    const interval = window.setInterval(() => {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval);
          onClose(shareDialog);
        }
      } catch (error) {
        console.error(error);
      }
    }, 1000);
  }

  return shareDialog;
}
