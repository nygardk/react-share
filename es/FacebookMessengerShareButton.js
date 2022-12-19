import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function facebookMessengerLink(url, _a) {
    var appId = _a.appId, redirectUri = _a.redirectUri, to = _a.to;
    return ('https://www.facebook.com/dialog/send' +
        objectToGetParams({
            link: url,
            redirect_uri: redirectUri || url,
            app_id: appId,
            to: to,
        }));
}
var FacebookMessengerShareButton = createShareButton('facebookmessenger', facebookMessengerLink, function (props) { return ({
    appId: props.appId,
    redirectUri: props.redirectUri,
    to: props.to,
}); }, {
    windowWidth: 1000,
    windowHeight: 820,
});
export default FacebookMessengerShareButton;
