import jsonp from 'jsonp';
import createShareCount from './hocs/createShareCount';
function getFacebookShareCount(shareUrl, callback) {
    var endpoint = "https://graph.facebook.com/?id=" + shareUrl + "&fields=og_object{engagement}";
    jsonp(endpoint, function (err, data) {
        callback(!err && data && data.og_object && data.og_object.engagement
            ? data.og_object.engagement.count
            : undefined);
    });
}
export default createShareCount(getFacebookShareCount);
