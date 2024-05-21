import { MidwayConfigService } from '@midwayjs/core';
import { ConfigFilePathEnum } from '@/enum/configFilePath';
export declare class ConfigService {
    midwayConfigServer: MidwayConfigService;
    baseDir: string;
    loadConfig(): Promise<void>;
    getYamlConfig<T>(pathEnum?: ConfigFilePathEnum, field?: keyof T): Promise<T | T[keyof T]>;
    setConfig<T>(type: ConfigFilePathEnum, config: T): Promise<void>;
}
