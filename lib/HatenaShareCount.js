"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonp_1 = __importDefault(require("jsonp"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareCount_1 = __importDefault(require("./hocs/createShareCount"));
function getHatenaShareCount(shareUrl, callback) {
    var url = 'https://bookmark.hatenaapis.com/count/entry';
    jsonp_1.default(url +
        objectToGetParams_1.default({
            url: shareUrl,
        }), function (err, data) {
        callback(data ? data : undefined);
    });
}
exports.default = createShareCount_1.default(getHatenaShareCount);
