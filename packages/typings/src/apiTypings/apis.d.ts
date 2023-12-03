/* eslint-disable */

export type Urls = {
  get: "/open/captcha/getCaptcha" | "/admin/log/getLogs";
  post: "/admin/log/deleteLog";
  all: Urls["get"] | Urls["post"];
};

export type RefSchema = {
  通用返回数据结构: {
    /**
     * @description 返回状态，200成功
     */
    code: number;
    /**
     * @description 状态说明，success成功，error失败
     */
    status: string;
    /**
     * @description 请求失败时的错误表述
     */
    desc: string;
  };
};

type ApiDetails = {
  get: {
    /**
     * 获取验证码
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-116799073
     */
    "/open/captcha/getCaptcha": {
      contentType: "none";
      params: never;

      data: never;

      response: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-116799073
         */
        data: {
          /**
           * @description 验证码id
           * @see https://www.apifox.cn/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-116799073
           */
          id: string;
          /**
           * @description base64格式图片
           * @see https://www.apifox.cn/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-116799073
           */
          data: string;
        };
      };
    };

    /**
     * 获取接口调用日志
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-117524114
     */
    "/admin/log/getLogs": {
      contentType: "none";
      params: never;

      data: never;

      response: {};
    };
  };

  post: {
    /**
     * 删除接口调用日志
     * @status developing
     * @see https://www.apifox.cn/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-120350001
     */
    "/admin/log/deleteLog": {
      contentType: "application/json";
      params: never;

      data: {
        /**
         * @see https://www.apifox.cn/apidoc/shared-2222281e-f529-4e28-9ebf-a4b667d2982c/api-120350001
         */
        id: number;
      };

      response: {};
    };
  };
};
