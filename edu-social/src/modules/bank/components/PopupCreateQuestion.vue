<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <div class="container-create-post">
      <div class="body">
        <div class="content">
          <div class="header">Tạo câu hỏi</div>
          <div class="body-content">
            <QuestionComponent
              :key="question._id"
              v-model:question="question"
              :statusEdit="true"
              :isShowAnswer="true"
              :isShowResult="true"
              :subjectID="subjectID"
              @update:question="updatedQuestion"
              :mode="2"
            />
          </div>
        </div>
      </div>
      <div class="footer">
        <EButton label="Đóng" @click="cancel" />
      </div>
    </div>
  </q-dialog>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
import QuestionComponent from '../../core/components/question/QuestionComponent.vue';
import CommonFunction from '../../core/commonFunction';
import EButton from 'src/modules/core/components/button/EButton.vue';
export default defineComponent({
  name: 'PopupCreatePeriod',
  props: {
    subjectID: {
      type: String,
      required: false,
      default: '6590176ba57e454f49e4ea25',
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const newQuestion = CommonFunction.createQuestion();
    const question = ref(newQuestion);
    const $q = useQuasar();
    function cancel() {
      onDialogHide();
    }
    function updatedQuestion() {
      onDialogOK(question.value);
    }
    return {
      question,
      cancel,
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      updatedQuestion,
    };
  },
  components: { EButton, QuestionComponent },
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
      .format-exam {
        display: flex;
        flex-direction: column;
        .detail-format-exam {
          display: flex;
          justify-content: space-between;
          .number-question-level-block {
            display: flex;
            .label-level {
              display: block;
              width: 100px;
            }
            .number-question-level {
              width: 75px;
            }
          }
        }
      }
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
