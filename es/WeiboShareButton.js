import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function weiboLink(url, _a) {
    var title = _a.title, image = _a.image;
    assert(url, 'weibo.url');
    return ('http://service.weibo.com/share/share.php' +
        objectToGetParams({
            url: url,
            title: title,
            pic: image,
        }));
}
var WeiboShareButton = createShareButton('weibo', weiboLink, function (props) { return ({
    title: props.title,
    image: props.image,
}); }, {
    windowWidth: 660,
    windowHeight: 550,
    windowPosition: 'screenCenter',
});
export default WeiboShareButton;
