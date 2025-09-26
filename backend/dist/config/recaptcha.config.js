"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecaptchaConfig = void 0;
const getRecaptchaConfig = async (configService) => ({
    secretKey: configService.getOrThrow('GOOGLE_RECAPTCHA_SECRET_KEY'),
    response: req => req.headers.recaptcha,
    skipIf: false
});
exports.getRecaptchaConfig = getRecaptchaConfig;
//# sourceMappingURL=recaptcha.config.js.map