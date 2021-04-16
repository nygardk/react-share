"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
function instapaperLink(url, _a) {
    var title = _a.title, description = _a.description;
    assert_1.default(url, 'instapaper.url');
    return ('http://www.instapaper.com/hello2' +
        objectToGetParams_1.default({
            url: url,
            title: title,
            description: description,
        }));
}
var InstapaperShareButton = createShareButton_1.default('instapaper', instapaperLink, function (props) { return ({
    title: props.title,
    description: props.description,
}); }, {
    windowWidth: 500,
    windowHeight: 500,
    windowPosition: 'windowCenter',
});
exports.default = InstapaperShareButton;
