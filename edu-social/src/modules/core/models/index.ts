export interface User {
  _id: string;
  name: string;
  avatarUrl: string;
  role: number;
}
export interface Answer {
  _id: string;
  description: string;
  is_correct: boolean;
}
export interface Question {
  _id: string;
  createdAt: string;
  created_by: string; // 1: Tự luận 2: Trắc nghiệm 1 đáp án 3: Chọn nhiều đáp án 4: Điền đáp án
  description: string;
  is_public: boolean;
  level: number;
  question_type: number;
  subject_id: string;
  updatedAt: string;
}
export interface QuestionWithAnswer {
  answers: Answer[];
  question: Question;
}

export interface AnswerUser {
  _id: string;
  question_id: string;
  selected_answers: [];
}
