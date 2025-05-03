<template>
  <div class="login-panel">
    <div class="login-top drag">微信</div>
    <div class="login-context">
      <el-form :model="loginForm" ref="loginRef" :rules="rules" label-width="0px" @submit.prevent>
        <el-form-item prop="email">
          <el-input v-model.trim="loginForm.email" size="large" clearable placeholder="请输入邮箱">
            <template #prefix>
              <span class="iconfont icon-email"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!isLogin" prop="nickname">
          <el-input
            v-model.trim="loginForm.nickname"
            size="large"
            clearable
            placeholder="请输入昵称"
          >
            <template #prefix>
              <el-icon size="16"><User /></el-icon>
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
        <el-form-item v-if="!isLogin" prop="rePassword">
          <el-input
            v-model.trim="loginForm.rePassword"
            show-password
            size="large"
            clearable
            placeholder="请输入再次密码"
          >
            <template #prefix>
              <span class="iconfont icon-suo"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <el-input
            v-model.trim="loginForm.checkCode"
            size="large"
            clearable
            placeholder="请输入验证码"
          >
            <template #prefix>
              <span class="iconfont icon-anquan"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submit">
            {{ isLogin ? '登陆' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-bottom">
      <span @click="changeType">{{ isLogin ? '没有账号?' : '已有账号?' }}</span>
    </div>
  </div>
</template>

<script setup>
import { checkCode } from '@/api/login'
import { useRouter } from 'vue-router'
import { useUserInfoStore } from '@/stores/userInfoStore'

const loginForm = ref({})
const isLogin = ref(true)
const loginRef = ref(null)
const router = useRouter()

const userInfoStore = useUserInfoStore()

const rules = {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  rePassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
  checkCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
}

const changeType = () => {
  window.ipcRenderer.send('loginOrRegister', !isLogin.value)
  isLogin.value = !isLogin.value
  nextTick(() => {
    loginRef.value.resetFields()
    loginForm.value = {}
  })
}

const submit = () => {
  loginRef.value.validate(async (valid) => {
    if (!valid) {
      return
    }
    if (
      loginForm.value.password === '123' &&
      loginForm.value.email === 'admin' &&
      loginForm.value.checkCode === '123'
    ) {
      // window.ipcRenderer.send('loginOrRegister', !isLogin.value)
      // isLogin.value = !isLogin.value
      userInfoStore.setUserInfo(loginForm.value)
      router.push('/main')
      nextTick(() => {
        loginRef.value.resetFields()
        loginForm.value = {}
      })
      ElMessage({
        message: '登录成功',
        type: 'success'
      })
      loginForm.value.userId = '123456'
      loginForm.value.token = 'd432d33456234'
      window.ipcRenderer.send('openChat', toRaw(loginForm.value))
    } else {
      alert('账号密码错误')
    }
  })
}

onMounted(async () => {
  const res = await checkCode()
})
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
    span {
      cursor: pointer;
    }
  }
}
</style>
