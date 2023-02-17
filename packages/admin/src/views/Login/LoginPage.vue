<template>
  <div class="login flex center w_full h_full">
    <div class="content flex main_end">
      <div class="login_card cross_center flex flex_col main_around">
        <div class="login_title fs28">登录</div>
        <a-form ref="formRef" :model="ruleForm" :rules="rules" @finish="login">
          <a-form-item name="account">
            <a-input
              @keyup.enter="login"
              placeholder="请输入用户名"
              v-model:value="ruleForm.account"
            />
          </a-form-item>
          <a-form-item name="password">
            <a-input
              @keyup.enter="login"
              type="password"
              placeholder="请输入密码"
              v-model:value="ruleForm.password"
            />
          </a-form-item>
          <a-form-item name="captcha">
            <div class="flex cross_center">
              <a-input
                placeholder="验证码"
                @keyup.enter="login"
                style="width: 140px"
                v-model:value="ruleForm.captcha"
              ></a-input>
              <div class="captcha_img">
                <img
                  v-if="captchaSrc"
                  :src="captchaSrc"
                  @click="getCaptcha"
                  class="w_100 h_100"
                />
              </div>
            </div>
          </a-form-item>
          <a-form-item>
            <a-checkbox>记住我，以后自动登录</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button
              v-if="formRef"
              @click="login"
              class="login_btn"
              :loading="btnLoading"
              shape="round"
              html-type="submit"
              type="primary"
              >登录
            </a-button>
          </a-form-item>
        </a-form>
        <div class="fs14 fc_link pointer">忘记密码？</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCaptchaAPI } from '@/api/common'
import { useUserStore } from '@/stores'
import { useMessage } from '@/hooks/useMessage'
import { Hint } from '@/utils/hint'
import { useDebounceFn } from '@vueuse/core'

import type { FormInstance } from 'ant-design-vue'
import { useValidate } from '@/hooks/useValidator'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const btnLoading = ref<boolean>(false) //表单数据
const ruleForm = reactive({
  account: '',
  password: '',
  captcha: ''
})
// //验证码svg代码
const captchaSrc = ref('')

//表单验证规则
const rules = {
  account: useValidate.normal('用户名'),
  password: useValidate.pwd,
  captcha: useValidate.normal('验证码')
}
// //获取验证码
const getCaptcha = useDebounceFn(async () => {
  captchaSrc.value = (await getCaptchaAPI()).data
})
getCaptcha()

const login = useDebounceFn(async () => {
  try {
    await formRef.value?.validateFields()
    btnLoading.value = true
    await userStore.login(ruleForm)
    btnLoading.value = false
    await router.replace('/')
    useMessage.success(Hint.LOGIN_SUC)
  } catch (e) {
    await getCaptcha()
    btnLoading.value = false
  }
})
</script>

<style scoped lang="less">
.login {
  background-image: url('../../assets/images/login-bg.jpg');
  background-size: cover;
}

.content {
  width: 825px;
  height: 480px;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.login_card {
  height: 100%;
  width: 335px;
  background-color: #fff;
}

.login_btn {
  width: 100%;
  height: 38px;
  background: linear-gradient(to right, #2e9fff, #3e79ff);
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.5);
}

.captcha_img {
  width: 100px;
  height: 36px;
  vertical-align: middle;
  cursor: pointer;
}

:deep(.ant-input) {
  height: 36px;
  border-radius: 18px;
  background-color: #f7f5fb;
  border-color: #f7f5fb;
}
</style>
