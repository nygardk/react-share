"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createIcon_1 = __importDefault(require("./hocs/createIcon"));
var EmailIcon = createIcon_1.default({
    color: '#7f7f7f',
    networkName: 'email',
    path: 'M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z',
});
exports.default = EmailIcon;
