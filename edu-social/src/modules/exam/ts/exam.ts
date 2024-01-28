import { defineComponent, ref } from 'vue';
import QuestionComponent from '../../core/components/question/QuestionComponent.vue';
import CommonFunction from '../../core/commonFunction';
import {
  getAnswersUser,
  getExamByID,
  createSubmission,
} from '../services/examService';
import { useExamStore } from '../stores';
import { storeToRefs } from 'pinia';
import {
  AnswerUser,
  Question,
  QuestionWithAnswer,
} from 'src/modules/core/models';
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
    const examID = this.$route.params.id as string;
    const response = await getExamByID(examID);
    if (response && response.exam) {
      this.exam = response.exam;
    }
    if (response && response.questionsWithAnswers) {
      this.questions = response.questionsWithAnswers;
    }
    if (this.editMode == 3) {
      const user = CommonFunction.getCurrentUser();
      if (user) {
        const response = await getAnswersUser(user.id);
        if (response && response.student_answers) {
          this.answersUser = response.student_answers;
        }
      }
    }
  },
  setup() {
    const questions = ref([] as QuestionWithAnswer[]);
    const exam = ref({});
    const isAfterExam = ref(false);
    const examStore = useExamStore();
    const { getQuestions } = storeToRefs(examStore);
    const hasRoleEdit = ref(true);
    const answersUser = ref([] as AnswerUser[]);
    function changeResult(ansID: string, question: QuestionWithAnswer) {
      console.log(ansID, question);
      if (question.answers && question.answers.length) {
        const answer = question.answers.forEach((ans) => {
          if (ans._id == ansID) {
            ans.is_correct = true;
          } else {
            ans.is_correct = false;
          }
        });
      }
    }
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
      const response = await createSubmission(data);
      if (response && response._id) {
        isAfterExam.value = true;
      }
    }
    function createQuestion() {
      const newQuestion = CommonFunction.createQuestion();
      questions.value.push(newQuestion);
    }
    return {
      exam,
      questions,
      examStore,
      getQuestions,
      hasRoleEdit,
      answersUser,
      submit,
      isAfterExam,
      changeResult,
      createQuestion,
    };
  },
});
