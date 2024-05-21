import * as sysUtils from './system';
import * as _ from 'lodash';
import * as dayjs from 'dayjs';
export declare const utils: {
    dayjs: typeof dayjs;
    sysUtils: typeof sysUtils;
    _: _.LoDashStatic;
    encryption: (str: string, salt?: string) => Promise<string>;
    parseQuery: (str: string) => "" | Record<string, any>;
    isJson: (str: string) => any;
    validate: {
        validPwd: RegExp;
        validPhone: RegExp;
        validEmail: RegExp;
        validUrl: RegExp;
    };
    isValueInStringEnum: <T extends Record<keyof T, string>>(value: any, enumObject: T extends Record<keyof T, string> ? T : never) => value is T[keyof T];
    downloadBlob: (blob: Blob, fileName: string) => void;
    fillFormOptions: <T_1 extends any[]>(options: T_1, field: string, value: any) => T_1;
    getPublicConfig: () => {
        resourceScenario: string[];
        allowFileType: {
            image: string[];
            video: string[];
            audio: string[];
        };
        maxUploadFileSize: number;
    };
};
