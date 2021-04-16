"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function pinterestLink(url, _a) {
    var media = _a.media, description = _a.description;
    assert_1.default(url, 'pinterest.url');
    assert_1.default(media, 'pinterest.media');
    return ('https://pinterest.com/pin/create/button/' +
        objectToGetParams_1.default({
            url: url,
            media: media,
            description: description,
        }));
}
var PinterestShareButton = createShareButton_1.default('pinterest', pinterestLink, function (props) { return ({
    media: props.media,
    description: props.description,
}); }, {
    windowWidth: 1000,
    windowHeight: 730,
});
exports.default = PinterestShareButton;
