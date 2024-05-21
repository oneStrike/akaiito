import { CaptchaService } from '../../internal/authentication/captcha.service';
export declare class CaptchaController {
    captchaServer: CaptchaService;
    getCaptcha(): Promise<{
        id: string;
        data: string;
    }>;
}
