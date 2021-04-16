import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function workplaceLink(url, _a) {
    var quote = _a.quote, hashtag = _a.hashtag;
    assert(url, 'workplace.url');
    return ('https://work.facebook.com/sharer.php' +
        objectToGetParams({
            u: url,
            quote: quote,
            hashtag: hashtag,
        }));
}
var WorkplaceShareButton = createShareButton('workplace', workplaceLink, function (props) { return ({
    quote: props.quote,
    hashtag: props.hashtag,
}); }, {
    windowWidth: 550,
    windowHeight: 400,
});
export default WorkplaceShareButton;
