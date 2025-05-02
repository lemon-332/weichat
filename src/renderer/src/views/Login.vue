<template>
  <div class="login-panel">
    <div class="login-top drag">微信</div>
    <div class="login-context">
      <el-form :model="loginForm" ref="form" :rules="rules" label-width="0px" @submit.prevent>
        <el-form-item prop="email">
          <el-input v-model.trim="loginForm.email" size="large" clearable placeholder="请输入邮箱">
            <template #prefix>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model.trim="loginForm.email" size="large" clearable placeholder="请输入昵称">
            <template #prefix>
              <el-icon>
                <Edit />
              </el-icon>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginForm.password"
            show-password
            size="large"
            clearable
            placeholder="请输入密码"
          >
            <template #prefix>
              <span class="iconfont icon-suo"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkcode">
          <el-input
            v-model.trim="loginForm.checkcode"
            size="large"
            clearable
            placeholder="请输入验证码"
          >
            <template #prefix>
              <span class="iconfont icon-anquan"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkcode">
          <el-button class="login-btn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-bottom">
      <span>没有账号?</span>
    </div>
  </div>
</template>

<script setup>
const loginForm = reactive({})
const rules = {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  checkcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

const isLogin = ref(true)
</script>

<style scoped lang="scss">
.login-panel {
  font-size: 12px;
  .login-top {
    color: rgb(133, 137, 140);
  }
  .login-context {
    margin-top: 10px;
    .login-btn {
      width: 100%;
    }
    :deep(.el-input__wrapper) {
      border-radius: none;
      box-shadow: none;
    }
    .el-form-item {
      border-bottom: 1px solid #dcdfe6;
    }
  }
  .login-bottom {
    display: flex;
    justify-content: flex-end;
    color: rgb(142, 159, 180);
  }
}
</style>
