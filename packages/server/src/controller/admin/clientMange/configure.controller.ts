import { BaseController } from "../../../shared/controller/base.controller";
import { Body, Controller, Get, Inject, Post, SetHeader } from "@midwayjs/core";
import { ClientConfigureDto } from "../../../service/clientManage/configure/dto/configure.dto";
import { ConfigureService } from "../../../service/clientManage/configure/configure.service";
import * as fs from "fs";

@Controller("admin/clientManage")
export class ConfigureController extends BaseController {
  @Inject()
  configureService: ConfigureService;

  @Get("/getClientConfig", { summary: "获取客户端配置" })
  async getConfigure() {
    return this.configureService.getConfigure();
  }

  @Post("/updateClientConfig", { summary: "更新客户端配置" })
  async updateConfigure(@Body() body: ClientConfigureDto) {
    return this.configureService.uploadConfigure(body);
  }

  @Get("/exportClientPackage", { summary: "导出客户端代码包" })
  @SetHeader({
    "content-type": "application/octet-stream",
    "Content-Disposition": "attachment",
    "filename": "clientPackage.zip"
  })
  async exportClientPackage() {
    const filePath = await this.configureService.exportClientPackage();
    return fs.createReadStream(filePath)
  }
}
