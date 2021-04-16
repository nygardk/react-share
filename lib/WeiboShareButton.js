"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function weiboLink(url, _a) {
    var title = _a.title, image = _a.image;
    assert_1.default(url, 'weibo.url');
    return ('http://service.weibo.com/share/share.php' +
        objectToGetParams_1.default({
            url: url,
            title: title,
            pic: image,
        }));
}
var WeiboShareButton = createShareButton_1.default('weibo', weiboLink, function (props) { return ({
    title: props.title,
    image: props.image,
}); }, {
    windowWidth: 660,
    windowHeight: 550,
    windowPosition: 'screenCenter',
});
exports.default = WeiboShareButton;
