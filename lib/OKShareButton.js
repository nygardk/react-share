"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function okLink(url, _a) {
    var title = _a.title, description = _a.description, image = _a.image;
    assert_1.default(url, 'ok.url');
    return ('https://connect.ok.ru/offer' +
        objectToGetParams_1.default({
            url: url,
            title: title,
            description: description,
            imageUrl: image,
        }));
}
var OKShareButton = createShareButton_1.default('ok', okLink, function (props) { return ({
    title: props.title,
    description: props.description,
    image: props.image,
}); }, {
    windowWidth: 588,
    windowHeight: 480,
    windowPosition: 'screenCenter',
});
exports.default = OKShareButton;
