import objectToGetParams from './utils/objectToGetParams';
import createShareButton from './hocs/createShareButton';
function emailLink(url, _a) {
    var subject = _a.subject, body = _a.body, separator = _a.separator;
    return 'mailto:' + objectToGetParams({ subject: subject, body: body ? body + separator + url : url });
}
var EmailShareButton = createShareButton('email', emailLink, function (props) { return ({
    subject: props.subject,
    body: props.body,
    separator: props.separator || ' ',
}); }, {
    openShareDialogOnClick: false,
    onClick: function (_, link) {
        window.location.href = link;
    },
});
export default EmailShareButton;
