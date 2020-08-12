<template>
  <el-form :inline="inline" :model="form" ref="form" label-width="100px">
    <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
      <el-input v-model="form[item.model]" :placeholder="'请输入用户名' + item.label" v-if="!item.type"></el-input>
      <el-select
        v-model="form[item.model]"
        :placeholder="'请选择' + item.label"
        v-if="item.type === 'select'"
      >
        <el-option
          v-for="optItem in item.options"
          :key="optItem.value"
          :label="optItem.label"
          :value="optItem.value"
        ></el-option>
      </el-select>
      <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
      <el-date-picker v-model="form[item.model]" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-if="item.type === 'date'"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    form: Object,
    formLabel: Array,
    inline: Boolean,
  },
};
</script>

<style lang="scss" scoped>
</style>