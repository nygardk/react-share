"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareButton_1 = __importDefault(require("./hocs/createShareButton"));
function facebookMessengerLink(url, _a) {
    var appId = _a.appId, redirectUri = _a.redirectUri, to = _a.to;
    return ('https://www.facebook.com/dialog/send' +
        objectToGetParams_1.default({
            link: url,
            redirect_uri: redirectUri || url,
            app_id: appId,
            to: to,
        }));
}
var FacebookMessengerShareButton = createShareButton_1.default('facebookmessenger', facebookMessengerLink, function (props) { return ({
    appId: props.appId,
    redirectUri: props.redirectUri,
    to: props.to,
}); }, {
    windowWidth: 1000,
    windowHeight: 820,
});
exports.default = FacebookMessengerShareButton;
