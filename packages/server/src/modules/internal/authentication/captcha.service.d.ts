import { CaptchaService as Captcha } from '@midwayjs/captcha';
export declare class CaptchaService {
    captchaService: Captcha;
    getCaptcha(): Promise<{
        id: string;
        data: string;
    }>;
    verifyCaptcha(captchaId: string, captcha: string): Promise<boolean>;
}
