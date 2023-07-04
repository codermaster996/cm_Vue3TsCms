<template>
  <div class="login-panel">
    <!-- 顶部的标题 -->
    <h1 class="title">大师后台管理系统</h1>
    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1.账号登录的Pane -->
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <!-- 2.手机登录的Pane -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 登录按钮 -->
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

import { localCache } from '@/utils/cache'
import { IS_REMPWD } from '@/global/constants'

const activeName = ref('account')
// 记住密码功能
const isRemPwd = ref<boolean>(localCache.getCache(IS_REMPWD) ?? true)
watch(isRemPwd, (newValue) => {
  localCache.setCache(IS_REMPWD, newValue)
})

const accountRef = ref<InstanceType<typeof PaneAccount>>()
const handleLoginBtnClick = () => {
  if (activeName.value == 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;

    margin-top: 12px;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
