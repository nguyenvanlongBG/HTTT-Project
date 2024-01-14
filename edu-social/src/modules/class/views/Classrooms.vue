<template>
  <div class="container">
    <h4>Lớp học của bạn</h4>
    <div class="toolbar-action-class">
      <q-btn
        color="primary"
        class="create-question"
        label="Tạo lớp học"
        @click="openCreateClassroom()"
      />
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
import { createClassroom, getClassByUser } from '../services/classroomService';
import { getValueByKey } from '../../core/utils/cookies';
import { Classroom } from '../models';
import { useQuasar } from 'quasar';

export default {
  name: 'ListClassroom',
  components: {
    ClassroomComponent,
  },
  async created() {
    const userID = getValueByKey('userID');
    if (userID) {
      this.classrooms = await getClassByUser(userID);
    }
  },
  setup() {
    const classrooms = ref([] as Classroom[]);
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
    return {
      classrooms,
      openCreateClassroom,
    };
  },
};
</script>
<style src="../css/index.scss" lang="scss" scoped></style>
