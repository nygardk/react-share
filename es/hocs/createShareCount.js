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
import React, { Component } from 'react';
import cx from 'classnames';
var defaultChildren = function (shareCount) { return shareCount; };
var SocialMediaShareCount = /** @class */ (function (_super) {
    __extends(SocialMediaShareCount, _super);
    function SocialMediaShareCount(props) {
        var _this = _super.call(this, props) || this;
        _this._isMounted = false;
        _this.state = { count: 0, isLoading: false };
        return _this;
    }
    SocialMediaShareCount.prototype.componentDidMount = function () {
        this._isMounted = true;
        this.updateCount(this.props.url);
    };
    SocialMediaShareCount.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.url !== prevProps.url) {
            this.updateCount(this.props.url);
        }
    };
    SocialMediaShareCount.prototype.componentWillUnmount = function () {
        this._isMounted = false;
    };
    SocialMediaShareCount.prototype.updateCount = function (url) {
        var _this = this;
        this.setState({
            isLoading: true,
        });
        this.props.getCount(url, function (count) {
            if (_this._isMounted) {
                _this.setState({
                    count: count,
                    isLoading: false,
                });
            }
        });
    };
    SocialMediaShareCount.prototype.render = function () {
        var _a = this.state, count = _a.count, isLoading = _a.isLoading;
        var _b = this.props, _c = _b.children, children = _c === void 0 ? defaultChildren : _c, className = _b.className, _ = _b.getCount, rest = __rest(_b, ["children", "className", "getCount"]);
        return (React.createElement("span", __assign({ className: cx('react-share__ShareCount', className) }, rest), !isLoading && count !== undefined && children(count)));
    };
    return SocialMediaShareCount;
}(Component));
export default function createShareCount(getCount) {
    var ShareCount = function (props) { return (React.createElement(SocialMediaShareCount, __assign({ getCount: getCount }, props))); };
    ShareCount.displayName = "ShareCount(" + getCount.name + ")";
    return ShareCount;
}
