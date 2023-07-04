<template>
  <div class="main-meun">
    <!-- 1.logo -->
    <div class="logo" @click="handleLogoCilck">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <div class="title" v-show="!isFold">大师后台管理系统</div>
    </div>

    <!-- meun -->
    <div class="meun">
      <el-menu
        default-active="39"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { useRouter } from 'vue-router'

// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    deafult: false
  }
})

// 1.获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 2.监听item的点击
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}

// 3.监听logo的点击
const handleLogoCilck = () => {
  router.push('/main')
}
</script>

<style lang="less" scoped>
.main-meun {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 28px;
  padding: 12px 10px 8px 10px;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
