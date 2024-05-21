import { ConfigService } from '../modules/internal/config/config.service';
export declare class AutoLoadCore {
    configServer: ConfigService;
    basicConfig: any;
    staticFileConfig: any;
    init(): Promise<void>;
}
