"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonp_1 = __importDefault(require("jsonp"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareCount_1 = __importDefault(require("./hocs/createShareCount"));
function getVKShareCount(shareUrl, callback) {
    if (!window.VK)
        window.VK = {};
    window.VK.Share = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        count: function (index, count) { return window.VK.callbacks[index](count); },
    };
    window.VK.callbacks = [];
    var url = 'https://vk.com/share.php';
    var index = window.VK.callbacks.length;
    window.VK.callbacks.push(callback);
    return jsonp_1.default(url +
        objectToGetParams_1.default({
            act: 'count',
            index: index,
            url: shareUrl,
        }));
}
exports.default = createShareCount_1.default(getVKShareCount);
