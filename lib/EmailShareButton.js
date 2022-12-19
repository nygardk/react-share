"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function emailLink(url, _a) {
    var subject = _a.subject, body = _a.body, separator = _a.separator;
    return 'mailto:' + objectToGetParams_1.default({ subject: subject, body: body ? body + separator + url : url });
}
var EmailShareButton = createShareButton_1.default('email', emailLink, function (props) { return ({
    subject: props.subject,
    body: props.body,
    separator: props.separator || ' ',
}); }, {
    openShareDialogOnClick: false,
    onClick: function (_, link) {
        window.location.href = link;
    },
});
exports.default = EmailShareButton;
