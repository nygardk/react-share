import jsonp from 'jsonp';
import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';
function getOKShareCount(shareUrl, callback) {
    if (!window.OK) {
        window.OK = {
            Share: {
                count: function count(index, _count) {
                    window.OK.callbacks[index](_count);
                },
            },
            callbacks: [],
        };
    }
    var url = 'https://connect.ok.ru/dk';
    var index = window.OK.callbacks.length;
    window.ODKL = {
        updateCount: function (index, count) {
            var callbackIndex = index === '' ? 0 : parseInt(index.replace('react-share-', ''), 10);
            window.OK.callbacks[callbackIndex](count === '' ? undefined : parseInt(count, 10));
        },
    };
    window.OK.callbacks.push(callback);
    return jsonp(url +
        objectToGetParams({
            'st.cmd': 'extLike',
            uid: "react-share-" + index,
            ref: shareUrl,
        }));
}
export default createShareCount(getOKShareCount);
