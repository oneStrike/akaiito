"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpAddr = exports.getReqIP = void 0;
const ip2region_1 = require("ip2region");
const getReqIP = (ctx) => {
    const req = ctx.req;
    return (req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress).replace('::ffff:', '');
};
exports.getReqIP = getReqIP;
// 根据IP获得请求地址
const getIpAddr = (ip) => {
    const ipdb = new ip2region_1.default();
    if (typeof ip === 'string') {
        const { country, province, city } = ipdb.search(ip);
        return country ? country + province + city : city;
    }
    const address = [];
    ip.forEach((item) => {
        const { country, province, city } = ipdb.search(item);
        address.push(country ? country + province + city : city);
    });
    return address;
};
exports.getIpAddr = getIpAddr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHlDQUFpQztBQUUxQixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVksRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sR0FBRyxHQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUE7SUFDeEIsT0FBTyxDQUNMLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxlQUFlO1FBQ2pELEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLHVCQUF1QjtRQUN2RCxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxvQkFBb0I7UUFDaEQsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUNwQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDMUIsQ0FBQyxDQUFBO0FBUlksUUFBQSxRQUFRLFlBUXBCO0FBRUQsYUFBYTtBQUNOLE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBc0IsRUFBcUIsRUFBRTtJQUNyRSxNQUFNLElBQUksR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQTtJQUM1QixJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBQzNCLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkQsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7SUFDbkQsQ0FBQztJQUNELE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUVsQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDbEIsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyRCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFELENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxDQUFBO0FBYlksUUFBQSxTQUFTLGFBYXJCIn0=