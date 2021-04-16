import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function viberLink(url, _a) {
    var title = _a.title, separator = _a.separator;
    assert(url, 'viber.url');
    return ('viber://forward' +
        objectToGetParams({
            text: title ? title + separator + url : url,
        }));
}
var ViberShareButton = createShareButton('viber', viberLink, function (props) { return ({
    title: props.title,
    separator: props.separator || ' ',
}); }, {
    windowWidth: 660,
    windowHeight: 460,
});
export default ViberShareButton;
