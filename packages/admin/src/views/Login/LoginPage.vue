<template>
  <div class="login flex center">
    <div class="content flex main_end">
      <div class="login_card cross_center flex flex_col main_around">
        <div class="login_title fs28">登录</div>
        <el-form
          ref="ruleFormRef"
          :model="loginForm"
          :rules="rules"
          style="max-width: 460px"
        >
          <el-form-item prop="account">
            <el-input
              @keyup.enter="login(ruleFormRef)"
              placeholder="请输入用户名"
              v-model.trim="ruleForm.account"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              @keyup.enter="login(ruleFormRef)"
              type="password"
              placeholder="请输入密码"
              v-model.trim="ruleForm.password"
            />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input
              placeholder="验证码"
              @keyup.enter="login(ruleFormRef)"
              style="width: 140px"
              v-model.trim="ruleForm.captcha"
            ></el-input>
            <img
              v-if="captchaSrc"
              :src="captchaSrc"
              v-debounce="{
                type: 'click',
                delay: 200,
                fn: getCaptcha
              }"
              class="captcha_img"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox>记住我，以后自动登录</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="ruleFormRef"
              v-debounce="{
                type: 'click',
                delay: 200,
                fn: login,
                params: ruleFormRef
              }"
              class="login_btn"
              :loading="btnLoading"
              round
              type="primary"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="fs14 fc_link pointer">忘记密码？</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const loginForm = reactive({
  account: '',
  password: '',
  captcha: ''
})

const rules = reactive({
  account: useValidate.required('账号'),
  password: useValidate.validatePwd,
  captcha: useValidate.required('验证码')
})

const captcha = ref('')
const getCaptcha = async () => {}

const login = async () => {}
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
