<template>
  <div class="content">
    <!-- 头部标题 -->
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <!-- 表格内容 -->
    <div class="table">
      <el-table :data="usersList" size="large" stripe style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="60px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        />
        <el-table-column align="center" label="创建时间" prop="createAt" />
        <el-table-column align="center" label="更新时间" prop="updateAt" />
        <el-table-column align="center" label="操作" width="150px">
          <el-button size="small" icon="Edit" type="primary" text>
            编辑
          </el-button>
          <el-button size="small" icon="Delect" type="danger" text>
            删除
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">分页</div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
systemStore.postUserListActions()

// 2.获取usersList数据,进行展示
const { usersList } = storeToRefs(useSystemStore())
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  margin-bottom: 20px;
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
</style>
