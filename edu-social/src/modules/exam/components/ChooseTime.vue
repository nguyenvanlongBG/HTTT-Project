<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <div class="container-choose-time">
      <div class="text-h3 text-white">
        {{ title }}
      </div>
      <div class="row mt-xs">
        <q-date v-model="time" mask="YYYY-MM-DD HH:mm" color="purple" />
        <q-time v-model="time" mask="YYYY-MM-DD HH:mm" color="purple" />
      </div>
      <div class="footer mt-md">
        <EButton :label="$t('button.save')" @click="agree" />
        <EButton :label="$t('button.cancel')" @click="cancel" />
      </div>
    </div>
  </q-dialog>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import EButton from 'src/modules/core/components/button/EButton.vue';
export default defineComponent({
  name: 'ChooseTime',
  props: ['timeProp', 'title'],
  emits: [...useDialogPluginComponent.emits],
  components: {
    EButton,
  },
  created() {
    this.time = this.timeProp;
  },
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const time = ref(null);
    function agree() {
      onDialogOK(time.value);
    }
    function cancel() {
      onDialogHide();
    }
    return {
      time,
      cancel,
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      agree,
    };
  },
});
</script>
<style scoped lang="scss">
.container-choose-time {
  display: flex;
  flex-direction: column;
  max-width: fit-content !important;
  .footer {
    display: flex;
    justify-content: flex-end;
    background-color: rgb(243, 242, 242);
    column-gap: 8px;
  }
}
</style>
<style lang="scss">
@import url(../../core/css/common.scss);
</style>
