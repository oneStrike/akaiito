<script lang="ts" setup>
  import { scrypt } from 'scrypt-js'
  import { getCaptchaApi } from '@/apis/user.ts'
  import { useUserStore } from '@/stores/modules/user'

  const router = useRouter()

  const userStore = useUserStore()
  const ruleFormRef = ref()
  const storageAccount = useStorage<IterateObject>('ACCOUNT_INFO', {})
  const isRememberAccount = ref(storageAccount.value?.isRememberAccount)
  const loginForm = reactive({
    username: storageAccount.value?.username,
    password: storageAccount.value?.password,
    captcha: '',
    captchaId: '',
  })
  const rules = reactive({
    username: useValidate.required('用户名或手机号'),
    password: useValidate.password(),
    captcha: useValidate.required('验证码'),
  })

  const captchaInfo = ref({
    id: '',
    data: '',
  })
  const submitLoading = ref(false)

  const getCaptchaFn = useDebounceFn(async () => {
    captchaInfo.value = await getCaptchaApi()
  }, 500)
  getCaptchaFn()

  function generateSalt(): string {
    const array = new Uint8Array(8)
    window.crypto.getRandomValues(array)
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }

  function toHex(buffer: Uint8Array): string {
    return Array.from(buffer, (b) => b.toString(16).padStart(2, '0')).join('')
  }

  const encryption = async (
    password: string,
    salt?: string,
  ): Promise<string> => {
    if (!salt) {
      salt = generateSalt()
    }

    const N = 16384 // CPU/Memory cost
    const r = 8 // Block size
    const p = 1 // Parallelization
    const dkLen = 32 // 密钥长度（字节）

    const passwordKey = await scrypt(
      new TextEncoder().encode(password),
      new Uint8Array(
        salt.match(/.{2}/g)!.map((byte) => Number.parseInt(byte, 16)),
      ),
      N,
      r,
      p,
      dkLen,
    )

    return `${salt}.${toHex(passwordKey)}`
  }

  async function login() {
    console.log(123)
    console.log(await encryption('Aa@123456','a1b2c3d4e5f67890'))
    await ruleFormRef.value.validate(async (valid: boolean) => {
      if (!valid) {
        return
      }
      try {
        submitLoading.value = true
        loginForm.captchaId = captchaInfo.value.id
        await userStore.signIn(loginForm)
        if (isRememberAccount.value) {
          storageAccount.value = {
            username: loginForm.username,
            password: loginForm.password,
            isRememberAccount: isRememberAccount.value,
          }
        } else {
          storageAccount.value = {}
        }
        router.replace({ name: 'Dashboard' })
      } catch (e) {
        console.log(e)
        submitLoading.value = false
        await getCaptchaFn()
      }

      submitLoading.value = false
    })
  }
</script>

<template>
  <div class="login h-screen flex justify-center items-center">
    <div class="content">
      <div class="login_card ml-auto p-4">
        <div class="text-center text-2xl mb-4">登录</div>
        <el-form ref="ruleFormRef" :model="loginForm" :rules="rules">
          <el-form-item prop="username" class="mt-8">
            <el-input
              v-model.trim="loginForm.username"
              placeholder="请输入用户名或手机号"
              @keyup.enter="login"
            />
          </el-form-item>
          <el-form-item prop="password" class="mt-8">
            <el-input
              v-model.trim="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
              @keyup.enter="login"
            />
          </el-form-item>
          <el-form-item prop="captcha" class="mt-8">
            <el-input
              v-model.trim="loginForm.captcha"
              placeholder="验证码"
              style="width: 140px"
              @keyup.enter="login"
            />
            <img
              v-if="captchaInfo.data"
              :src="captchaInfo.data"
              class="captcha_img"
              @click="getCaptchaFn"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="isRememberAccount">
              记住我，以后自动登录
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="ruleFormRef"
              class="login_btn"
              :loading="submitLoading"
              round
              type="primary"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="text-center text-sm text-slate-500">忘记密码？</div>
      </div>
    </div>
  </div>
</template>

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
    width: 160px;
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
