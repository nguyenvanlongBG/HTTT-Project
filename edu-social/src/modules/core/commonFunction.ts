import { Answer, Question, QuestionWithAnswer, User } from './models';
import { v4 as uuidv4 } from 'uuid';
import { getUser } from './utils/cookies';
class CommonFunction {
  createQuestion() {
    const newQuestion: QuestionWithAnswer = {
      answers: [],
      question: {
        _id: this.generateID(),
        createdAt: '',
        created_by: '',
        description: '',
        is_public: true,
        level: 1,
        question_type: 1,
        subject_id: '',
        updatedAt: '',
      },
    };
    return newQuestion;
  }
  generateID() {
    return uuidv4();
  }
  createChoose(questionID: string) {
    const newChoose: Answer = {
      _id: this.generateID(),
      description: '',
      is_correct: false,
    };
    return newChoose;
  }

  getCurrentUser() {
    const user = getUser();
    if (user) return user as User;
    return null;
  }
}
const commonFunction = new CommonFunction();
export default commonFunction;
