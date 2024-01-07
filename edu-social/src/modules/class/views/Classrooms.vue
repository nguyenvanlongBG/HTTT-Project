<template>
  <div class="container">
    <h4>Lớp học của bạn</h4>
    <div class="list-classroom">
      <ClassroomComponent
        :classroom="classroom"
        v-for="(classroom, index) in classrooms"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import ClassroomComponent from '../components/ClassroomComponent.vue';
import { getClassByUser } from '../services/classroomService';
import { getValueByKey } from '../../core/utils/cookies';
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
    const classrooms = ref([]);
    return {
      classrooms,
    };
  },
};
</script>
<style src="../css/index.scss" lang="scss" scoped></style>
