<template>
  <a-table :columns="columns"
           :data-source="tableData"
           @change="changePage"
           :scroll="{ x: 1500, y: 500 }">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span>
            <a-button type="primary"
                      v-if="isEditable"
                      @click="edit(record)">编辑</a-button>
            <a-popconfirm title="确定删除吗?"
                          @confirm="remove(record)">
              <a-button type="danger">删除</a-button>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['data', 'columns', 'isEditable'],
  computed: {
    tableData () {
      return this.data && this.data.map((item) => ({
        ...item,
        key: item.id
      }))
    }
  },
  methods: {
    changePage (page) {
      this.$emit('change')
    },
    edit (record) {
      this.$emit('edit', record)
    },
    remove (record) {
      this.$emit('remove', record)
    }
  }
}
</script>
<style lang="scss" scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>