<template>
  <a-layout class="layout">
    <!-- 左侧栏 -->
    <a-layout-sider breakpoint="lg"
                    collapsed-width="0">
      <div class="logo">退役复学管理系统</div>
      <a-menu :default-selected-keys="['0']"
              :default-open-keys="['sub1']"
              theme="dark"
              mode="inline">
        <a-sub-menu title='退役士兵信息'
                    icon="setting">
          <a-menu-item key="1">
            <router-link to="student">
              <AppstoreOutlined /> 信息管理
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <!-- 右侧栏 -->
    <a-layout>
      <!-- 顶部 -->

      <a-layout-header class="header">
        <a-menu mode="horizontal"
                theme="dark">
          <!-- :items="top_items"> -->
          <a-menu-item key="mail">
            <router-link to="student">
              <MailOutlined /> 消息
            </router-link>
          </a-menu-item>

          <a-menu-item key="sub2">
            <router-link to="student">
              <SettingOutlined /> 退出系统
            </router-link>
          </a-menu-item>

        </a-menu>

      </a-layout-header>
      <!-- 主体 -->
      <a-layout-content :style="{ margin: '6px', padding: '6px', background: '#fff', minHeight: '280px' }">

        <router-view></router-view>
      </a-layout-content>

    </a-layout>
  </a-layout>

</template>

<script setup>
//导入图标
import {
  MailOutlined,
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";




</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  .header {
    background: #001529;
    padding: 0;
    display: flex;
    // margin-left: auto;
    justify-content: flex-end;
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
    color: white;
    text-align: center;
    line-height: 32px;
    font-size: 20px;
  }
}
</style>
