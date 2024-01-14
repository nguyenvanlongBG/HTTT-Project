import { defineStore } from 'pinia';
import { Answer, Question } from 'src/modules/core/models';
export const useExamStore = defineStore('exam', {
  state: () => ({
    questions: [],
  }),
  getters: {
    getQuestions: (state) => state.questions,
  },
  actions: {},
});
