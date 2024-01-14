import { defineComponent, ref } from 'vue';
import QuestionComponent from '../../core/components/question/QuestionComponent.vue';
import PopupCreateQuestion from '../components/PopupCreateQuestion.vue';
import { QuestionWithAnswer } from 'src/modules/core/models';
import { getQuestionsBySubject } from '../services/bankService';
import { useQuasar } from 'quasar';
export default defineComponent({
  components: {
    QuestionComponent,
    PopupCreateQuestion,
  },
  props: {
    editMode: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  async created() {
    const response = await getQuestionsBySubject('6590176ba57e454f49e4ea25');
    if (response) {
      this.questions = response;
    }
  },
  setup() {
    const questions = ref([] as QuestionWithAnswer[]);
    const exam = ref({});
    const $q = useQuasar();
    function createQuestion() {
      $q.dialog({
        component: PopupCreateQuestion,
      }).onOk((data: QuestionWithAnswer) => {
        console.log('Thêm thành công', data);
        questions.value.push(data);
      });
    }
    return {
      exam,
      questions,
      createQuestion,
    };
  },
});
