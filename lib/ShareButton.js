"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var isPromise = function (obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};
var getBoxPositionOnWindowCenter = function (width, height) { return ({
    left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
    top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
}); };
var getBoxPositionOnScreenCenter = function (width, height) { return ({
    top: (window.screen.height - height) / 2,
    left: (window.screen.width - width) / 2,
}); };
function windowOpen(url, _a, onClose) {
    var height = _a.height, width = _a.width, configRest = __rest(_a, ["height", "width"]);
    var config = __assign({ height: height,
        width: width, location: 'no', toolbar: 'no', status: 'no', directories: 'no', menubar: 'no', scrollbars: 'yes', resizable: 'no', centerscreen: 'yes', chrome: 'yes' }, configRest);
    var shareDialog = window.open(url, '', Object.keys(config)
        .map(function (key) { return key + "=" + config[key]; })
        .join(', '));
    if (onClose) {
        var interval_1 = window.setInterval(function () {
            try {
                if (shareDialog === null || shareDialog.closed) {
                    window.clearInterval(interval_1);
                    onClose(shareDialog);
                }
            }
            catch (e) {
                /* eslint-disable no-console */
                console.error(e);
                /* eslint-enable no-console */
            }
        }, 1000);
    }
    return shareDialog;
}
var ShareButton = /** @class */ (function (_super) {
    __extends(ShareButton, _super);
    function ShareButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.openShareDialog = function (link) {
            var _a = _this.props, onShareWindowClose = _a.onShareWindowClose, _b = _a.windowHeight, windowHeight = _b === void 0 ? 400 : _b, _c = _a.windowPosition, windowPosition = _c === void 0 ? 'windowCenter' : _c, _d = _a.windowWidth, windowWidth = _d === void 0 ? 550 : _d;
            var windowConfig = __assign({ height: windowHeight, width: windowWidth }, (windowPosition === 'windowCenter'
                ? getBoxPositionOnWindowCenter(windowWidth, windowHeight)
                : getBoxPositionOnScreenCenter(windowWidth, windowHeight)));
            windowOpen(link, windowConfig, onShareWindowClose);
        };
        _this.handleClick = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var _a, beforeOnClick, disabled, networkLink, onClick, url, openShareDialogOnClick, opts, link, returnVal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, beforeOnClick = _a.beforeOnClick, disabled = _a.disabled, networkLink = _a.networkLink, onClick = _a.onClick, url = _a.url, openShareDialogOnClick = _a.openShareDialogOnClick, opts = _a.opts;
                        link = networkLink(url, opts);
                        if (disabled) {
                            return [2 /*return*/];
                        }
                        event.preventDefault();
                        if (!beforeOnClick) return [3 /*break*/, 2];
                        returnVal = beforeOnClick();
                        if (!isPromise(returnVal)) return [3 /*break*/, 2];
                        return [4 /*yield*/, returnVal];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        if (openShareDialogOnClick) {
                            this.openShareDialog(link);
                        }
                        if (onClick) {
                            onClick(event, link);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ShareButton.prototype.render = function () {
        var _a = this.props, beforeOnClick = _a.beforeOnClick, children = _a.children, className = _a.className, disabled = _a.disabled, disabledStyle = _a.disabledStyle, forwardedRef = _a.forwardedRef, networkLink = _a.networkLink, networkName = _a.networkName, onShareWindowClose = _a.onShareWindowClose, openShareDialogOnClick = _a.openShareDialogOnClick, opts = _a.opts, resetButtonStyle = _a.resetButtonStyle, style = _a.style, url = _a.url, windowHeight = _a.windowHeight, windowPosition = _a.windowPosition, windowWidth = _a.windowWidth, rest = __rest(_a, ["beforeOnClick", "children", "className", "disabled", "disabledStyle", "forwardedRef", "networkLink", "networkName", "onShareWindowClose", "openShareDialogOnClick", "opts", "resetButtonStyle", "style", "url", "windowHeight", "windowPosition", "windowWidth"]);
        var newClassName = classnames_1.default('react-share__ShareButton', {
            'react-share__ShareButton--disabled': !!disabled,
            disabled: !!disabled,
        }, className);
        var newStyle = resetButtonStyle
            ? __assign(__assign({ backgroundColor: 'transparent', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }, style), (disabled && disabledStyle)) : __assign(__assign({}, style), (disabled && disabledStyle));
        return (react_1.default.createElement("button", __assign({}, rest, { "aria-label": rest['aria-label'] || networkName, className: newClassName, onClick: this.handleClick, ref: forwardedRef, style: newStyle }), children));
    };
    ShareButton.defaultProps = {
        disabledStyle: { opacity: 0.6 },
        openShareDialogOnClick: true,
        resetButtonStyle: true,
    };
    return ShareButton;
}(react_1.Component));
exports.default = ShareButton;
