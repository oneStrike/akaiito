import { BasicPageDto } from '../../../../basic/dto/basic.dto';
export declare class LogDto extends BasicPageDto {
    method?: 'POST' | 'GET';
    status?: number;
    path?: number;
    mobile?: string;
}
