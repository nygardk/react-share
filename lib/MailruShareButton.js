"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function mailruLink(url, _a) {
    var title = _a.title, description = _a.description, imageUrl = _a.imageUrl;
    assert_1.default(url, 'mailru.url');
    return ('https://connect.mail.ru/share' +
        objectToGetParams_1.default({
            url: url,
            title: title,
            description: description,
            image_url: imageUrl,
        }));
}
var MailruShareButton = createShareButton_1.default('mailru', mailruLink, function (props) { return ({
    title: props.title,
    description: props.description,
    imageUrl: props.imageUrl,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
});
exports.default = MailruShareButton;
