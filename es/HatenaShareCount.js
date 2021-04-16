import jsonp from 'jsonp';
import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';
function getHatenaShareCount(shareUrl, callback) {
    var url = 'https://bookmark.hatenaapis.com/count/entry';
    jsonp(url +
        objectToGetParams({
            url: shareUrl,
        }), function (err, data) {
        callback(data ? data : undefined);
    });
}
export default createShareCount(getHatenaShareCount);
