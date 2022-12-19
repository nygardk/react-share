"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function viberLink(url, _a) {
    var title = _a.title, separator = _a.separator;
    assert_1.default(url, 'viber.url');
    return ('viber://forward' +
        objectToGetParams_1.default({
            text: title ? title + separator + url : url,
        }));
}
var ViberShareButton = createShareButton_1.default('viber', viberLink, function (props) { return ({
    title: props.title,
    separator: props.separator || ' ',
}); }, {
    windowWidth: 660,
    windowHeight: 460,
});
exports.default = ViberShareButton;
