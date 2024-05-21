import { UploadService } from './upload.service';
export declare class HomeController {
    uploadService: UploadService;
    upload(files: any, fields: any): Promise<any[]>;
}
