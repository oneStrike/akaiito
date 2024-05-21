"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    secret: 'akaiito',
    signOptions: { expiresIn: 1000 * 60 * 60 },
    verifyOptions: { complete: true },
    whiteList: ['/admin/user/login', '/open/captcha/getCaptcha']
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiand0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLE1BQU0sRUFBRSxTQUFTO0lBQ2pCLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUMxQyxhQUFhLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ2pDLFNBQVMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLDBCQUEwQixDQUFDO0NBQzdELENBQUEifQ==