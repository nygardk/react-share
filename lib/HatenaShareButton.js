"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function hatenaLink(url, _a) {
    var title = _a.title;
    assert_1.default(url, 'hatena.url');
    return "http://b.hatena.ne.jp/add?mode=confirm&url=" + url + "&title=" + title;
}
var HatenaShareButton = createShareButton_1.default('hatena', hatenaLink, function (props) { return ({
    title: props.title,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
    windowPosition: 'windowCenter',
});
exports.default = HatenaShareButton;
