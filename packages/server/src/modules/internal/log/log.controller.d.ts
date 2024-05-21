import { LogService } from './log.service';
import { LogDto } from './dto/log.dto';
export declare class LogController {
    logServer: LogService;
    getRequestLogs(query: LogDto): Promise<{
        pageSize: number;
        pageIndex: number;
        total: number;
        list: {
            id: number;
            username: string;
            userId: number;
            mobile: string;
            method: string;
            ip: string;
            ipAddress: string;
            statusCode: number;
            statusDesc: string;
            path: string;
            summary: string;
            record: string;
            userAgent: string;
            params: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
