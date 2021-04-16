import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function vkLink(url, _a) {
    var title = _a.title, image = _a.image, noParse = _a.noParse, noVkLinks = _a.noVkLinks;
    assert(url, 'vk.url');
    return ('https://vk.com/share.php' +
        objectToGetParams({
            url: url,
            title: title,
            image: image,
            noparse: noParse ? 1 : 0,
            no_vk_links: noVkLinks ? 1 : 0,
        }));
}
var VKShareButton = createShareButton('vk', vkLink, function (props) { return ({
    title: props.title,
    image: props.image,
    noParse: props.noParse,
    noVkLinks: props.noVkLinks,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
});
export default VKShareButton;
