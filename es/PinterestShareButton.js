import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function pinterestLink(url, _a) {
    var media = _a.media, description = _a.description;
    assert(url, 'pinterest.url');
    assert(media, 'pinterest.media');
    return ('https://pinterest.com/pin/create/button/' +
        objectToGetParams({
            url: url,
            media: media,
            description: description,
        }));
}
var PinterestShareButton = createShareButton('pinterest', pinterestLink, function (props) { return ({
    media: props.media,
    description: props.description,
}); }, {
    windowWidth: 1000,
    windowHeight: 730,
});
export default PinterestShareButton;
