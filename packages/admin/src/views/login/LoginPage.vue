<template>
  <div class="login flex_center">
    <div class="content main_end">
      <n-card class="login_card">
        <n-space vertical>
          <n-h2 align-text strong class="tc">登录</n-h2>
          <n-form
            ref="formRef"
            :model="loginForm"
            :rules="rules"
            :show-label="false"
          >
            <n-form-item path="account">
              <n-input
                round
                @keyup.enter="login"
                v-model:value="loginForm.account"
                placeholder="请输入账号"
              ></n-input>
            </n-form-item>
            <n-form-item path="password">
              <n-input
                round
                v-model:value="loginForm.password"
                type="password"
                @keyup.enter="login"
                show-password-on="mousedown"
                placeholder="请输入密码"
              ></n-input>
            </n-form-item>
            <n-form-item path="captcha">
              <n-space justify="space-between" :wrap="false">
                <n-input
                  round
                  v-model:value="loginForm.captcha"
                  @keyup.enter="login"
                  placeholder="请输入右侧验证码"
                ></n-input>
                <img
                  class="cursor_pointer captcha"
                  :src="captchaSrc"
                  alt="验证码"
                  @click="getCaptcha"
                />
              </n-space>
            </n-form-item>
            <n-form-item>
              <n-checkbox disabled @click="showMessage('我也记不住')"
                >记住我</n-checkbox
              >
            </n-form-item>
            <n-form-item>
              <n-button
                class="login_btn"
                @click="login"
                :loading="btnLoading"
                type="primary"
                >登录</n-button
              >
            </n-form-item>
          </n-form>
          <n-text
            class="tc cursor_pointer"
            tag="div"
            @click="showMessage('忘了就忘了吧')"
            >忘记密码？</n-text
          >
        </n-space>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCaptchaAPI } from '@/api/common'
import { userStore } from '@/stores'
import type { FormInst, FormRules } from 'naive-ui'
import { useMessage } from '@/hook/naviaDiscreteApi'
import config from '@/config'

const router = useRouter()
const useUserStore = userStore()
const formRef = ref<FormInst | null>(null)
const btnLoading = ref<boolean>(false)

//表单数据
const loginForm = reactive({
  account: '',
  password: '',
  captcha: ''
})
//表单验证规则
const rules = reactive<FormRules>({
  account: useValidate.required({
    message: '用户名'
  }),
  password: useValidate.password,
  captcha: useValidate.required({ message: '验证码' })
})
// //获取验证码
const captchaSrc = ref('')
const getCaptcha = useDebounceFn(async function () {
  captchaSrc.value = (await getCaptchaAPI()).data
}, config.DEBOUNCE)
getCaptcha()

const login = useDebounceFn(() => {
  formRef.value?.validate(async (errors) => {
    if (errors) return
    btnLoading.value = true
    try {
      await useUserStore.login(loginForm)
      useUserStore.renewalToken()
      btnLoading.value = false
      await router.replace('/')
      useMessage.success(HintEnum.LOGIN_SUC)
    } catch (e) {
      await getCaptcha()
      btnLoading.value = false
    }
  })
}, config.DEBOUNCE)

const showMessage = (message: string) => {
  useMessage.success(message)
}
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/images/login-bg.jpg');
  background-size: cover;
}

.content {
  width: 825px;
  height: 480px;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;

  .login_card {
    height: 100%;
    width: 335px;
    background-color: #fff;

    .captcha {
      height: 34px;
    }
  }
}

.login_btn {
  width: 100%;
  height: 38px;
  background: linear-gradient(to right, #2e9fff, #3e79ff);
  box-shadow: 0 4px 10px rgba(0, 123, 255, 0.5);
  border-radius: 20px;
  color: white;
}

.captcha_img {
  width: 100px;
  height: 36px;
  vertical-align: middle;
  cursor: pointer;
}

:deep(.n-input__wrapper) {
  height: 36px;
  border-radius: 18px;
  background-color: #f7f5fb;
  border-color: #f7f5fb;
}
</style>
