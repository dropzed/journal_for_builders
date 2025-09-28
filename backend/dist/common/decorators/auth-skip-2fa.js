"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationSkip2FA = AuthorizationSkip2FA;
const common_1 = require("@nestjs/common");
const session_auth_guard_1 = require("../guards/session-auth.guard");
function AuthorizationSkip2FA() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(session_auth_guard_1.SessionAuthGuard));
}
//# sourceMappingURL=auth-skip-2fa.js.map