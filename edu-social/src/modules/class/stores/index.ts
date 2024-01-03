import { defineStore } from 'pinia';
import { Answer, Question } from 'src/modules/core/models';
export const useClassroomStore = defineStore('classroom', {
  state: () => ({
    classrooms: [] as Question[],
  }),
  getters: {},
  actions: {},
});
