import assert from './utils/assert';
import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function telegramLink(url, _a) {
    var title = _a.title;
    assert(url, 'telegram.url');
    return ('https://telegram.me/share/' +
        objectToGetParams({
            url: url,
            text: title,
        }));
}
var TelegramShareButton = createShareButton('telegram', telegramLink, function (props) { return ({
    title: props.title,
}); }, {
    windowWidth: 550,
    windowHeight: 400,
});
export default TelegramShareButton;
