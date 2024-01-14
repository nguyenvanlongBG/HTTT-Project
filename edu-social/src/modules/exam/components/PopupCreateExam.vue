<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <div class="container-create-post">
      <div class="body">
        <div class="content">
          <div class="header">Tạo kì thi</div>
          <div class="body-content">
            <EInput
              :square="true"
              placeholder="Tên kỳ thi"
              v-model:value="periodName"
            />
            <EInput
              :square="true"
              placeholder="Thời gian bắt đầu"
              :value="startTime"
              :readonly="true"
              @click="chooseTimeStart(startTime)"
            />
            <EInput
              :square="true"
              placeholder="Thời gian kết thúc"
              :value="finishTime"
              :readonly="true"
              @click="chooseTimeFinish(finishTime)"
            />
            <div class="format-exam">
              <div>Format đề</div>
              <div class="detail-format-exam">
                <div class="number-question-level-block">
                  <label class="label-level">Nhận biết</label>
                  <input
                    class="number-question-level"
                    v-model="easyLevel"
                    type="number"
                  />
                </div>
                <div class="number-question-level-block">
                  <label class="label-level">Thông hiểu</label>
                  <input
                    class="number-question-level"
                    v-model="mediumLevel"
                    type="number"
                  />
                </div>
                <div class="number-question-level-block">
                  <label class="label-level">Vận dụng</label>
                  <input
                    class="number-question-level"
                    v-model="highLevel"
                    type="number"
                  />
                </div>
                <div class="number-question-level-block">
                  <label class="label-level">Vận dụng cao</label>
                  <input
                    class="number-question-level"
                    v-model="highestLevel"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <EButton :label="$t('button.save')" @click="createPeriod" />
        <EButton :label="$t('button.cancel')" @click="cancel" />
      </div>
    </div>
  </q-dialog>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
import EButton from 'src/modules/core/components/button/EButton.vue';
import EInput from 'src/modules/core/components/input/EInput.vue';
import ChooseTime from './ChooseTime.vue';
export default defineComponent({
  name: 'PopupCreatePeriod',
  props: ['post'],
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    const periodName = ref('');
    const easyLevel = ref(0);
    const mediumLevel = ref(0);
    const highLevel = ref(0);
    const highestLevel = ref(0);
    const startTime = ref('');
    const finishTime = ref('');
    const $q = useQuasar();
    function cancel() {
      onDialogHide();
    }
    function chooseTimeStart(time: any) {
      $q.dialog({
        component: ChooseTime,
        componentProps: {
          timeProp: time,
          title: 'Thời gian bắt đầu',
        },
      }).onOk((data) => {
        startTime.value = data;
        console.log(data, startTime.value);
      });
    }
    function chooseTimeFinish(time: any) {
      $q.dialog({
        component: ChooseTime,
        componentProps: {
          timeProp: time,
          title: 'Thời gian kết thúc',
        },
      }).onOk((data) => {
        finishTime.value = data;
      });
    }
    function createPeriod() {
      const data = {
        exam_period_name: periodName.value,
        startTime: startTime.value,
        finishTime: finishTime.value,
        exam_format: {
          level1: easyLevel,
          level2: mediumLevel,
          level3: highLevel,
          level4: highestLevel,
        },
      };
      onDialogOK(data);
    }
    return {
      easyLevel,
      mediumLevel,
      highLevel,
      highestLevel,
      startTime,
      finishTime,
      periodName,
      cancel,
      dialogRef,
      onDialogHide,
      onDialogOK,
      onDialogCancel,
      chooseTimeStart,
      chooseTimeFinish,
      createPeriod,
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
