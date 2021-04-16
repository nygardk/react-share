import assert from './utils/assert';
import createShareButton from './hocs/createShareButton';
function hatenaLink(url, _a) {
    var title = _a.title;
    assert(url, 'hatena.url');
    return "http://b.hatena.ne.jp/add?mode=confirm&url=" + url + "&title=" + title;
}
var HatenaShareButton = createShareButton('hatena', hatenaLink, function (props) { return ({
    title: props.title,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
    windowPosition: 'windowCenter',
});
export default HatenaShareButton;
