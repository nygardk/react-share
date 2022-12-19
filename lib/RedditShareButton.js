"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function redditLink(url, _a) {
    var title = _a.title;
    assert_1.default(url, 'reddit.url');
    return ('https://www.reddit.com/submit' +
        objectToGetParams_1.default({
            url: url,
            title: title,
        }));
}
var RedditShareButton = createShareButton_1.default('reddit', redditLink, function (props) { return ({
    title: props.title,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
    windowPosition: 'windowCenter',
});
exports.default = RedditShareButton;
