<template>
  <a-table :columns="columns"
           :data-source="dataSource"
           :scroll="{ x: 1500, y: 500 }"
           bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['name','gender','nation','birthday','politic','Sno','domicile','ID_card','enlist_time','retire_time',
      'before_teacher','retire_class','searvice_troops','duties','number','family_number','enlist_place','pend','rewards','certifiate',
      'personal_photo','enlist_photo','retire_photo','sign_photo'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.key]"
                   v-model:value="editableData[record.key][column.dataIndex]"
                   style="margin: -5px 0" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">保存</a-typography-link>
            <a-popconfirm title="Sure to cancel?"
                          @confirm="cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">编辑</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import { reactive, ref } from 'vue';
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name', width: 100, fixed: 'left', ellipsis: true },
  { title: '性别', dataIndex: 'gender', key: 'gender', width: 150, ellipsis: true },
  { title: '民族', dataIndex: 'nation', key: 'nation', width: 150, ellipsis: true },
  { title: '出生日期', dataIndex: 'birthday', key: 'birthday', width: 150, ellipsis: true },
  { title: '政治面貌', dataIndex: 'politic', key: 'politic', width: 150, ellipsis: true },
  { title: '学号', dataIndex: 'Sno', key: 'Sno', width: 150, ellipsis: true },
  { title: '户籍地', dataIndex: 'domicile', key: 'domicile', width: 150, ellipsis: true },
  { title: '身份证号', dataIndex: 'ID_card', key: 'ID_card', width: 150, ellipsis: true },
  { title: '入伍时间', dataIndex: 'enlist_time', key: 'enlist_time', width: 150, ellipsis: true },
  { title: '退役时间', dataIndex: 'retire_time', key: 'retire_time', width: 150, },
  { title: '入伍前班导师', dataIndex: 'before_teacher', key: 'before_teacher', width: 150, ellipsis: true },
  { title: '退伍后班导师', dataIndex: 'retire_teacher', key: 'retire_teacher', width: 150, ellipsis: true },
  { title: '入伍前学院班级', dataIndex: 'before_class', key: 'before_class', width: 150, ellipsis: true },
  { title: '退伍后学院班级', dataIndex: 'retire_class', key: 'retire_class', width: 150, ellipsis: true },
  { title: '服役部队', dataIndex: 'searvice_troops', key: 'searvice_troops', width: 150, ellipsis: true },
  { title: '职务', dataIndex: 'duties', key: 'duties', width: 150, ellipsis: true },
  { title: '本人电话', dataIndex: 'number', key: 'number', width: 150, ellipsis: true },
  { title: '家庭电话', dataIndex: 'family_number', key: 'family_number', width: 150, ellipsis: true },
  { title: '入伍地', dataIndex: 'enlist_place', key: 'enlist_place', width: 150, ellipsis: true },
  { title: '挂科科目', dataIndex: 'pend', key: 'pend', width: 150, ellipsis: true },
  { title: '奖惩情况', dataIndex: 'rewards', key: 'rewards', width: 150, ellipsis: true },
  { title: '专业培训及证书', dataIndex: 'certifiate', key: 'certifiate', width: 150, ellipsis: true },
  { title: '个人照', dataIndex: 'personal_photo', key: 'personal_photo', width: 150, ellipsis: true },
  { title: '入伍通知书', dataIndex: 'enlist_photo', key: 'enlist_photo', width: 150, ellipsis: true },
  { title: '退役证', dataIndex: 'retire_photo', key: 'retire_photo', width: 150, ellipsis: true },
  { title: '本人签字', dataIndex: 'sign_photo', key: 'sign_photo', width: 150, ellipsis: true },
  { title: '编辑', dataIndex: 'operation', key: 'operation', fixed: 'right', width: 100 },
];
// const data = [{
//   name: '张三', gender: '男', nation: '汉', birthday: '2002-12-06', politic: '群众', Sno: '2106010123', domicile: '贵州', ID_card: '12335415', enlist_time: '2002-12-06', retire_time: '2002-12-06', before_teacher: '王伟',
//   retire_teacher: '王伟', before_class: '计算21-1', retire_class: '计算21-1', searvice_troops: '陆军', duties: '军人', number: '123456', family_number: '1234656', enlist_place: '贵州', pend: '无', rewards: '无',
//   certifiate: '无', personal_photo: 'http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg', enlist_photo: 'http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg', retire_photo: 'http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg', sign_photo: 'http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg'
// },
// {
//   name: '张三', gender: '男', nation: '汉', birthday: '2002-12-06', politic: '群众', Sno: '2106010123', domicile: '贵州', ID_card: '12335415', enlist_time: '2002-12-06', retire_time: '2002-12-06', before_teacher: '王伟',
//   retire_teacher: '王伟', before_class: '计算21-1', retire_class: '计算21-1', searvice_troops: '陆军', duties: '军人', number: '123456', family_number: '1234656', enlist_place: '贵州', pend: '无', rewards: '无',
//   certifiate: '无', personal_photo: 'http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg', enlist_photo: 'http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg', retire_photo: 'http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg', sign_photo: 'http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg'
// }
// ];
const data = []
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    name: `张三 `,
    gender: `男 `,
    nation: `汉 `,
    birthday: `2002-12-06 `,
    politic: `群众 `,
    Sno: `2106010123 `,
    domicile: `贵州 `,
    ID_card: `12335415 `,
    enlist_time: `2002-12-06 `,
    retire_time: `2002-12-06 `,
    before_teacher: `王伟 `,
    retire_teacher: `王伟 `,
    before_class: `计算21-1 `,
    retire_class: `计算21-1 `,
    searvice_troops: `陆军 `,
    duties: `军人 `,
    number: `123456 `,
    family_number: `123456 `,
    enlist_place: `贵州 `,
    pend: `无 `,
    rewards: `无 `,
    certifiate: `无`,
    personal_photo: `http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg`,
    enlist_photo: `http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg `,
    retire_photo: `http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg`,
    sign_photo: `http://tmp/SORWtNvRBaTLd289d991477c3c074330b1ab52d9c5bc.jpg`,
  });
}
const dataSource = ref(data);
const editableData = reactive({});
const edit = key => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
  delete editableData[key];
};
const cancel = key => {
  delete editableData[key];
};
const onDelete = key => {
  dataSource.value = dataSource.value.filter(item => item.key !== key);
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>

