"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonp_1 = __importDefault(require("jsonp"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareCount_1 = __importDefault(require("./hocs/createShareCount"));
function getTumblrShareCount(shareUrl, callback) {
    var endpoint = 'https://api.tumblr.com/v2/share/stats';
    return jsonp_1.default(endpoint +
        objectToGetParams_1.default({
            url: shareUrl,
        }), function (err, data) {
        callback(!err && data && data.response ? data.response.note_count : undefined);
    });
}
exports.default = createShareCount_1.default(getTumblrShareCount);
