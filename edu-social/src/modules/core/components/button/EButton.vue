<template>
  <q-btn :class="classProp">{{ label }}</q-btn>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EButton',
  props: {
    label: {
      type: String,
      required: false,
      default: 'Button',
    },
    classProp: {
      type: String,
      required: false,
      default: 'btn-custom',
    },
  },
});
</script>
<style lang="scss">
.btn-custom {
  height: 36px;
  border-radius: 4px;
}
</style>
