import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function tumblrLink(url, _a) {
    var title = _a.title, caption = _a.caption, tags = _a.tags, posttype = _a.posttype;
    assert(url, 'tumblr.url');
    return ('https://www.tumblr.com/widgets/share/tool' +
        objectToGetParams({
            canonicalUrl: url,
            title: title,
            caption: caption,
            tags: tags,
            posttype: posttype,
        }));
}
var TumblrShareButton = createShareButton('tumblr', tumblrLink, function (props) { return ({
    title: props.title,
    tags: (props.tags || []).join(','),
    caption: props.caption,
    posttype: props.posttype || 'link',
}); }, {
    windowWidth: 660,
    windowHeight: 460,
});
export default TumblrShareButton;
