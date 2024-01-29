import { defineComponent, ref } from 'vue';
import QuestionComponent from '../../core/components/question/QuestionComponent.vue';
import PopupCreateQuestion from '../components/PopupCreateQuestion.vue';
import { QuestionWithAnswer } from 'src/modules/core/models';
import { getQuestionsBySubject } from '../services/bankService';
import { useQuasar } from 'quasar';
import { Subject } from 'src/modules/subjects/models';
import { getAllSubject } from 'src/modules/subjects/services/subjectService';
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
    this.subjects = await getAllSubject();
  },
  setup() {
    const subjects = ref([] as Subject[]);
    const questions = ref([] as QuestionWithAnswer[]);
    const exam = ref({});
    const $q = useQuasar();
    function createQuestion() {
      $q.dialog({
        component: PopupCreateQuestion,
        componentProps: {
          subjects: subjects.value,
        },
      }).onOk((data: QuestionWithAnswer) => {
        console.log('Thêm thành công', data);
        questions.value.push(data);
      });
    }
    return {
      exam,
      subjects,
      questions,
      createQuestion,
    };
  },
});
