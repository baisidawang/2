<template>
  <div class="login">
    <div class="content">
      <a-form :model="
         formState"
              name="basic"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              @finish="onFinish">
        <a-form-item label="账号"
                     name="username"
                     :rules="[{ required: true, message: '请输入账号!' }]">
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item label="密码"
                     name="password"
                     :rules="[{ required: true, message: '请输入密码!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 12 }">
          <a-button type="primary"
                    html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
//导入路由器对象
import { useRouter } from 'vue-router'
let $router = useRouter()
//导入请求api
import login from '../../api/login'
import { reactive } from 'vue';
//表单数据
const formState = reactive({
  //登录名
  username: '',
  //密码
  password: '',
});
//登录方法
const onFinish = async (values) => {
  let { username, password } = values
  let re = await login({ username, password })
  if (re) {
    //布局页
    $router.push('/student')
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, rgb(5, 57, 79), rgb(200, 235, 250));
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    padding: 50px;
    width: 500px;
    height: 300px;
    border: 1px solid white;
    border-radius: 6px;
  }
}
</style>