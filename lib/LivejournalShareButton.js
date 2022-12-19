"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function livejournalLink(url, _a) {
    var title = _a.title, description = _a.description;
    assert_1.default(url, 'livejournal.url');
    return ('https://www.livejournal.com/update.bml' +
        objectToGetParams_1.default({
            subject: title,
            event: description,
        }));
}
var LivejournalShareButton = createShareButton_1.default('livejournal', livejournalLink, function (props) { return ({
    title: props.title,
    description: props.description,
}); }, {
    windowWidth: 660,
    windowHeight: 460,
});
exports.default = LivejournalShareButton;
