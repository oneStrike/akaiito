"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const index_1 = require("@akaiito/utils/dist/index");
const sysUtils = require("./system");
const _ = require("lodash");
const encryption_1 = require("./encryption");
// eslint-disable-next-line node/no-extraneous-import
const dayjs = require("dayjs");
exports.utils = {
    ...index_1.utils,
    dayjs,
    sysUtils,
    _,
    encryption: encryption_1.encryption
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBaUU7QUFDakUscUNBQW9DO0FBQ3BDLDRCQUEyQjtBQUMzQiw2Q0FBeUM7QUFDekMscURBQXFEO0FBQ3JELCtCQUE4QjtBQUVqQixRQUFBLEtBQUssR0FBRztJQUNuQixHQUFHLGFBQVk7SUFDZixLQUFLO0lBQ0wsUUFBUTtJQUNSLENBQUM7SUFDRCxVQUFVLEVBQVYsdUJBQVU7Q0FDWCxDQUFBIn0=