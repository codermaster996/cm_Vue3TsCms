<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账户" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types'
import useLoginStore from '@/store/login/login'

// 1.定义account数据
const account = reactive<IAccount>({
  name: '',
  password: ''
})

// 2.定义验证规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '帐号信息不能为空~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码信息不能为空~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,18}$/,
      message: '必须是3位以上18位以下数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 3.执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction() {
  formRef.value?.validate((vaild) => {
    if (vaild) {
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error('请您输入正确的帐号密码后再操作~~')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
}
</style>
