import { BaseService } from "../../../shared/service/base.service";
import { Provide, Config, App } from "@midwayjs/core";
import { BaseMapping } from "../../../shared/mapping/base.mapping";
import { ClientConfigureDto } from "./dto/configure.dto";
import { Application } from "@midwayjs/koa";
import * as fs from "fs";

const archiver = require("archiver");

@Provide()
export class ConfigureService extends BaseService {
  protected mapping: BaseMapping;

  @Config("static")
  staticService: Record<string | symbol, any>;

  @App()
  app: Application;

  //修改客户端系统配置信息
  async uploadConfigure(configure: ClientConfigureDto) {
    const privacy = this.getPrivacyContent();
    const { privacyTitle, privacyMessage, privacySecondTitle, privacySecondMessage } = configure;
    privacy.title = privacyTitle;
    privacy.message = privacyMessage;
    privacy.second.title = privacySecondTitle;
    privacy.second.message = privacySecondMessage;

    try {
      const privacyPath = this.getClientPackagePath() + "/src/androidPrivacy.json";
      fs.writeFileSync(privacyPath, JSON.stringify(privacy, null, 2), "utf8");
      return privacy;
    } catch (error) {
      this.normalError("更新失败");
    }
  }

  //获取客户端系统配置信息
  async getConfigure() {
    const { title, message, second } = this.getPrivacyContent();
    return {
      privacyTitle: title,
      privacyMessage: message,
      privacySecondTitle: second.title,
      privacySecondMessage: second.message
    };
  }

  //导出客户端代码包
  async exportClientPackage(): Promise<string> {
    return new Promise((resolve) => {
      const sourceFile = this.app.getAppDir() + "/public/clientPackage.zip";
      const output = fs.createWriteStream(sourceFile);
      const archive = archiver("zip", {
        zlib: { level: 9 }
      });
      archive.pipe(output);
      archive.directory("../client", false);
      archive.finalize();
      output.on("close", function() {
        resolve(sourceFile);
      });
    });
  }

  //获取客户端包路径地址
  getClientPackagePath(): string {
    if (this.app.getEnv().includes("prod")) {
      return this.app.getAppDir() + "/public/clientPackage";
    }
    return this.app.getAppDir().replace("server", "client");

  }

  //获取客户端隐私协议json文件
  getPrivacyContent() {
    return require(this.getClientPackagePath() + "/src/androidPrivacy.json");
  }
}
