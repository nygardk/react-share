import jsonp from 'jsonp';
import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';
function getVKShareCount(shareUrl, callback) {
    if (!window.VK)
        window.VK = {};
    window.VK.Share = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        count: function (index, count) { return window.VK.callbacks[index](count); },
    };
    window.VK.callbacks = [];
    var url = 'https://vk.com/share.php';
    var index = window.VK.callbacks.length;
    window.VK.callbacks.push(callback);
    return jsonp(url +
        objectToGetParams({
            act: 'count',
            index: index,
            url: shareUrl,
        }));
}
export default createShareCount(getVKShareCount);
