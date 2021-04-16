import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function twitterLink(url, _a) {
    var title = _a.title, via = _a.via, _b = _a.hashtags, hashtags = _b === void 0 ? [] : _b, _c = _a.related, related = _c === void 0 ? [] : _c;
    assert(url, 'twitter.url');
    assert(Array.isArray(hashtags), 'twitter.hashtags is not an array');
    assert(Array.isArray(related), 'twitter.related is not an array');
    return ('https://twitter.com/share' +
        objectToGetParams({
            url: url,
            text: title,
            via: via,
            hashtags: hashtags.length > 0 ? hashtags.join(',') : undefined,
            related: related.length > 0 ? related.join(',') : undefined,
        }));
}
var TwitterShareButton = createShareButton('twitter', twitterLink, function (props) { return ({
    hashtags: props.hashtags,
    title: props.title,
    via: props.via,
    related: props.related,
}); }, {
    windowWidth: 550,
    windowHeight: 400,
});
export default TwitterShareButton;
