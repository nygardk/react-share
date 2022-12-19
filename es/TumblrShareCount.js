import jsonp from 'jsonp';
import objectToGetParams from './utils/objectToGetParams';
import createShareCount from './hocs/createShareCount';
function getTumblrShareCount(shareUrl, callback) {
    var endpoint = 'https://api.tumblr.com/v2/share/stats';
    return jsonp(endpoint +
        objectToGetParams({
            url: shareUrl,
        }), function (err, data) {
        callback(!err && data && data.response ? data.response.note_count : undefined);
    });
}
export default createShareCount(getTumblrShareCount);
