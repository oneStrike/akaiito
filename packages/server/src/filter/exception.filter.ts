import { Catch, Logger, MidwayHttpError } from "@midwayjs/core";
import { Context } from "@midwayjs/koa";
import { IDtoErrorDetails, IResponseData } from "../types/dto/list";
import { LogService } from "../service/admin/log/log.service";

@Catch()
export class ExceptionFilter {
  @Logger("adminLogger")
  logger;

  async catch(err: MidwayHttpError, ctx: Context) {
    //记录日志
    ctx.logger.error(err);
    let desc = "";
    let code: IResponseData["code"];
    if (err.cause) {
      const errorDetails = err?.cause["details"] as IDtoErrorDetails;
      code = 0;
      const { context, type } = errorDetails[0];

      if (type === "any.required") {
        desc = `【 ${context.label} 】参数丢失`;
      } else {
        desc = `【 ${context.label} 】校验失败！请确认【 ${context.value} 】是否正确`;
      }
    } else {
      switch (err.status) {
        case 400:
          code = 400;
          desc = err.message;
          break;
        case 401:
          code = 401;
          desc = "鉴权信息缺失";
          break;
        case 403:
          code = 403;
          desc = "登陆失效，请重新登陆";
          break;
        case 404:
          code = 404;
          desc = "请求路径错误";
          break;
        case 500:
          code = 500;
          desc = "内部服务错误";
          break;
        case 413:
          code = 413;
          desc = "超出大小限制";
          break;
        default:
          code = 0;
          desc = "未知错误";
      }
    }

    err.status = 200;
    const responseRes = {
      desc,
      code,
      data: null,
      status: "error"
    };
    ctx.setAttr("responseRes", responseRes);
    const baseSysLogService = await ctx.requestContext.getAsync(LogService);
    await baseSysLogService.record(ctx);
    return responseRes;
  }
}
