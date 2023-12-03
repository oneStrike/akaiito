<template>
  <div class="login h-screen flex justify-center items-center">
    <div class="content">
      <div class="login_card ml-auto p-4">
        <div class="text-center text-2xl mb-4">登录</div>
        <el-form ref="ruleFormRef" :model="loginForm" :rules="rules">
          <el-form-item prop="account" class="mt-8">
            <el-input
              @keyup.enter="login(ruleFormRef)"
              placeholder="请输入用户名"
              v-model.trim="loginForm.account"
            />
          </el-form-item>
          <el-form-item prop="password" class="mt-8">
            <el-input
              @keyup.enter="login(ruleFormRef)"
              type="password"
              placeholder="请输入密码"
              v-model.trim="loginForm.password"
            />
          </el-form-item>
          <el-form-item prop="captcha" class="mt-8">
            <el-input
              placeholder="验证码"
              @keyup.enter="login(ruleFormRef)"
              style="width: 140px"
              v-model.trim="loginForm.captcha"
            ></el-input>
            <img
              v-if="captchaInfo.data"
              :src="captchaInfo.data"
              class="captcha_img ml-8"
              @click="getCaptchaFn"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox>记住我，以后自动登录</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="ruleFormRef"
              class="login_btn"
              :loading="submitLoading"
              round
              type="primary"
              @click="login"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="text-sm text-center text-slate-500">忘记密码？</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useValidate } from '@/hooks/useValidate'
import { getCaptcha } from '@/apis/openApis'

const ruleFormRef = ref()

const loginForm = reactive({
  account: '',
  password: '',
  captcha: '',
  captchaId: ''
})

const rules = reactive({
  account: useValidate.required('账号'),
  password: useValidate.password,
  captcha: useValidate.required('验证码')
})

const captchaInfo = ref({
  id: '',
  data: ''
})
const submitLoading = ref(false)

const getCaptchaFn = useDebounceFn(async () => {
  captchaInfo.value = await getCaptcha()
}, 500)
getCaptchaFn()

const login = async () => {
  await ruleFormRef.value.validate((valid: boolean) => {
    if (!valid) return
    submitLoading.value = true
    loginForm.captchaId = captchaInfo.value.id
  })
}
</script>

<style scoped lang="scss">
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

:deep(.el-input__wrapper) {
  height: 36px;
  border-radius: 18px;
  background-color: #f7f5fb;
  border-color: #f7f5fb;
}
</style>
