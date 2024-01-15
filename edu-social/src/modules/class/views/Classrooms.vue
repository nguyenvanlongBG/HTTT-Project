<template>
  <div class="container">
    <h4>Lớp học của bạn</h4>
    <div class="toolbar-action-class">
      <q-btn
        v-if="checkRole(2)"
        color="primary"
        class="create-question"
        label="Tạo lớp học"
        @click="openCreateClassroom()"
      />
      <div class="join-classroom" v-if="checkRole(1)">
        <EInput placeholder="Mã lớp học" v-model:value="classCodeToJoin" />
        <EButton label="Xin vào lớp" @click="requestJoinClassroom" />
      </div>
    </div>
    <div class="list-classroom">
      <ClassroomComponent
        :classroom="classroom"
        v-for="(classroom, index) in classrooms"
        :key="index"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import ClassroomComponent from '../components/ClassroomComponent.vue';
import PopupCreateClassroom from './CreateClassroom.vue';
import {
  createClassroom,
  getClassByUser,
  requestJoinClass,
} from '../services/classroomService';
import { getValueByKey } from '../../core/utils/cookies';
import { Classroom } from '../models';
import { useQuasar } from 'quasar';
import { getUser } from 'src/modules/core/utils/cookies';

import EInput from 'src/modules/core/components/input/EInput.vue';
import EButton from 'src/modules/core/components/button/EButton.vue';

export default {
  name: 'ListClassroom',
  components: {
    ClassroomComponent,
    EInput,
    EButton,
  },
  async created() {
    const userID = getValueByKey('userID');
    if (userID) {
      this.classrooms = await getClassByUser(userID);
    }
  },
  setup() {
    const classrooms = ref([] as Classroom[]);
    const classCodeToJoin = ref('');
    const $q = useQuasar();
    function openCreateClassroom() {
      $q.dialog({
        component: PopupCreateClassroom,
      }).onOk(async (data) => {
        const response = await createClassroom(data);
        if (response) {
          this.classrooms.push(response);
        }
      });
    }
    async function requestJoinClassroom() {
      if (classCodeToJoin.value) {
        const response = await requestJoinClass(classCodeToJoin.value);
        if (response) {
          classCodeToJoin.value = '';
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
    return {
      classrooms,
      classCodeToJoin,
      openCreateClassroom,
      requestJoinClassroom,
      checkRole,
    };
  },
};
</script>
<style src="../css/index.scss" lang="scss" scoped></style>
