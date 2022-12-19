"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonp_1 = __importDefault(require("jsonp"));
var objectToGetParams_1 = __importDefault(require("./utils/objectToGetParams"));
var createShareCount_1 = __importDefault(require("./hocs/createShareCount"));
function getOKShareCount(shareUrl, callback) {
    if (!window.OK) {
        window.OK = {
            Share: {
                count: function count(index, _count) {
                    window.OK.callbacks[index](_count);
                },
            },
            callbacks: [],
        };
    }
    var url = 'https://connect.ok.ru/dk';
    var index = window.OK.callbacks.length;
    window.ODKL = {
        updateCount: function (index, count) {
            var callbackIndex = index === '' ? 0 : parseInt(index.replace('react-share-', ''), 10);
            window.OK.callbacks[callbackIndex](count === '' ? undefined : parseInt(count, 10));
        },
    };
    window.OK.callbacks.push(callback);
    return jsonp_1.default(url +
        objectToGetParams_1.default({
            'st.cmd': 'extLike',
            uid: "react-share-" + index,
            ref: shareUrl,
        }));
}
exports.default = createShareCount_1.default(getOKShareCount);
