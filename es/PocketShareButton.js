import assert from './utils/assert';
import createShareButton from './hocs/createShareButton';
import objectToGetParams from './utils/objectToGetParams';
function pocketLink(url, _a) {
    var title = _a.title;
    assert(url, 'pocket.url');
    return ('https://getpocket.com/save' +
        objectToGetParams({
            url: url,
            title: title,
        }));
}
var PocketShareButton = createShareButton('pocket', pocketLink, function (props) { return ({
    title: props.title,
}); }, {
    windowWidth: 500,
    windowHeight: 500,
});
export default PocketShareButton;
