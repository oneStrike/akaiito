<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue'
import { getCaptchaApi } from '@/apis/captcha'
import { useMessage } from '@/hooks/useMessage'
import { useValidate } from '@/hooks/useValidator'

import { useUserStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const btnLoading = ref<boolean>(false) // 表单数据
const ruleForm = reactive({
  account: '',
  password: '',
  captcha: '',
})
// //验证码svg代码
const captchaSrc = ref('')

// 表单验证规则
const rules = {
  account: useValidate.normal('用户名'),
  password: useValidate.pwd,
  captcha: useValidate.normal('验证码'),
}
// //获取验证码
const getCaptcha = async () => {
  captchaSrc.value = (await getCaptchaApi()).data
}
getCaptcha()

const login = async () => {
  try {
    await formRef.value?.validateFields()
    btnLoading.value = true
    await userStore.login(ruleForm)
    btnLoading.value = false
    await router.replace('/')
    useMessage.success('登录成功')
  } catch (e) {
    await getCaptcha()
    btnLoading.value = false
  }
}
</script>

<template>
  <div class="w-screen h-screen login flex items-center justify-center">
    <div class="content flex justify-end">
      <div class="login_card flex flex-col items-center justify-around">
        <div class="text-2xl">登录</div>
        <a-form ref="formRef" :model="ruleForm" :rules="rules" @finish="login">
          <a-form-item name="account">
            <a-input v-model:value="ruleForm.account" placeholder="请输入用户名" @keyup.enter="login" />
          </a-form-item>
          <a-form-item name="password">
            <a-input v-model:value="ruleForm.password" type="password" placeholder="请输入密码" @keyup.enter="login" />
          </a-form-item>
          <a-form-item name="captcha">
            <div class="flex justify-center">
              <a-input
                v-model:value="ruleForm.captcha"
                placeholder="验证码"
                style="width: 140px"
                @keyup.enter="login"
              />
              <div class="captcha_img">
                <img v-if="captchaSrc" :src="captchaSrc" class="w_100 h_100" alt="captcha" @click="getCaptcha">
              </div>
            </div>
          </a-form-item>
          <a-form-item>
            <a-checkbox>记住我，以后自动登录</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              class="w-full h-10"
              :loading="btnLoading"
              shape="round"
              html-type="submit"
              @click="login"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
        <a-button type="link" class="fs14 cursor-pointer">忘记密码？</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  background-image: url('../../assets/images/login-bg.png');
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
