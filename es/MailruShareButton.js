import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function mailruLink(url, _a) {
    var title = _a.title, description = _a.description, imageUrl = _a.imageUrl;
    assert(url, 'mailru.url');
    return ('https://connect.mail.ru/share' +
        objectToGetParams({
            url: url,
            title: title,
            description: description,
            image_url: imageUrl,
        }));
}
var MailruShareButton = createShareButton('mailru', mailruLink, function (props) { return ({
    title: props.title,
    description: props.description,
    imageUrl: props.imageUrl,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
});
export default MailruShareButton;
