import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function okLink(url, _a) {
    var title = _a.title, description = _a.description, image = _a.image;
    assert(url, 'ok.url');
    return ('https://connect.ok.ru/offer' +
        objectToGetParams({
            url: url,
            title: title,
            description: description,
            imageUrl: image,
        }));
}
var OKShareButton = createShareButton('ok', okLink, function (props) { return ({
    title: props.title,
    description: props.description,
    image: props.image,
}); }, {
    windowWidth: 588,
    windowHeight: 480,
    windowPosition: 'screenCenter',
});
export default OKShareButton;
