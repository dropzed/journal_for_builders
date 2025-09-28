import { ConfigService } from '@nestjs/config';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';
export declare const getRecaptchaConfig: (configService: ConfigService) => Promise<GoogleRecaptchaModuleOptions>;
