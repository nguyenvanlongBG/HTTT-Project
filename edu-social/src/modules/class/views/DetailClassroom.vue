<template>
  <div class="container-detail-class">
    <div class="detail">
      <div class="toolbar-action-period">
        <q-btn
          color="primary"
          class="create-question"
          label="Tạo kỳ thi"
          @click="openCreatePeriod()"
        />
      </div>
      <div class="list-period">
        <div v-for="period in periods" class="post" :key="period._id">
          <div class="owner-post">
            <AvatarComponent></AvatarComponent>
          </div>
          <div class="description">
            <div>
              {{ period.exam_period_name ? period.exam_period_name : 'Đề thi' }}
            </div>
            <div class="actions">
              <q-btn
                v-if="checkRole(1)"
                color="white"
                text-color="black"
                label="Làm đề"
                @click="() => doExam(period._id)"
              />
              <q-btn
                v-if="checkRole(2)"
                color="white"
                text-color="black"
                label="Cập nhật đề thi"
                @click="() => listExam(period._id)"
              />
              <q-btn
                v-if="checkRole(1)"
                color="white"
                text-color="black"
                label="Lịch sử"
                @click="() => historyExam(period._id)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="toolbar-class">
      <div>
        <q-input rounded outlined v-model="text">
          <template v-slot:append> </template>
        </q-input>
      </div>
      <div class="item">
        <div>
          <img
            class="icon-32px"
            src="../../core/assets/pictures/file-and-folder.png"
            alt=""
          />
        </div>
        <span>Kỳ thi</span>
      </div>
      <div class="item">
        <div>
          <img
            class="icon-32px"
            src="../../core/assets/pictures/file-and-folder.png"
            alt=""
          />
        </div>
        <span>Tài liệu</span>
      </div>
      <div class="item expand" @click="changeStatusExpand">
        <span>Thành viên</span>
        <span v-if="isExpandingMember"
          ><q-icon name="expand_less" size="32px"></q-icon
        ></span>
        <span v-if="!isExpandingMember"
          ><q-icon name="expand_more" size="32px"></q-icon
        ></span>
      </div>
      <div class="members" v-if="isExpandingMember">
        <div class="member" v-for="enroll in enrolls" :key="enroll._id">
          <div>{{ enroll._id }}</div>
          <div class="btn-accept" @click="acceptEnroll(enroll._id)">Duyệt</div>
        </div>
        <div class="add-member">
          <input
            class="input-add-student"
            placeholder="Email học sinh"
            v-model="studentEmail"
          />
          <span class="btn-add-student" @click="addStudentToClass"
            >Thêm học sinh</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import AvatarComponent from 'src/modules/core/components/avatar/AvatarComponent.vue';
import { ref } from 'vue';
import {
  getPeriodsByClassID,
  getExamByPeriodID,
} from '../services/classroomService';
import {
  createPeriod,
  createExamByPeriod,
} from 'src/modules/exam/services/examService';
import { addStudent, acceptRequestToClass } from '../services/classroomService';
import { getUser } from 'src/modules/core/utils/cookies';
import router from '../../../router/index';
import { useQuasar } from 'quasar';
import PopupCreatePeriod from 'src/modules/exam/components/PopupCreateExam.vue';
import PopupChooseExam from 'src/modules/exam/components/PopupChooseExam.vue';
export default {
  name: 'DetailClassroom',
  components: { AvatarComponent },
  async created() {
    this.classID = this.$route.params.classID;
    if (this.classID) {
      this.periods = await getPeriodsByClassID(this.classID);
    }
  },
  setup() {
    const classID = ref('');
    const studentEmail = ref('');
    const isExpandingMember = ref(false);
    const periods = ref([]);
    const enrolls = ref([
      {
        _id: '65a406406cafd56fc6b56467',
        class_id: '659c0b93e2127106a4eb7662',
        user_id: '658ff9259b8009704d8f3471',
        status: 1,
        createdAt: '2024-01-14T16:05:20.292Z',
        updatedAt: '2024-01-14T16:05:20.292Z',
        __v: 0,
      },
    ]);
    const $q = useQuasar();
    function changeStatusExpand() {
      isExpandingMember.value = !isExpandingMember.value;
    }
    async function doExam(periodID: string) {
      const exams = await getExamByPeriodID(periodID);
      if (exams && exams[0]) {
        const exam = exams[0];
        if (exam && exam._id) {
          router.push({
            name: 'exam',
            params: {
              id: exam._id,
            },
            query: {
              editMode: 1,
            },
          });
        }
      }
    }
    async function listExam(periodID: string) {
      $q.dialog({
        component: PopupChooseExam,
        componentProps: {
          periodID: periodID,
        },
      }).onCancel(() => {
        console.log('Cancel');
      });
    }
    async function historyExam(periodID: string) {
      const exams = await getExamByPeriodID(periodID);
      if (exams && exams[0]) {
        const exam = exams[0];
        if (exam && exam._id) {
          router.push({
            name: 'exam',
            params: {
              id: exam._id,
            },
            query: {
              editMode: 3,
            },
          });
        }
      }
    }
    function checkRole(role: number) {
      const user = getUser();
      if (user) {
        if (user.role == role) return true;
      }
      return false;
    }
    function openCreatePeriod() {
      $q.dialog({
        component: PopupCreatePeriod,
      })
        .onOk(async (data) => {
          var dataCreate = { ...data, class_id: classID.value };
          const response = await createPeriod(dataCreate);
          if (response) {
            console.log('Thành công', response);
            periods.value.push(response);
          }
        })
        .onCancel(() => {
          console.log('Cancel');
        });
    }
    async function addStudentToClass() {
      await addStudent(classID.value, studentEmail.value);
      studentEmail.value = '';
    }
    async function acceptEnroll(enrollID: string) {
      const response = await acceptRequestToClass(enrollID);
      if (response) {
        enrolls.value = enrolls.value.filter((en) => en._id != enrollID);
      }
    }
    return {
      studentEmail,
      classID,
      periods,
      doExam,
      listExam,
      historyExam,
      isExpandingMember,
      changeStatusExpand,
      openCreatePeriod,
      checkRole,
      enrolls,
      addStudentToClass,
      acceptEnroll,
    };
  },
};
</script>
<style src="../css/index.scss" lang="scss" scoped></style>
