import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function facebookLink(url, _a) {
    var quote = _a.quote, hashtag = _a.hashtag;
    assert(url, 'facebook.url');
    return ('https://www.facebook.com/sharer/sharer.php' +
        objectToGetParams({
            u: url,
            quote: quote,
            hashtag: hashtag,
        }));
}
var FacebookShareButton = createShareButton('facebook', facebookLink, function (props) { return ({
    quote: props.quote,
    hashtag: props.hashtag,
}); }, {
    windowWidth: 550,
    windowHeight: 400,
});
export default FacebookShareButton;
