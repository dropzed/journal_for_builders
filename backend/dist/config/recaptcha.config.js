"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecaptchaConfig = void 0;
const is_dev_util_1 = require("../libs/common/utils/is-dev.util");
const getRecaptchaConfig = async (configService) => ({
    secretKey: configService.getOrThrow('GOOGLE_RECAPTCHA_SECRET_KEY'),
    response: req => req.headers.recaptcha,
    skipIf: (0, is_dev_util_1.isDev)(configService)
});
exports.getRecaptchaConfig = getRecaptchaConfig;
//# sourceMappingURL=recaptcha.config.js.map