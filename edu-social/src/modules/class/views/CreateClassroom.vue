<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <div class="container-create-post">
      <div class="body">
        <div class="content">
          <div class="header">Tạo lớp học</div>
          <div class="body-content">
            <EInput
              :square="true"
              placeholder="Tên lớp học"
              v-model:value="className"
            />
            <q-select
              v-model="subject"
              :options="subjects"
              option-label="subject_name"
              filled
              label="Chọn môn học"
            />
          </div>
        </div>
      </div>
      <div class="footer">
        <EButton
          placeholder="Tạo lớp học"
          :label="$t('button.save')"
          @click="createClassroom"
        />
        <EButton :label="$t('button.cancel')" @click="cancel" />
      </div>
    </div>
  </q-dialog>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import EButton from 'src/modules/core/components/button/EButton.vue';
import EInput from 'src/modules/core/components/input/EInput.vue';
import { getAllSubject } from 'src/modules/subject/services/subjectService';
import { Subject } from 'src/modules/subject/models/index';
export default defineComponent({
  name: 'PopupCreateClassroom',
  props: ['post'],
  emits: [...useDialogPluginComponent.emits],
  async created() {
    await this.initSubjects();
  },
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const className = ref('');
    const subject = ref(null);
    const subjects = ref([] as Subject[]);
    function cancel() {
      onDialogHide();
    }
    async function initSubjects() {
      subjects.value = await getAllSubject();
    }
    function createClassroom() {
      if (subject.value && subject.value._id) {
        const data = {
          class_name: className.value,
          subject_id: subject.value._id,
        };
        onDialogOK(data);
      }
    }
    return {
      subjects,
      subject,
      initSubjects,
      className,
      cancel,
      createClassroom,
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
    };
  },
  components: { EInput, EButton },
});
</script>
<style scoped lang="scss">
.container-create-post {
  min-width: 800px;
  .header {
    display: flex;
    justify-content: start;
    font-size: 24px;
    font-weight: 600;
    color: $primary-orange-color;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-left: 8px;
    background-color: #131212be;
    .icon--close {
      border-radius: 50%;
      border: 1px solid $primary-orange-color;
      color: white;
      margin-right: -36px;
      cursor: pointer;
    }
    .icon--close:hover {
      color: $primary-orange-color;
    }
  }
  .body {
    background-color: white;
    .body-content {
      padding: 8px;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
    }
  }
  .footer {
    background-color: white;
    display: flex;
    justify-content: end;
    column-gap: 8px;
    padding: 8px 8px 8px 0px;
  }
}
</style>
<style lang="scss">
@import url(../../core/css/common.scss);
</style>
