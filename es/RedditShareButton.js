import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function redditLink(url, _a) {
    var title = _a.title;
    assert(url, 'reddit.url');
    return ('https://www.reddit.com/submit' +
        objectToGetParams({
            url: url,
            title: title,
        }));
}
var RedditShareButton = createShareButton('reddit', redditLink, function (props) { return ({
    title: props.title,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
    windowPosition: 'windowCenter',
});
export default RedditShareButton;
