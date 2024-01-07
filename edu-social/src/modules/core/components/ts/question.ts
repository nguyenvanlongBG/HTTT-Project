import { defineComponent, ref } from 'vue';
import EditorComponent from '../../components/rich-editor/EditorComponent.vue';
import { Answer, Question } from '../../models';
import { ModeExam } from '../../enums/Menu';
export default defineComponent({
  name: 'QuestionComponent',
  components: {
    EditorComponent,
  },
  props: {
    question: {
      type: Object as () => Question,
      required: true,
    },
    statusEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    answer: {
      type: String,
      required: false,
      default: '',
    },
    isShowResult: {
      type: Boolean,
      required: false,
      default: false,
    },
    isShowAnswer: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:question', 'update:answer'],
  created() {
    this.questionLocal = this.question;
    if (this.question?.result) {
      this.results = this.question?.result.split(',');
    } else {
      this.results = [];
    }
  },
  setup(props, ctx) {
    const editMode = ref(0);
    const isEdit = ref(false);
    const results = ref([] as string[]);
    const questionLocal = ref({} as Question);
    function createAnswer() {
      ctx.emit('update:question');
    }
    function isActive(choose: Answer) {
      if (props.isShowResult) {
        if (choose.is_correct) {
          return 'correct';
        }
        if (props.isShowAnswer) {
          if (props.answer == choose._id && !choose.is_correct) return 'wrong';
        }
      }
      if (props.answer == choose._id) return 'choose';
      return '';
    }
    function updateChooseAnswer(val: string) {
      ctx.emit('update:answer', val);
    }
    function changeEditStatus(val: boolean) {
      isEdit.value = val;
    }
    return {
      questionLocal,
      createAnswer,
      editMode,
      isEdit,
      changeEditStatus,
      results,
      isActive,
      updateChooseAnswer,
    };
  },
});
