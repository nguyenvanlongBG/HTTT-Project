<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <div class="container-create-post">
      <div class="body">
        <div class="content">
          <div class="header">Sửa kỳ thi</div>
          <div class="body-content">
            <div
              class="exam"
              v-for="exam in exams"
              :key="exam._id"
              @click="editExam(exam)"
            >
              Đề tạo ngày: {{ exam.createdAt }}
            </div>
            <div class="">
              <EButton label="Thêm đề thi" @click="createExam" />
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <EButton label="Đóng" @click="cancel"></EButton>
      </div>
    </div>
  </q-dialog>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { Exam } from '../models/index';
import {
  getExamsByPeriodID,
  createExamByPeriod,
} from '../services/examService';
import EButton from 'src/modules/core/components/button/EButton.vue';
import router from '../../../router/index';
export default defineComponent({
  name: 'PopupChooseExam',
  props: {
    periodID: {
      type: String,
      required: true,
      default: '',
    },
  },
  emits: [...useDialogPluginComponent.emits],
  async created() {
    this.exams = await getExamsByPeriodID(this.periodID);
  },
  setup(props, ctx) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const exams = ref([] as Exam[]);
    const $q = useQuasar();
    function cancel() {
      onDialogHide();
    }
    async function createExam() {
      const response = await createExamByPeriod(props.periodID);
      if (response && response[0]) {
        const exam = response[0] as Exam;
        exams.value.push(exam);
      }
    }
    function editExam(exam: Exam) {
      router.push({
        name: 'exam',
        params: {
          id: exam._id,
        },
        query: {
          editMode: 2,
        },
      });
    }
    return {
      exams,
      createExam,
      editExam,
      cancel,
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
    };
  },
  components: { EButton },
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
      overflow-y: hidden scroll;
      .exam {
        background-color: #918b8bbe;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding-left: 8px;
        cursor: pointer;
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
