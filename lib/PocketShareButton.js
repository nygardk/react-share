"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
function pocketLink(url, _a) {
    var title = _a.title;
    assert_1.default(url, 'pocket.url');
    return ('https://getpocket.com/save' +
        objectToGetParams_1.default({
            url: url,
            title: title,
        }));
}
var PocketShareButton = createShareButton_1.default('pocket', pocketLink, function (props) { return ({
    title: props.title,
}); }, {
    windowWidth: 500,
    windowHeight: 500,
});
exports.default = PocketShareButton;
