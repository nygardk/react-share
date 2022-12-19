"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function vkLink(url, _a) {
    var title = _a.title, image = _a.image, noParse = _a.noParse, noVkLinks = _a.noVkLinks;
    assert_1.default(url, 'vk.url');
    return ('https://vk.com/share.php' +
        objectToGetParams_1.default({
            url: url,
            title: title,
            image: image,
            noparse: noParse ? 1 : 0,
            no_vk_links: noVkLinks ? 1 : 0,
        }));
}
var VKShareButton = createShareButton_1.default('vk', vkLink, function (props) { return ({
    title: props.title,
    image: props.image,
    noParse: props.noParse,
    noVkLinks: props.noVkLinks,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
});
exports.default = VKShareButton;
