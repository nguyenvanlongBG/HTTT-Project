<template>
  <table>
    <caption>
      Bảng điểm
    </caption>
    <thead>
      <tr>
        <th scope="col">Tên học sinh</th>
        <th scope="col" v-for="(period, index) in periods" :key="index">
          {{ period }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(student, index) in studentsReport" :key="index">
        <td data-label="Account">{{ student.name ? student.name : '' }}</td>
        <td
          data-label="Period"
          v-for="(score, ind) in Object.values(student.scores)"
          :key="ind"
        >
          {{ score ? Math.round(score) : '' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { ref } from 'vue';
import { getReportClassroom } from '../services/classroomService';
export default {
  name: 'ReportClassroom',
  async created() {
    this.classID = this.$route.params.classID;
    if (this.classID) {
      const response = await getReportClassroom(this.classID);
      if (response) {
        if (response.studentScores) {
          console.log(Object.values(response.studentScores));
          this.studentsReport = Object.values(response.studentScores);
        }
        if (response.periods) this.periods = response.periods;
      }
    }
  },
  setup() {
    const classID = ref('');
    const studentsReport = ref([]);
    const periods = ref([]);
    return {
      classID,
      studentsReport,
      periods,
    };
  },
};
</script>
<style src="../css/reportClassroom.css" lang="css" scoped></style>
