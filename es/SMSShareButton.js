import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function smsLink(url, _a) {
    var body = _a.body, separator = _a.separator;
    return ('sms:' + objectToGetParams({ body: body ? body + separator + url : url }).replace(/^\?/, '&'));
}
var SMSShareButton = createShareButton('sms', smsLink, function (props) { return ({
    body: props.body,
    separator: props.separator || ' ',
}); }, {
    openShareDialogOnClick: false,
    onClick: function (_, link) {
        console.log('SMS LINK', link);
        window.location.href = link;
    },
});
export default SMSShareButton;
