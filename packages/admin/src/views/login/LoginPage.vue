<template>
  <div class="login flex_center w_full h_full">
    <div class="content main_end">
      <div class="login_card flex_col cross_center main_around pd_32">
        <a-typography-title heading="5"> 登录 </a-typography-title>
        <a-form ref="formRef" @submit="login" :rules="rules" :model="loginForm">
          <a-form-item field="account" hide-label>
            <a-input placeholder="请输入用户名" v-model="loginForm.account" />
          </a-form-item>
          <a-form-item field="password" hide-label>
            <a-input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
            />
          </a-form-item>
          <a-form-item field="captcha" hide-label>
            <div class="flex cross_center">
              <a-input
                placeholder="验证码"
                style="width: 140px"
                v-model="loginForm.captcha"
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
          <a-form-item hide-label>
            <a-checkbox>记住我，以后自动登录</a-checkbox>
          </a-form-item>
          <a-form-item hide-label>
            <a-button
              class="login_btn"
              html-type="submit"
              @click="login"
              :loading="btnLoading"
              shape="round"
              type="primary"
              >登录
            </a-button>
          </a-form-item>
        </a-form>
        <a-button type="text">忘记密码？</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCaptchaAPI } from '@/api/common'
import { useValidate } from '@/hooks/uesValidator'
import { useUserStore } from '@/stores'
import { Hint } from '@/utils/hint'
import { useMessage } from '@/hooks/useMessage'
const userStore = useUserStore()

const router = useRouter()
const btnLoading = ref<boolean>(false) //表单数据
const loginForm = reactive({
  account: '',
  password: '',
  captcha: ''
})
//验证码svg代码
const captchaSrc = ref('')
const getCaptcha = useDebounceFn(async () => {
  captchaSrc.value = (await getCaptchaAPI()).data
})
getCaptcha()

//表单验证规则
const rules = {
  account: useValidate.normal('用户名'),
  password: useValidate.pwd,
  captcha: useValidate.normal('验证码')
}

const login = useDebounceFn(async () => {
  btnLoading.value = true
  try {
    await userStore.login(loginForm)
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
  width: 277px;
  background-color: #fff;
}

.login_btn {
  width: 100%;
  height: 38px;
}

.captcha_img {
  width: 100px;
  height: 36px;
  vertical-align: middle;
  cursor: pointer;
}

:deep(.arco-input-wrapper) {
  height: 36px;
  border-radius: 18px;
  background-color: #f7f5fb;
  border-color: #f7f5fb;
}
</style>
