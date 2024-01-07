import { defineComponent, ref } from 'vue';
import QuestionComponent from '../../core/components/question/QuestionComponent.vue';
import {
  getAnswersUser,
  getExamByID,
  createSubmission,
} from '../services/examService';
import { useExamStore } from '../stores';
import { storeToRefs } from 'pinia';
import { AnswerUser, Question } from 'src/modules/core/models';
export default defineComponent({
  components: {
    QuestionComponent,
  },
  props: {
    editMode: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  async created() {
    const response = await getExamByID('');
    if (response && response.exam) {
      this.exam = response.exam;
    }
    if (response && response.questionsWithAnswers) {
      this.questions = response.questionsWithAnswers;
    }
    if (this.editMode == 3) {
      const response = await getAnswersUser();
      if (response && response.student_answers) {
        this.answersUser = response.student_answers;
      }
    }
  },
  setup() {
    const questions = ref([] as Question[]);
    const exam = ref({});
    const examStore = useExamStore();
    const { getQuestions } = storeToRefs(examStore);
    const hasRoleEdit = ref(true);
    const answersUser = ref([] as AnswerUser[]);
    async function submit() {
      const data = {};
      data.exam_id = exam.value._id;
      data.student_answers = [];
      for (let index = 0; index < answersUser.value.length; index++) {
        const ans = answersUser.value[index];
        console.log;
        if (ans) {
          console.log(ans, questions.value[index]);
          data.student_answers.push({
            question_id: questions.value[index].question._id,
            selected_answers: [ans],
          });
        }
      }
      await createSubmission(data);
    }
    return {
      exam,
      questions,
      examStore,
      getQuestions,
      hasRoleEdit,
      answersUser,
      submit,
    };
  },
});
