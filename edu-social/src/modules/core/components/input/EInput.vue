<template>
  <div class="einput">
    <q-input
      class="default-input"
      :input-class="qClass"
      :placeholder="placeholder"
      :square="square"
      outlined
      :readonly="readonly"
      v-model="valueLocal"
      @update:model-value="updateValue"
      :dense="false"
    ></q-input>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
  name: 'EInput',
  props: {
    qClass: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Tìm kiếm',
    },
    value: {
      type: String,
      required: true,
      default: 'Tìm kiếm',
    },
    square: {
      type: Boolean,
      required: false,
      default: false,
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:value'],
  watch: {
    value(newV, oldV) {
      this.valueLocal = newV;
    },
  },
  created() {
    this.valueLocal = this.value;
  },
  setup(props, ctx) {
    const valueLocal = ref('');
    function updateValue(data: any) {
      ctx.emit('update:value', data);
    }
    return {
      valueLocal,
      updateValue,
    };
  },
};
</script>
<style src="../../css/e-input.scss" lang="scss"></style>
