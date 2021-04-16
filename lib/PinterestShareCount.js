"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonp_1 = __importDefault(require("jsonp"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareCount_1 = __importDefault(require("./hocs/createShareCount"));
function getPinterestShareCount(shareUrl, callback) {
    var url = 'https://api.pinterest.com/v1/urls/count.json';
    jsonp_1.default(url +
        objectToGetParams_1.default({
            url: shareUrl,
        }), function (err, data) {
        callback(data ? data.count : undefined);
    });
}
exports.default = createShareCount_1.default(getPinterestShareCount);
