import assert from './utils/assert';
import createShareButton from './hocs/createShareButton';
import objectToGetParams from './utils/objectToGetParams';
function instapaperLink(url, _a) {
    var title = _a.title, description = _a.description;
    assert(url, 'instapaper.url');
    return ('http://www.instapaper.com/hello2' +
        objectToGetParams({
            url: url,
            title: title,
            description: description,
        }));
}
var InstapaperShareButton = createShareButton('instapaper', instapaperLink, function (props) { return ({
    title: props.title,
    description: props.description,
}); }, {
    windowWidth: 500,
    windowHeight: 500,
    windowPosition: 'windowCenter',
});
export default InstapaperShareButton;
