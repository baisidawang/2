<template>
  <div class="search-box">
    <a-form-model layout="inline"
                  :model="searchForm"
                  @submit="handleSubmit">
      <a-form-model-item label="检索关键字">
        <a-input v-model="searchForm.searchWord"
                 placeholder="请输入关键字"
                 style="width:300px"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary"
                  html-type="submit"
                  style="margin-left: 10px">搜索</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        searchWord: "",
        sno: "",
        id_card: "",
      },
    };
  },
  props: ["levelList"],

  methods: {
    // 提交表单的时候触发的函数
    handleSubmit () {
      this.$emit("submit", this.searchForm);
    }
  },
};
</script>

<style lang="scss" scoped>
.search-box {
  padding: 20px 40px;
}
</style>
