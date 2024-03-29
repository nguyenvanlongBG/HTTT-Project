import { defineComponent, ref } from 'vue';
import EditorComponent from '../../components/rich-editor/EditorComponent.vue';
import { Answer, Question, QuestionWithAnswer } from '../../models';
import { ModeExam, ModeQuestion } from '../../enums/Menu';
import { updateQuestion, createQuestion } from '../../services';
import commonFunction from '../../commonFunction';
import { Subject } from 'src/modules/subjects/models';
export default defineComponent({
  name: 'QuestionComponent',
  components: {
    EditorComponent,
  },
  props: {
    question: {
      type: Object as () => QuestionWithAnswer,
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
    mode: {
      type: Number,
      required: false,
      default: ModeQuestion.DO, // Câu hỏi làm bài
    },
    subjectID: {
      type: String,
      required: false,
      default: '6590176ba57e454f49e4ea25',
    },
    subjects: {
      type: Array,
      required: false,
      default: [] as Subject[],
    },
  },
  emits: ['update:question', 'update:answer'],
  created() {
    this.questionLocal = JSON.parse(
      JSON.stringify(this.question)
    ) as QuestionWithAnswer;
    if (this.mode == ModeQuestion.DO) {
      this.isShowResult = false;
    } else if (this.mode == ModeQuestion.EDIT) {
      this.isShowResult = true;
      this.isShowAnswer = false;
    } else if (this.mode == ModeQuestion.HISTORY) {
      this.isShowResult = true;
      this.isShowAnswer = true;
    }
    if (this.statusEdit) {
      this.isEdit = true;
    }
  },
  setup(props, ctx) {
    const isRefresh = ref(false);
    const editMode = ref(0);
    const isEdit = ref(false);
    const results = ref([] as string[]);
    const questionLocal = ref({} as QuestionWithAnswer);
    const isShowResult = ref(false);
    const isShowAnswer = ref(false);
    const level = ref(1);
    const levels = ref([
      {
        value: 1,
        name: 'Nhận biết',
      },
      {
        value: 2,
        name: 'Thông hiểu',
      },
      {
        value: 3,
        name: 'Vận dụng',
      },
      {
        value: 4,
        name: 'Vận dụng cao',
      },
    ]);
    function createAnswer() {
      const newChoose = commonFunction.createChoose('');
      questionLocal.value.answers.push(newChoose);
      console.log(newChoose, questionLocal);
    }
    function isActive(choose: Answer) {
      if (isShowResult.value) {
        if (choose.is_correct) {
          return 'correct';
        }
        if (isShowAnswer.value) {
          if (props.answer == choose._id && !choose.is_correct) return 'wrong';
        }
      }
      if (props.answer == choose._id) return 'choose';
      return '';
    }
    function updateChooseAnswer(val: string) {
      if (this.mode == ModeQuestion.DO) {
        ctx.emit('update:answer', val);
      } else if (this.mode == ModeQuestion.EDIT) {
        if (isEdit.value) {
          if (
            questionLocal.value.answers &&
            questionLocal.value.answers.length
          ) {
            questionLocal.value.answers.forEach((ans) => {
              if (ans._id == val) {
                ans.is_correct = true;
              } else {
                ans.is_correct = false;
              }
            });
          }
        }
      }
    }
    function changeEditStatus(val: boolean) {
      isEdit.value = val;
    }
    async function saveDataQuestion() {
      const answers = questionLocal.value.answers.map((ans) => {
        return {
          description: ans.description,
          is_correct: ans.is_correct,
        };
      });
      const data = {
        questionData: questionLocal.value.question,
        answersData: answers,
      };
      if (questionLocal.value.question._id) {
        const response = await updateQuestion(
          questionLocal.value.question._id,
          data
        );
        ctx.emit('update:question', response);
      } else {
        delete data.questionData._id;
        // data.questionData.subject_id = props.subjectID;
        const response = await createQuestion(data);
        ctx.emit('update:question', response);
      }
      this.changeEditStatus(false);
    }
    function rollBackDataQuestion() {
      questionLocal.value = Object.assign({}, props.question);
      isRefresh.value = true;
      this.$nextTick(() => {
        isRefresh.value = false;
        isEdit.value = false;
      });
    }
    return {
      level,
      levels,
      isRefresh,
      questionLocal,
      rollBackDataQuestion,
      saveDataQuestion,
      createAnswer,
      editMode,
      isEdit,
      changeEditStatus,
      results,
      isActive,
      updateChooseAnswer,
      isShowResult,
      isShowAnswer,
    };
  },
});
