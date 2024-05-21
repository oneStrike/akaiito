"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = require("./modules/upload");
const jwt_1 = require("./modules/jwt");
const staticFile_1 = require("./modules/staticFile");
const index_1 = require("@/utils/index");
exports.default = {
    keys: '67893242123139_4623',
    koa: {
        port: 7001
    },
    jwt: jwt_1.jwtConfig,
    validate: {
        validationOptions: {
            stripUnknown: true, // 全局生效
            noDefaults: false
        }
    },
    upload: upload_1.uploadConfig,
    staticFile: staticFile_1.staticFileConfig,
    basicConfig: index_1.utils.getPublicConfig()
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZDQUErQztBQUMvQyx1Q0FBeUM7QUFDekMscURBQXVEO0FBQ3ZELHlDQUFxQztBQUVyQyxrQkFBZTtJQUNiLElBQUksRUFBRSxxQkFBcUI7SUFDM0IsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLElBQUk7S0FDWDtJQUNELEdBQUcsRUFBRSxlQUFTO0lBQ2QsUUFBUSxFQUFFO1FBQ1IsaUJBQWlCLEVBQUU7WUFDakIsWUFBWSxFQUFFLElBQUksRUFBRSxPQUFPO1lBQzNCLFVBQVUsRUFBRSxLQUFLO1NBQ2xCO0tBQ0Y7SUFDRCxNQUFNLEVBQUUscUJBQVk7SUFDcEIsVUFBVSxFQUFFLDZCQUFnQjtJQUM1QixXQUFXLEVBQUUsYUFBSyxDQUFDLGVBQWUsRUFBRTtDQUNyQixDQUFBIn0=