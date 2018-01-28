import isInternetExplorerBefore from './utils/ieDetection';
import shareCountFactory from './utils/shareCountFactory';

function getGooglePlusShareCount(shareUrl, callback) {
  if (isInternetExplorerBefore(11)) {
    /* eslint-disable no-console */
    console.error('Google plus share count is not supported in <=IE10!');
    /* eslint-enable no-console */
    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://clients6.google.com/rpc');
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

  xhr.send(JSON.stringify({
    method: 'pos.plusones.get',
    id: 'p',
    params: {
      nolog: true,
      id: shareUrl,
      source: 'widget',
      userId: '@viewer',
      groupId: '@self',
    },
    jsonrpc: '2.0',
    key: 'p',
    apiVersion: 'v1',
  }));

  xhr.onload = function onSuccessdata() {
    const data = JSON.parse(this.responseText);
    callback(data
      ? data.result.metadata.globalCounts.count
      : undefined);
  };

  xhr.onerror = function onErrordata() {};
}

export default shareCountFactory(getGooglePlusShareCount);
