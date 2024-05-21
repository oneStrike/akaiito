"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadConfig = void 0;
const path = require("node:path");
const index_1 = require("@/utils/index");
const basicConfig = index_1.utils.getPublicConfig();
const whitelist = [];
for (const fileTypeKey in basicConfig.allowFileType) {
    basicConfig.allowFileType[fileTypeKey].forEach((item) => {
        whitelist.push('.' + item);
    });
}
exports.uploadConfig = {
    mode: 'file',
    fileSize: '10mb',
    tmpdir: path.join(process.cwd(), 'public'),
    cleanTimeout: 0,
    match: /\/common\/upload/,
    whitelist
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtDQUFpQztBQUNqQyx5Q0FBcUM7QUFDckMsTUFBTSxXQUFXLEdBQUcsYUFBSyxDQUFDLGVBQWUsRUFBRSxDQUFBO0FBRTNDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQTtBQUVwQixLQUFLLE1BQU0sV0FBVyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNwRCxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RELFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFBO0lBQzVCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQUNZLFFBQUEsWUFBWSxHQUFHO0lBQzFCLElBQUksRUFBRSxNQUFNO0lBQ1osUUFBUSxFQUFFLE1BQU07SUFDaEIsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQztJQUMxQyxZQUFZLEVBQUUsQ0FBQztJQUNmLEtBQUssRUFBRSxrQkFBa0I7SUFDekIsU0FBUztDQUNWLENBQUEifQ==