"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonp_1 = __importDefault(require("jsonp"));
var createShareCount_1 = __importDefault(require("./hocs/createShareCount"));
function getRedditShareCount(shareUrl, callback) {
    var endpoint = "https://www.reddit.com/api/info.json?limit=1&url=" + shareUrl;
    jsonp_1.default(endpoint, { param: 'jsonp' }, function (err, response) {
        callback(!err &&
            response &&
            response.data &&
            response.data.children.length > 0 &&
            response.data.children[0].data.score
            ? response.data.children[0].data.score
            : undefined);
    });
}
exports.default = createShareCount_1.default(getRedditShareCount);
