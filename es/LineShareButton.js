import assert from './utils/assert';
import createShareButton from './hocs/createShareButton';
import objectToGetParams from './utils/objectToGetParams';
function lineLink(url, _a) {
    var title = _a.title;
    assert(url, 'line.url');
    return ('https://social-plugins.line.me/lineit/share' +
        objectToGetParams({
            url: url,
            text: title,
        }));
}
var LineShareButton = createShareButton('line', lineLink, function (props) { return ({
    title: props.title,
}); }, {
    windowWidth: 500,
    windowHeight: 500,
});
export default LineShareButton;
