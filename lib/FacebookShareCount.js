"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonp_1 = __importDefault(require("jsonp"));
var createShareCount_1 = __importDefault(require("./hocs/createShareCount"));
function getFacebookShareCount(shareUrl, callback) {
    var endpoint = "https://graph.facebook.com/?id=" + shareUrl + "&fields=og_object{engagement}";
    jsonp_1.default(endpoint, function (err, data) {
        callback(!err && data && data.og_object && data.og_object.engagement
            ? data.og_object.engagement.count
            : undefined);
    });
}
exports.default = createShareCount_1.default(getFacebookShareCount);
