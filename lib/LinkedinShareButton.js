"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("./utils/assert"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function linkedinLink(url, _a) {
    var title = _a.title, summary = _a.summary, source = _a.source;
    assert_1.default(url, 'linkedin.url');
    return ('https://linkedin.com/shareArticle' +
        objectToGetParams_1.default({ url: url, mini: 'true', title: title, summary: summary, source: source }));
}
var LinkedinShareButton = createShareButton_1.default('linkedin', linkedinLink, function (_a) {
    var title = _a.title, summary = _a.summary, source = _a.source;
    return ({ title: title, summary: summary, source: source });
}, {
    windowWidth: 750,
    windowHeight: 600,
});
exports.default = LinkedinShareButton;
