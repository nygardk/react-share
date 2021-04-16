"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function smsLink(url, _a) {
    var body = _a.body, separator = _a.separator;
    return ('sms:' + objectToGetParams_1.default({ body: body ? body + separator + url : url }).replace(/^\?/, '&'));
}
var SMSShareButton = createShareButton_1.default('sms', smsLink, function (props) { return ({
    body: props.body,
    separator: props.separator || ' ',
}); }, {
    openShareDialogOnClick: false,
    onClick: function (_, link) {
        console.log('SMS LINK', link);
        window.location.href = link;
    },
});
exports.default = SMSShareButton;
