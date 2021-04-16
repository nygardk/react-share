import jsonp from 'jsonp';
import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';
function getPinterestShareCount(shareUrl, callback) {
    var url = 'https://api.pinterest.com/v1/urls/count.json';
    jsonp(url +
        objectToGetParams({
            url: shareUrl,
        }), function (err, data) {
        callback(data ? data.count : undefined);
    });
}
export default createShareCount(getPinterestShareCount);
